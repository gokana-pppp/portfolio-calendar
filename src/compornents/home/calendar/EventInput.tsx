import React, {
  useRef,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import styles from "./calendar.module.scss";
import { Event } from "pages/Home";
import { v4 as uuidv4 } from "uuid";
import { addEventToSupabase } from "lib/supabaseFunc";
import { UserIdContext } from "App";

type Props = {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  date: string;
  selectedHour: string;
  setSelectedHour: Dispatch<SetStateAction<string>>;
  selectedMinute: string;
  setSelectedMinute: Dispatch<SetStateAction<string>>;
  events: Event[];
  setEvents: Dispatch<SetStateAction<Event[]>>;
};

/**
 * 新規eventのevent.titleを入力する<input>と
 * 追加ボタンのコンポーネント
 */

export const EventInput = (props: Props) => {
  const {
    text,
    setText,
    date,
    selectedHour,
    setSelectedHour,
    selectedMinute,
    setSelectedMinute,
    events,
    setEvents,
  } = props;

  const textRef = useRef<HTMLInputElement>(null!);
  const onChangeText = (e: ChangeEvent<HTMLInputElement>): void => {
    setText(() => e.target.value);
  };

  const { userId } = useContext(UserIdContext);

  const uuid = uuidv4();
  const startDateAndTime = date + "T" + selectedHour + selectedMinute;

  /**
   * 終日が選択されていたら　newAllDayEventが作成される
   * 時間が選択されていたら　newEventが作成される
   */
  const addEvent = (): void => {
    if (text === "" || date === "") return;
    if (selectedHour === "") {
      const newAllDayEvent: Event = {
        title: text,
        start: date,
        end: date,
        startTime: date + selectedHour + selectedMinute,
        endTime: date + selectedHour + selectedMinute,
        id: uuid,
        allDay: true,
        userId: userId,
      };
      setEvents([...events, newAllDayEvent]);
      addEventToSupabase(newAllDayEvent);
      setText("");
    } else {
      const newEvent: Event = {
        title: text,
        start: startDateAndTime,
        end: startDateAndTime,
        startTime: date + selectedHour + selectedMinute,
        endTime: date + selectedHour + selectedMinute,
        id: uuid,
        allDay: false,
        userId: userId,
      };
      setEvents([...events, newEvent]);
      addEventToSupabase(newEvent);
      setText("");
      setSelectedHour("");
      setSelectedMinute("00");
    }
  };

  return (
    <div>
      <input
        className={styles.input}
        type="text"
        ref={textRef}
        onChange={onChangeText}
        value={text}
      ></input>
      <button className={styles.button} onClick={() => addEvent()}>
        追加
      </button>
    </div>
  );
};
