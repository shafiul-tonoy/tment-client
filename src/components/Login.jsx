// File: src/components/Login.jsx
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import styles from './Login.module.css'

function Login() {
  const { signInWithGoogle } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGoogleSignIn = async () => {
    try {
      setError('')
      setLoading(true)
      await signInWithGoogle()
    } catch (error) {
      setError('Failed to sign in with Google. Please try again.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <h1 className={styles.title}>TaskMaster</h1>
        <p className={styles.subtitle}>Manage your tasks efficiently</p>
        
        {error && <div className={styles.error}>{error}</div>}
        
        <button 
          className={styles.googleBtn} 
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          <span className={styles.googleIcon}>G</span>
          <span>{loading ? 'Signing in...' : 'Sign in with Google'}</span>
        </button>
      </div>
    </div>
  )
}

export default Login