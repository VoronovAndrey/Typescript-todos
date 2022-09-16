import React, {useState} from 'react';
import './App.css';
import InputField from './components/inputField/InputField';
import TaskList from './components/taskList/TaskList';
import { Todo } from './model/model';

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>('')
  const [data, setData] = useState<Todo[]>([])

  const handleAdd = () => {
    if (todo.trim() === '') return
    let tmp_todo: Todo = {
      id: Date.now(),
      todo: todo,
      isDone: false
    }
    setData([...data, tmp_todo])
    setTodo('')
  }
  return (
    <div className="App">
      <h1 className="app-title">Tasks</h1>
      <InputField 
        todo={todo}
        setTodo={setTodo}
        addHandler={handleAdd}
      />

      <TaskList 
        data={data}
        setData={setData}
      />
    </div>
  );
}

export default App;
