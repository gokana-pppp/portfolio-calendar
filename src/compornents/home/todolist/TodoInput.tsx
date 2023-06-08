import React, { ChangeEvent, useRef, Dispatch, SetStateAction } from "react";

import styles from "./todolist.module.scss";
import { Todo } from "../../../pages/Home";
import { v4 as uuidv4 } from "uuid";

type Props = {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  radioCategory: string;
};

/**
 * 新規todo.titleを入力するinputと
 * 追加ボタンのコンポーネント
 */

export const TodoInput = (props: Props) => {
  const { text, setText, todos, setTodos, radioCategory } = props;
  const uuid = uuidv4();
  const textRef = useRef<HTMLInputElement>(null!);

  const addTodo = (): void => {
    if (text === "") return;
    const newTodo: Todo = {
      id: uuid,
      title: textRef.current.value,
      category: radioCategory,
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
