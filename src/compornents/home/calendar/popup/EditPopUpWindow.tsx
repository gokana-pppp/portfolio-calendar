import React from "react";
import { SelectedEvent } from "pages/Home";
import { EditDate } from "./EditDate";
import { EditDateAndTime } from "./EditDateAndTime";
import { EditTitle } from "./EditTitle";
import styles from "./popup.module.scss";

type Props = {
  isEditable: boolean;
  selectedEvent: SelectedEvent[];
  onClick: () => void;
};

export const EditPopUpWindow = (props: Props) => {
  const { isEditable, selectedEvent, onClick } = props;
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
                  <EditDateAndTime start={event.startTime.slice(0, 10)} />
                )}

                <EditTitle title={event.title} />
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
