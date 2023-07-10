import React, { Dispatch, SetStateAction } from "react";
import { Todo } from "../../../pages/Home";
import { changeIsFinishedStatusInSupabase } from "lib/supabaseFunc";
import styles from "./checkbox.module.scss";

type Props = {
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  targetTodoId: string;
  isFinished: boolean;
  title: string;
};
/**　チェックボックスのコンポーネント */

export const Checkbox = (props: Props) => {
  const { setTodos, targetTodoId, isFinished, title } = props;

  const onChangeCheckBox = () => {
    setTodos((todos) => {
      return todos.map((todo) => {
        if (todo.id === targetTodoId) {
          return {
            ...todo,
            isFinished: !todo.isFinished,
          };
        }
        return todo;
      });
    });
    changeIsFinishedStatusInSupabase(targetTodoId, !isFinished);
  };

  return (
    <div className={styles.title}>
      <label className={`${isFinished ? styles.finished_label : ""}`}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={isFinished}
          onChange={onChangeCheckBox}
        />

        {title}
      </label>
    </div>
  );
};
