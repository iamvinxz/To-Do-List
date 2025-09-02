import { useState, type ChangeEvent } from "react"
import DisplayTask from "./DisplayTask"
import { toast } from "react-toastify"
import type { Task } from "../types"

const TodoListContainer = () => {

    const [task, setTask] = useState<string>("")                    //input
    const [taskList, setTaskList] = useState<Task[]>([])            //stores todo list
    const [isFinished, setIsFinished] = useState<boolean>(false)
    const [autoIncrement, setAutoIncrement] = useState<number>(1)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTask(e.target.value)
    }

    const handleAddTask = () => {
        if(task.trim() === ""){
           toast("Please input first", {autoClose: 2000, type: "warning", position: "top-center"})
           return 
        }

        const newTask: Task = {
            id: autoIncrement,
            task: task,
            status: isFinished
        }

        fetch("http://localhost:8000/tasks", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newTask)
        })

        setTaskList(prev => [...prev, newTask])
        setAutoIncrement(prev => prev + 1)
        setTask("")
    }

  return (
    <main className="w-full max-w-2xl bg-white mt-24 mb-5 mx-auto pt-10 pb-17 px-8 rounded-lg">
        <section>
            <section>
                <h1 className="text-[#002765] mb-5 font-bold text-2xl">To-Do List</h1>
            </section>
            <section className="flex justify-between bg-[#edeef0] pl-5 rounded-4xl">
                <input type="text" placeholder="Add your task" className="flex-1 outline-none p-[10px]" value={task} onChange={handleChange}></input>
                <button type="submit" className="py-[16px] px-[50px] bg-[#ff5945] text-white text-lg cursor-pointer rounded-4xl" onClick={handleAddTask}>Add</button>
            </section>
            <section>
                <DisplayTask tasks={taskList} setUp={setTaskList}/>
            </section>
        </section>
    </main>
  )
}
export default TodoListContainer
