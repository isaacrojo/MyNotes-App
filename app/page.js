"use client";
import Image from 'next/image'
import React, { useState } from 'react'
import Task from './components/task';


const Home = () => {
  const [tasks, setTasks] = useState([]); // inicia como array vacio
  const [newTask, setNewTask] = useState(''); // inicia como string vacio
  const [editingIndex, setEditingIndex] = useState(null);

  const addTask = () => {
    if (newTask.trim() !== '') { // verifica que la nueva tarea no esté vacía
      if (editingIndex !== null) {
        const updatedTasks = [...tasks];
        updatedTasks[editingIndex] = newTask;
        setTasks(updatedTasks);
        setEditingIndex(null);
      } else {
        setTasks([...tasks, newTask]); // clona con spredOperator y crea array que contiene todas las tareas existentes + la nueva tarea
      }
      setNewTask(''); // restablecer campo a vacio
    }
  };

  const handleEditTask = (index) => {
    setNewTask(tasks[index]);
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

  return (
    <div className='container mx-auto mt-8'>
      <h1 className='text-4xl font-bold mb-4'>Notes App</h1>

      <div className='flex mb-4'>
        <input type="text"
          value={newTask}
          onChange={handleInputChange}
          className='flex-grow border p-2 mr-2 text-black'
          placeholder='New Note'
        />
        <button className='px-4 py-2 bg-emerald-500 text-black rounded' onClick={addTask}>{editingIndex !== null ? 'Edit' : '+'}</button>

      </div>

      <div>
        <ul>
          {tasks.map((task, index) => (
            <li className='gap-3 border' key={index}>
              <div className='flex w-full'>{task}</div>
              <div className='flex justify-end gap-1'>
                <button className='px-4 py-2 bg-emerald-500 text-black rounded' 
                  onClick={() => handleEditTask(index)}>Edit</button>
                <button className='px-4 py-2 bg-emerald-500 text-black rounded' 
                  onClick={() => handleDeleteTask(index)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
};

export default Home;
