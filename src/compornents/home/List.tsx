import React, { useContext, useState } from "react";
import styles from "./todolist.module.scss";
import { TodosContext } from "./TodoList";
import { Todo, URGENT, MORNING, AFTERNOON } from "../../pages/Home";
import { Checkbox } from "./Checkbox";
import { RequestBtn } from "./RequestBtn";

type Props = {
  categoly: string;
};

export const List = (props: Props) => {
  const { categoly } = props;
  const { todos, setTodos } = useContext(TodosContext);
  const [isChecked, setIsChecked] = useState(false);
  //依頼ボタンのstate管理
  const [isRequested, setIsRequested] = useState<boolean>(false);

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
            <table className={isRequested ? styles.isRequested_todo : ""}>
              <tbody>
                <tr>
                  <td className={styles.ta_td}>
                    <Checkbox
                      isChecked={isChecked}
                      setIsChecked={setIsChecked}
                      setTodos={setTodos}
                      targetTodoId={todo.id}
                    />
                    <label className={isChecked ? styles.isChecked_label : ""}>
                      {todo.title}
                    </label>
                  </td>
                  <th>
                    <button className={styles.ta_button}>削除</button>
                    <RequestBtn
                      isChecked={isChecked}
                      isRequested={isRequested}
                      setIsRequested={setIsRequested}
                      setTodos={setTodos}
                      targetTodoId={todo.id}
                    />
                    <select key={categoly} disabled={isChecked}>
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
