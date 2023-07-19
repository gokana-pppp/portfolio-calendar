import React, { useState } from "react";
import { MyCalendar } from "compornents/home/calendar/MyCalendar";
import { TodoList } from "compornents/home/todolist/TodoList";
import { Header } from "compornents/home/header/Header";
import styles from "./home.module.scss";

import { useMedia } from "use-media";
import { SpTodoList } from "compornents/home/todolist/SpTodoList";

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
  const [openSpAdd, setOpenSpAdd] = useState<boolean>(false);
  const [openSpTodo, setOpenSpTodo] = useState<boolean>(false);
  // const PcSize = useMedia({ minWidth: "1000px" });
  // const TabletSize = useMedia({ minWidth: "760px", maxWidth: "999px" });
  const SmartPhoneSize = useMedia({ maxWidth: "759px" });

  return (
    <>
      <header>
        <Header setOpenSpAdd={setOpenSpAdd} setOpenSpTodo={setOpenSpTodo} />
      </header>
      <div className={styles.container}>
        <div className={styles.calendar}>
          <MyCalendar openSpAdd={openSpAdd} setOpenSpAdd={setOpenSpAdd} />
        </div>
        {SmartPhoneSize ? (
          <SpTodoList openSpTodo={openSpTodo} setOpenSpTodo={setOpenSpTodo} />
        ) : (
          <div className={styles.todo_list}>
            <TodoList />
          </div>
        )}
      </div>
    </>
  );
};
