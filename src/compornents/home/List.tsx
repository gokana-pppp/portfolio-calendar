import React, { useState, Dispatch, SetStateAction } from "react";
import styles from "./todolist.module.scss";
import {
  Todo,
  URGENT,
  MORNING,
  AFTERNOON,
  REQUESTED,
  WANT_TO_REQUEST,
} from "../../pages/Home";
import { Checkbox } from "./Checkbox";
import { RequestBtn } from "./RequestBtn";

type Props = {
  categoly: string;
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
};

export const List = (props: Props) => {
  const { categoly, todos, setTodos } = props;
  //プルダウンメニューをdisabledにするのに使用する
  const [disabled, setDisabled] = useState<boolean>(false);
  //チェックボックスが押されたかどうかを管理
  const [isChecked, setIsChecked] = useState(false);

  const categolies = [URGENT, MORNING, AFTERNOON];

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
            {/* 依頼中だと背景と文字の色変更 */}
            <table
              className={`${
                todo.requested === true ? styles.isRequested_todo : ""
              } `}
            >
              <tbody>
                <tr>
                  <td className={styles.ta_td}>
                    <Checkbox
                      isChecked={isChecked}
                      setIsChecked={setIsChecked}
                      setTodos={setTodos}
                      targetTodoId={todo.id}
                      disabled={disabled}
                      setDisabled={setDisabled}
                    />
                    <label className={isChecked ? styles.isChecked_label : ""}>
                      {todo.title}
                    </label>
                  </td>
                  <th>
                    <button className={styles.ta_button}>削除</button>
                    <RequestBtn
                      setTodos={setTodos}
                      targetTodoId={todo.id}
                      disabled={disabled}
                      setDisabled={setDisabled}
                      BtnMessage={`${
                        todo.requested === true ? REQUESTED : WANT_TO_REQUEST
                      }`}
                      isChecked={isChecked}
                    />
                    <select key={categoly} disabled={disabled}>
                      {categolies.map((categoly) => {
                        return <option key={categoly}>{categoly}</option>;
                      })}
                    </select>
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
