import React, { useContext } from "react";

import { useNavigate } from "react-router";
// import { UserIdContext } from "../App";
import { useSetRecoilState } from "recoil";
import { userIdState } from "App";

export const guestUserId = process.env.REACT_APP_SUPABASE_GUEST_USER_ID!;

export const LogIn = () => {
  const navigate = useNavigate();
  const setUserId = useSetRecoilState(userIdState);

  const handleLogInButton = () => {
    navigate("/home");
    setUserId(guestUserId);
  };

  return (
    <div>
      <h1>ログインページ</h1>

      <button onClick={() => handleLogInButton()}>ゲストログイン</button>
    </div>
  );
};
