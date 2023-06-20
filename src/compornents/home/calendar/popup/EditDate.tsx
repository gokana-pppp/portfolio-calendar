import React, { useState } from "react";
import styles from "./popup.module.scss";

type Props = {
  start: string;
  end: string;
};

/**
 * 終日イベントの時に表示される
 * 開始日、終了日を変更するコンポーネント
 */

export const EditDate = (props: Props) => {
  const { start, end } = props;
  const [editedStartDate, setEditedStartDate] = useState<string>(start);
  const [editedEndDate, setEditedEndDate] = useState<string>(end);

  return (
    <div>
      <div>
        <div>
          <div className={styles.edit_date}>
            <p>開始日：</p>
            <input
              type="date"
              value={editedStartDate}
              className={styles.date_input}
            ></input>
            <button className={styles.date_select_button}>決定</button>
          </div>
          <div className={styles.edit_date}>
            <p>終了日：</p>
            <input
              type="date"
              value={editedEndDate}
              className={styles.date_input}
            ></input>
            <button className={styles.date_select_button}>決定</button>
          </div>
        </div>
      </div>
    </div>
  );
};
