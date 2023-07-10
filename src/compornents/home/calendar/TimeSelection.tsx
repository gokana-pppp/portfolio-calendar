import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import styles from "./calendar.module.scss";

type Props = {
  selectedHour: string;
  setSelectedHour: Dispatch<SetStateAction<string>>;
  selectedMinute: string;
  setSelectedMinute: Dispatch<SetStateAction<string>>;
};

export const optionsOfHour = [
  { value: "", label: "終日" },
  { value: "08", label: "8" },
  { value: "09", label: "9" },
  { value: "10", label: "10" },
  { value: "11", label: "11" },
  { value: "12", label: "12" },
  { value: "13", label: "13" },
  { value: "14", label: "14" },
  { value: "15", label: "15" },
  { value: "16", label: "16" },
  { value: "17", label: "17" },
  { value: "18", label: "18" },
];
export const optionsOfMinute = [
  { value: "00", label: "00" },
  { value: "15", label: "15" },
  { value: "30", label: "30" },
  { value: "45", label: "45" },
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
    <div className={styles.time_selection_area}>
      <div>
        <label>
          <select
            className={styles.select_time}
            value={selectedHour}
            onChange={handleSelectHour}
          >
            {optionsOfHour.map((hour) => {
              return (
                <option key={hour.value} value={hour.value}>
                  {hour.label}
                </option>
              );
            })}
          </select>
        </label>
      </div>

      {selectedHour === "" ? (
        <></>
      ) : (
        // 時間が選択されていたら下記の要素はHTML上に表示される
        <>
          <div>
            <p className={styles.select_time_p}>時</p>
          </div>
          <div>
            <label>
              <select
                className={styles.select_time}
                value={selectedMinute}
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
            </label>
          </div>
          <div>
            <p className={styles.select_time_p}>分</p>
          </div>
        </>
      )}
    </div>
  );
};
