import React, { ChangeEvent, useContext } from "react";
import styles from "./todolist.module.scss";
import { RadioContext } from "./TodoList";
import { URGENT, MORNING, AFTERNOON } from "pages/Home";

export const RadioBtn = () => {
  const { radioCategoly, setRadioCategoly } = useContext(RadioContext);

  const categolies = [URGENT, MORNING, AFTERNOON];

  const onChangeRadioBtn = (e: ChangeEvent<HTMLInputElement>): void => {
    setRadioCategoly(e.target.value);
  };
  return (
    <>
      {categolies.map((categoly, index) => {
        return (
          <div className={styles.radio_button_area} key={index}>
            <input
              type="radio"
              value={categoly}
              onChange={onChangeRadioBtn}
              checked={categoly === radioCategoly}
              className={styles.r_input}
            />
            <label className={styles.r_label} htmlFor={categoly}>
              {categoly}
            </label>
          </div>
        );
      })}
    </>
  );
};
