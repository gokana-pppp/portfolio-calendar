import React, { ChangeEvent, useRef, Dispatch, SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styles from "./todo.module.scss";
import { Todo } from "../../../pages/Home";
import { v4 as uuidv4 } from "uuid";
import { addTodoToSupabase } from "lib/supabaseFunc";
import { userIdState } from "App";
import { useRecoilValue } from "recoil";

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
  const userId = useRecoilValue(userIdState);

  const addTodo = (): void => {
    if (text === "") return;
    const newTodo: Todo = {
      id: uuid,
      title: textRef.current.value,
      category: radioCategory,
      isFinished: false,
      requested: false,
      userId: userId,
    };
    setTodos([...todos, newTodo]);
    addTodoToSupabase(newTodo);
    setText("");
  };

  const onChangeText = (e: ChangeEvent<HTMLInputElement>): void => {
    setText(e.target.value);
  };

  return (
    <div className={styles.add_text}>
      <input
        type="text"
        value={text}
        ref={textRef}
        onChange={onChangeText}
        placeholder=" カテゴリーを選んで新規作成"
      />
      <button onClick={() => addTodo()}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
};
