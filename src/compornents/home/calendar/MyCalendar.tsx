import React, { useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import { AddEventArea } from "./AddEventArea";
import { Event } from "pages/Home";
import styles from "./calendar.module.scss";

export const MyCalendar = () => {
  const [date, setDate] = useState<string>("");
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>("10:00");

  /** クリックしたカレンダーの日付をdateにセットする */
  const handleDateClick = (info: any) => {
    setDate(info.dateStr);
  };

  /** カレンダーに表示するためにeventを変形する */
  const displayEvents = events.map((event) => ({
    title: event.title,
    start: event.start,
  }));

  return (
    <>
      <div>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          selectable={true}
          events={displayEvents}
          dateClick={handleDateClick}
          locale="ja"
          contentHeight="auto"
          eventDisplay="block"
          headerToolbar={{
            start: "prev",
            center: "title",
            end: "next",
          }}
        />
      </div>
      <div className={styles.input_text_area}>
        <AddEventArea
          date={date}
          events={events}
          setEvents={setEvents}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        />
      </div>
    </>
  );
};
