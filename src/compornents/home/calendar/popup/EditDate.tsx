import React, {
  useState,
  Dispatch,
  SetStateAction,
  ChangeEvent,
  useRef,
} from "react";
import styles from "./popup.module.scss";
import { Event, SelectedEvent } from "pages/Home";
import { changeDateInSupabase } from "lib/supabaseFunc";

type Props = {
  start: string;
  end: string;
  setEvents: Dispatch<SetStateAction<Event[]>>;
  setSelectedEvent: Dispatch<SetStateAction<SelectedEvent[]>>;
  targetEventId: string;
};

/**
 * 終日イベントの時に表示される
 * 開始日、終了日を変更するコンポーネント
 */

export const EditDate = (props: Props) => {
  const { start, end, setEvents, setSelectedEvent, targetEventId } = props;
  const [editedStartDate, setEditedStartDate] = useState<string>(start);
  const [editedEndDate, setEditedEndDate] = useState<string>(end);

  const editedStartDateRef = useRef<HTMLInputElement>(null!);
  const editedEndDateRef = useRef<HTMLInputElement>(null!);

  const handleStartDate = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedStartDate(e.target.value);
  };
  const handleEndDate = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedEndDate(e.target.value);
  };

  const newStartDate = new Date(editedStartDate);
  const newEndDate = new Date(editedEndDate);
  const stringToEndDate = Number(editedEndDate.split("-").join(""));
  //event.endがstring型の場合、１日後に設定しないと
  //カレンダー上で上手く表示できないので、変更してます
  const transformEndDate = String(stringToEndDate + 1);

  const changeDate = () => {
    setEvents((events) => {
      return events.map((event) => {
        if (event.id === targetEventId) {
          return {
            ...event,
            start: (event.start = editedStartDate),
            end: (event.end = transformEndDate),
            startTime: (event.startTime = editedStartDate),
            endTime: (event.endTime = editedEndDate),
          };
        }
        return event;
      });
    });
    setSelectedEvent((selectedEvent) => {
      return selectedEvent.map((selectedEvent) => {
        if (selectedEvent.id === targetEventId) {
          return {
            ...selectedEvent,
            start: (selectedEvent.start = newStartDate),
            end: (selectedEvent.end = newEndDate),
            startTime: (selectedEvent.startTime = editedStartDate),
            endTime: (selectedEvent.endTime = editedEndDate),
          };
        }
        return selectedEvent;
      });
    });
    changeDateInSupabase(
      targetEventId,
      editedStartDate,
      transformEndDate,
      editedStartDate,
      editedEndDate
    );
  };

  /**
   * 開始日が終了日より後にならないようにチェックする
   * (例)inputから取得したstring型の日付"2023-06-20"を
   * number型の20230620に変形して、開始日と終了日の大きさを比べる
   */
  const handleSelectButton = () => {
    const toNumberStartDate = Number(editedStartDate.split("-").join(""));
    const toNumberEndDate = Number(editedEndDate.split("-").join(""));

    if (toNumberStartDate > toNumberEndDate) {
      // 開始日が終了日より後になってたらエラー
      setEditedStartDate(start);
      setEditedEndDate(end);
      alert(
        "開始日は終了日より後に設定できません\n開始日と終了日を正しく設定し直してください"
      );
    } else {
      // 開始日と終了日が正しく設定されていたら、処理される
      changeDate();
    }
  };

  return (
    <div>
      <div>
        <div>
          <div className={styles.edit_date}>
            <p>開始日：</p>
            <input
              type="date"
              value={editedStartDate}
              className={styles.date_input}
              ref={editedStartDateRef}
              onChange={handleStartDate}
            ></input>
          </div>
          <div className={styles.edit_date}>
            <p>終了日：</p>
            <input
              type="date"
              value={editedEndDate}
              className={styles.date_input}
              ref={editedEndDateRef}
              onChange={handleEndDate}
            ></input>
            <button
              className={styles.date_select_button}
              onClick={() => handleSelectButton()}
            >
              決定
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
