"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Button } from "@/components/ui/button"
import { ReaderControls } from "@/components/reader-controls"
import { ChevronLeft, ChevronRight, Home, BookOpen, Heart } from "lucide-react"
import { useRouter } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useBookmarks } from "@/context/bookmarks-context"
import { useAuth } from "@/context/auth-context"
import Head from "next/head"

interface ChapterReaderPageProps {
  params: {
    manga: string
    number: string
  }
}

export default function ChapterReaderPage({ params }: ChapterReaderPageProps) {
  const router = useRouter()
  // State for current page number
  const [currentPage, setCurrentPage] = useState(1)
  // State for zoom level (percentage)
  const [zoom, setZoom] = useState(100)
  // State for single/double page view toggle
  const [isDoublePage, setIsDoublePage] = useState(false)
  // State to prevent hydration mismatch
  const [mounted, setMounted] = useState(false)
  // Reference to the reader container for applying zoom
  const readerContainerRef = useRef<HTMLDivElement>(null)
  // Access bookmark functionality from context
  const { isBookmarked, toggleBookmark } = useBookmarks()
  // Access authentication state from context
  const { isLoggedIn } = useAuth()

  // Set mounted state to true after component mounts to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Mock data for the chapter
  // In a real app, this would be fetched from an API based on the manga and chapter number
  const chapter = {
    mangaTitle: "One Piece",
    mangaSlug: params.manga,
    number: Number.parseInt(params.number),
    title: "Egghead Incident",
    pages: 18, // Total pages in this chapter
    prevChapter: Number.parseInt(params.number) > 1 ? Number.parseInt(params.number) - 1 : null,
    nextChapter: Number.parseInt(params.number) < 1088 ? Number.parseInt(params.number) + 1 : null,
    cover: "/placeholder.svg?height=320&width=240",
    rating: 4.9,
    genres: ["Adventure", "Fantasy"],
  }

  // Generate chapter list for the dropdown
  // In a real app, this would be fetched from an API
  const chapters = Array.from({ length: 10 }, (_, i) => ({
    number: chapter.number - i,
    title: i === 0 ? "Egghead Incident" : `Chapter ${chapter.number - i}`,
  })).filter((ch) => ch.number > 0)

  /**
   * Navigate to the previous page
   * If on the first page, navigate to the previous chapter's last page
   * Handles double page view logic
   */
  const handlePrevPage = () => {
    if (isDoublePage) {
      if (currentPage > 2) {
        setCurrentPage(currentPage % 2 === 0 ? currentPage - 1 : currentPage - 2)
      } else if (currentPage > 1) {
        setCurrentPage(1)
      } else if (chapter.prevChapter) {
        // Navigate to previous chapter's last page
        router.push(`/chapter/${chapter.mangaSlug}/${chapter.prevChapter}?page=${chapter.pages}`)
      }
    } else {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1)
      } else if (chapter.prevChapter) {
        // Navigate to previous chapter's last page
        router.push(`/chapter/${chapter.mangaSlug}/${chapter.prevChapter}?page=${chapter.pages}`)
      }
    }
  }

  /**
   * Navigate to the next page
   * If on the last page, navigate to the next chapter
   * Handles double page view logic
   */
  const handleNextPage = () => {
    if (isDoublePage) {
      if (currentPage + 2 <= chapter.pages) {
        setCurrentPage(currentPage % 2 === 0 ? currentPage + 1 : currentPage + 2)
      } else if (currentPage < chapter.pages) {
        setCurrentPage(chapter.pages)
      } else if (chapter.nextChapter) {
        // Navigate to next chapter
        router.push(`/chapter/${chapter.mangaSlug}/${chapter.nextChapter}`)
      }
    } else {
      if (currentPage < chapter.pages) {
        setCurrentPage(currentPage + 1)
      } else if (chapter.nextChapter) {
        // Navigate to next chapter
        router.push(`/chapter/${chapter.mangaSlug}/${chapter.nextChapter}`)
      }
    }
  }

  /**
   * Navigate to a specific chapter
   */
  const handleChapterChange = (chapterNumber: number) => {
    router.push(`/chapter/${chapter.mangaSlug}/${chapterNumber}`)
  }

  /**
   * Toggle between single and double page view
   * Ensures we're on an odd page when switching to double page view
   */
  const toggleDoublePage = () => {
    setIsDoublePage((prev) => !prev)
    // Ensure we're on an odd page when switching to double page
    if (!isDoublePage && currentPage % 2 === 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  /**
   * Toggle bookmark status for this manga
   */
  const handleToggleBookmark = () => {
    toggleBookmark({
      title: chapter.mangaTitle,
      cover: chapter.cover,
      chapter: `Chapter ${chapter.number}`,
      rating: chapter.rating,
      genres: chapter.genres,
      slug: chapter.mangaSlug,
    })
  }

  // Apply zoom to the reader container when zoom state changes
  useEffect(() => {
    if (readerContainerRef.current) {
      readerContainerRef.current.style.transform = `scale(${zoom / 100})`
    }
  }, [zoom])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrevPage()
      } else if (e.key === "ArrowRight") {
        handleNextPage()
      } else if (e.key === "+") {
        setZoom((prev) => Math.min(prev + 10, 200))
      } else if (e.key === "-") {
        setZoom((prev) => Math.max(prev - 10, 50))
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [currentPage, isDoublePage]) // eslint-disable-line react-hooks/exhaustive-deps

  // Check for URL query params for page on initial load
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search)
      const pageParam = urlParams.get("page")
      if (pageParam) {
        const pageNumber = Number.parseInt(pageParam, 10)
        if (!isNaN(pageNumber) && pageNumber > 0 && pageNumber <= chapter.pages) {
          setCurrentPage(pageNumber)
        }
      }
    }
  }, [chapter.pages])

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) return null

  // Calculate which pages to show in double page mode
  const firstPageToShow = isDoublePage ? (currentPage % 2 === 0 ? currentPage - 1 : currentPage) : currentPage
  const secondPageToShow = isDoublePage ? (firstPageToShow + 1 <= chapter.pages ? firstPageToShow + 1 : null) : null

  return (
    <>
      {/* Head section for SEO and social sharing metadata */}
      <Head>
        <title>{`${chapter.mangaTitle} - Chapter ${chapter.number} | MangaVerse`}</title>
        <meta
          name="description"
          content={`Read ${chapter.mangaTitle} Chapter ${chapter.number}: ${chapter.title} online for free on MangaVerse.`}
        />
        <meta property="og:title" content={`${chapter.mangaTitle} - Chapter ${chapter.number} | MangaVerse`} />
        <meta
          property="og:description"
          content={`Read ${chapter.mangaTitle} Chapter ${chapter.number}: ${chapter.title} online for free on MangaVerse.`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={chapter.cover} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${chapter.mangaTitle} - Chapter ${chapter.number} | MangaVerse`} />
        <meta
          name="twitter:description"
          content={`Read ${chapter.mangaTitle} Chapter ${chapter.number}: ${chapter.title} online for free on MangaVerse.`}
        />
      </Head>

      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        {/* Reader header with navigation and controls */}
        <header className="border-b bg-background p-4 max-w-full">
          <div className="container flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 max-w-full">
            {/* Breadcrumb navigation */}
            <div className="w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 max-w-full">
              <Breadcrumbs
                items={[
                  { label: "Home", href: "/" },
                  { label: chapter.mangaTitle, href: `/manga/${chapter.mangaSlug}` },
                  {
                    label: `Chapter ${chapter.number}`,
                    href: `/chapter/${chapter.mangaSlug}/${chapter.number}`,
                    active: true,
                  },
                ]}
              />
            </div>

            {/* Reader controls */}
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              {/* Link to manga page */}
              <Link href={`/manga/${chapter.mangaSlug}`} className="hidden sm:flex">
                <Button variant="ghost" size="sm">
                  <Home className="h-4 w-4 mr-2" />
                  Manga Page
                </Button>
              </Link>
              {/* Link to infinite scroll reader */}
              <Link href={`/chapter/${chapter.mangaSlug}/${chapter.number}/infinite`} className="flex-1 sm:flex-none">
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                  <BookOpen className="h-4 w-4 mr-2" />
                  <span className="hidden xs:inline">Infinite Scroll</span>
                  <span className="xs:hidden">Infinite</span>
                </Button>
              </Link>
              {/* Bookmark button - only shown when logged in */}
              {mounted && isLoggedIn && (
                <Button
                  variant={isBookmarked(chapter.mangaSlug) ? "default" : "outline"}
                  size="sm"
                  onClick={handleToggleBookmark}
                  className="flex-1 sm:flex-none"
                >
                  <Heart
                    className={`mr-2 h-4 w-4 ${isBookmarked(chapter.mangaSlug) ? "fill-primary-foreground" : ""}`}
                  />
                  <span className="hidden xs:inline">
                    {isBookmarked(chapter.mangaSlug) ? "Bookmarked" : "Bookmark"}
                  </span>
                </Button>
              )}
              {/* Reader controls component */}
              <ReaderControls
                chapters={chapters}
                currentChapter={chapter.number}
                onChapterChange={handleChapterChange}
                isDoublePage={isDoublePage}
                toggleDoublePage={toggleDoublePage}
                zoom={zoom}
                onZoomChange={setZoom}
              />
            </div>
          </div>
        </header>

        {/* Main reader area */}
        <main className="flex-1 flex flex-col items-center justify-center bg-black p-4 overflow-hidden relative">
          {/* Reader container with zoom applied */}
          <div
            className="max-w-6xl w-full transition-transform duration-200 overflow-visible"
            ref={readerContainerRef}
            style={{
              transformOrigin: "center center",
            }}
          >
            {isDoublePage ? (
              // Double page view
              <div className="flex justify-center">
                {/* First page */}
                <div className="relative">
                  <Image
                    src={`/chapter-heading.png?height=1400&width=900&text=Chapter ${chapter.number} - Page ${firstPageToShow}`}
                    alt={`${chapter.mangaTitle} Chapter ${chapter.number} Page ${firstPageToShow}`}
                    width={900}
                    height={1400}
                    className="mx-auto"
                  />
                </div>
                {/* Second page (only show if it exists) */}
                {secondPageToShow && secondPageToShow <= chapter.pages && (
                  <div className="relative">
                    <Image
                      src={`/chapter-heading.png?height=1400&width=900&text=Chapter ${chapter.number} - Page ${secondPageToShow}`}
                      alt={`${chapter.mangaTitle} Chapter ${chapter.number} Page ${secondPageToShow}`}
                      width={900}
                      height={1400}
                      className="mx-auto"
                    />
                  </div>
                )}
              </div>
            ) : (
              // Single page view
              <div className="relative">
                <Image
                  src={`/chapter-heading.png?height=1400&width=900&text=Chapter ${chapter.number} - Page ${currentPage}`}
                  alt={`${chapter.mangaTitle} Chapter ${chapter.number} Page ${currentPage}`}
                  width={900}
                  height={1400}
                  className="mx-auto"
                />
              </div>
            )}
          </div>

          {/* Invisible click areas for page navigation */}
          <div className="absolute inset-0 flex items-stretch pointer-events-none">
            <button
              className="w-1/3 h-full cursor-w-resize focus:outline-none pointer-events-auto"
              onClick={handlePrevPage}
              aria-label="Previous page"
            >
              <span className="sr-only">Previous page</span>
            </button>
            <div className="w-1/3 h-full" />
            <button
              className="w-1/3 h-full cursor-e-resize focus:outline-none pointer-events-auto"
              onClick={handleNextPage}
              aria-label="Next page"
            >
              <span className="sr-only">Next page</span>
            </button>
          </div>
        </main>

        {/* Reader footer with chapter navigation */}
        <footer className="border-t bg-background p-4 max-w-full">
          <div className="container flex items-center justify-between max-w-full">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push(`/chapter/${chapter.mangaSlug}/${chapter.prevChapter}`)}
                disabled={!chapter.prevChapter}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                <span className="hidden xs:inline">Previous Chapter</span>
                <span className="xs:hidden">Prev</span>
              </Button>
            </div>

            {/* Page counter */}
            <div className="text-sm whitespace-nowrap">
              {isDoublePage && secondPageToShow
                ? `Pages ${firstPageToShow}-${secondPageToShow} of ${chapter.pages}`
                : `Page ${currentPage} of ${chapter.pages}`}
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push(`/chapter/${chapter.mangaSlug}/${chapter.nextChapter}`)}
                disabled={!chapter.nextChapter}
              >
                <span className="hidden xs:inline">Next Chapter</span>
                <span className="xs:hidden">Next</span>
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </footer>
        <SiteFooter />
      </div>
    </>
  )
}
