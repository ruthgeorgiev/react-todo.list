import React, { useState, useEffect } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBroom, faLaptop, faShoppingCart, faBook, faHeartbeat } from '@fortawesome/free-solid-svg-icons';
import { faSave, faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import Contentful from './components/Contentful';
import Container from './components/Container/Container'; // Import the Container component
import Typography from './components/Typography/Typography'; // Import the Typography component

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
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskName, setEditedTaskName] = useState('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTaskName.trim() && selectedCategory) {
      setTasks(prevTasks => ({
        ...prevTasks,
        [selectedCategory]: [...prevTasks[selectedCategory], { id: uuidv4(), name: newTaskName, completed: false }]
      }));
      setNewTaskName('');
      setCurrentPage(Math.ceil((tasks[selectedCategory].length + 1) / tasksPerPage)); // Move to the last page
    }
  };

  const handleEditTask = (task) => {
    setEditingTaskId(task.id);
    setEditedTaskName(task.name);
  };

  const handleSaveTask = (category, taskId) => {
    setTasks(prevTasks => ({
      ...prevTasks,
      [category]: prevTasks[category].map(task =>
        task.id === taskId ? { ...task, name: editedTaskName } : task
      )
    }));
    setEditingTaskId(null);
    setEditedTaskName('');
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
    setCurrentPage(1); // Reset to the first page after deletion
  };

  const calculateProgress = () => {
    const allTasks = Object.values(tasks).flat();
    const completedTasks = allTasks.filter(task => task.completed).length;
    const totalTasks = allTasks.length;
    return totalTasks ? (completedTasks / totalTasks) * 100 : 0;
  };

  const progress = calculateProgress();

  // Pagination logic
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks[selectedCategory].slice(indexOfFirstTask, indexOfLastTask);

  const totalPages = Math.ceil(tasks[selectedCategory].length / tasksPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <Router>
      <Container>
        <div className="app-inner-container">
          <Typography fontSize="24px" bold={true} style={{ marginBottom: '20px' }} className="app-title">
            Simple TodoList
          </Typography>
          <div className="main-content">
            <div className="task-list-container">
              <Typography fontSize="18px" bold={true}>List of {selectedCategory} Tasks</Typography>
              <div className="task-list">
                {currentTasks.map(task => (
                  <div className="task-item" key={task.id}>
                    {editingTaskId === task.id ? (
                      <input
                        type="text"
                        value={editedTaskName}
                        onChange={(e) => setEditedTaskName(e.target.value)}
                      />
                    ) : (
                      <>
                        <input
                          type="checkbox"
                          className="custom-checkbox"
                          checked={task.completed}
                          onChange={() => handleToggleTask(selectedCategory, task.id)}
                        />
                        <span
                          onClick={() => handleToggleTask(selectedCategory, task.id)}
                          style={{ textDecoration: task.completed ? 'line-through' : 'none', cursor: 'pointer' }}
                        >
                          {task.name}
                        </span>
                      </>
                    )}
                    <div className="task-actions">
                      {editingTaskId === task.id ? (
                        <button onClick={() => handleSaveTask(selectedCategory, task.id)}>
                          <FontAwesomeIcon icon={faSave} style={{ color: 'black' }} />
                        </button>
                      ) : (
                        <button onClick={() => handleEditTask(task)}>
                          <FontAwesomeIcon icon={faEdit} style={{ color: 'green' }} />
                        </button>
                      )}
                      <button onClick={() => handleDeleteTask(selectedCategory, task.id)}>
                        <FontAwesomeIcon icon={faTrashAlt} style={{ color: 'blue' }} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pagination">
                <div className="join">
                  <button className="join-item btn" onClick={handlePrevPage} disabled={currentPage === 1}>«</button>
                  <button className="join-item btn">Page {totalPages > 0 ? currentPage : 0} of {totalPages}</button>
                  <button className="join-item btn" onClick={handleNextPage} disabled={currentPage === totalPages}>»</button>
                </div>
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
      <Contentful />
    </Router>
  );
};

export default App;
