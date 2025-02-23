// client/src/components/Task/TaskBoard.jsx
import  { useState, useEffect } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import { taskService } from '../../services/api';
import TaskColumn from './TaskColumn';
import TaskForm from './TaskForm';
import Header from '../Layout/Header';

const TaskBoard = () => {
  const [tasks, setTasks] = useState({
    'To-Do': [],
    'In Progress': [],
    'Done': []
  });

  const fetchTasks = async () => {
    try {
      const response = await taskService.getTasks();
      const fetchedTasks = response.data;
      
      // Group tasks by category
      const groupedTasks = fetchedTasks.reduce((acc, task) => {
        if (!acc[task.category]) {
          acc[task.category] = [];
        }
        acc[task.category].push(task);
        return acc;
      }, {
        'To-Do': [],
        'In Progress': [],
        'Done': []
      });

      // Sort tasks by order within each category
      Object.keys(groupedTasks).forEach(category => {
        groupedTasks[category].sort((a, b) => a.order - b.order);
      });

      setTasks(groupedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    
    // Clone the tasks object
    const newTasks = { ...tasks };
    
    // Remove task from source
    const [movedTask] = newTasks[source.droppableId].splice(source.index, 1);
    
    // Add task to destination
    newTasks[destination.droppableId].splice(destination.index, 0, movedTask);
    
    // Update state optimistically
    setTasks(newTasks);

    try {
      // Prepare tasks for reordering API call
      const updatedTasks = newTasks[destination.droppableId].map((task, index) => ({
        id: task._id,
        order: index,
        category: destination.droppableId
      }));

      // Call API to update task order
      await taskService.reorderTasks(updatedTasks);
    } catch (error) {
      console.error('Error updating task order:', error);
      // Revert to original state if API call fails
      fetchTasks();
    }
  };

  const handleAddTask = async (taskData) => {
    try {
      const newTask = {
        ...taskData,
        category: 'To-Do',
        order: tasks['To-Do'].length
      };

      const response = await taskService.createTask(newTask);
      setTasks(prev => ({
        ...prev,
        'To-Do': [...prev['To-Do'], response.data]
      }));
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await taskService.deleteTask(taskId);
      
      // Update state by removing the task
      setTasks(prev => {
        const newTasks = { ...prev };
        Object.keys(newTasks).forEach(category => {
          newTasks[category] = newTasks[category].filter(task => task._id !== taskId);
        });
        return newTasks;
      });
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TaskForm onSubmit={handleAddTask} />
        
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(tasks).map(([category, categoryTasks]) => (
              <TaskColumn
                key={category}
                id={category}
                title={category}
                tasks={categoryTasks}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        </DragDropContext>
      </main>
    </div>
  );
};

export default TaskBoard;