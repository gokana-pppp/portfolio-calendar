import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./popup.module.scss";
import { SelectedEvent, Event } from "pages/Home";
import { EditPopUpWindow } from "./EditPopUpWindow";
import { deleteEventFromSupabase } from "lib/supabaseFunc";

type Props = {
  displayPopUp: boolean;
  setDisplayPopUp: Dispatch<SetStateAction<boolean>>;
  selectedEvent: SelectedEvent[];
  setSelectedEvent: Dispatch<SetStateAction<SelectedEvent[]>>;
  setEvents: Dispatch<SetStateAction<Event[]>>;
};

/**
 * カレンダー上のイベントをクリックすると
 * 表示されるポップアップウィンドウのコンポーネント
 */
export const PopUpWindow = (props: Props) => {
  const {
    displayPopUp,
    setDisplayPopUp,
    selectedEvent,
    setSelectedEvent,
    setEvents,
  } = props;

  // 編集できる画面に移動するためのステート管理
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const handleEditBtn = () => {
    setIsEditable(!isEditable);
  };

  /**
   * ポップアップウィンドウを閉じた時
   * selectedEventを空にする
   */
  const ClosePopUpWindow = () => {
    setDisplayPopUp(false);
    setSelectedEvent([]);
    //ポップアップ閉じた時もisEditableをfalseにする
    setIsEditable(false);
  };

  const deleteEvent = (targetEventId: string) => {
    setEvents((events) => events.filter((event) => event.id !== targetEventId));
    deleteEventFromSupabase(targetEventId);
    ClosePopUpWindow();
  };

  /**
   * event.startだとDate型で表示する時に触りにくいので
   * event.extendedProps.startTimeに入ってる日付(string型)を使用する
   * ◯年◯月◯日　◯時◯分　という形で表示させるための関数
   * 終日イベントだとstartTimeが12字なので、そこで時間設定イベントと分岐させてる
   */
  const DisplayCustomDate = (
    date: string,
    allday: boolean,
    message: string
  ) => {
    const TimeArr = date.split("-");
    const eventYear = TimeArr[0];
    const eventMonth = Number(TimeArr[1]);
    const eventDate = Number(TimeArr[2].slice(0, 2));
    const eventHour = Number(TimeArr[2].slice(2, 4));
    const eventMinute = TimeArr[2].slice(4, 7);

    return (
      <div className={styles.display_custom_date}>
        <p>
          {message}：{`${eventYear}年${eventMonth}月${eventDate}日`}
        </p>
        {!allday ? <p>時間：{`${eventHour}:${eventMinute}`}</p> : <></>}
      </div>
    );
  };

  return (
    <>
      {displayPopUp ? (
        <div className={styles.overlay}>
          <div className={styles.modal_container}>
            <div className={styles.modal_content}>
              <div className={styles.edit_button_area}>
                <button onClick={() => handleEditBtn()}>
                  {isEditable ? "完了" : "編集"}
                </button>
              </div>
              <EditPopUpWindow
                isEditable={isEditable}
                selectedEvent={selectedEvent}
                onClick={() => ClosePopUpWindow()}
                setEvents={setEvents}
                setSelectedEvent={setSelectedEvent}
              />
              {isEditable ? (
                <></>
              ) : (
                <>
                  {selectedEvent.map((event) => {
                    return (
                      <div key={event.id}>
                        {event.allDay ? (
                          <>
                            <div className={styles.modal_date}>
                              {DisplayCustomDate(
                                event.startTime,
                                event.allDay,
                                "開始日"
                              )}
                            </div>
                            <div className={styles.modal_date}>
                              {DisplayCustomDate(
                                event.endTime,
                                event.allDay,
                                "終了日"
                              )}
                            </div>
                          </>
                        ) : (
                          <div className={styles.modal_date}>
                            {DisplayCustomDate(
                              event.startTime,
                              event.allDay,
                              "日付"
                            )}
                          </div>
                        )}

                        <p>タイトル：{event.title}</p>
                        <button onClick={() => deleteEvent(event.id)}>
                          削除
                        </button>
                        <div>
                          <button
                            className={styles.modal_close_button}
                            onClick={() => ClosePopUpWindow()}
                          >
                            close
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
