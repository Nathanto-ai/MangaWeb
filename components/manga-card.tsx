"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { Heart, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useBookmarks } from "@/context/bookmarks-context"
import { useAuth } from "@/context/auth-context"
import { useState, useEffect } from "react"

export interface MangaCardProps {
  title: string
  cover: string
  chapter: string
  rating: number
  genres: string[]
  updatedAt?: string // Optional timestamp for recently updated manga
  isNew?: boolean // Flag for newly added manga
  trending?: boolean // Flag for trending manga
  className?: string // Additional CSS classes
  slug?: string // URL slug for manga detail page
}

export function MangaCard({
  title,
  cover,
  chapter,
  rating,
  genres,
  updatedAt,
  isNew,
  trending,
  className,
  slug,
}: MangaCardProps) {
  // Access bookmark functionality from context
  const { isBookmarked, toggleBookmark } = useBookmarks()
  // Access authentication state from context
  const { isLoggedIn } = useAuth()
  // State to prevent hydration mismatch with server/client rendering
  const [mounted, setMounted] = useState(false)
  // State to track hover for showing/hiding bookmark button
  const [isHovered, setIsHovered] = useState(false)

  // Set mounted state to true after component mounts to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  /**
   * Handle bookmark button click
   * Prevents default link behavior and propagation
   * Toggles bookmark status in the bookmarks context
   */
  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!slug) return

    toggleBookmark({
      title,
      cover,
      chapter,
      rating,
      genres,
      slug,
    })
  }

  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-lg border bg-background transition-all hover:shadow-md",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Cover image container with aspect ratio preservation */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <Image
          src={cover || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        {/* Bookmark button - only shown when logged in */}
        {mounted && isLoggedIn && (
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute right-2 top-2 h-8 w-8 rounded-full bg-background/80",
              isHovered || isBookmarked(slug || "") ? "opacity-100" : "opacity-0",
              "transition-opacity group-hover:opacity-100",
            )}
            onClick={handleBookmarkClick}
            aria-label={isBookmarked(slug || "") ? "Remove from bookmarks" : "Add to bookmarks"}
          >
            <Heart className={cn("h-4 w-4", isBookmarked(slug || "") ? "fill-primary text-primary" : "")} />
            <span className="sr-only">{isBookmarked(slug || "") ? "Remove from bookmarks" : "Add to bookmarks"}</span>
          </Button>
        )}
        {/* Status badges - New, Trending, or Updated */}
        {isNew && (
          <Badge className="absolute left-2 top-2" variant="secondary">
            New
          </Badge>
        )}
        {trending && (
          <Badge className="absolute left-2 top-2" variant="default">
            Trending
          </Badge>
        )}
        {updatedAt && (
          <Badge className="absolute left-2 top-2" variant="outline">
            {updatedAt}
          </Badge>
        )}
      </div>
      {/* Manga information section */}
      <div className="flex flex-1 flex-col justify-between p-3">
        <div className="space-y-1">
          <h3 className="font-medium leading-tight line-clamp-1">{title}</h3>
          <div className="flex items-center text-sm text-muted-foreground">
            <span className="line-clamp-1">{chapter}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-primary text-primary" />
            <span className="text-xs">{rating.toFixed(1)}</span>
          </div>
        </div>
        {/* Genre badges - limited to first 2 for space */}
        <div className="mt-2 flex flex-wrap gap-1">
          {genres.slice(0, 2).map((genre) => (
            <Badge key={genre} variant="outline" className="text-xs">
              {genre}
            </Badge>
          ))}
        </div>
      </div>
      {/* Full card link - makes entire card clickable */}
      <Link href={`/manga/${slug || title.toLowerCase().replace(/\s+/g, "-")}`} className="absolute inset-0">
        <span className="sr-only">View {title}</span>
      </Link>
    </div>
  )
}
