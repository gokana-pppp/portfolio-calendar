import React, { ChangeEvent, useState, Dispatch, SetStateAction } from "react";
import { URGENT, Todo, categories } from "./../../../pages/Home";
import styles from "./select.module.scss";
import { changeCategoryInSupabase } from "lib/supabaseFunc";

type Props = {
  category: string;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  targetTodoId: string;
  isFinished: boolean;
};

/**
 * カテゴリーを選択する
 * プルダウンメニューのコンポーネント
 * */

export const PulldownMenu = (props: Props) => {
  const { category, setTodos, targetTodoId, isFinished } = props;
  //プルダウンメニューのcategolyが選ばれる
  const [selectedCategory, setSelectedCategory] = useState<string>(URGENT);

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const changeCategoly = () => {
    setTodos((todos) => {
      return todos.map((todo) => {
        if (todo.id === targetTodoId) {
          return {
            ...todo,
            category: (todo.category = selectedCategory),
          };
        }
        return todo;
      });
    });
    changeCategoryInSupabase(targetTodoId, selectedCategory);
  };

  return (
    <div className={styles.select_area}>
      <label>
        <select
          key={category}
          disabled={isFinished}
          value={selectedCategory}
          onChange={handleSelect}
        >
          {categories.map((category) => {
            return <option key={category}>{category}</option>;
          })}
        </select>
      </label>
      <button
        disabled={isFinished}
        className={`${isFinished ? styles.finished_button : ""} `}
        onClick={() => changeCategoly()}
      >
        へ移動
      </button>
    </div>
  );
};
