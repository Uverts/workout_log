import { useState } from 'react'
import { useAuth } from '@src/context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import Heading from '@src/components/Heading'

export default function LogInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const { signin } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await signin(email, password)
      navigate('/')
    } catch {
      setErrorMsg('Wrong password or email')
    }
  }
  return (
    <div className="h-screen">
      <div className="flex flex-col w-2/4 h-4/5 p-4 mx-auto">
        <form
          onSubmit={handleSubmit}
          className="h-full flex flex-col justify-center items-center shadow-2xl rounded-full bg-theme"
        >
          <Heading text={'Login form'} color={'white'} />
          <input
            placeholder="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-2/4 rounded-lg p-2 mb-3"
            required
          />
          <input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-2/4 rounded-lg p-2"
          />
          <button className="w-2/4 p-3 mt-5 bg-white  hover:bg-gray-300 rounded-lg shadow-lg">
            Login
          </button>
          <Link
            className="mt-3 underline text-blue-600 hover:text-blue-800"
            to="/signup"
          >
            Don&apos;t have an account?
          </Link>
          <p className="text-red-600">{errorMsg}</p>
        </form>
      </div>
    </div>
  )
}
