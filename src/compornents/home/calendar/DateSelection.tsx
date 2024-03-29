import React from "react";
import styles from "./calendar.module.scss";

type Props = {
  date: string;
};

/**
 * クリックされたカレンダー上の日付を
 * <p>◯月◯日</p> で表示させる
 */
export const DateSelection = (props: Props) => {
  const { date } = props;
  if (date === "")
    return (
      <div className={styles.date_selection_area}>
        <p>カレンダーの日付をクリックしてください</p>
      </div>
    );

  const DateArr = date.split("-");
  const SelectedMonth = Number(DateArr[1]);
  const SelectedDate = Number(DateArr[2]);

  return (
    <div className={styles.date_selection_area}>
      <p className={styles.p}>
        {" "}
        {`イベント作成する日付：${SelectedMonth}月${SelectedDate}日`}
      </p>
    </div>
  );
};
