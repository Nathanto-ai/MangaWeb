"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

interface Manga {
  title: string
  slug: string
  cover: string
  chapter: string
  rating: number
  genres: string[]
}

interface BookmarksContextType {
  bookmarks: Manga[]
  isBookmarked: (slug: string) => boolean
  addBookmark: (manga: Manga) => void
  removeBookmark: (slug: string) => void
  toggleBookmark: (manga: Manga) => void
}

const BookmarksContext = createContext<BookmarksContextType | undefined>(undefined)

export function BookmarksProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<Manga[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

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

  const isBookmarked = (slug: string) => {
    return bookmarks.some((bookmark) => bookmark.slug === slug)
  }

  const addBookmark = (manga: Manga) => {
    if (!isBookmarked(manga.slug)) {
      setBookmarks([...bookmarks, manga])
    }
  }

  const removeBookmark = (slug: string) => {
    setBookmarks(bookmarks.filter((bookmark) => bookmark.slug !== slug))
  }

  const toggleBookmark = (manga: Manga) => {
    if (isBookmarked(manga.slug)) {
      removeBookmark(manga.slug)
    } else {
      addBookmark(manga)
    }
  }

  // Don't render children until we've checked localStorage
  if (!isLoaded) {
    return null
  }

  return (
    <BookmarksContext.Provider value={{ bookmarks, isBookmarked, addBookmark, removeBookmark, toggleBookmark }}>
      {children}
    </BookmarksContext.Provider>
  )
}

export function useBookmarks() {
  const context = useContext(BookmarksContext)
  if (context === undefined) {
    throw new Error("useBookmarks must be used within a BookmarksProvider")
  }
  return context
}
