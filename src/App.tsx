import { Button } from "@/components/ui/button"
import { Input } from "./components/ui/input"
import {  useContext, useState } from "react"
import TodoContext from "./context/todo/TodoContext"
import { FaRegTrashAlt } from "react-icons/fa"
import { Checkbox } from "@/components/ui/checkbox"
import Dialog from "./components/global/Dialog"
export default function App() {


  const {state, addNewTodo, deleteTodo, checkTodo, clearAllTodosCompleted} = useContext(TodoContext)



  const [inputValue, setInputValue] = useState<string>('')


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputValue === '') return
    addNewTodo(inputValue)
    setInputValue('')
  }
  
  

  return (
    <main className="h-screen w-screen  bg-zinc-300 ">
      <header className=" w-full h-[10%] bg-slate-900 text-white flex justify-center items-center">
      <h1 className="text-4xl" >TODO APP</h1>
      </header>
      {/* <div className=" w-full h-[90%] flex items-center justify-center sm:bg-red-300 md:bg-green-400 lg:bg-purple-400 xl:bg-cyan-400"> */}
      <div className=" w-full h-[90%] flex items-center justify-center ">
        <div className=" w-[80%] sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[30%] h-[90%] md:70% flex flex-col shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] rounded-lg">
          <section className="w-full h-[15%] px-2 ">
            <form onSubmit={handleSubmit} className="wfull h-full flex items-center  gap-2">
            <Input  className=" border-slate-800 border-[1px] min-h-[40px]" type="text" placeholder="What needs to be done?" onChange={(e) => setInputValue(e.target.value)} value={inputValue}/>
            <Button variant="default" type="submit" className="min-h-[40px]">Add</Button>
            </form>
          </section>
          <section className="w-full h-[70%] flex flex-col gap-2 px-2  overflow-y-auto">
            {
              state.todos.map((todo) => {
                return (
                  <div key={todo.id} className="w-full px-2  gap-2 border rounded-md border-slate-800 borderroun  min-h-[50px] flex justify-between items-center ">
                    <div className="flex items-center justify-center gap-2">
                    <Checkbox
                    checked={todo.completed}
                    onCheckedChange={() => checkTodo(todo.id)}
                    />

                    <p className={todo.completed ? "line-through" : ""}>{todo.title}</p>
                    </div>
                    <Dialog title="Delete task" eventContinue={() => deleteTodo(todo.id)}  description="Are you sure you want to delete this task">
                    <Button variant="outline" size="icon" className="bg-slate-900 w-[40px] h-[80%]  hover:bg-slate-900">
                      <FaRegTrashAlt color="white"/>
                    </Button>
                    </Dialog>
                  </div>
                )
              })
            }
          </section>
          <section className="w-full h-[15%] flex justify-end items-center pr-2 ">
            <Dialog title="Clear task completed" description="Are you sure you want to clear all tasks completed" eventContinue={clearAllTodosCompleted}>
            <Button variant="default" className="min-w-[100px] min-h-[40px] ">Clear task completed</Button>
            </Dialog>
          </section>
        </div>
      </div>
    </main>
  )
}
