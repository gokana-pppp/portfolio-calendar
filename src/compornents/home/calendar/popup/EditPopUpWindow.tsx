import React, { Dispatch, SetStateAction } from "react";
import { SelectedEvent, Event } from "pages/Home";
import { EditDate } from "./EditDate";
import { EditDateAndTime } from "./EditDateAndTime";
import { EditTitle } from "./EditTitle";
import styles from "./popup.module.scss";

type Props = {
  isEditable: boolean;
  selectedEvent: SelectedEvent[];
  onClick: () => void;
  setEvents: Dispatch<SetStateAction<Event[]>>;
  setSelectedEvent: Dispatch<SetStateAction<SelectedEvent[]>>;
};

/**
 * ポップアップウィンドウの編集ボタンを押すと
 * 表示される画面のコンポーネント
 */
export const EditPopUpWindow = (props: Props) => {
  const { isEditable, selectedEvent, onClick, setEvents, setSelectedEvent } =
    props;
  return (
    <>
      {selectedEvent.map((event) => {
        return (
          <div>
            {isEditable ? (
              <>
                {event.startTime.length < 13 ? (
                  <EditDate
                    start={event.startTime.slice(0, 10)}
                    end={event.endTime.slice(0, 10)}
                  />
                ) : (
                  <EditDateAndTime
                    start={event.startTime.slice(0, 10)}
                    targetEventId={event.id}
                    setEvents={setEvents}
                    setSelectedEvent={setSelectedEvent}
                  />
                )}

                <EditTitle
                  title={event.title}
                  targetEventId={event.id}
                  setEvents={setEvents}
                  setSelectedEvent={setSelectedEvent}
                />
                <div>
                  <button
                    className={styles.modal_close_button}
                    onClick={onClick}
                  >
                    close
                  </button>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        );
      })}
    </>
  );
};
