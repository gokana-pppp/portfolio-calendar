import React, { useContext } from "react";
import styles from "./todolist.module.scss";
import { Todo } from "../../pages/Home";
import { TodosContext } from "./TodoList";
import { URGENT, MORNING, AFTERNOON } from "../../pages/Home";

type Props = {
  categoly: string;
};

export const List = (props: Props) => {
  const { categoly } = props;
  const { todos } = useContext(TodosContext);

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
            <table>
              <tbody>
                <tr>
                  <td className={styles.tb}>・{todo.title}</td>
                  <th>
                    <input type="checkbox" className={styles.ta_check} />
                    <button className={styles.ta_button}>削除</button>
                    <button className={styles.ta_button}>依頼</button>
                    <select key={categoly}>
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
