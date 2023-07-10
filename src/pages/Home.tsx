import React from "react";
import { MyCalendar } from "compornents/home/calendar/MyCalendar";
import { TodoList } from "compornents/home/todolist/TodoList";
import styles from "./home.module.scss";

// Eventの型変更
export type Event = {
  title: string;
  start: string;
  end: string;
  id: string;
  startTime: string;
  endTime: string;
  allDay: boolean;
  userId: string;
  color: string;
};

// カレンダーに表示する時にEventを変形する
export type DisplayedEvent = {
  title: string;
  start: string;
  end: string;
  extendedProps: {
    id: string;
    startTime: string;
    endTime: string;
    allDay: boolean;
    userId: string;
  };
};

// カレンダー上のクリックされたEventをポップアップウィンドウで表示しやすいように変形する
export type SelectedEvent = {
  title: string;
  id: string;
  startTime: string;
  start: Date | null;
  endTime: string;
  end: Date | null;
  allDay: boolean;
  userId: string;
};

export type Todo = {
  id: string;
  title: string;
  category: string;
  isFinished: boolean;
  requested: boolean;
  userId: string;
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
