import React, { Dispatch, SetStateAction } from "react";
import { WORK_ON_PROGRESS, DONE, Todo } from "pages/Home";

type Props = {
  isChecked: boolean;
  setIsChecked: Dispatch<SetStateAction<boolean>>;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  targetTodoId: number;
  disabled: boolean;
  setDisabled: Dispatch<SetStateAction<boolean>>;
};

export const Checkbox = (props: Props) => {
  const {
    isChecked,
    setIsChecked,
    setTodos,
    targetTodoId,
    disabled,
    setDisabled,
  } = props;

  const onChangeCheckBox = () => {
    setIsChecked(!isChecked);
    setDisabled(!disabled);

    if (!isChecked) {
      setTodos((todos) => {
        return todos.map((todo) => {
          if (todo.id === targetTodoId) {
            return {
              ...todo,
              status: isChecked ? WORK_ON_PROGRESS : DONE,
            };
          }
          return todo;
        });
      });
    }
  };

  return (
    <input type="checkbox" checked={isChecked} onChange={onChangeCheckBox} />
  );
};
