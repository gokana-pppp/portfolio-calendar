import React, { FC, useRef } from "react";
import { Event } from "./Type";
import { TodoList } from "./TodoList";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import styles from "./CssModules.module.scss";

type Props = {};

export const MyCalendar: FC<Props> = (info: any) => {
  const calendarRef = useRef<FullCalendar>(null);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.calendar}>
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
            initialView="dayGridMonth"
            selectable={true}
            locale="ja"
            headerToolbar={{
              start: "prev",
              center: "title",
              end: "next",
            }}
          />
        </div>

        <div className={styles.todo_list}>
          <TodoList />
        </div>
      </div>

      <div className={styles.input_text_area}>
        {/* <InputTextArea />が入る予定 */}
      </div>
    </>
  );
};
