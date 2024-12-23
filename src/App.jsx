import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import WorkoutsPage from './pages/WorkoutsPage'
import CreateWorkoutPage from './pages/CreateWorkoutPage'
import Header from './components/Header'
import './index.css'

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<WorkoutsPage />} />
          <Route path="/create-workout/" element={<CreateWorkoutPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
