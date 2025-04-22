"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Button } from "@/components/ui/button"
import { ReaderControls } from "@/components/reader-controls"
import { ChevronUp, ChevronDown, Home, ArrowLeft, ArrowRight, BookOpen, Heart } from "lucide-react"
import { useRouter } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useBookmarks } from "@/context/bookmarks-context"
import { useAuth } from "@/context/auth-context"
import Head from "next/head"

interface InfiniteReaderPageProps {
  params: {
    manga: string
    number: string
  }
}

export default function InfiniteReaderPage({ params }: InfiniteReaderPageProps) {
  const router = useRouter()
  // State for loading indicator when fetching next chapter
  const [isLoading, setIsLoading] = useState(false)
  // States for chapter navigation availability
  const [hasNextChapter, setHasNextChapter] = useState(true)
  const [hasPrevChapter, setHasPrevChapter] = useState(true)
  // State for zoom level (percentage)
  const [zoom, setZoom] = useState(100)
  // State for single/double page view toggle
  const [isDoublePage, setIsDoublePage] = useState(false)
  // State to prevent hydration mismatch
  const [mounted, setMounted] = useState(false)
  // Reference for intersection observer target (for infinite loading)
  const observerTarget = useRef<HTMLDivElement>(null)
  // Reference for reader container (for applying zoom)
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

  // Update navigation availability based on chapter data
  useEffect(() => {
    setHasPrevChapter(chapter.prevChapter !== null)
    setHasNextChapter(chapter.nextChapter !== null)
  }, [chapter.prevChapter, chapter.nextChapter])

  // Apply zoom to the reader container when zoom state changes
  useEffect(() => {
    if (readerContainerRef.current) {
      readerContainerRef.current.style.transform = `scale(${zoom / 100})`
    }
  }, [zoom])

  /**
   * Navigate to the previous chapter
   */
  const handlePrevChapter = () => {
    if (chapter.prevChapter) {
      router.push(`/chapter/${chapter.mangaSlug}/${chapter.prevChapter}/infinite`)
    }
  }

  /**
   * Navigate to the next chapter
   */
  const handleNextChapter = () => {
    if (chapter.nextChapter) {
      router.push(`/chapter/${chapter.mangaSlug}/${chapter.nextChapter}/infinite`)
    }
  }

  /**
   * Navigate to a specific chapter
   */
  const handleChapterChange = (chapterNumber: number) => {
    router.push(`/chapter/${chapter.mangaSlug}/${chapterNumber}/infinite`)
  }

  /**
   * Toggle between single and double page view
   */
  const toggleDoublePage = () => {
    setIsDoublePage((prev) => !prev)
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

  // Generate an array of page numbers for rendering
  const pages = Array.from({ length: chapter.pages }, (_, i) => i + 1)

  // Handle keyboard shortcuts for zoom
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "+") {
        setZoom((prev) => Math.min(prev + 10, 200))
      } else if (e.key === "-") {
        setZoom((prev) => Math.max(prev - 10, 50))
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  // Set up intersection observer for infinite loading
  useEffect(() => {
    if (!observerTarget.current || !hasNextChapter) return

    // Create an intersection observer to detect when user scrolls to the bottom
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && hasNextChapter) {
          setIsLoading(true)
          // Simulate loading next chapter
          setTimeout(() => {
            if (chapter.nextChapter) {
              router.push(`/chapter/${chapter.mangaSlug}/${chapter.nextChapter}/infinite`)
            }
            setIsLoading(false)
          }, 2000)
        }
      },
      { threshold: 0.5 },
    )

    observer.observe(observerTarget.current)
    return () => observer.disconnect()
  }, [hasNextChapter, isLoading, chapter.nextChapter, chapter.mangaSlug, router])

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) return null

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
        <header className="sticky top-0 z-40 border-b bg-background p-4 overflow-x-auto">
          <div className="container flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Breadcrumb navigation */}
            <div className="w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
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
              {/* Link to standard reader */}
              <Link href={`/chapter/${chapter.mangaSlug}/${chapter.number}`} className="flex-1 sm:flex-none">
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                  <BookOpen className="h-4 w-4 mr-2" />
                  <span className="hidden xs:inline">Standard Reader</span>
                  <span className="xs:hidden">Standard</span>
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
              {/* Chapter navigation buttons - only visible on larger screens */}
              <div className="hidden sm:flex items-center gap-1">
                <Button variant="outline" size="sm" onClick={handlePrevChapter} disabled={!hasPrevChapter}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Prev Chapter
                </Button>
                <Button variant="outline" size="sm" onClick={handleNextChapter} disabled={!hasNextChapter}>
                  Next Chapter
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
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
        <main className="flex-1 flex flex-col items-center bg-black">
          {/* Reader container with zoom applied */}
          <div
            className="max-w-4xl w-full transition-transform duration-200"
            ref={readerContainerRef}
            style={{ transformOrigin: "center top" }}
          >
            {isDoublePage ? (
              // Double page view
              <div>
                {Array.from({ length: Math.ceil(pages.length / 2) }, (_, i) => i * 2 + 1).map((pageNum) => (
                  <div key={pageNum} className="mb-2 flex justify-center">
                    <Image
                      src={`/chapter-heading.png?height=1400&width=900&text=Chapter ${chapter.number} - Page ${pageNum}`}
                      alt={`${chapter.mangaTitle} Chapter ${chapter.number} Page ${pageNum}`}
                      width={900}
                      height={1400}
                      className="mx-auto"
                    />
                    {pageNum + 1 <= pages.length && (
                      <Image
                        src={`/chapter-heading.png?height=1400&width=900&text=Chapter ${chapter.number} - Page ${pageNum + 1}`}
                        alt={`${chapter.mangaTitle} Chapter ${chapter.number} Page ${pageNum + 1}`}
                        width={900}
                        height={1400}
                        className="mx-auto"
                      />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              // Single page view
              <div>
                {pages.map((pageNum) => (
                  <div key={pageNum} className="mb-2">
                    <Image
                      src={`/chapter-heading.png?height=1400&width=900&text=Chapter ${chapter.number} - Page ${pageNum}`}
                      alt={`${chapter.mangaTitle} Chapter ${chapter.number} Page ${pageNum}`}
                      width={900}
                      height={1400}
                      className="mx-auto"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Observer target for infinite loading */}
            <div ref={observerTarget} className="h-20 flex items-center justify-center">
              {isLoading ? (
                <div className="animate-pulse text-white">Loading next chapter...</div>
              ) : !hasNextChapter ? (
                <div className="text-white">You've reached the latest chapter</div>
              ) : null}
            </div>
          </div>
        </main>

        {/* Reader footer with chapter navigation */}
        <footer className="sticky bottom-0 border-t bg-background p-4 overflow-x-auto">
          <div className="container flex items-center justify-between">
            <Button variant="outline" size="sm" onClick={handlePrevChapter} disabled={!hasPrevChapter}>
              <ChevronUp className="h-4 w-4 mr-2" />
              <span className="hidden xs:inline">Previous Chapter</span>
              <span className="xs:hidden">Prev</span>
            </Button>

            <div className="text-sm truncate mx-2">
              <span className="hidden xs:inline">
                Chapter {chapter.number}: {chapter.title}
              </span>
              <span className="xs:inline sm:hidden">Ch. {chapter.number}</span>
            </div>

            <Button variant="outline" size="sm" onClick={handleNextChapter} disabled={!hasNextChapter}>
              <span className="hidden xs:inline">Next Chapter</span>
              <span className="xs:hidden">Next</span>
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </footer>
        <SiteFooter />
      </div>
    </>
  )
}
