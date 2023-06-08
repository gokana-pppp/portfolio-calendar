import React, { useRef, ChangeEvent, Dispatch, SetStateAction } from "react";
import styles from "./calendar.module.scss";
import { Event } from "pages/Home";
import { v4 as uuidv4 } from "uuid";

type Props = {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  date: string;
  selectedTime: string;
  setSelectedTime: Dispatch<SetStateAction<string>>;
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
    selectedTime,
    setSelectedTime,
    events,
    setEvents,
  } = props;

  const textRef = useRef<HTMLInputElement>(null!);
  const onChangeText = (e: ChangeEvent<HTMLInputElement>): void => {
    setText(() => e.target.value);
  };

  const uuid = uuidv4();
  const startDate = date + "T" + selectedTime + ":00";

  const addEvent = (): void => {
    if (text === "" || date === "") return;
    const newEvent: Event = {
      title: text,
      start: startDate,
      id: uuid,
      isFinished: false,
    };
    setEvents([...events, newEvent]);
    setText("");
    setSelectedTime("10:00");
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
