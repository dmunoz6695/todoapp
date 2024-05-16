import { ITodoState } from "@/interfaces/interfaces";
import { createContext } from "react";

export type TodoContextProps = {
  state: ITodoState
  addNewTodo: (title: string) => void
  deleteTodo: (id: string) => void
  checkTodo: (id: string) => void
  clearAllTodosCompleted: () => void  
}


const TodoContext = createContext<TodoContextProps>({} as TodoContextProps)

export default TodoContext