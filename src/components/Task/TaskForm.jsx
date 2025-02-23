import React, { useState } from 'react';
import { PlusIcon } from 'lucide-react';

 const TaskForm = ({ onSubmit }) => {
  const [task, setTask] = useState({ title: '', description: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title.trim()) return;
    
    onSubmit(task);
    setTask({ title: '', description: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Task title"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          className="flex-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          maxLength={50}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
        >
          <PlusIcon size={20} />
          Add Task
        </button>
      </div>
      <textarea
        placeholder="Task description (optional)"
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
        className="w-full mt-2 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        maxLength={200}
      />
    </form>
  );
};

export default TaskForm;