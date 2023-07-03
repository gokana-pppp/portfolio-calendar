import { supabaseCalendar, supabaseTodo } from "./supabase";
import { Event, Todo } from "pages/Home";

//Calendar
/** supabaseからevents[]取ってくる */
export const getAllEvents = async (id: string): Promise<Event[] | null> => {
  const events = await supabaseCalendar
    .from("calendar")
    .select("*")
    .match({ userId: id });
  return events.data;
};
/** アプリ上で追加した新規イベントをsupabaseにも追加する */
export const addEventToSupabase = async (newEvent: Event) => {
  await supabaseCalendar.from("calendar").insert(newEvent);
};
/** アプリ上で削除したイベントをsupabaseでも削除する */
export const deleteEventFromSupabase = async (targetEventId: string) => {
  await supabaseCalendar.from("calendar").delete().eq("id", targetEventId);
};
/** アプリ上で変更したイベントの日付・時間をsupabaseで更新する */
export const changeDateInSupabase = async (
  targetEventId: string,
  start: string,
  end: string,
  startTime: string,
  endTime: string
) => {
  await supabaseCalendar
    .from("calendar")
    .update({ start: start, end: end, startTime: startTime, endTime: endTime })
    .eq("id", targetEventId);
};
/** アプリ上で変更したイベントのタイトルをsupabaseで更新する */
export const changeTitleInSupabase = async (
  targetEventId: string,
  title: string
) => {
  await supabaseCalendar
    .from("calendar")
    .update({ title: title })
    .eq("id", targetEventId);
};

// Todo
/** supabaseからtodos[]取ってくる */
export const getAllTodos = async (id: string): Promise<Todo[] | null> => {
  const todos = await supabaseTodo
    .from("todo")
    .select("*")
    .match({ userId: id });
  return todos.data;
};
/** アプリ上で追加した新規Todoをsupabaseにも追加する */
export const addTodoToSupabase = async (newTodo: Todo) => {
  await supabaseTodo.from("todo").insert(newTodo);
};
/** アプリ上で削除したTodoをsupabaseでも削除する */
export const deleteTodoFromSupabase = async (targetTodoId: string) => {
  await supabaseTodo.from("todo").delete().eq("id", targetTodoId);
};
/** アプリ上で変更したisFinishedをsupabaseで更新する */
export const changeIsFinishedStatusInSupabase = async (
  targetTodoId: string,
  isFinished: boolean
) => {
  await supabaseTodo
    .from("todo")
    .update({ isFinished: isFinished })
    .eq("id", targetTodoId);
};
/** アプリ上で変更したrequestedをsupabaseで更新する */
export const changeRequestedStatusInSupabase = async (
  targetTodoId: string,
  requested: boolean
) => {
  await supabaseTodo
    .from("todo")
    .update({ requested: requested })
    .eq("id", targetTodoId);
};
/** アプリ上で変更したcategoryをsupabaseで更新する */
export const changeCategoryInSupabase = async (
  targetTodoId: string,
  category: string
) => {
  await supabaseTodo
    .from("todo")
    .update({ category: category })
    .eq("id", targetTodoId);
};
