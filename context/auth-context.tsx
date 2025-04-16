"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

interface User {
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  isLoggedIn: boolean
  login: (user: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn")
    const storedUser = localStorage.getItem("user")

    if (storedIsLoggedIn === "true" && storedUser) {
      try {
        setUser(JSON.parse(storedUser))
        setIsLoggedIn(true)
      } catch (error) {
        console.error("Failed to parse user data:", error)
      }
    }

    setIsLoaded(true)
  }, [])

  const login = (userData: User) => {
    setUser(userData)
    setIsLoggedIn(true)
    localStorage.setItem("isLoggedIn", "true")
    localStorage.setItem("user", JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    setIsLoggedIn(false)
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("user")
  }

  // Don't render children until we've checked localStorage
  if (!isLoaded) {
    return null
  }

  return <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
