import React, { useState } from "react";
import styles from "./todolist.module.scss";
import { RadioBtn } from "./RadioBtn";
import { TodoInput } from "./TodoInput";
import { List } from "./List";
import { Todo, URGENT, MORNING, AFTERNOON } from "../../../pages/Home";

export const TodoList = () => {
  const [radioCategoly, setRadioCategoly] = useState<string>("午前");
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
        radioCategoly={radioCategoly}
      />
      <div className={styles.radio_buttons}>
        <RadioBtn
          radioCategoly={radioCategoly}
          setRadioCategoly={setRadioCategoly}
        />
      </div>

      <List categoly={URGENT} todos={todos} setTodos={setTodos} />
      <List categoly={MORNING} todos={todos} setTodos={setTodos} />
      <List categoly={AFTERNOON} todos={todos} setTodos={setTodos} />
    </div>
  );
};
