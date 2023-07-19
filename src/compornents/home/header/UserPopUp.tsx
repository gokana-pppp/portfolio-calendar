import React, { Dispatch, SetStateAction } from "react";
import styles from "./header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
type Props = {
  userPopUp: boolean;
  setUserPopUp: Dispatch<SetStateAction<boolean>>;
};

export const UserPopUp = (props: Props) => {
  const { userPopUp, setUserPopUp } = props;
  return (
    <>
      {userPopUp ? (
        <div className={styles.overlay}>
          <div className={styles.user_popup}>
            <div className={styles.user_icon}>
              <h2>
                <FontAwesomeIcon icon={faUser} />
              </h2>
            </div>

            <p>ユーザー名：ゲスト</p>
            <p>＊ゲストユーザーでログイン中＊</p>
            <button
              className={styles.popup_button}
              onClick={() => setUserPopUp(false)}
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
