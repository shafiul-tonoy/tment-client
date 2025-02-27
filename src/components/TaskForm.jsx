import { useState } from 'react'
import styles from './TaskForm.module.css'

const CATEGORIES = {
  TODO: 'To-Do',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done'
}

function TaskForm({ task = null, onSubmit, onCancel }) {
    const [title, setTitle] = useState(task ? task.title : '')
    const [description, setDescription] = useState(task ? task.description || '' : '')
    const [category, setCategory] = useState(task ? task.category : CATEGORIES.TODO)
    const [error, setError] = useState('')
  
    const handleSubmit = (e) => {
      e.preventDefault()
      
      if (!title.trim()) {
        setError('Title is required')
        return
      }
      
      if (title.length > 50) {
        setError('Title must be less than 50 characters')
        return
      }
      
      if (description.length > 200) {
        setError('Description must be less than 200 characters')
        return
      }
      
      onSubmit({
        title: title.trim(),
        description: description.trim(),
        category
      })
    }
  
    return (
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h3 className={styles.formTitle}>
            {task ? 'Edit Task' : 'Add New Task'}
          </h3>
          
          {error && <div className={styles.error}>{error}</div>}
          
          <div className={styles.field}>
            <label htmlFor="title" className={styles.label}>
              Title <span className={styles.required}>*</span>
            </label>
            <input
               id="title"
               type="text"
               value={title}
               onChange={(e) => setTitle(e.target.value)}
               placeholder="Enter task title"
               maxLength={50}
               className={styles.input}
             />
              <div className={styles.charCount}>
                {title.length}/50
              </div>
            </div>
            
            <div className={styles.field}>
              <label htmlFor="description" className={styles.label}>
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter task description (optional)"
                maxLength={200}
                className={styles.textarea}
                rows={3}
              />
              <div className={styles.charCount}>
                {description.length}/200
              </div>
            </div>
            
            <div className={styles.field}>
              <label htmlFor="category" className={styles.label}>
                Category <span className={styles.required}>*</span>
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={styles.select}
              >
                {Object.values(CATEGORIES).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            
            <div className={styles.actions}>
              <button 
                type="button" 
                onClick={onCancel}
                className={styles.cancelBtn}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className={styles.submitBtn}
              >
                {task ? 'Save Changes' : 'Add Task'}
              </button>
            </div>
          </form>
        </div>
      )
    }
    
    export default TaskForm