import React, { useState, useEffect } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import './App.css';

const App = () => {
  // Use the useState hook to manage the state of the tasks, editingTask, and editedTaskText variables
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState('');

  // Use the useEffect hook to load tasks from localStorage when the component mounts
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  // Function to handle the addition of a new task
  const handleAddTask = (taskText) => {
    const newTask = {
      id: tasks.length + 1,
      text: taskText,
    };
    setTasks([...tasks, newTask]);
  };

   // Function to handle the deletion of a task
  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };


// Function to handle the editing of a task
  const handleEditTask = (task) => {
    setEditingTask(task);
    setEditedTaskText(task.text);
  };

  // Function to handle the saving of an edited task
  const handleSaveEdit = (taskId, newText) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, text: newText } : task
    );
    setTasks(updatedTasks);
    setEditingTask(null);
    setEditedTaskText('');
  };

  // Function to handle the cancellation of an edit
  const handleCancelEdit = () => {
    setEditingTask(null);
    setEditedTaskText('');
  };

  // Function to save the tasks to localStorage
  const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Simple React To-Do App</h1>
      {/* Render the TaskInput component, passing the handleAddTask function as a prop */}
      <TaskInput onAddTask={handleAddTask} />
      {/* Render the TaskList component, passing the necessary props */}
      <TaskList
        tasks={tasks}
        onDeleteTask={handleDeleteTask}
        onEditTask={handleEditTask}
        onSaveEdit={handleSaveEdit}
        onCancelEdit={handleCancelEdit}
        editingTask={editingTask}
        editedTaskText={editedTaskText}
      />
      {/* Render a "Save" button that calls the saveTasks function when clicked */}
      <button onClick={saveTasks} className="save-button">
        Save
      </button>
    </div>
  );
};

export default App;