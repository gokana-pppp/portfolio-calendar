import React, { useContext, useEffect } from "react";

import { useNavigate } from "react-router";
import { UserIdContext } from "../App";

export const LogIn = () => {
  const navigate = useNavigate();
  const { setUserId, userId } = useContext(UserIdContext);
  const guestUserId = process.env.REACT_APP_SUPABASE_GUEST_USER_ID!;

  const handleLogInButton = () => {
    navigate("/home");
    setUserId(guestUserId);
  };

  useEffect(() => console.log(userId), [userId]);

  return (
    <div>
      <h1>ログインページ</h1>

      <button onClick={() => handleLogInButton()}>ゲストログイン</button>
    </div>
  );
};
