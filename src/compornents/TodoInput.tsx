import React, { ChangeEvent, useContext, useRef } from "react";
import { TextContext, TodosContext, RadioContext } from "./TodoList";
import styles from "./CssModules.module.scss";
import { Todo } from "./Type";

export const TodoInput = () => {
  const { text, setText } = useContext(TextContext);
  const { todos, setTodos } = useContext(TodosContext);
  const { radioCategoly } = useContext(RadioContext);

  const date = new Date();
  const createdDate: number = date.getTime();
  const textRef = useRef<HTMLInputElement>(null!);
  const WORK_ON_PROGRESS = "作業中";

  const addTodo = (): void => {
    if (text === "") return;
    const newTodo: Todo = {
      id: createdDate,
      title: textRef.current.value,
      categoly: radioCategoly,
      status: WORK_ON_PROGRESS,
      request: false,
    };
    setTodos([...todos, newTodo]);
    setText("");
  };

  const onChangeText = (e: ChangeEvent<HTMLInputElement>): void => {
    setText(e.target.value);
  };

  return (
    <div className={styles.todo_input}>
      <input
        className={styles.i_input}
        type="text"
        value={text}
        ref={textRef}
        onChange={onChangeText}
      />
      <button className={styles.i_button} onClick={() => addTodo()}>
        追加
      </button>
    </div>
  );
};
