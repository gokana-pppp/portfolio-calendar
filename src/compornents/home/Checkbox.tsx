import React, { useContext } from "react";
import { CheckedContext } from "./List";
import { TodosContext } from "./TodoList";
import { WORK_ON_PROGRESS, DONE } from "pages/Home";

export const Checkbox = () => {
  const { isChecked, setIsChecked } = useContext(CheckedContext);
  const { setTodos } = useContext(TodosContext);

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
