import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

// Set withCredentials globally for all axios requests
axios.defaults.withCredentials = true;

export async function getTasks(userId) {
  try {
    const response = await axios.get(`${API_URL}/tasks?userId=${userId}`, {
      withCredentials: true
    })
    return response.data
  } catch (error) {
    console.error('Error fetching tasks:', error)
    throw error
  }
}

export async function createTask(task) {
  try {   
    const response = await axios.post(`${API_URL}/tasks`, {
      ...task,
      order: task.order || 0, // Ensure `order` is present
    }, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error("Backend Error:", error.response?.data || error.message);
    throw error;
  }
}

export async function updateTask(id, task) {
  try {
    const response = await axios.put(`${API_URL}/tasks/${id}`, task, {
      withCredentials: true
    })
    return response.data
  } catch (error) {
    console.error('Error updating task:', error)
    throw error
  }
}

export async function deleteTask(id) {
  try {
    const response = await axios.delete(`${API_URL}/tasks/${id}`, {
      withCredentials: true
    })
    return response.data
  } catch (error) {
    console.error('Error deleting task:', error)
    throw error
  }
}

export async function reorderTasks(tasks) {
  try {
    const response = await axios.post(`${API_URL}/tasks/reorder`, { tasks }, {
      withCredentials: true
    })
    console.log('Tasks reordered:', response.data);
    return response.data
  } catch (error) {
    console.error('Error reordering tasks:', error)
    throw error
  }
}