"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  // Access theme state and setter from next-themes
  const { theme, setTheme } = useTheme()
  // State to prevent hydration mismatch
  const [mounted, setMounted] = useState(false)

  // Set mounted state to true after component mounts
  // This prevents hydration mismatch between server and client rendering
  useEffect(() => {
    setMounted(true)
  }, [])

  /**
   * Toggle between light and dark themes
   * Uses the current theme to determine which theme to switch to
   */
  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light")
    } else {
      setTheme("dark")
    }
  }

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return null
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      {/* Show Sun icon in dark mode, Moon icon in light mode */}
      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  )
}
