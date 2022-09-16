import React from 'react'
import Task from './Task'
import { Todo } from '../../model/model'

import './taskList.css'

interface Props {
  data: Todo[];
  setData: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TaskList: React.FC<Props> = ({ data, setData }: Props) => {
  const changeTaskHandler = (id: number, value: string) => {
    let tmp: Todo[] = data.map(item => item.id === id ? {
      ...item,
      todo: value
    } : { ...item })
    setData(tmp)
  }

  const deleteHandler = (id: number) => {
    setData(data.filter(item => item.id !== id))
  }

  const doneHandler = (id: number) => {
    let tmp: Todo[] = data.map(item => item.id === id ? {
      ...item, isDone: !item.isDone
    } : item)
    setData(tmp)
  }

  const drop = (e: React.DragEvent<HTMLDivElement>, done: boolean) => {
    e.preventDefault()
    let id: number = parseInt(e.dataTransfer.getData('currentId'), 10)
    let current: Todo = {
      ...data.filter(item => item.id === id)[0]
    }
    if (current.isDone !== done) {
      doneHandler(id)
    }
  }

  const drag = (e: React.DragEvent<HTMLDivElement>, id: number) => {
    e.dataTransfer.setData('currentId', id.toString())
  }

  return (
    <div className='task-list__container'>
      <div className="task-list__container_active"
        onDragOver={(e: React.DragEvent<HTMLDivElement>) => e.preventDefault()}
        onDrop={(e: React.DragEvent<HTMLDivElement>) => drop(e, false)}
      >
        <p className="task-list__container--title">Active</p>
        {
          data.map(item => {
            if (!item.isDone) {
              return <Task
                key={item.id}
                todo={item.todo}
                isDone={item.isDone}
                changeTaskHandler={(value: string) => changeTaskHandler(item.id, value)}
                deleteHandler={() => deleteHandler(item.id)}
                doneHandler={() => doneHandler(item.id)}
                dragHandler={(e: React.DragEvent<HTMLDivElement>) => drag(e, item.id)}
              />
            } else {
              return null
            }
          })
        }
      </div>

      <div className="task-list__container_complated"
        onDragOver={(e: React.DragEvent<HTMLDivElement>) => e.preventDefault()}
        onDrop={(e: React.DragEvent<HTMLDivElement>) => drop(e, true)}
      >
        <p className="task-list__container--title">Completed</p>
        {
          data.map(item => {
            if (item.isDone) {
              return <Task
                key={item.id}
                todo={item.todo}
                isDone={item.isDone}
                changeTaskHandler={(value: string) => changeTaskHandler(item.id, value)}
                deleteHandler={() => deleteHandler(item.id)}
                doneHandler={() => doneHandler(item.id)}
                dragHandler={(e: React.DragEvent<HTMLDivElement>) => drag(e, item.id)}
              />
            } else {
              return null
            }
          })
        }
      </div>
    </div>
  )
}

export default TaskList