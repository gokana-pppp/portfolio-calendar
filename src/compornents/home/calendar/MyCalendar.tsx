import React, { useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import { AddEventArea } from "./AddEventArea";
import { Event } from "pages/Home";
import styles from "./calendar.module.scss";
import { timeZones } from "./TimeSelection";

export const MyCalendar = () => {
  const [date, setDate] = useState<string>("");
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>(timeZones[0]);

  /** クリックしたカレンダーの日付をdateにセットする */
  const handleDateClick = (info: any) => {
    setDate(info.dateStr);
  };

  /** カレンダーに表示するためにeventを変形する */
  const displayedEvents = events.map((event) => ({
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
          events={displayedEvents}
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
