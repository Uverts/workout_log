import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PrivateRoute from '@src/routes/PrivateRoute'
import WorkoutsPage from '@src/pages/WorkoutsPage'
import WorkoutPage from '@src/pages/WorkoutPage'
import CreateWorkoutPage from '@src/pages/CreateWorkoutPage'
import LogInPage from '@src/pages/LoginPage'
import SignUpPage from '@src/pages/SignUpPage'
import DashboardPage from '@src/pages/DashboardPage'
import Header from '@src/components/Header'
import '@src/index.css'
import { useAuth } from '@src/context/AuthContext'

function App() {
  const { loading } = useAuth()
  if (loading) return <div>loading</div>
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route exact path="login" element={<LogInPage />} />
          <Route exact path="signup" element={<SignUpPage />} />
          <Route
            exact
            path="/"
            element={
              <PrivateRoute>
                <WorkoutsPage />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/new/"
            element={
              <PrivateRoute>
                <CreateWorkoutPage />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/:workoutId"
            element={
              <PrivateRoute>
                <WorkoutPage />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
