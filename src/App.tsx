import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "pages/Home";

export const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
};
