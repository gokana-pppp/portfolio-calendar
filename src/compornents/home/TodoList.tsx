import React, {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
import styles from "./todolist.module.scss";
import { Todo } from "../../pages/Home";
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

export const URGENT = "急ぎ";
export const MORNING = "午前";
export const AFTERNOON = "午後";

export const WORK_ON_PROGRESS = "作業中";
export const DONE = "完了";

export const TodoList = () => {
  const [radioCategoly, setRadioCategoly] = useState<string>("午前");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState<string>("");

  return (
    <div className={styles.todo_list}>
      <div className={styles.title}>
        <p>Todoリスト</p>
      </div>
      <RadioContext.Provider value={{ radioCategoly, setRadioCategoly }}>
        <TodosContext.Provider value={{ todos, setTodos }}>
          <TextContext.Provider value={{ text, setText }}>
            <TodoInput WORK_ON_PROGRESS={WORK_ON_PROGRESS} />
          </TextContext.Provider>
          <RadioBtn URGENT={URGENT} MORNING={MORNING} AFTERNOON={AFTERNOON} />
          <List categoly={URGENT} />
          <List categoly={MORNING} />
          <List categoly={AFTERNOON} />
        </TodosContext.Provider>
      </RadioContext.Provider>
    </div>
  );
};
