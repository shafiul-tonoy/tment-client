/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'
import { 
  signInWithPopup, 
  signOut,
  onAuthStateChanged 
} from 'firebase/auth'
import { auth, googleProvider } from '../firebase'
import { saveUserToDatabase } from '../services/userService'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  async function signInWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user
      
      // Save user to database
      await saveUserToDatabase({
        userId: user.uid,
        email: user.email,
        displayName: user.displayName
      })
      
      return user
    } catch (error) {
      console.error("Error signing in with Google:", error)
      throw error
    }
  }

  function logout() {
    return signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    signInWithGoogle,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}