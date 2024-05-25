import React, { useState } from 'react';
import { Container, Typography } from './components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBroom, faLaptop, faShoppingCart, faBook, faHeartbeat } from '@fortawesome/free-solid-svg-icons';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState({
    Cleaning: [],
    Work: [],
    Errands: [],
    Learning: [],
    Health: []
  });

  const [newTaskName, setNewTaskName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Cleaning');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTaskName.trim() && selectedCategory) {
      setTasks(prevTasks => ({
        ...prevTasks,
        [selectedCategory]: [...prevTasks[selectedCategory], { id: Date.now(), name: newTaskName, completed: false }]
      }));
      setNewTaskName('');
    }
  };

  const handleToggleTask = (category, taskId) => {
    setTasks(prevTasks => ({
      ...prevTasks,
      [category]: prevTasks[category].map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    }));
  };

  const handleDeleteTask = (category, taskId) => {
    setTasks(prevTasks => ({
      ...prevTasks,
      [category]: prevTasks[category].filter(task => task.id !== taskId)
    }));
  };

  const calculateProgress = () => {
    const allTasks = Object.values(tasks).flat();
    const completedTasks = allTasks.filter(task => task.completed).length;
    const totalTasks = allTasks.length;
    return totalTasks ? (completedTasks / totalTasks) * 100 : 0;
  };

  const progress = calculateProgress();

  return (
    <Container>
      <div className="app-inner-container">
        <Typography fontSize="24px" bold={true} className="app-title">Simple TodoList</Typography>
        <div className="main-content">
          <div className="task-list-container">
            <Typography fontSize="18px" bold={true}>List of {selectedCategory} Tasks</Typography>
            <div className="task-list">
              {tasks[selectedCategory].map(task => (
                <div className="task-item" key={task.id}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleTask(selectedCategory, task.id)}
                  />
                  <span
                    onClick={() => handleToggleTask(selectedCategory, task.id)}
                    style={{ textDecoration: task.completed ? 'line-through' : 'none', cursor: 'pointer' }}
                  >
                    {task.name}
                  </span>
                  <div className="task-actions">
                    <button onClick={() => handleToggleTask(selectedCategory, task.id)}>✏️</button>
                    <button onClick={() => handleDeleteTask(selectedCategory, task.id)}>🗑️</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="side-container">
            <div className="progress-container">
              <Typography fontSize="16px">Today's Progress</Typography>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
              </div>
              <Typography fontSize="16px">{progress.toFixed(0)}%</Typography>
            </div>
            <div className="new-task-container">
              <Typography fontSize="16px">Add New Task</Typography>
              <form className="new-task-form" onSubmit={handleAddTask}>
                <input
                  type="text"
                  placeholder="Task Name"
                  value={newTaskName}
                  onChange={(e) => setNewTaskName(e.target.value)}
                />
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                  <option value="Cleaning">Cleaning</option>
                  <option value="Work">Work</option>
                  <option value="Errands">Errands</option>
                  <option value="Learning">Learning</option>
                  <option value="Health">Health</option>
                </select>
                <button type="submit">Add</button>
              </form>
            </div>
          </div>
        </div>
        <div className="icon-buttons">
          <div className="icon-button" onClick={() => setSelectedCategory('Cleaning')}>
            <FontAwesomeIcon icon={faBroom} size="2x" />
            <span>Cleaning</span>
          </div>
          <div className="icon-button" onClick={() => setSelectedCategory('Work')}>
            <FontAwesomeIcon icon={faLaptop} size="2x" />
            <span>Work</span>
          </div>
          <div className="icon-button" onClick={() => setSelectedCategory('Errands')}>
            <FontAwesomeIcon icon={faShoppingCart} size="2x" />
            <span>Errands</span>
          </div>
          <div className="icon-button" onClick={() => setSelectedCategory('Learning')}>
            <FontAwesomeIcon icon={faBook} size="2x" />
            <span>Learning</span>
          </div>
          <div className="icon-button" onClick={() => setSelectedCategory('Health')}>
            <FontAwesomeIcon icon={faHeartbeat} size="2x" />
            <span>Health</span>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default App;
