import React, { Dispatch, SetStateAction } from "react";
import styles from "./todo.module.scss";
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
    <div className={styles.request}>
      <button
        disabled={isFinished}
        className={`${
          isFinished ? styles.finished_button : styles.request_button
        } `}
        onClick={() => handleRequestBtn()}
      >
        {BtnMessage}
      </button>
    </div>
  );
};
