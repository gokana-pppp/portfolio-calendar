import React from "react";

import { useNavigate } from "react-router";
import { useSetRecoilState } from "recoil";
import { userIdState } from "App";
import styles from "./login.module.scss";

export const guestUserId = process.env.REACT_APP_SUPABASE_GUEST_USER_ID!;

export const LogIn = () => {
  const navigate = useNavigate();
  const setUserId = useSetRecoilState(userIdState);

  const handleLogInButton = () => {
    navigate("/home");
    setUserId(guestUserId);
  };

  return (
    <div className={styles.login_page}>
      <div className={styles.login}>
        <h1>ログインページ</h1>
        <button onClick={() => handleLogInButton()}>ゲストログイン</button>
      </div>
    </div>
  );
};
