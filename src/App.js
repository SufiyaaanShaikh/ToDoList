import { useState } from 'react';
import './App.css';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

function App() {

  let [todolist, setTodolist] = useState([]);

  let saveToDoList = (evt) => {
    evt.preventDefault();
    let toDoName = evt.target.toDoName.value.trim();
    let normalizedToDoName = toDoName.toLowerCase();

    if (toDoName === '') {
      NotificationManager.error('Please enter a valid input');
      // alert("Please enter a valid input");
    } else if (!todolist.map(item => item.toLowerCase()).includes(normalizedToDoName)) {
      let finalToDolist = [...todolist, toDoName];
      setTodolist(finalToDolist);
      NotificationManager.success('Successfully added', 'ToDo List Updated');
    } else {
      NotificationManager.error('The input already exists');
      // alert("The input already exists");
    }


    evt.target.toDoName.value = '';
  };

  let list = todolist.map((value, index) => {
    return (
      <ToDoListItems key={index} value={value} todolist={todolist} setTodolist={setTodolist} indexNumber={index} />
    );
  });

  return (
    <div className="App">
      
      <h1>To Do List</h1>
      <form onSubmit={saveToDoList}>
        <input type="text" name="toDoName" /><button>Save</button>
      </form>
      <div className='outerDiv'>
        <ul>
          {list}
        </ul>
      </div>
      <NotificationContainer />
    </div>
  );
}

export default App;

function ToDoListItems({ value, todolist, setTodolist, indexNumber }) {
  let [status, setStatus] = useState(false);

  let deleteRow = () => {
    let updatedList = todolist.filter((item, index) => index !== indexNumber);
    setTodolist(updatedList);
    NotificationManager.success('Successfully deleted', 'ToDo List Updated');
  }
  let checkStatus = () => {
    setStatus(!status);
  }

  return (
    <div className={(status) ? 'completeToDo' : ''} onClick={checkStatus}>
      <li >{value.toUpperCase()} <span onClick={deleteRow}>&times;</span></li>

    </div>
  );
}
