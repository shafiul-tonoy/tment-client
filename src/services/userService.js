// File: src/services/userService.js
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export async function saveUserToDatabase(userData) {
  try {
    const response = await axios.post(`${API_URL}/users`, userData)
    return response.data
  } catch (error) {
    // If 409 conflict (user already exists), that's fine
    if (error.response && error.response.status === 409) {
      return { success: true, message: 'User already exists' }
    }
    console.error('Error saving user to database:', error)
    throw error
  }
}