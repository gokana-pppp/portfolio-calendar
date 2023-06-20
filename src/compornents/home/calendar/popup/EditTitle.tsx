import React, { useState } from "react";
import styles from "./popup.module.scss";

type Props = {
  title: string;
};

export const EditTitle = (props: Props) => {
  const { title } = props;
  const [editedText, setEditedText] = useState<string>(title);
  return (
    <div className={styles.edit_title}>
      <label>タイトル：</label>
      <input type="text" value={editedText}></input>
      <button className={styles.title_select_button}>決定</button>
    </div>
  );
};
