import React, { useContext, useState } from "react";
import styles from "./todolist.module.scss";
import { TodosContext } from "./TodoList";
import { Todo, URGENT, MORNING, AFTERNOON } from "../../pages/Home";
import { Checkbox } from "./Checkbox";

type Props = {
  categoly: string;
};

export const List = (props: Props) => {
  const { categoly } = props;
  const { todos, setTodos } = useContext(TodosContext);
  //チェックボックスにチェックが有るか無いかのstate管理
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
            <table className={styles.tb}>
              <tbody>
                <tr>
                  <td className={styles.ta_td}>
                    <Checkbox
                      isChecked={isChecked}
                      setIsChecked={setIsChecked}
                      setTodos={setTodos}
                      targetTodoId={todo.id}
                    />
                    {/* チェック有だと、todo.titleに取り消し線 */}
                    <label className={isChecked ? styles.isChecked_label : ""}>
                      {todo.title}
                    </label>
                  </td>
                  <th>
                    <button className={styles.ta_button}>削除</button>
                    {/* チェック有だと、依頼ボタンは非活性になる */}
                    <button className={styles.ta_button} disabled={isChecked}>
                      依頼
                    </button>
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
