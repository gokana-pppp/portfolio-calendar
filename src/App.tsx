import React, {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "pages/Home";
import { LogIn } from "pages/LogIn";

export const UserIdContext = createContext(
  {} as {
    userId: string;
    setUserId: Dispatch<SetStateAction<string>>;
  }
);

export const App: React.FC = () => {
  const [userId, setUserId] = useState<string>("");
  return (
    <>
      <UserIdContext.Provider value={{ userId, setUserId }}>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <>
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<Home />} />
          </>
        </Routes>
      </UserIdContext.Provider>
    </>
  );
};
