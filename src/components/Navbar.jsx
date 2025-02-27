import { useAuth } from '../contexts/AuthContext'
import styles from './Navbar.module.css'

function Navbar() {
  const { currentUser, logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Failed to log out', error)
    }
  }

  return (
    <nav className={styles.navbar}>
      <div className="container">
        <div className={styles.navContent}>
          <h1 className={styles.logo}>TaskMaster</h1>
          <div className={styles.userSection}>
            {currentUser && (
              <>
                <span className={styles.userEmail}>{currentUser.displayName || currentUser.email}</span>
                <button onClick={handleLogout} className={`btn ${styles.logoutBtn}`}>
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar