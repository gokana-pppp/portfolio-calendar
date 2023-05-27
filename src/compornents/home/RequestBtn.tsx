import React, { Dispatch, SetStateAction } from "react";
import styles from "./todolist.module.scss";
import { Todo } from "pages/Home";

type Props = {
  isChecked: boolean;
  isRequested: boolean;
  setIsRequested: Dispatch<SetStateAction<boolean>>;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  targetTodoId: number;
};

export const RequestBtn = (props: Props) => {
  const { isChecked, isRequested, setIsRequested, setTodos, targetTodoId } =
    props;
  const handleRequestBtn = () => {
    setIsRequested(!isRequested);
    if (!isRequested) {
      setTodos((todos) => {
        const updatedTodos: Todo[] = todos.map((todo) => {
          if (todo.id === targetTodoId) {
            return {
              ...todo,
              request: isRequested ? false : true,
            };
          }
          return todo;
        });
        return updatedTodos;
      });
    }
  };

  return (
    <button
      className={styles.ta_button}
      disabled={isChecked}
      onClick={() => handleRequestBtn()}
    >
      {isRequested ? "依頼中" : "依頼する"}
    </button>
  );
};
