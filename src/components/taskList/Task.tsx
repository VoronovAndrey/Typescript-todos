import React, { useState } from 'react'

import { AiFillEdit } from 'react-icons/ai'
import { MdDelete, MdDone } from 'react-icons/md'

import './taskList.css'

interface Props {
    todo: string;
    isDone: boolean;
    changeTaskHandler: (value: string) => void;
    deleteHandler: () => void;
    doneHandler: () => void;
    dragHandler: (e: React.DragEvent<HTMLDivElement>) => void;
}

const Task: React.FC<Props> = ({ todo, isDone, changeTaskHandler, deleteHandler, doneHandler, dragHandler }: Props) => {
    const [isEdit, setIsEdit] = useState<Boolean>(false)

    const onBlurHandler = (value: any) => {
        if (value.trim() !== ''){
            changeTaskHandler(value)
        }
        setIsEdit(false)
    }
    return (
        <div className='task__wrapper' draggable={true}
            onDragStart={dragHandler}
        >
            {isEdit ?
                <input type="text"
                    defaultValue={todo}
                    className='task__input'
                    autoFocus={true}
                    onBlur={(e:  React.FocusEvent<HTMLInputElement>) => onBlurHandler(e.target.value)}
                />
                :
                <p className={`task__text ${isDone ? 'task__text_done' : ''}`}>{todo}</p>
            }

            <div className="task__btn-group--wrapper">
                <span className='task__icon'
                    onClick={() => setIsEdit(!isEdit)}
                >
                    <AiFillEdit />
                </span>
                <span className='task__icon'
                    onClick={deleteHandler}
                >
                    <MdDelete />
                </span>
                <span className='task__icon'
                    onClick={doneHandler}
                >
                    <MdDone />
                </span>
            </div>
        </div>
    )
}

export default Task