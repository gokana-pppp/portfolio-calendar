import React, { Dispatch, SetStateAction } from "react";
import { Todo } from "../../../pages/Home";

type Props = {
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  targetTodoId: string;
  isFinished: boolean;
};
/**　チェックボックスのコンポーネント */

export const Checkbox = (props: Props) => {
  const { setTodos, targetTodoId, isFinished } = props;

  const onChangeCheckBox = () => {
    setTodos((todos) => {
      return todos.map((todo) => {
        if (todo.id === targetTodoId) {
          return {
            ...todo,
            isFinished: !todo.isFinished,
          };
        }
        return todo;
      });
    });
  };

  return (
    <input type="checkbox" checked={isFinished} onChange={onChangeCheckBox} />
  );
};
