import React, { Dispatch, SetStateAction } from "react";
import styles from "./todo.module.scss";
import { Todo, REQUESTED, WANT_TO_REQUEST } from "../../../pages/Home";
import { Checkbox } from "./Checkbox";
import { RequestBtn } from "./RequestBtn";
import { PulldownMenu } from "./PulldownMenu";
import { DeleteBtn } from "./DeleteBtn";

type Props = {
  category: string;
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  className: string;
};

export const List = (props: Props) => {
  const { category, todos, setTodos, className } = props;

  const getTodos = (category: string): Todo[] => {
    return todos.filter((todo) => todo.category === category);
  };

  return (
    <div className={className}>
      <div className={styles.subtitle}>
        <p className={styles.p}>{category}</p>
      </div>
      {getTodos(category).map((todo) => {
        return (
          <div
            key={todo.id}
            className={`${todo.requested ? styles.requested : styles.card} `}
          >
            <div className={styles.first_row}>
              <div>
                <Checkbox
                  setTodos={setTodos}
                  targetTodoId={todo.id}
                  isFinished={todo.isFinished}
                  title={todo.title}
                />
              </div>

              <div>
                <DeleteBtn setTodos={setTodos} targetTodoId={todo.id} />
              </div>
              <div>
                <RequestBtn
                  setTodos={setTodos}
                  targetTodoId={todo.id}
                  BtnMessage={`${todo.requested ? REQUESTED : WANT_TO_REQUEST}`}
                  isFinished={todo.isFinished}
                  requested={todo.requested}
                />
              </div>
            </div>

            <div className={styles.second_row}>
              <PulldownMenu
                category={category}
                setTodos={setTodos}
                targetTodoId={todo.id}
                isFinished={todo.isFinished}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
