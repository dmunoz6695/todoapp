import { ITodoState, ITodo } from "@/interfaces/interfaces"

type TodoAction = 
| { type: "add", payload: ITodo }
| { type: "remove", payload: string }
| { type: "check", payload: string }
| { type: "clearAllTodosCompleted" }

const todoReducer = (state: ITodoState, action: TodoAction) => {
  switch (action.type) {
    case "add":
      return{
        ...state,
        todos: [...state.todos, action.payload]
      }
    case "remove":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload)
      }
    case "check":
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload) {
            return {
              ...todo,
              completed: !todo.completed
            }
          }
          return todo
        })
      }
    case "clearAllTodosCompleted":
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.completed)
      }
    default:
      return state
  }
}

export default todoReducer