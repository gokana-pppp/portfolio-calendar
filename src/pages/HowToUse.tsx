import React from "react";
import { useNavigate } from "react-router";
import { userIdState } from "App";
import { useRecoilState } from "recoil";
import { guestUserId } from "./LogIn";
import { useMedia } from "use-media";

import styles from "./howtouse.module.scss";
import spcalendar1 from "./img/spcalendar_sample1.png";
import spcalendar2 from "./img/spcalendar_sample2.png";
import calendar1 from "./img/calendar_sample1.png";
import calendar2 from "./img/calendar_sample2.png";
import calendar3 from "./img/calendar_sample3.png";
import calendar4 from "./img/calendar_sample4.png";
import todo1 from "./img/todo_sample1.png";
import todo2 from "./img/todo_sample2.png";
import todo3 from "./img/todo_sample3.png";
import todo4 from "./img/todo_sample4.png";

export const HowToUse = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useRecoilState(userIdState);
  const handleBackButton = () => {
    navigate("/home");
    setUserId(guestUserId);
  };
  // const PcAndTabletSize = useMedia({ minWidth: "760px" });
  const SmartPhoneSize = useMedia({ maxWidth: "759px" });

  return (
    <>
      <div className={styles.title}>
        <h2>Portfolio Calendar & Todo List 使い方</h2>
        <button
          className={styles.back_button}
          onClick={() => handleBackButton()}
        >
          back
        </button>
      </div>

      <div>
        <h1>Calendar</h1>
        <div className={styles.containers}>
          {SmartPhoneSize ? (
            <div className={styles.container_4}>
              <div className={styles.image}>
                <img
                  src={spcalendar1}
                  alt="spcalendar1"
                  className={styles.img1}
                ></img>
              </div>
              <div className={styles.image}>
                <img
                  src={spcalendar2}
                  alt="spcalendar2"
                  className={styles.img1}
                ></img>
              </div>
              <div className={styles.text}>
                <p className={styles.subtitle}>新規作成</p>
                <p>1.カレンダー上の＋ボタンをクリック</p>
                <p>2.新規イベント作成のポップアップが表示される</p>
                <p>3.日付を選択</p>
                <p>4.終日 or 時間をプルダウンで選択</p>
                <p>5.イベント名を入力</p>
                <p>6.＋ボタンをクリック</p>
              </div>
            </div>
          ) : (
            <div className={styles.container}>
              <div className={styles.image}>
                <img
                  src={calendar1}
                  alt="calendar1"
                  className={styles.img1}
                ></img>
              </div>
              <div className={styles.text}>
                <p className={styles.subtitle}>新規作成</p>
                <p>1.カレンダー上の日付をクリック</p>
                <p>2.終日 or 時間をプルダウンで選択</p>
                <p>3.イベント名を入力</p>
                <p>4.＋ボタンをクリック</p>
              </div>
            </div>
          )}

          <div className={styles.container}>
            <div className={styles.image}>
              <img
                src={calendar2}
                alt="calendar2"
                className={styles.img2}
              ></img>
            </div>
            <div className={styles.text}>
              <p className={styles.subtitle}>イベント削除</p>
              <p>1.カレンダー上のイベントをクリック</p>
              <p>2.削除ボタンをクリック</p>
            </div>
          </div>
          <div className={styles.container_3}>
            <div className={styles.image}>
              <img
                src={calendar3}
                alt="calendar3"
                className={styles.img3}
              ></img>
            </div>
            <div className={styles.image}>
              <img
                src={calendar4}
                alt="calendar4"
                className={styles.img2}
              ></img>
            </div>
            <div className={styles.text}>
              <p className={styles.subtitle}>イベント編集</p>
              <p>1.カレンダー上のイベントをクリック</p>
              <p>2.ポップアップ上の編集ボタンをクリック</p>

              <p>
                3.(1)時間指定イベントの場合
                <br />
                ●日付・時間を選択し、決定ボタンをクリック
              </p>
              <p>
                3.(2)終日イベントの場合
                <br />
                ●開始日・終了日・時間を選択し、決定ボタン
                <br />
                をクリック
              </p>
              <p>4.イベント名を書き変えて、決定ボタンをクリック</p>
              <p>5.完了ボタンをクリック</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h1>Todo List</h1>
        <div className={styles.containers}>
          <div className={styles.container_todo}>
            <div className={styles.image}>
              <img src={todo1} alt="todo1" className={styles.img5}></img>
            </div>
            <div className={styles.text}>
              <p className={styles.subtitle}>新規作成</p>
              <p>1.急ぎ・午前・午後から１つ選ぶ</p>
              <p>2.Todoを入力する</p>
              <p>3.＋ボタンをクリック</p>
            </div>
          </div>
          <div className={styles.container_todo}>
            <div className={styles.image}>
              <img src={todo2} alt="todo2" className={styles.img6}></img>
            </div>
            <div className={styles.text}>
              <p className={styles.subtitle}>完了</p>
              <p>
                1.完了したTodoの左にあるチェックボックスを
                <br />
                クリック
              </p>
            </div>
          </div>
          <div className={styles.container_todo}>
            <div className={styles.image}>
              <img src={todo3} alt="todo3" className={styles.img6}></img>
            </div>
            <div className={styles.text}>
              <p className={styles.subtitle}>依頼</p>
              <p>1.依頼したTodoの依頼ボタンをクリック</p>
              <p>2.依頼中ボタンに変わる</p>
              <p>3.依頼中ボタンをクリックすると依頼が解除される</p>
            </div>
          </div>
          <div className={styles.container_todo}>
            <div className={styles.image}>
              <img src={todo4} alt="todo4" className={styles.img6}></img>
            </div>
            <div className={styles.text}>
              <p className={styles.subtitle}>カテゴリー変更</p>
              <p>
                1.移動先をプルダウンの 急ぎ・午前・午後 から
                <br />
                １つ選ぶ
              </p>
              <p>2.へ移動ボタンをクリック</p>
              <p>3.1で選んだカテゴリーに移動される</p>
            </div>
          </div>
        </div>
      </div>

      <button onClick={() => handleBackButton()}>back</button>
    </>
  );
};
