import React, { Dispatch, SetStateAction } from "react";
import { Todo } from "pages/Home";
import styles from "./todo.module.scss";
import { deleteTodoFromSupabase } from "lib/supabaseFunc";

type Props = {
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  targetTodoId: string;
};

/**　削除ボタンのコンポーネント　*/

export const DeleteBtn = (props: Props) => {
  const { setTodos, targetTodoId } = props;
  const deleteTodo = () => {
    setTodos((todos) => todos.filter((todo) => todo.id !== targetTodoId));
    deleteTodoFromSupabase(targetTodoId);
  };
  return (
    <button className={styles.delete_button} onClick={() => deleteTodo()}>
      削除
    </button>
  );
};
