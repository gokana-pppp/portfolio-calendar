import React, { Dispatch, SetStateAction } from "react";
import styles from "./todolist.module.scss";
import { Todo, REQUESTED, WANT_TO_REQUEST } from "../../../pages/Home";
import { Checkbox } from "./Checkbox";
import { RequestBtn } from "./RequestBtn";
import { PulldownMenu } from "./PulldownMenu";

type Props = {
  categoly: string;
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
};

export const List = (props: Props) => {
  const { categoly, todos, setTodos } = props;

  const getTodos = (categoly: string): Todo[] => {
    return todos.filter((todo) => todo.categoly === categoly);
  };

  return (
    <div className={styles.list_container}>
      <div className={styles.subtitle}>
        <div>
          <p>【{categoly}】</p>
        </div>
      </div>
      {getTodos(categoly).map((todo) => {
        return (
          <div className={styles.table} key={todo.id}>
            <table
              className={`${todo.requested ? styles.isRequested_todo : ""} `}
            >
              <tbody>
                <tr>
                  <td className={styles.ta_td}>
                    <Checkbox
                      setTodos={setTodos}
                      targetTodoId={todo.id}
                      isFinished={todo.isFinished}
                    />
                    <label
                      className={`${
                        todo.isFinished ? styles.isChecked_label : ""
                      }`}
                    >
                      {todo.title}
                    </label>
                  </td>
                  <th>
                    <button className={styles.ta_button}>削除</button>
                    <RequestBtn
                      setTodos={setTodos}
                      targetTodoId={todo.id}
                      BtnMessage={`${
                        todo.requested ? REQUESTED : WANT_TO_REQUEST
                      }`}
                      isFinished={todo.isFinished}
                    />
                    <PulldownMenu
                      categoly={categoly}
                      setTodos={setTodos}
                      targetTodoId={todo.id}
                      isFinished={todo.isFinished}
                    />
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};
