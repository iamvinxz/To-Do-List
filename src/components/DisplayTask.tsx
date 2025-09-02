import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from "@fortawesome/free-regular-svg-icons"
import type { Task } from '../types'
import { useEffect } from 'react'

const DisplayTask = ({tasks, setUp}: {tasks: Task[], setUp: React.Dispatch<React.SetStateAction<Task[]>>}) => {

  useEffect(() => {
    fetch('http://localhost:8000/tasks')
      .then(response => {return response.json()})
      .then(data => setUp(data))  
  },[tasks]);

  console.log(tasks)

  const handleDelete = (id: string) => {            //json-server will automatically create an id
    fetch('http://localhost:8000/tasks/' + id, {
      method: "DELETE"
    })
      // const newList = tasks.filter(task => task.id !== id)
      // setUp(newList)
  }

  return (
    <section>
        <section>
          {!tasks.length && <section className='text-center'>
            <img src='./done-image.png' alt='Image' className='h-70 inline-block mt-5 opacity-70'/>
            <p className='text-gray-400 text-xl'>No to-do yet</p>
            </section>}
            <ul>
                {tasks.map((tasks, data) => 
                    <section className='flex justify-between mr-15' key={tasks.id}>
                        <li className="flex items-center text-lg my-6 px-7"><FontAwesomeIcon icon={faCircle} className="text-2xl text-gray-400 pr-4"/>{tasks.task}</li>
                        <button className='text-gray-500 cursor-pointer text-[13px]' onClick={() => handleDelete(tasks.id)}><FontAwesomeIcon icon={faXmark} /></button>
                    </section>
                )}
            </ul>
        </section>
    </section>
  )
}
export default DisplayTask
