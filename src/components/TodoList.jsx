import React, { useState } from "react";
import Todo from "./Todo";

const TodoList = ({ tasks }) => {
  const [taskList, setTasksList] = useState(tasks);
  const [newTask, setNewTask] = useState("");

  const handleAddNewTodo = (event) => {
    event.preventDefault();

    setTasksList([...taskList, newTask]);

    setNewTask("");
  };
  const handleDeleteTask = (index) => {
    const newList = taskList.filter((name, i) => i !== index);
    setTasksList(newList);
  };

  const handleChange = (event) => {
    setNewTask(event.target.value);
    console.log(newTask);
  };

  return (
    <div>
      <ul>
        {taskList.map((item, index) => {
          return (
            <li key={index}>
              <p>{item}</p>
              <button onClick={() => handleDeleteTask(index)}>Supprimer</button>
            </li>
          );
        })}
      </ul>
      <hr />

      <form onSubmit={handleAddNewTodo}>
        <label>Ajouter une tache</label>
        <input type="text" value={newTask} onChange={handleChange} />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default TodoList;
