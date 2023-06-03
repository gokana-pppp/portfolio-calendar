import React, { ChangeEvent, useRef, Dispatch, SetStateAction } from "react";

import styles from "./todolist.module.scss";
import { Todo } from "../../pages/Home";

type Props = {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  radioCategoly: string;
};

export const TodoInput = (props: Props) => {
  const { text, setText, todos, setTodos, radioCategoly } = props;
  const date = new Date();
  const createdDate: number = date.getTime();
  const textRef = useRef<HTMLInputElement>(null!);

  const addTodo = (): void => {
    if (text === "") return;
    const newTodo: Todo = {
      id: createdDate,
      title: textRef.current.value,
      categoly: radioCategoly,
      isFinished: false,
      requested: false,
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
