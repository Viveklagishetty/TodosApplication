import React, { useState } from 'react';
import './TaskInput.css';

const TaskInput = ({ onAddTask }) => {
  // Use the useState hook to manage the state of the taskText variable
  const [taskText, setTaskText] = useState('');

  // Function to handle changes in the input field
  const handleInputChange = (e) => {
    setTaskText(e.target.value);
  };

  // Function to handle the "Add Task" button click
  const handleAddTask = () => {
    if (taskText.trim() !== '') {
      onAddTask(taskText);
      setTaskText('');
    } else {
      // Display an alert if the taskText is empty
      alert('Please enter a task before clicking the "Add Task" button.');
    }
  };

  return (
    <div className="task-input-container">
       {/* Render an input field with the current value of the taskText state */}
      <input
        type="text"
        value={taskText}
        onChange={handleInputChange}
        className="task-input"
        placeholder="Enter task..."
      />
      {/* Render a button that calls the handleAddTask function when clicked */}
      <button onClick={handleAddTask} className="add-task-button">
        Add Task
      </button>
    </div>
  );
};

export default TaskInput;