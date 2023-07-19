import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "pages/Home";
import { LogIn } from "pages/LogIn";
import { RecoilRoot, atom } from "recoil";
import { HowToUse } from "pages/HowToUse";

export const userIdState = atom({
  key: "userIdState",
  default: "",
});

export const App: React.FC = () => {
  return (
    <>
      <RecoilRoot>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/howto" element={<HowToUse />} />
            <Route path="*" element={<Home />} />
          </>
        </Routes>
      </RecoilRoot>
    </>
  );
};
