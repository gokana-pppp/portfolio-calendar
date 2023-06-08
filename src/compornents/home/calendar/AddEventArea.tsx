import React, { useState, Dispatch, SetStateAction } from "react";
import { Event } from "pages/Home";
import styles from "./calendar.module.scss";
import { TimeSelection } from "./TimeSelection";
import { DateSelection } from "./DateSelection";
import { EventInput } from "./EventInput";

export type Props = {
  date: string;
  events: Event[];
  setEvents: Dispatch<SetStateAction<Event[]>>;
  selectedTime: string;
  setSelectedTime: Dispatch<SetStateAction<string>>;
};

/**
 * 新規event作成時に使用する
 * input等をまとめたコンポーネント
 */

export const AddEventArea = (props: Props) => {
  const [text, setText] = useState("");
  const { date, events, setEvents, selectedTime, setSelectedTime } = props;

  return (
    <>
      <DateSelection date={date} />
      <div className={styles.event_input_area}>
        <TimeSelection
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        />
        <EventInput
          text={text}
          setText={setText}
          date={date}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
          events={events}
          setEvents={setEvents}
        />
      </div>
    </>
  );
};
