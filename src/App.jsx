import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WorkoutsPage from './pages/WorkoutsPage'; 
import Header from './components/Header'
import './index.css';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<WorkoutsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;