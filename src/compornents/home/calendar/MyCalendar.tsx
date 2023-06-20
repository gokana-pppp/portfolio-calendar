import React, { useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import { AddEventArea } from "./AddEventArea";
import { Event, DisplayedEvent, SelectedEvent } from "pages/Home";
import styles from "./calendar.module.scss";
import { PopUpWindow } from "./popup/PopUpWindow";

export const MyCalendar = () => {
  const [date, setDate] = useState<string>("");
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedHour, setSelectedHour] = useState<string>("");
  const [selectedMinute, setSelectedMinute] = useState<string>("00");
  // カレンダー上のイベントをクリックしたらselectedEventに設定する
  const [selectedEvent, setSelectedEvent] = useState<SelectedEvent[]>([]);
  // ポップアップウィンドウを表示するかしないかの管理
  const [displayPopUp, setDisplayPopUp] = useState<boolean>(false);

  /** クリックしたカレンダーの日付をdateにセットする */
  const handleDateClick = (info: any) => {
    setDate(info.dateStr);
  };

  /** カレンダーに表示するためにeventを変形する */
  const displayedEvents: DisplayedEvent[] = events.map((event) => ({
    title: event.title,
    start: event.start,
    end: event.end,
    extendedProps: {
      id: event.id,
      startTime: event.startTime,
      endTime: event.endTime,
      allDay: event.allDay,
    },
  }));

  const openPopUpWindow = () => {
    setDisplayPopUp(true);
  };

  const handleEventClick = (event: SelectedEvent[]) => {
    setSelectedEvent(event);
  };

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
          headerToolbar={{
            start: "prev",
            center: "title",
            end: "next",
          }}
          eventTimeFormat={{ hour: "numeric", minute: "2-digit" }}
          eventClick={(e) => {
            openPopUpWindow();
            handleEventClick([
              ...selectedEvent,
              {
                title: e.event.title,
                id: e.event.extendedProps.id,
                startTime: e.event.extendedProps.startTime,
                start: e.event.start,
                end: e.event.end,
                endTime: e.event.extendedProps.endTime,
                allDay: e.event.extendedProps.allDay,
              },
            ]);
          }}
        />
        <div>
          <PopUpWindow
            displayPopUp={displayPopUp}
            setDisplayPopUp={setDisplayPopUp}
            selectedEvent={selectedEvent}
            setSelectedEvent={setSelectedEvent}
            setEvents={setEvents}
          />
        </div>
      </div>
      <div className={styles.input_text_area}>
        <AddEventArea
          date={date}
          events={events}
          setEvents={setEvents}
          selectedHour={selectedHour}
          setSelectedHour={setSelectedHour}
          selectedMinute={selectedMinute}
          setSelectedMinute={setSelectedMinute}
        />
      </div>
    </>
  );
};
