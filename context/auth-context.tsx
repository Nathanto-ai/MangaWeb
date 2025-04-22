"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

// User interface defining the structure of user data
interface User {
  name: string
  email: string
}

// AuthContext interface defining the shape of the context value
interface AuthContextType {
  user: User | null // Current user data or null if not logged in
  isLoggedIn: boolean // Authentication state
  login: (user: User) => void // Function to log in a user
  logout: () => void // Function to log out the current user
}

// Create the context with undefined initial value
const AuthContext = createContext<AuthContextType | undefined>(undefined)

/**
 * AuthProvider Component
 *
 * Provides authentication state and functions to child components.
 * Handles loading auth state from localStorage on mount.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  // State for the current user
  const [user, setUser] = useState<User | null>(null)
  // State for login status
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  // State to track if auth data has been loaded from localStorage
  const [isLoaded, setIsLoaded] = useState(false)

  // Load authentication state from localStorage on mount
  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn")
    const storedUser = localStorage.getItem("user")

    if (storedIsLoggedIn === "true" && storedUser) {
      try {
        // Parse and set user data from localStorage
        setUser(JSON.parse(storedUser))
        setIsLoggedIn(true)
      } catch (error) {
        console.error("Failed to parse user data:", error)
      }
    }

    // Mark as loaded to prevent unnecessary re-renders
    setIsLoaded(true)
  }, [])

  /**
   * Log in a user
   * Updates state and persists to localStorage
   */
  const login = (userData: User) => {
    setUser(userData)
    setIsLoggedIn(true)
    localStorage.setItem("isLoggedIn", "true")
    localStorage.setItem("user", JSON.stringify(userData))
  }

  /**
   * Log out the current user
   * Clears state and localStorage
   */
  const logout = () => {
    setUser(null)
    setIsLoggedIn(false)
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("user")
  }

  // Don't render children until we've checked localStorage
  // This prevents flash of unauthenticated content
  if (!isLoaded) {
    return null
  }

  return <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>{children}</AuthContext.Provider>
}

/**
 * useAuth Hook
 *
 * Custom hook to access the auth context.
 * Throws an error if used outside of an AuthProvider.
 */
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
