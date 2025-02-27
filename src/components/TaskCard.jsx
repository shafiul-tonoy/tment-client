import styles from './TaskCard.module.css'

function TaskCard({ task, provided, onEdit, onDelete }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  return (
    <div
      className={styles.card}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <div className={styles.title}>{task.title}</div>
      
      {task.description && (
        <div className={styles.description}>{task.description}</div>
      )}
      
      <div className={styles.footer}>
        <div className={styles.date}>
          {formatDate(task.timestamp)}
        </div>
        
        <div className={styles.actions}>
          <button 
            onClick={onEdit}
            className={styles.editBtn}
            aria-label="Edit task"
          >
            ✎
          </button>
          <button 
            onClick={onDelete}
            className={styles.deleteBtn}
            aria-label="Delete task"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskCard