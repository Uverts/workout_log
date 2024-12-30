import { useState } from 'react'
import { useAuth } from '@src/context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import Heading from '@src/components/Heading'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await signup(email, password)
      navigate('/')
    } catch {
      console.log('login failed')
    }
  }
  return (
    <div className="h-screen">
      <div className="flex flex-col w-2/4 h-4/5 p-4 mx-auto">
        <form
          onSubmit={handleSubmit}
          className="h-full flex flex-col justify-center items-center shadow-2xl rounded-full bg-theme"
        >
          <Heading text={'Signup form'} color={'white'} />
          <input
            placeholder="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-2/4 rounded-lg p-2 mb-3"
          />
          <input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-2/4 rounded-lg p-2"
          />
          <button className="w-2/4 p-3 mt-5 bg-white hover:bg-gray-300 rounded-lg shadow-lg">
            Signup
          </button>
          <Link
            className="mt-3 underline text-blue-600 hover:text-blue-800"
            to="/login"
          >
            Already have an account?
          </Link>
        </form>
      </div>
    </div>
  )
}
