import React from 'react'
import Task from './Task'
import { Todo } from '../../model/model'

import './taskList.css'

interface Props {
  data: Todo[];
  setData: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TaskList: React.FC<Props> = ({data, setData}: Props) => {
  const changeTaskHandler = (id:number, value:string) => {
    let tmp:Todo[] = data.map(item => item.id === id ? {
      ...item,
      todo: value
    } : {...item})
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
  return (
    <div className='task-list__container'>
      {data.map(item => {
        return <Task 
          key={item.id}
          todo={item.todo}
          isDone={item.isDone}
          changeTaskHandler={(value: string) => changeTaskHandler(item.id, value)}
          deleteHandler={() => deleteHandler(item.id)}
          doneHandler={() => doneHandler(item.id)}
        />
      })}
    </div>
  )
}

export default TaskList