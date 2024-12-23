import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <nav className="flex justify-center p-4 gap-x-20 bg-white drop-shadow-md">
      <Link to="/">Workouts</Link>
      <Link to="/create-workout">Create workout</Link>
      <Link to="/stats">Dashboard</Link>
    </nav>
  )
}
