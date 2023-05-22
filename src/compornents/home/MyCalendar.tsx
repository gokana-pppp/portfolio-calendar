import React, { FC, useRef } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

type Props = {};

export const MyCalendar: FC<Props> = (info: any) => {
  const calendarRef = useRef<FullCalendar>(null);

  return (
    <>
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
    </>
  );
};
