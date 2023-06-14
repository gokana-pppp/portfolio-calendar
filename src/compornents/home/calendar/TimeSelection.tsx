import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import styles from "./calendar.module.scss";

type Props = {
  selectedHour: string;
  setSelectedHour: Dispatch<SetStateAction<string>>;
  selectedMinute: string;
  setSelectedMinute: Dispatch<SetStateAction<string>>;
};

const optionsOfHour = [
  { value: "", lavel: "終日" },
  { value: "08", lavel: "8" },
  { value: "09", lavel: "9" },
  { value: "10", lavel: "10" },
  { value: "11", lavel: "11" },
  { value: "12", lavel: "12" },
  { value: "13", lavel: "13" },
  { value: "14", lavel: "14" },
  { value: "15", lavel: "15" },
  { value: "16", lavel: "16" },
  { value: "17", lavel: "17" },
  { value: "18", lavel: "18" },
];
const optionsOfMinute = [
  { value: "00", lavel: "00" },
  { value: "15", lavel: "15" },
  { value: "30", lavel: "30" },
  { value: "45", lavel: "45" },
];

/**
 * 新規作成のevent.startを設定するための
 * プルダウンメニューのコンポーネント
 */
export const TimeSelection = (props: Props) => {
  const { selectedHour, setSelectedHour, selectedMinute, setSelectedMinute } =
    props;

  const handleSelectHour = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedHour(e.target.value);
  };

  const handleSelectMinute = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedMinute(e.target.value);
  };

  return (
    <div className={styles.time_select_zone}>
      <select
        className={styles.select_time}
        value={selectedHour}
        onChange={handleSelectHour}
      >
        {optionsOfHour.map((hour) => {
          return (
            <option key={hour.value} value={hour.value}>
              {hour.lavel}
            </option>
          );
        })}
      </select>
      {selectedHour === "" ? (
        <></>
      ) : (
        // 時間が選択されていたら下記の要素はHTML上に表示される
        <>
          <p className={styles.select_time_p}>時</p>
          <select
            className={styles.select_time}
            value={selectedMinute}
            onChange={handleSelectMinute}
          >
            {optionsOfMinute.map((minute) => {
              return (
                <option key={minute.value} value={minute.value}>
                  {minute.lavel}
                </option>
              );
            })}
          </select>
          <p className={styles.select_time_p}>分</p>
        </>
      )}
    </div>
  );
};
