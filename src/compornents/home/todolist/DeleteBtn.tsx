import React, { Dispatch, SetStateAction } from "react";
import { Todo } from "pages/Home";
import styles from "./todolist.module.scss";

type Props = {
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  targetTodoId: number;
};

/**
 * 削除ボタンを押すと、
 * todoが削除されます。*/

export const DeleteBtn = (props: Props) => {
  const { setTodos, targetTodoId } = props;
  const deleteTodo = () => {
    setTodos((todos) => todos.filter((todo) => todo.id !== targetTodoId));
  };
  return (
    <button className={styles.ta_button} onClick={() => deleteTodo()}>
      削除
    </button>
  );
};
