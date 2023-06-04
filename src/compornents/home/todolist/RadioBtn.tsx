import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import styles from "./todolist.module.scss";
import { categories } from "../../../pages/Home";

type Props = {
  radioCategory: string;
  setRadioCategory: Dispatch<SetStateAction<string>>;
};

export const RadioBtn = (props: Props) => {
  const { radioCategory, setRadioCategory } = props;

  const onChangeRadioBtn = (e: ChangeEvent<HTMLInputElement>): void => {
    setRadioCategory(e.target.value);
  };
  return (
    <>
      {categories.map((category, index) => {
        return (
          <div className={styles.radio_buttons}>
            <div className={styles.radio_buttons} key={index}>
              <input
                type="radio"
                value={category}
                onChange={onChangeRadioBtn}
                checked={category === radioCategory}
                className={styles.r_input}
              />
              <label className={styles.r_label} htmlFor={category}>
                {category}
              </label>
            </div>
          </div>
        );
      })}
    </>
  );
};
