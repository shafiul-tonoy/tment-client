
import { Droppable } from '@hello-pangea/dnd';
import { TaskCard } from './TaskCard';

 const TaskColumn = ({ title, tasks, id, onDelete }) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        {title} ({tasks.length})
      </h2>
      <Droppable droppableId={id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="min-h-[200px]"
          >
            {tasks.map((task, index) => (
              <TaskCard
                key={task._id}
                task={task}
                index={index}
                onDelete={onDelete}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskColumn;