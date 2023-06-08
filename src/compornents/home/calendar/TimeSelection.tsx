import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import styles from "./calendar.module.scss";

type Props = {
  selectedTime: string;
  setSelectedTime: Dispatch<SetStateAction<string>>;
};

/**
 * 新規作成のevent.startを設定するための
 * プルダウンメニューのコンポーネント
 */
export const TimeSelection = (props: Props) => {
  const { selectedTime, setSelectedTime } = props;
  const timeZones = [
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ];

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedTime(e.target.value);
  };

  return (
    <select
      className={styles.time}
      value={selectedTime}
      onChange={handleSelect}
    >
      {timeZones.map((time) => {
        return <option key={time}>{time}</option>;
      })}
    </select>
  );
};
