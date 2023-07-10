import React, { useState, useEffect } from "react";
import styles from "./todo.module.scss";
import { RadioBtn } from "./RadioBtn";
import { TodoInput } from "./TodoInput";
import { List } from "./List";
import { URGENT, MORNING, AFTERNOON, Todo } from "../../../pages/Home";
import { getAllTodos } from "lib/supabaseFunc";
import { userIdState } from "App";
import { useRecoilValue } from "recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

export const TodoList = () => {
  const [radioCategory, setRadioCategory] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState<string>("");
  const userId = useRecoilValue(userIdState);

  const getTodos = async () => {
    const todos = await getAllTodos(userId);
    if (todos === null) return;
    setTodos(todos);
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className={styles.todo_list}>
      <div className={styles.title}>
        <h1>
          <FontAwesomeIcon icon={faList} /> Todoリスト
        </h1>
      </div>
      <div className={styles.add_space}>
        <RadioBtn
          radioCategory={radioCategory}
          setRadioCategory={setRadioCategory}
        />
        <TodoInput
          text={text}
          setText={setText}
          todos={todos}
          setTodos={setTodos}
          radioCategory={radioCategory}
        />
      </div>
      <List
        category={URGENT}
        todos={todos}
        setTodos={setTodos}
        className={styles.category_urgent}
      />
      <List
        category={MORNING}
        todos={todos}
        setTodos={setTodos}
        className={styles.category_morning}
      />
      <List
        category={AFTERNOON}
        todos={todos}
        setTodos={setTodos}
        className={styles.category_afternoon}
      />
    </div>
  );
};
