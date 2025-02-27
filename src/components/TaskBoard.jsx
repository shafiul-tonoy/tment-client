// File: src/components/TaskBoard.jsx
import { useState, useEffect } from 'react'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { useAuth } from '../contexts/AuthContext'
import { getTasks, createTask, updateTask, deleteTask, reorderTasks } from '../services/taskService'
import TaskColumn from './TaskColumn'
import TaskForm from './TaskForm'
import styles from './TaskBoard.module.css'

const CATEGORIES = {
  TODO: 'To-Do',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done'
}

function TaskBoard() {
  const { currentUser } = useAuth()
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  useEffect(() => {
    if (currentUser) {
      fetchTasks()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])

  const fetchTasks = async () => {
    try {
      setLoading(true)
      const data = await getTasks(currentUser.uid)
      setTasks(data)
      setError('')
    } catch (error) {
      setError('Failed to load tasks. Please refresh.')
      console.error('Error loading tasks:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddTask = async (taskData) => {
    try {
      const newTask = {
        ...taskData,
        userId: currentUser.uid,
        timestamp: new Date().toISOString(),
        order: getNextOrder(taskData.category)
      }
      
      const result = await createTask(newTask)
      setTasks([...tasks, { ...newTask, _id: result._id }])
      setShowAddForm(false)
    } catch (error) {
      console.error('Error adding task:', error)
    }
  }

  const handleUpdateTask = async (id, taskData) => {
    try {
      await updateTask(id, taskData)
      setTasks(tasks.map(task => task._id === id ? { ...task, ...taskData } : task))
      setEditingTask(null)
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id)
      setTasks(tasks.filter(task => task._id !== id))
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  const getNextOrder = (category) => {
    const categoryTasks = tasks.filter(task => task.category === category)
    return categoryTasks.length > 0 
      ? Math.max(...categoryTasks.map(task => task.order)) + 1 
      : 0
  }

  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result
  
    if (!destination) return;
    if (destination.droppableId === source.droppableId && 
        destination.index === source.index) return;
  
    try {
      // Find the task that was dragged
      const draggedTaskId = draggableId;
      const newCategory = destination.droppableId;
      
      // Create updated task list
      let updatedTasks = [...tasks];
      
      // Update the category of the dragged task
      updatedTasks = updatedTasks.map(task => {
        if (task._id === draggedTaskId) {
          return { ...task, category: newCategory };
        }
        return task;
      });
      
      // Get all tasks in the destination category (including the moved task)
      const tasksInCategory = updatedTasks
        .filter(t => t.category === newCategory)
        .sort((a, b) => a.order - b.order);
      
      // Remove the dragged task from its current position
      const filteredTasks = tasksInCategory.filter(t => t._id !== draggedTaskId);
      
      // Insert the task at the new position
      filteredTasks.splice(destination.index, 0, 
        updatedTasks.find(t => t._id === draggedTaskId)
      );
      
      // Update orders for all tasks in this category
      const tasksToUpdate = filteredTasks.map((task, index) => ({
        _id: task._id,
        order: index,
        category: newCategory
      }));
      
      // Send a single reorderTasks request
      await reorderTasks(tasksToUpdate);
      
      // Update local state with all changes
      setTasks(updatedTasks.map(task => {
        if (task.category !== newCategory) return task;
        
        const updatedTask = tasksToUpdate.find(t => t._id === task._id);
        if (updatedTask) {
          return { ...task, order: updatedTask.order };
        }
        return task;
      }));
      
    } catch (error) {
      console.error('Error during drag and drop:', error);
      fetchTasks(); // Refresh tasks to ensure UI is in sync
    }
  };

  const getTasksByCategory = (category) => {
    return tasks
      .filter(task => task.category === category)
      .sort((a, b) => a.order - b.order)
  }

  return (
    <div className={styles.taskBoard}>
      {error && <div className={styles.error}>{error}</div>}
      
      <div className={styles.headerActions}>
        <h2 className={styles.boardTitle}>My Tasks</h2>
        <button 
          className={`btn ${styles.addBtn}`}
          onClick={() => setShowAddForm(true)}
        >
          Add Task
        </button>
      </div>

      {showAddForm && (
        <TaskForm 
          onSubmit={handleAddTask}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {editingTask && (
        <TaskForm 
          task={editingTask}
          onSubmit={(data) => handleUpdateTask(editingTask._id, data)}
          onCancel={() => setEditingTask(null)}
        />
      )}

      {loading ? (
        <div className={styles.loading}>Loading tasks...</div>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className={styles.boardColumns}>
            {Object.values(CATEGORIES).map(category => (
              <Droppable key={category} droppableId={category}>
                {(provided) => (
                  <TaskColumn
                    title={category}
                    tasks={getTasksByCategory(category)}
                    provided={provided}
                    onEditTask={setEditingTask}
                    onDeleteTask={handleDeleteTask}
                  />
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      )}
    </div>
  )
}

export default TaskBoard