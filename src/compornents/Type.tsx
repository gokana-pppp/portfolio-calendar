import React from "react";

export type Event = {
  title: string;
  start: string;
  id: number;
  status: "作業中" | "完了";
  extendedProps: {
    deadline: string;
  };
};

export type Props = {
  textRef?: React.MutableRefObject<HTMLInputElement>;
  onClick?: () => void;
};

export type Todo = {
  id: number;
  title: string;
  categoly: string;
  status: "作業中" | "完了";
  request: boolean;
};
