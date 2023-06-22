import React, {
  useState,
  ChangeEvent,
  useRef,
  Dispatch,
  SetStateAction,
} from "react";
import { Event, SelectedEvent } from "pages/Home";
import styles from "./popup.module.scss";

type Props = {
  title: string;
  targetEventId: string;
  setEvents: Dispatch<SetStateAction<Event[]>>;
  setSelectedEvent: Dispatch<SetStateAction<SelectedEvent[]>>;
};

/**　タイトルを編集するためのコンポーネント　*/
export const EditTitle = (props: Props) => {
  const { title, targetEventId, setEvents, setSelectedEvent } = props;
  const [editedText, setEditedText] = useState<string>(title);

  const editedTextRef = useRef<HTMLInputElement>(null!);
  const onChangeText = (e: ChangeEvent<HTMLInputElement>): void => {
    setEditedText(() => e.target.value);
  };

  /**　inputに入力されたeditedTextをevent.titleに代入する　*/
  const ChangeTitle = (targetEventId: string) => {
    setEvents((events) => {
      return events.map((event) => {
        if (event.id === targetEventId) {
          return {
            ...event,
            title: (event.title = editedText),
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
            title: (selectedEvent.title = editedText),
          };
        }
        return selectedEvent;
      });
    });
  };

  return (
    <div className={styles.edit_title}>
      <label>タイトル：</label>
      <input
        type="text"
        value={editedText}
        ref={editedTextRef}
        onChange={onChangeText}
      ></input>
      <button
        className={styles.title_select_button}
        onClick={() => ChangeTitle(targetEventId)}
      >
        決定
      </button>
    </div>
  );
};
