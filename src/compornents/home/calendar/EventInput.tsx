import React, { useRef, ChangeEvent, Dispatch, SetStateAction } from "react";
import styles from "./calendar.module.scss";
import { Event } from "pages/Home";
import { v4 as uuidv4 } from "uuid";
import { addEventToSupabase } from "lib/supabaseFunc";
import { userIdState } from "App";
import { useRecoilValue } from "recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

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

  const userId = useRecoilValue(userIdState);

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
        color: "#778899",
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
        color: "#2c3e50",
      };
      setEvents([...events, newEvent]);
      addEventToSupabase(newEvent);
      setText("");
      setSelectedHour("");
      setSelectedMinute("00");
    }
  };

  return (
    <div className={styles.event_input_area}>
      <input
        className={styles.input}
        type="text"
        ref={textRef}
        onChange={onChangeText}
        value={text}
        placeholder=" 新規イベント名入力"
      ></input>
      <button className={styles.button} onClick={() => addEvent()}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
};
