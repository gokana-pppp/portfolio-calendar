import React, { Dispatch, SetStateAction } from "react";
import styles from "./calendar.module.scss";
import { SelectedEvent } from "pages/Home";

type Props = {
  displayPopUp: boolean;
  setDisplayPopUp: Dispatch<SetStateAction<boolean>>;
  selectedEvent: SelectedEvent[];
  setSelectedEvent: Dispatch<SetStateAction<SelectedEvent[]>>;
};

/**
 * カレンダー上のイベントをクリックすると
 * 表示されるポップアップウィンドウのコンポーネント
 */
export const PopUpWindow = (props: Props) => {
  const { displayPopUp, setDisplayPopUp, selectedEvent, setSelectedEvent } =
    props;

  /**
   * ポップアップウィンドウを閉じた時
   * selectedEventを空にする
   */
  const ClosePopUpWindow = () => {
    setDisplayPopUp(false);
    setSelectedEvent([]);
  };

  /**
   * event.startだとDate型で表示する時に触りにくいので
   * event.extendedProps.startTimeに入ってる日付(string型)を使用する
   * ◯年◯月◯日　◯時◯分　という形で表示させるための関数
   * 終日イベントだとstartTimeが12字なので、そこで時間設定イベントと分岐させてる
   */
  const DisplayCustomDate = (startTime: string) => {
    const TimeArr = startTime.split("-");
    const eventYear = TimeArr[0];
    const eventMonth = Number(TimeArr[1]);
    const eventDate = Number(TimeArr[2].slice(0, 2));
    const eventHour = Number(TimeArr[2].slice(2, 4));
    const eventMinute = TimeArr[2].slice(4, 7);

    return (
      <>
        <p>日付：{`${eventYear}年${eventMonth}月${eventDate}日`}</p>
        {startTime.length > 12 ? (
          <p>時間：{`${eventHour}:${eventMinute}`}</p>
        ) : (
          <></>
        )}
      </>
    );
  };

  return (
    <>
      {displayPopUp ? (
        <div className={styles.overlay}>
          <div className={styles.modal_container}>
            <div className={styles.modal_content}>
              {selectedEvent.map((event) => {
                return (
                  <div key={event.id}>
                    {DisplayCustomDate(event.startTime)}
                    <p>タイトル：{event.title}</p>
                    <button>削除</button>
                  </div>
                );
              })}
            </div>
            <button
              className={styles.modal_close_button}
              onClick={() => ClosePopUpWindow()}
            >
              close
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
