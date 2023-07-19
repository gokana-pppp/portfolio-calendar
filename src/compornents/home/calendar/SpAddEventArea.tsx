import React, {
  Dispatch,
  SetStateAction,
  useState,
  useRef,
  ChangeEvent,
} from "react";
import styles from "./spAddEventArea.module.scss";
import { Event } from "pages/Home";
import { DateSelection } from "./DateSelection";
import { TimeSelection } from "./TimeSelection";
import { EventInput } from "./EventInput";

type Props = {
  openSpAdd: boolean;
  setOpenSpAdd: Dispatch<SetStateAction<boolean>>;
  date: string;
  setDate: Dispatch<SetStateAction<string>>;
  events: Event[];
  setEvents: Dispatch<SetStateAction<Event[]>>;
  selectedHour: string;
  setSelectedHour: Dispatch<SetStateAction<string>>;
  selectedMinute: string;
  setSelectedMinute: Dispatch<SetStateAction<string>>;
};

export const SpAddEventArea = (props: Props) => {
  const {
    openSpAdd,
    setOpenSpAdd,
    date,
    setDate,
    events,
    setEvents,
    selectedHour,
    setSelectedHour,
    selectedMinute,
    setSelectedMinute,
  } = props;

  const inputRef = useRef<HTMLInputElement>(null!);
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>): void => {
    setDate(() => e.target.value);
  };

  const [text, setText] = useState("");
  return (
    <>
      {openSpAdd ? (
        <div className={styles.overlay}>
          <div className={styles.sp_add_area}>
            <p>新規イベント作成</p>
            <div className={styles.date_area}>
              <input
                type="date"
                value={date}
                ref={inputRef}
                onChange={onChangeInput}
              />
            </div>

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
            <button
              className={styles.close_button}
              onClick={() => setOpenSpAdd(false)}
            >
              close
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
