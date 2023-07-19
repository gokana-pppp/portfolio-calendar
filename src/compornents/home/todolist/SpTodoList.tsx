import React, { Dispatch, SetStateAction } from "react";
import { TodoList } from "./TodoList";
import styles from "./spTodoList.module.scss";

type Props = {
  openSpTodo: boolean;
  setOpenSpTodo: Dispatch<SetStateAction<boolean>>;
};

export const SpTodoList = (props: Props) => {
  const { openSpTodo, setOpenSpTodo } = props;
  return (
    <>
      {openSpTodo ? (
        <div className={styles.overlay}>
          <div className={styles.modal_container}>
            <button onClick={() => setOpenSpTodo(false)}>close</button>
            <TodoList />
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
