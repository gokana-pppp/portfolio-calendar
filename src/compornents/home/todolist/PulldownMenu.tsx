import React, { ChangeEvent, useState, Dispatch, SetStateAction } from "react";
import { URGENT, Todo, categolies } from "./../../../pages/Home";
import styles from "./todolist.module.scss";

type Props = {
  categoly: string;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  targetTodoId: number;
  isFinished: boolean;
};

export const PulldownMenu = (props: Props) => {
  const { categoly, setTodos, targetTodoId, isFinished } = props;
  //プルダウンメニューのcategolyが選ばれる
  const [selectedCategoly, setSelectedCategoly] = useState<string>(URGENT);

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategoly(e.target.value);
  };

  const ChangeCategoly = () => {
    setTodos((todos) => {
      return todos.map((todo) => {
        if (todo.id === targetTodoId) {
          return {
            ...todo,
            categoly: (todo.categoly = selectedCategoly),
          };
        }
        return todo;
      });
    });
  };

  return (
    <>
      <select
        key={categoly}
        disabled={isFinished}
        value={selectedCategoly}
        onChange={handleSelect}
        className={styles.select_menu}
      >
        {categolies.map((categoly) => {
          return <option key={categoly}>{categoly}</option>;
        })}
      </select>
      <button
        className={styles.move_button}
        onClick={() => ChangeCategoly()}
        disabled={isFinished}
      >
        へ移動
      </button>
    </>
  );
};
