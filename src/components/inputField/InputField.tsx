import React from 'react'

import './inputField.css'

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  addHandler: () => void;
}

const InputField = ({todo, setTodo, addHandler}:Props) => {
  return (
    <div className='inputfield__wrapper'>
        <input type="text" 
          className='inputfield__input'
          placeholder='Enter a task'
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button className="inputfield__btn"
          onClick={addHandler}
        >Add</button>
    </div>
  )
}

export default InputField