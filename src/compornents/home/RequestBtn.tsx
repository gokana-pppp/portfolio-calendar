import React, { Dispatch, SetStateAction } from "react";
import styles from "./todolist.module.scss";
import { Todo } from "pages/Home";

type Props = {
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  targetTodoId: number;
  disabled: boolean;
  setDisabled: Dispatch<SetStateAction<boolean>>;
  BtnMessage: string;
  isChecked: boolean;
};

export const RequestBtn = (props: Props) => {
  const {
    setTodos,
    targetTodoId,
    disabled,
    setDisabled,
    BtnMessage,
    isChecked,
  } = props;

  const handleRequestBtn = () => {
    setDisabled(!disabled);

    setTodos((todos) => {
      return todos.map((todo) => {
        if (todo.id === targetTodoId) {
          return {
            ...todo,
            requested: todo.requested ? false : true,
          };
        }
        return todo;
      });
    });
  };

  return (
    <button
      className={styles.ta_button}
      disabled={isChecked}
      onClick={() => handleRequestBtn()}
    >
      {BtnMessage}
    </button>
  );
};
