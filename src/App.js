import { useRef, useState } from "react";
import "./App.css"

function App() {

  const [todoList, setTodoList] = useState([]);
  const [currentTask, setCurrentTask] = useState("");
  const inputTask = useRef(null);

  const addTask = () =>{
    setTodoList([...todoList, {task: currentTask, completed: false}]);
    inputTask.current.value = "";
    setCurrentTask(""); 
    console.log(todoList);
  }

  const deleteTask = (taskToDelete) => {
    setTodoList(
        todoList.filter((task) => {
        return task.task !== taskToDelete;
      })
    )
  }

  const completeTask = (taskToComplete) => {
    setTodoList(
        todoList.map((task) => {
        return (
          task.task === taskToComplete 
        ? {task:taskToComplete, completed: true} 
        : {task:task.task, completed: task.completed ? true : false} 
        )
      })
    )
  }


  return (
    <div className="App">
      <h1>ToDoList</h1>
      <div>
        <input 
        ref={inputTask}
        type="text" placeholder="Task..." 
        onChange={(event) => {
          setCurrentTask(event.target.value)}}
          onKeyDown = {(event) => {
            if (event.keyCode === 13){
              addTask();
            }
          }}
          />
        <button onClick={addTask}  >Add Task</button>
      </div>
      <hr />
      <ul>
        {todoList.map((val, key) =>{
          return (
            <div id="task">
              <li key={key} > {val.task}</li>
              <button onClick={()=> completeTask(val.task)}>Complete</button>
              <button onClick={()=> deleteTask(val.task)}>X</button>
              {val.completed ? <h1>Task Completed</h1> : <h1>Task is Imcomplete</h1>}
            </div>
          )
        })}
      </ul>
    </div>
  );
}

export default App;
