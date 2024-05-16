import { useReducer } from "react"
import TodoContext from "./TodoContext"
import todoReducer from "./TodoReducer"
import { v4 as uuid } from 'uuid';
import {ITodoState } from "@/interfaces/interfaces"
import { useToast } from "@/components/ui/use-toast";


interface props {
  children: React.ReactNode
}

const initialState: ITodoState ={
  todos: [
    {
      id: uuid(),
      title: "Todo 1",
      completed: false
    },
    {
      id: uuid(),
      title: "Todo 2",
      completed: true
    }
  ],
}

const TodoProvider = ({children}: props) => {
  const { toast } = useToast()

  const [state, dispatch] = useReducer(todoReducer, initialState)

  const addNewTodo = (title: string) => { 
    dispatch({ type: "add", payload: { id: uuid(), title: title, completed: false } })
    toast({ title: 'Todo added', description: 'Your todo was added successfully', duration: 3000 })
   }

   const deleteTodo = (id: string) => { 
      dispatch({ type: "remove", payload: id })
      toast({ title: 'Todo deleted', description: 'Your todo was deleted successfully', duration: 3000 })
    }

    const checkTodo = (id: string) => { 
      dispatch({ type: "check", payload: id })
      toast({ title: 'Todo checked', description: 'Your todo was checked successfully', duration: 3000 })
     }

     const clearAllTodosCompleted = () => {
      dispatch({ type: "clearAllTodosCompleted" })
      toast({ title: 'Todos deleted', description: 'Your todos were deleted successfully', duration: 3000 })
     }


  const value = {
    state,
    addNewTodo,
    deleteTodo,
    checkTodo,
    clearAllTodosCompleted
  }

  

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  )
}

export default TodoProvider