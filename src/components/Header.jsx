import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <nav className="flex justify-center p-4 gap-x-20 bg-white drop-shadow-md">
      <Link to="/">Workouts</Link>
      <Link to="/new">New</Link>
      <Link to="/stats">Dashboard</Link>
    </nav>
  )
}
