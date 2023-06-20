import React, { useState } from "react";
import { optionsOfHour, optionsOfMinute } from "../../calendar/TimeSelection";
import styles from "./popup.module.scss";

type Props = {
  start: string;
};

export const EditDateAndTime = (props: Props) => {
  const { start } = props;

  const copyOptionsOfHour = [...optionsOfHour];
  const editoptionsOfHour = copyOptionsOfHour.slice(1, 11);

  const [editedStartDate, setEditedStartDate] = useState<string>(start);
  const [editedHour, setEditedHour] = useState<string>("08");
  const [editedMinute, setEditedMinute] = useState<string>("00");

  return (
    <div className={styles.edit_time_selected_event}>
      <div className={styles.edit_date}>
        <p>日付：</p>
        <input
          type="date"
          value={editedStartDate}
          className={styles.date_input}
        ></input>
      </div>
      <div className={styles.edit_date}>
        <p>時間：</p>
        <select className={styles.select} value={editedHour}>
          {editoptionsOfHour.slice(0, 11).map((hour) => {
            return (
              <option key={hour.value} value={hour.value}>
                {hour.label}
              </option>
            );
          })}
        </select>
        <p>時</p>
        <select className={styles.select} value={editedMinute}>
          {optionsOfMinute.map((minute) => {
            return (
              <option key={minute.value} value={minute.value}>
                {minute.label}
              </option>
            );
          })}
        </select>
        <p>分</p>
        <button className={styles.date_and_time_select_button}>決定</button>
      </div>

      <div className={styles.select_button}></div>
    </div>
  );
};
