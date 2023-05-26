import React, { Dispatch, SetStateAction } from "react";
import { WORK_ON_PROGRESS, DONE, Todo } from "pages/Home";

type Props = {
  isChecked: boolean;
  setIsChecked: Dispatch<SetStateAction<boolean>>;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
};

export const Checkbox = (props: Props) => {
  const { isChecked, setIsChecked, setTodos } = props;

  // チェック有りだとstatusがDONEに変わり、チェック無しにするとstatusがWORK_ON_PROGRESSに変わる
  const onChangeCheckBox = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      setTodos((todos) => {
        const updatedTodos = todos.map((todo) =>
          todo.id === todo.id ? { ...todo, status: DONE } : todo
        );
        return updatedTodos;
      });
    } else {
      setTodos((todos) => {
        const updatedTodos = todos.map((todo) =>
          todo.id === todo.id ? { ...todo, status: WORK_ON_PROGRESS } : todo
        );
        return updatedTodos;
      });
    }
  };

  return (
    <input type="checkbox" checked={isChecked} onChange={onChangeCheckBox} />
  );
};
