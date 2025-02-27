import { Draggable } from '@hello-pangea/dnd'
import TaskCard from './TaskCard'
import styles from './TaskColumn.module.css'

function TaskColumn({ title, tasks, provided, onEditTask, onDeleteTask }) {
  const getColumnClass = (title) => {
    switch (title) {
      case 'To-Do':
        return styles.todoColumn
      case 'In Progress':
        return styles.progressColumn
      case 'Done':
        return styles.doneColumn
      default:
        return ''
    }
  }

  return (
    <div 
      className={`${styles.column} ${getColumnClass(title)}`} 
      ref={provided.innerRef}
      {...provided.droppableProps}
    >
      <div className={styles.columnHeader}>
        <h3 className={styles.columnTitle}>{title}</h3>
        <span className={styles.taskCount}>{tasks.length}</span>
      </div>
      
      <div className={styles.taskList}>
        {tasks.map((task, index) => (
          <Draggable key={task._id} draggableId={task._id} index={index}>
            {(provided) => (
              <TaskCard
                task={task}
                provided={provided}
                onEdit={() => onEditTask(task)}
                onDelete={() => onDeleteTask(task._id)}
              />
            )}
          </Draggable>
        ))}
        {provided.placeholder}
        
        {tasks.length === 0 && (
          <div className={styles.emptyMessage}>
            No tasks yet
          </div>
        )}
      </div>
    </div>
  )
}

export default TaskColumn