"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Task from "./components/task";

const Home = () => {
  const [tasks, setTasks] = useState([]); // inicia objeto
  const [newTask, setNewTask] = useState(""); // inicia como string vacio
  const [editingIndex, setEditingIndex] = useState(null);

  // save tasks in localstorage
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks)); // save tasks as string
    }
  }, [tasks]); //execute as tasks change

  // Load tasks from localstorage at start
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks)); // convert string into array of objects
    }
  }, []); // Solo se ejecuta una vez, al montar el componente

  const addTask = () => {
    if (newTask.trim() !== "") {
      // verifica que la nueva tarea no esté vacía
      const taskObject = {
        text: newTask,
        createdAt: new Date().toLocaleString(),
        completed: false,
      };

      if (editingIndex !== null) {
        const updatedTasks = [...tasks];
        updatedTasks[editingIndex] = taskObject;
        setTasks(updatedTasks);
        setEditingIndex(null);
      } else {
        setTasks([...tasks, taskObject]); // clona con spredOperator y crea array que contiene todas las tareas existentes + la nueva tarea
      }
      setNewTask(""); // restablecer campo a vacio
    }
  };

  const handleEditTask = (index) => {
    setNewTask(tasks[index].text);
    setEditingIndex(index);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks]; // clona con spredOperator y crea array que contiene todas las tareas existentes + la nueva tarea
    updatedTasks.splice(index, 1); // elimina tarea en index especifico. Splice modifica array original y devuelve la nueva con los elementos eliminados
    setTasks(updatedTasks); //Se actualiza el estado de tasks con la nueva lista de tareas que no incluye la tarea eliminada
    setEditingIndex(null);
  };

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const toggleTaskCompleted = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  return (
    <div className="container mx-3 md:mx-auto mt-8">
      <h1 className="text-4xl font-bold mb-4">My Super Notes App</h1>

      <div className="flex mb-4">
        <input
          type="text"
          value={newTask}
          onChange={handleInputChange}
          className="flex-grow border p-2 mr-2 text-black"
          placeholder="New Note"
        />
        <button
          className="px-4 py-2 bg-emerald-500 text-black rounded"
          onClick={addTask}
        >
          {editingIndex !== null ? "Edit" : "+"}
        </button>
      </div>

      <div>
        <ul>
          {tasks.map((task, index) => (
            <li className="gap-3 border" key={index}>
              <div className="flex gap-4 w-full">
                <span
                  className={task.completed ? "line-through text-gray-500" : ""}
                >
                  {task.text}
                </span>
              </div>
              <div className="flex items-center justify-between w-full">
                <div className="ml-2 text-gray-500 text-sm">
                  Created : ({task.createdAt})
                </div>
                <div className="flex justify-end gap-1">
                  <button
                    className="px-4 py-2 bg-emerald-500 text-black rounded"
                    onClick={() => toggleTaskCompleted(index)}
                  >
                    {task.completed ? "Unmark" : "Complete"}{" "}
                  </button>
                  <button
                    className="px-4 py-2 bg-emerald-500 text-black rounded"
                    onClick={() => handleEditTask(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-4 py-2 bg-emerald-500 text-black rounded"
                    onClick={() => handleDeleteTask(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
