import React, {
  useState,
  ChangeEvent,
  useRef,
  Dispatch,
  SetStateAction,
} from "react";
import { optionsOfHour, optionsOfMinute } from "../../calendar/TimeSelection";
import styles from "./popup.module.scss";
import { Event, SelectedEvent } from "pages/Home";

type Props = {
  start: string;
  targetEventId: string;
  setEvents: Dispatch<SetStateAction<Event[]>>;
  setSelectedEvent: Dispatch<SetStateAction<SelectedEvent[]>>;
};

/**
 * 時間指定イベントの時に表示される
 * 日付と時間を変更するコンポーネント
 */

export const EditDateAndTime = (props: Props) => {
  const { start, targetEventId, setEvents, setSelectedEvent } = props;

  const copyOptionsOfHour = [...optionsOfHour];
  const editoptionsOfHour = copyOptionsOfHour.slice(1, 11);

  const [editedStartDate, setEditedStartDate] = useState<string>(start);
  const [editedHour, setEditedHour] = useState<string>("08");
  const [editedMinute, setEditedMinute] = useState<string>("00");

  const editedStartDateRef = useRef<HTMLInputElement>(null!);

  const handleStartDate = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedStartDate(e.target.value);
  };
  const handleSelectHour = (e: ChangeEvent<HTMLSelectElement>) => {
    setEditedHour(e.target.value);
  };

  const handleSelectMinute = (e: ChangeEvent<HTMLSelectElement>) => {
    setEditedMinute(e.target.value);
  };

  //それぞれ型が合うように変形する
  const newStartDate = new Date(editedStartDate);
  const startDateAndTime = editedStartDate + "T" + editedHour + editedMinute;
  const newSelectedTime = editedStartDate + editedHour + editedMinute;

  /**
   * 時間指定イベントの場合、
   * startとend、startTimeとendTime は同じにしておく
   */
  const changeStartTime = (targetEventId: string) => {
    setEvents((events) => {
      return events.map((event) => {
        if (event.id === targetEventId) {
          return {
            ...event,
            start: (event.start = startDateAndTime),
            startTime: (event.startTime = newSelectedTime),
            end: (event.end = startDateAndTime),
            endTime: (event.endTime = newSelectedTime),
          };
        }
        return event;
      });
    });
    setSelectedEvent((selectedEvent) => {
      return selectedEvent.map((selectedEvent) => {
        if (selectedEvent.id === targetEventId) {
          return {
            ...selectedEvent,
            start: (selectedEvent.start = newStartDate),
            startTime: (selectedEvent.startTime = newSelectedTime),
            end: (selectedEvent.end = newStartDate),
            endTime: (selectedEvent.endTime = newSelectedTime),
          };
        }
        return selectedEvent;
      });
    });
  };

  return (
    <div className={styles.edit_time_selected_event}>
      <div className={styles.edit_date}>
        <p>日付：</p>
        <input
          type="date"
          value={editedStartDate}
          className={styles.date_input}
          ref={editedStartDateRef}
          onChange={handleStartDate}
        ></input>
      </div>
      <div className={styles.edit_date}>
        <p>時間：</p>
        <select
          className={styles.select}
          value={editedHour}
          onChange={handleSelectHour}
        >
          {editoptionsOfHour.map((hour) => {
            return (
              <option key={hour.value} value={hour.value}>
                {hour.label}
              </option>
            );
          })}
        </select>
        <p>時</p>
        <select
          className={styles.select}
          value={editedMinute}
          onChange={handleSelectMinute}
        >
          {optionsOfMinute.map((minute) => {
            return (
              <option key={minute.value} value={minute.value}>
                {minute.label}
              </option>
            );
          })}
        </select>
        <p>分</p>
        <button
          className={styles.date_and_time_select_button}
          onClick={() => changeStartTime(targetEventId)}
        >
          決定
        </button>
      </div>

      <div className={styles.select_button}></div>
    </div>
  );
};
