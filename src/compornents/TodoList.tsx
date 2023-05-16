import React, { useState, ChangeEvent, useEffect, useRef } from "react";
import styles from "./CssModules.module.scss";
import { Todo } from "./Type";

export const TodoList = () => {
  const [val, setVal] = useState<string>("午前");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState<string>("");

  const categolies = ["急ぎ", "午前", "午後"];
  const day = new Date();
  const createdDate: number = day.getTime();
  const textRef = useRef<HTMLInputElement>(null!);
  const MORNING = "午前";
  const AFTERNOON = "午後";
  const URGENT = "急ぎ";
  const WORK_ON_PROGRESS = "作業中";
  const DONE = "完了";

  const addTodo = (): void => {
    if (text === "") return;
    const newTodo: Todo = {
      id: createdDate,
      title: textRef.current.value,
      categoly: val,
      status: WORK_ON_PROGRESS,
      request: false,
    };
    setTodos([...todos, newTodo]);
    setText("");
  };

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  const onChangeRadioBtn = (e: ChangeEvent<HTMLInputElement>): void => {
    setVal(e.target.value);
  };

  const onChangeText = (e: ChangeEvent<HTMLInputElement>): void => {
    setText(e.target.value);
  };

  const getTodos = (categoly: string): Todo[] => {
    if (categoly === MORNING) {
      const MORNING_TODOS = todos.filter((todo) => todo.categoly === MORNING);
      return MORNING_TODOS;
    } else if (categoly === AFTERNOON) {
      const AFTERNOON_TODOS = todos.filter(
        (todo) => todo.categoly === AFTERNOON
      );
      return AFTERNOON_TODOS;
    } else {
      const URGENT_TODOS = todos.filter((todo) => todo.categoly === URGENT);
      return URGENT_TODOS;
    }
  };

  return (
    <div className={styles.todo_list}>
      <div className={styles.title}>
        <p>Todoリスト</p>
      </div>
      <div className={styles.todo_input}>
        <input
          className={styles.i_input}
          type="text"
          value={text}
          ref={textRef}
          onChange={onChangeText}
        />
        <button className={styles.i_button} onClick={() => addTodo()}>
          追加
        </button>
      </div>

      {categolies.map((categoly, index) => {
        return (
          <div className={styles.radio_button_area} key={index}>
            <input
              type="radio"
              value={categoly}
              onChange={onChangeRadioBtn}
              checked={categoly === val}
              className={styles.r_input}
            />
            <label className={styles.r_label} htmlFor={categoly}>
              {categoly}
            </label>
          </div>
        );
      })}

      <div className={styles.list_container}>
        <div className={styles.subtitle}>
          <div>
            <p>【急ぎ】</p>
          </div>
        </div>
        {getTodos(URGENT).map((todo) => {
          return (
            <div className={styles.table} key={todo.id}>
              <table>
                <tbody>
                  <tr>
                    <td className={styles.tb}>・{todo.title}</td>
                    <th>
                      <input type="checkbox" className={styles.ta_check} />
                      <button className={styles.ta_button}>削除</button>
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })}
      </div>

      <div className={styles.list_container}>
        <div className={styles.subtitle}>
          <div>
            <p>【午前】</p>
          </div>
        </div>
        {getTodos(MORNING).map((todo) => {
          return (
            <div className={styles.table} key={todo.id}>
              <table>
                <tbody>
                  <tr>
                    <td>・{todo.title}</td>
                    <th>
                      <input type="checkbox" className={styles.ta_check} />
                      <button className={styles.ta_button}>削除</button>
                      <button className={styles.ta_button}>午後へ</button>
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })}
      </div>

      <div className={styles.list_container}>
        <div className={styles.subtitle}>
          <div>
            <p>【午後】</p>
          </div>
        </div>
        {getTodos(AFTERNOON).map((todo) => {
          return (
            <div className={styles.table} key={todo.id}>
              <table>
                <tbody>
                  <tr>
                    <td>・{todo.title}</td>
                    <th>
                      <input type="checkbox" className={styles.ta_check} />
                      <button className={styles.ta_button}>削除</button>
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </div>
  );
};
