import React, { ChangeEvent, useContext } from "react";
import styles from "./todolist.module.scss";
import { RadioContext } from "./TodoList";

type Props = {
  URGENT: string;
  MORNING: string;
  AFTERNOON: string;
};

export const RadioBtn = (props: Props) => {
  const { radioCategoly, setRadioCategoly } = useContext(RadioContext);
  const { URGENT, MORNING, AFTERNOON } = props;

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
