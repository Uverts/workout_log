import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import WorkoutsPage from '@src/pages/WorkoutsPage'
import WorkoutPage from '@src/pages/WorkoutPage'
import CreateWorkoutPage from '@src/pages/CreateWorkoutPage'
import Header from '@src/components/Header'
import '@src/index.css'

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<WorkoutsPage />} />
          <Route path="/new/" element={<CreateWorkoutPage />} />
          <Route path="/:workoutId" element={<WorkoutPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
