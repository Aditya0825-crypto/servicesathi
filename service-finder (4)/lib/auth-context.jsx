import { createContext, useContext, useEffect, useState } from "react"
import { signIn, signUp } from "@/lib/firebase-service"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  // Load user from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("user-data")
    if (stored) setUser(JSON.parse(stored))
  }, [])

  // LOGIN
  const login = async (email, password) => {
    try {
      const result = await signIn({ email, password })
      if (result.success) {
        localStorage.setItem("user-data", JSON.stringify(result.user))
        setUser(result.user)
        return { success: true }
      } else {
        return { success: false, error: result.error }
      }
    } catch (err) {
      return { success: false, error: err.message || "Login failed" }
    }
  }

  // REGISTER
  const register = async (userData) => {
    const result = await signUp(userData)
    if (result.success) {
      localStorage.setItem("user-data", JSON.stringify(result.user))
      setUser(result.user)
    }
    return result
  }

  // LOGOUT
  const logout = () => {
    setUser(null)
    localStorage.removeItem("user-data")
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
