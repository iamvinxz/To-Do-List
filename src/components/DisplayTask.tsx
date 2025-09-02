import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from "@fortawesome/free-regular-svg-icons"
import type { Task } from '../types'


const DisplayTask = ({tasks, setUp}: {tasks: Task[], setUp: React.Dispatch<React.SetStateAction<Task[]>>}) => {

  const handleDelete = (id: number) => {
      const newList = tasks.filter(task => task.id !== id)
      setUp(newList)
  }

  return (
    <section>
        <section>
          {!tasks.length && <section className='text-center'>
            <img src='./done-image.png' alt='Image' className='h-70 inline-block mt-5 opacity-70'/>
            <p className='text-gray-400 text-xl'>No to-do yet</p>
            </section>}
            <ul>
                {tasks.map((tasks) => 
                    <section className='flex justify-between mr-15' key={tasks.id}>
                        <li className="flex items-center text-lg my-6 px-7"><FontAwesomeIcon icon={faCircle} className="text-2xl text-gray-400 pr-4"/>{tasks.task}</li>
                        <button className='text-red-500 cursor-pointer' onClick={() =>handleDelete(tasks.id)}>Delete</button>
                    </section>
                )}
            </ul>
        </section>
    </section>
  )
}
export default DisplayTask
