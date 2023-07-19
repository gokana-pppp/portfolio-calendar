import React, { useState, Dispatch, SetStateAction } from "react";
import styles from "./header.module.scss";
import { useNavigate } from "react-router";
import { userIdState } from "App";
import { useRecoilState } from "recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPlus, faList } from "@fortawesome/free-solid-svg-icons";
import { UserPopUp } from "./UserPopUp";
import { useMedia } from "use-media";

type Props = {
  setOpenSpAdd: Dispatch<SetStateAction<boolean>>;
  setOpenSpTodo: Dispatch<SetStateAction<boolean>>;
};

export const Header = (props: Props) => {
  const { setOpenSpAdd, setOpenSpTodo } = props;
  const [userPopUp, setUserPopUp] = useState(false);
  const navigate = useNavigate();
  const [userId, setUserId] = useRecoilState(userIdState);
  const handleLogOutButton = () => {
    navigate("/");
    setUserId("");
  };
  const handleHowToButton = () => {
    navigate("/howto");
  };

  const SmartPhoneSize = useMedia({ maxWidth: "759px" });
  const PcAndTabletSize = useMedia({ minWidth: "760px" });

  return (
    <>
      {PcAndTabletSize && (
        <>
          <div className={styles.header}>
            <div className={styles.header_left}>
              <h1 className={styles.header_h}>
                Portfolio Calendar & Todo List
              </h1>
            </div>

            <div className={styles.header_right}>
              <button
                className={styles.header_button}
                onClick={() => handleLogOutButton()}
              >
                ログアウト
              </button>
              <button
                className={styles.header_button}
                onClick={() => setUserPopUp(true)}
              >
                <FontAwesomeIcon icon={faUser} />
              </button>
              <button
                className={styles.header_button}
                onClick={() => handleHowToButton()}
              >
                使い方
              </button>
            </div>
          </div>
          <div>
            <UserPopUp userPopUp={userPopUp} setUserPopUp={setUserPopUp} />
          </div>
        </>
      )}
      {SmartPhoneSize && (
        <>
          <div className={styles.header}>
            <div className={styles.header_upper}>
              <h1>Portfolio Calendar & Todo List</h1>
            </div>

            <div className={styles.header_lower}>
              <div className={styles.lower_left}>
                <button
                  className={styles.header_button}
                  onClick={() => handleLogOutButton()}
                >
                  ログアウト
                </button>
                <button
                  className={styles.header_button}
                  onClick={() => setUserPopUp(true)}
                >
                  <FontAwesomeIcon icon={faUser} />
                </button>
                <button
                  className={styles.header_button}
                  onClick={() => handleHowToButton()}
                >
                  使い方
                </button>
              </div>

              <div className={styles.lower_right}>
                <button onClick={() => setOpenSpAdd(true)}>
                  <FontAwesomeIcon icon={faPlus} />
                </button>
                <button onClick={() => setOpenSpTodo(true)}>
                  <FontAwesomeIcon icon={faList} />
                  <span> </span>TodoList
                </button>
              </div>
            </div>
          </div>

          <div>
            <UserPopUp userPopUp={userPopUp} setUserPopUp={setUserPopUp} />
          </div>
        </>
      )}
    </>
  );
};
