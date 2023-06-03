import React, { Dispatch, SetStateAction } from "react";
import styles from "./todolist.module.scss";
import { Todo } from "pages/Home";

type Props = {
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  targetTodoId: number;
  BtnMessage: string;
  boolean: boolean;
};

export const RequestBtn = (props: Props) => {
  const { setTodos, targetTodoId, BtnMessage, boolean } = props;

  const handleRequestBtn = () => {
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
      disabled={boolean}
      onClick={() => handleRequestBtn()}
    >
      {BtnMessage}
    </button>
  );
};
