import React from "react";
import styles from "./calendar.module.scss";

type Props = {
  date: string;
};

/**
 * クリックされたカレンダー上の日付を<p>◯月◯日</p> で表示させる
 */
export const DateSelection = (props: Props) => {
  const { date } = props;
  if (date === "") return <p>カレンダーの日付をクリックしてください</p>;

  const DateArr = date.split("-");
  const SelectedMonth = Number(DateArr[1]);
  const SelectedDate = Number(DateArr[2]);

  return (
    <p
      className={styles.p}
    >{`${SelectedMonth}月${SelectedDate}日に新規イベントを追加します`}</p>
  );
};
