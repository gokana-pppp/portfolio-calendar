/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import styled from "@emotion/styled";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import { AddEventArea } from "./AddEventArea";
import { DisplayedEvent, SelectedEvent, Event } from "pages/Home";
import styles from "./calendar.module.scss";
import { PopUpWindow } from "./popup/PopUpWindow";
import { getAllEvents } from "lib/supabaseFunc";
import { userIdState } from "App";
import { useRecoilState } from "recoil";
import { guestUserId } from "../../../pages/LogIn";

export const MyCalendar = () => {
  const [date, setDate] = useState<string>("");
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedHour, setSelectedHour] = useState<string>("");
  const [selectedMinute, setSelectedMinute] = useState<string>("00");
  // カレンダー上のイベントをクリックしたらselectedEventに設定する
  const [selectedEvent, setSelectedEvent] = useState<SelectedEvent[]>([]);
  // ポップアップウィンドウを表示するかしないかの管理
  const [displayPopUp, setDisplayPopUp] = useState<boolean>(false);

  const StyleWrapper = styled.div`
    .fc .fc-toolbar.fc-header-toolbar {
      margin-bottom: 3px;
      font-size: 12px;
    }
    .fc-toolbar-title {
      font-weight: lighter;
    }
    .fc-day .fc-day-mon .fc-day-future .fc-daygrid-day {
      width: 150px;
    }
    .fc .fc-daygrid-day-frame.fc-scrollgrid-sync-inner {
      height: 95px;
      font-size: 12px;
    }
    .fc .fc-daygrid-day-number {
      font-size: 12px;
    }
    .fc .fc-col-header-cell-cushion {
      font-size: 12px;
      font-weight: lighter;
    }
    .fc .fc-daygrid-day.fc-day-today {
      background: none;
    }
    .fc .fc-button-primary {
      font-size: 0.75rem;
      background-color: #ffffff00;
      color: #acaba9;
      border: none;
      outline: none;
    }
    .fc .fc-button-primary:not(:disabled):active,
    .fc .fc-button-primary:not(:disabled).fc-button-active {
      background-color: #ffffff00;
      color: #acaba9;
      box-shadow: none;
    }
  `;

  const navigate = useNavigate();
  const [userId, setUserId] = useRecoilState(userIdState);

  setUserId(guestUserId);

  const getEvents = async () => {
    const events = await getAllEvents(userId);
    if (events === null) return;
    setEvents(events);
  };

  useEffect(() => {
    getEvents();
  }, []);

  /** クリックしたカレンダーの日付をdateにセットする */
  const handleDateClick = (info: any) => {
    setDate(info.dateStr);
  };

  /** カレンダーに表示するためにeventを変形する */
  const displayedEvents: DisplayedEvent[] = events.map((event) => ({
    title: event.title,
    start: event.start,
    end: event.end,
    color: event.color,
    extendedProps: {
      id: event.id,
      startTime: event.startTime,
      endTime: event.endTime,
      allDay: event.allDay,
      userId: event.userId,
    },
  }));

  const openPopUpWindow = () => {
    setDisplayPopUp(true);
  };

  const handleEventClick = (event: SelectedEvent[]) => {
    setSelectedEvent(event);
  };

  const handleLogOutButton = () => {
    navigate("/");
    setUserId("");
  };

  return (
    <>
      <StyleWrapper>
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
            businessHours={true} // 土日をグレーで表示
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
                  userId: e.event.extendedProps.userId,
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
      </StyleWrapper>
      <div className={styles.lower_wrapper}>
        <div className={styles.logOutButton}>
          <button className={styles.b} onClick={() => handleLogOutButton()}>
            ログアウト
          </button>
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
      </div>
    </>
  );
};
