import React from "react";
import { MyCalendar } from "compornents/home/calendar/MyCalendar";
import { TodoList } from "compornents/home/todolist/TodoList";
import styles from "./home.module.scss";

// Eventの型変更
export type Event = {
  title: string;
  start: string;
  id: string;
  startTime: string;
};

// カレンダーに表示する時にEventを変形する
export type DisplayedEvent = {
  title: string;
  start: string;
  extendedProps: {
    id: string;
    startTime: string;
  };
};

export type Todo = {
  id: string;
  title: string;
  category: string;
  isFinished: boolean;
  requested: boolean;
};

export const URGENT = "急ぎ";
export const MORNING = "午前";
export const AFTERNOON = "午後";

export const REQUESTED = "依頼中";
export const WANT_TO_REQUEST = "依頼する";

export const categories = [URGENT, MORNING, AFTERNOON];

export const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.calendar}>
        <MyCalendar />
      </div>
      <div className={styles.todo_list}>
        <TodoList />
      </div>
    </div>
  );
};
