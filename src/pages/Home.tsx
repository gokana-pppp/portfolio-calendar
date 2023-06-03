import React from "react";
import { MyCalendar } from "compornents/home/MyCalendar";
import { TodoList } from "compornents/home/TodoList";
import styles from "./home.module.scss";

export type Event = {
  title: string;
  start: string;
  id: number;
  status: "作業中" | "完了";
  extendedProps: {
    deadline: string;
  };
};

export type Todo = {
  id: number;
  title: string;
  categoly: string;
  isFinished: boolean;
  requested: boolean;
};

export const URGENT = "急ぎ";
export const MORNING = "午前";
export const AFTERNOON = "午後";

export const REQUESTED = "依頼中";
export const WANT_TO_REQUEST = "依頼する";

export const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.calendar}>
        <MyCalendar />
      </div>
      <div className={styles.todo_list}>
        <TodoList />
      </div>
      <div className={styles.input_text_area}>
        {/* <InputTextArea />が入る予定 */}
      </div>
    </div>
  );
};
