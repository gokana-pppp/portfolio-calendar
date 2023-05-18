import React, {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
import styles from "./CssModules.module.scss";
import { Todo } from "./Type";
import { RadioBtn } from "./RadioBtn";
import { TodoInput } from "./TodoInput";
import { List } from "./List";

export const RadioContext = createContext(
  {} as {
    radioCategoly: string;
    setRadioCategoly: Dispatch<SetStateAction<string>>;
  }
);

export const TodosContext = createContext(
  {} as {
    todos: Todo[];
    setTodos: Dispatch<SetStateAction<Todo[]>>;
  }
);

export const TextContext = createContext(
  {} as {
    text: string;
    setText: Dispatch<SetStateAction<string>>;
  }
);

export const TodoList = () => {
  const [radioCategoly, setRadioCategoly] = useState<string>("午前");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState<string>("");

  const URGENT = "急ぎ";
  const MORNING = "午前";
  const AFTERNOON = "午後";

  return (
    <div className={styles.todo_list}>
      <div className={styles.title}>
        <p>Todoリスト</p>
      </div>
      <RadioContext.Provider value={{ radioCategoly, setRadioCategoly }}>
        <TodosContext.Provider value={{ todos, setTodos }}>
          <TextContext.Provider value={{ text, setText }}>
            <TodoInput />
          </TextContext.Provider>
          <RadioBtn />
          <List categoly={URGENT} />
          <List categoly={MORNING} />
          <List categoly={AFTERNOON} />
        </TodosContext.Provider>
      </RadioContext.Provider>
    </div>
  );
};
