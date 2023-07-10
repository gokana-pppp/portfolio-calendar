import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import styles from "./radioBtn.module.scss";
import { categories } from "../../../pages/Home";

type Props = {
  radioCategory: string;
  setRadioCategory: Dispatch<SetStateAction<string>>;
};

/**　ラジオボタンのコンポーネント　*/

export const RadioBtn = (props: Props) => {
  const { radioCategory, setRadioCategory } = props;

  const onChangeRadioBtn = (e: ChangeEvent<HTMLInputElement>): void => {
    setRadioCategory(e.target.value);
  };
  return (
    <>
      {categories.map((category, index) => {
        return (
          <div className={styles.radio_buttons} key={index}>
            <input
              type="radio"
              value={category}
              onChange={onChangeRadioBtn}
              checked={category === radioCategory}
            />
            <label htmlFor={category}>{category}</label>
          </div>
        );
      })}
    </>
  );
};
