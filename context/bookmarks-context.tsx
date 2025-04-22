"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

// Manga interface defining the structure of bookmarked manga data
interface Manga {
  title: string
  slug: string
  cover: string
  chapter: string
  rating: number
  genres: string[]
}

// BookmarksContext interface defining the shape of the context value
interface BookmarksContextType {
  bookmarks: Manga[] // Array of bookmarked manga
  isBookmarked: (slug: string) => boolean // Function to check if a manga is bookmarked
  addBookmark: (manga: Manga) => void // Function to add a bookmark
  removeBookmark: (slug: string) => void // Function to remove a bookmark
  toggleBookmark: (manga: Manga) => void // Function to toggle bookmark status
}

// Create the context with undefined initial value
const BookmarksContext = createContext<BookmarksContextType | undefined>(undefined)

/**
 * BookmarksProvider Component
 *
 * Provides bookmark state and functions to child components.
 * Handles loading bookmarks from localStorage on mount and saving on changes.
 */
export function BookmarksProvider({ children }: { children: ReactNode }) {
  // State for bookmarked manga
  const [bookmarks, setBookmarks] = useState<Manga[]>([])
  // State to track if bookmarks have been loaded from localStorage
  const [isLoaded, setIsLoaded] = useState(false)

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    // Load bookmarks from localStorage
    const storedBookmarks = localStorage.getItem("bookmarks")
    if (storedBookmarks) {
      try {
        setBookmarks(JSON.parse(storedBookmarks))
      } catch (error) {
        console.error("Failed to parse bookmarks:", error)
      }
    }
    setIsLoaded(true)
  }, [])

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
    }
  }, [bookmarks, isLoaded])

  /**
   * Check if a manga is bookmarked by its slug
   */
  const isBookmarked = (slug: string) => {
    return bookmarks.some((bookmark) => bookmark.slug === slug)
  }

  /**
   * Add a manga to bookmarks if not already bookmarked
   */
  const addBookmark = (manga: Manga) => {
    if (!isBookmarked(manga.slug)) {
      setBookmarks([...bookmarks, manga])
    }
  }

  /**
   * Remove a manga from bookmarks by its slug
   */
  const removeBookmark = (slug: string) => {
    setBookmarks(bookmarks.filter((bookmark) => bookmark.slug !== slug))
  }

  /**
   * Toggle bookmark status for a manga
   * Removes it if already bookmarked, adds it if not
   */
  const toggleBookmark = (manga: Manga) => {
    if (isBookmarked(manga.slug)) {
      removeBookmark(manga.slug)
    } else {
      addBookmark(manga)
    }
  }

  // Don't render children until we've checked localStorage
  // This prevents flash of unbookmarked content
  if (!isLoaded) {
    return null
  }

  return (
    <BookmarksContext.Provider value={{ bookmarks, isBookmarked, addBookmark, removeBookmark, toggleBookmark }}>
      {children}
    </BookmarksContext.Provider>
  )
}

/**
 * useBookmarks Hook
 *
 * Custom hook to access the bookmarks context.
 * Throws an error if used outside of a BookmarksProvider.
 */
export function useBookmarks() {
  const context = useContext(BookmarksContext)
  if (context === undefined) {
    throw new Error("useBookmarks must be used within a BookmarksProvider")
  }
  return context
}
