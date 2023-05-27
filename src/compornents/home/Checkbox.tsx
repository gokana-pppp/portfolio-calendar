import React, { Dispatch, SetStateAction } from "react";
import { WORK_ON_PROGRESS, DONE, Todo } from "pages/Home";

type Props = {
  isChecked: boolean;
  setIsChecked: Dispatch<SetStateAction<boolean>>;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  targetTodoId: number;
};

export const Checkbox = (props: Props) => {
  const { isChecked, setIsChecked, setTodos, targetTodoId } = props;
  const onChangeCheckBox = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      setTodos((todos) => {
        const updatedTodos: Todo[] = todos.map((todo) => {
          if (todo.id === targetTodoId) {
            return {
              ...todo,
              status: isChecked ? WORK_ON_PROGRESS : DONE,
            };
          }
          return todo;
        });
        return updatedTodos;
      });
    }
  };

  return (
    <input type="checkbox" checked={isChecked} onChange={onChangeCheckBox} />
  );
};
