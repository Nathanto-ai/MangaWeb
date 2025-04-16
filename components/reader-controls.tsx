"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut, Maximize, Minimize, Menu, BookOpen, Columns, LayoutTemplate } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"

interface ReaderControlsProps {
  chapters: Array<{ number: number; title: string }>
  currentChapter: number
  onChapterChange: (chapterNumber: number) => void
  isDoublePage: boolean
  toggleDoublePage: () => void
  zoom: number
  onZoomChange: (newZoom: number) => void
}

export function ReaderControls({
  chapters,
  currentChapter,
  onChapterChange,
  isDoublePage,
  toggleDoublePage,
  zoom,
  onZoomChange,
}: ReaderControlsProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Check fullscreen status on mount and when it changes
  useEffect(() => {
    if (typeof document !== "undefined") {
      const handleFullscreenChange = () => {
        setIsFullscreen(!!document.fullscreenElement)
      }

      document.addEventListener("fullscreenchange", handleFullscreenChange)
      return () => {
        document.removeEventListener("fullscreenchange", handleFullscreenChange)
      }
    }
  }, [])

  const handleZoomIn = () => {
    if (zoom < 200) {
      onZoomChange(zoom + 10)
    }
  }

  const handleZoomOut = () => {
    if (zoom > 50) {
      onZoomChange(zoom - 10)
    }
  }

  const toggleFullscreen = () => {
    if (typeof document !== "undefined") {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch((err) => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`)
        })
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        }
      }
    }
  }

  if (!mounted) return null

  return (
    <div className="flex items-center gap-1 flex-wrap">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={handleZoomOut} title="Zoom Out" className="h-8 w-8">
          <ZoomOut className="h-4 w-4" />
          <span className="sr-only">Zoom Out</span>
        </Button>

        <span className="text-xs w-8 text-center">{zoom}%</span>

        <Button variant="ghost" size="icon" onClick={handleZoomIn} title="Zoom In" className="h-8 w-8">
          <ZoomIn className="h-4 w-4" />
          <span className="sr-only">Zoom In</span>
        </Button>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={toggleDoublePage}
        title={isDoublePage ? "Single Page Mode" : "Double Page Mode"}
        className="h-8 w-8"
      >
        {isDoublePage ? <LayoutTemplate className="h-4 w-4" /> : <Columns className="h-4 w-4" />}
        <span className="sr-only">{isDoublePage ? "Single Page Mode" : "Double Page Mode"}</span>
      </Button>

      <Button variant="ghost" size="icon" onClick={toggleFullscreen} title="Toggle Fullscreen" className="h-8 w-8">
        {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
        <span className="sr-only">Toggle Fullscreen</span>
      </Button>

      <ThemeToggle />

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" title="Chapter List" className="h-8 w-8">
            <Menu className="h-4 w-4" />
            <span className="sr-only">Chapter List</span>
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Chapters</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-1 max-h-[80vh] overflow-y-auto pr-4">
            {chapters.map((chapter) => (
              <SheetClose key={chapter.number} asChild>
                <Button
                  variant={chapter.number === currentChapter ? "secondary" : "ghost"}
                  className="w-full justify-start text-left"
                  onClick={() => onChapterChange(chapter.number)}
                >
                  <BookOpen className={`mr-2 h-4 w-4 ${chapter.number === currentChapter ? "text-primary" : ""}`} />
                  Chapter {chapter.number}: {chapter.title}
                </Button>
              </SheetClose>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
