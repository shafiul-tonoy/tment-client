import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Trash2 } from 'lucide-react';

export const TaskCard = ({ task, index, onDelete }) => {
  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white dark:bg-gray-700 p-4 mb-2 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-gray-900 dark:text-white">{task.title}</h3>
            <button
              onClick={() => onDelete(task._id)}
              className="text-red-500 hover:text-red-700 p-1"
            >
              <Trash2 size={16} />
            </button>
          </div>
          {task.description && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              {task.description}
            </p>
          )}
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            {new Date(task.timestamp).toLocaleString()}
          </p>
        </div>
      )}
    </Draggable>
  );
};