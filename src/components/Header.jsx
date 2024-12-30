import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@src/context/AuthContext'

export default function Header() {
  const { user, signout } = useAuth()
  const navigate = useNavigate()
  const handleSignout = async () => {
    await signout()
    navigate('/login')
  }
  if (user) {
    return (
      <div>
        <nav className="flex p-4 bg-white drop-shadow-md">
          <div className="flex basis-11/12 justify-center gap-x-20">
            <Link to="/">Workouts</Link>
            <Link to="/new">New</Link>
            <Link to="/dashboard">Dashboard</Link>
          </div>
          <button className="" onClick={handleSignout}>
            Logout
          </button>
        </nav>
      </div>
    )
  } else {
    return (
      <nav className="flex justify-center p-4 gap-x-20 bg-white drop-shadow-md">
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </nav>
    )
  }
}
