import PropTypes from 'prop-types'
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { useState, useEffect, useContext, createContext } from 'react'
import { auth } from '@src/firebase/firebase'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
      setLoading(false)
    })
    return unsub
  }, [])

  const signin = (email, pw) => signInWithEmailAndPassword(auth, email, pw)
  const signout = () => signOut(auth)
  const signup = (email, pw) => createUserWithEmailAndPassword(auth, email, pw)
  const value = { user, loading, signin, signout, signup }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
