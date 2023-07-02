import { createClient } from "@supabase/supabase-js";
import { Event, Todo } from "pages/Home";

export const supabaseUrl = process.env.REACT_APP_SUPABASE_URL!;
export const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY!;

export const supabaseCalendar = createClient<Event[]>(
  supabaseUrl,
  supabaseAnonKey
);
export const supabaseTodo = createClient<Todo[]>(supabaseUrl, supabaseAnonKey);
