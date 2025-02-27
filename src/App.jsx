import { useEffect, useState } from 'react'
import { useAuth } from './contexts/AuthContext'
import Login from './components/Login'
import TaskBoard from './components/TaskBoard'
import Navbar from './components/Navbar'
import Loading from './components/Loading'

function App() {
  const { currentUser, loading } = useAuth()
  const [appLoading, setAppLoading] = useState(true)

  useEffect(() => {
    if (!loading) {
      // Small delay to ensure auth state is fully resolved
      setTimeout(() => setAppLoading(false), 500)
    }
  }, [loading])

  if (appLoading) {
    return <Loading />
  }

  return (
    <div className="app">
      {currentUser ? (
        <>
          <Navbar />
          <main className="container">
            <TaskBoard />
          </main>
        </>
      ) : (
        <Login />
      )}
    </div>
  )
}

export default App