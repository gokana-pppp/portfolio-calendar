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
  selectedHour: string;
  setSelectedHour: Dispatch<SetStateAction<string>>;
  selectedMinute: string;
  setSelectedMinute: Dispatch<SetStateAction<string>>;
};

/**
 * 新規event作成時に使用する
 * input等をまとめたコンポーネント
 */

export const AddEventArea = (props: Props) => {
  const [text, setText] = useState("");
  const {
    date,
    events,
    setEvents,
    selectedHour,
    setSelectedHour,
    selectedMinute,
    setSelectedMinute,
  } = props;

  return (
    <div className={styles.add_event_area}>
      <DateSelection date={date} />
      <TimeSelection
        selectedHour={selectedHour}
        setSelectedHour={setSelectedHour}
        selectedMinute={selectedMinute}
        setSelectedMinute={setSelectedMinute}
      />
      <EventInput
        text={text}
        setText={setText}
        date={date}
        selectedHour={selectedHour}
        setSelectedHour={setSelectedHour}
        selectedMinute={selectedMinute}
        setSelectedMinute={setSelectedMinute}
        events={events}
        setEvents={setEvents}
      />
    </div>
  );
};
