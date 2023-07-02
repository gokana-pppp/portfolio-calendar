import React, { Dispatch, SetStateAction } from "react";
import styles from "./todolist.module.scss";
import { Todo } from "pages/Home";
import { changeRequestedStatusInSupabase } from "lib/supabaseFunc";

type Props = {
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  targetTodoId: string;
  BtnMessage: string;
  isFinished: boolean;
  requested: boolean;
};

/**　依頼ボタンのコンポーネント　*/

export const RequestBtn = (props: Props) => {
  const { setTodos, targetTodoId, BtnMessage, isFinished, requested } = props;

  const handleRequestBtn = () => {
    setTodos((todos) => {
      return todos.map((todo) => {
        if (todo.id === targetTodoId) {
          return {
            ...todo,
            requested: !todo.requested,
          };
        }
        return todo;
      });
    });
    changeRequestedStatusInSupabase(targetTodoId, !requested);
  };

  return (
    <button
      className={styles.ta_button}
      disabled={isFinished}
      onClick={() => handleRequestBtn()}
    >
      {BtnMessage}
    </button>
  );
};
