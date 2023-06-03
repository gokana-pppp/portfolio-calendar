import React, { Dispatch, SetStateAction } from "react";
import { Todo } from "pages/Home";

type Props = {
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  targetTodoId: number;
  boolean: boolean;
};

export const Checkbox = (props: Props) => {
  const { setTodos, targetTodoId, boolean } = props;

  const onChangeCheckBox = () => {
    setTodos((todos) => {
      return todos.map((todo) => {
        if (todo.id === targetTodoId) {
          return {
            ...todo,
            isFinished: todo.isFinished ? false : true,
          };
        }
        return todo;
      });
    });
  };

  return (
    <input type="checkbox" checked={boolean} onChange={onChangeCheckBox} />
  );
};
