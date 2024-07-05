import { useState } from 'react';
import './TaskList.css';

const TaskList = ({
  tasks,
  onDeleteTask,
  onEditTask,
  onSaveEdit,
}) => {

  // Use the useState hook to manage the state of the editingTaskId and editedTaskText variables
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState('');

  // Function to handle the "Edit" button click
  const handleEdit = (task) => {
    setEditingTaskId(task.id);
    setEditedTaskText(task.text);
  };

  // Function to handle the "Save" button click during editing
  const handleSaveEdit = () => {
    onSaveEdit(editingTaskId, editedTaskText);
    setEditingTaskId(null);
    setEditedTaskText('');
  };

  // Function to handle the "Cancel" button click during editing
  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditedTaskText('');
  };

  // Function to handle the "Delete" button click
  const handleDeleteTask = (taskId) => {
    onDeleteTask(taskId);
  };

  return (
    <ul className="task-list">
      {/* Map over the tasks array and render a list item for each task */}
      {tasks.map((task) => (
        <li key={task.id} className="task-item">
          {/* If the task is being edited, render the edit task UI */}
          {editingTaskId === task.id ? (
            <div className="edit-task-container">
              <input
                type="text"
                value={editedTaskText}
                onChange={(e) => setEditedTaskText(e.target.value)}
                className="edit-task-input"
              />
              <div className="edit-task-buttons">
                <button onClick={handleSaveEdit} className="save-edit-button">
                  Save
                </button>
                <button onClick={handleCancelEdit} className="cancel-edit-button">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            // Otherwise, render the normal task UI
            <>
              <span className="task-text">{task.text}</span>
              <div className="task-buttons">
                <button onClick={() => handleEdit(task)} className="edit-task-button">
                  Edit
                </button>
                <button onClick={() => handleDeleteTask(task.id)} className="delete-task-button">
                  Delete
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
