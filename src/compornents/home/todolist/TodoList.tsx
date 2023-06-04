import React, { useState } from "react";
import styles from "./todolist.module.scss";
import { RadioBtn } from "./RadioBtn";
import { TodoInput } from "./TodoInput";
import { List } from "./List";
import { Todo, URGENT, MORNING, AFTERNOON } from "../../../pages/Home";

export const TodoList = () => {
  const [radioCategory, setRadioCategory] = useState<string>("午前");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState<string>("");

  return (
    <div className={styles.todo_list}>
      <div className={styles.title}>
        <p>Todoリスト</p>
      </div>
      <TodoInput
        text={text}
        setText={setText}
        todos={todos}
        setTodos={setTodos}
        radioCategory={radioCategory}
      />
      <div className={styles.radio_buttons_area}>
        <RadioBtn
          radioCategory={radioCategory}
          setRadioCategory={setRadioCategory}
        />
      </div>
      <List category={URGENT} todos={todos} setTodos={setTodos} />
      <List category={MORNING} todos={todos} setTodos={setTodos} />
      <List category={AFTERNOON} todos={todos} setTodos={setTodos} />
    </div>
  );
};
