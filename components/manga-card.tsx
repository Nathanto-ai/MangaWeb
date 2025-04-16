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
  updatedAt?: string
  isNew?: boolean
  trending?: boolean
  className?: string
  slug?: string
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
  const { isBookmarked, toggleBookmark } = useBookmarks()
  const { isLoggedIn } = useAuth()
  const [mounted, setMounted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

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
      <div className="relative aspect-[2/3] overflow-hidden">
        <Image
          src={cover || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
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
        <div className="mt-2 flex flex-wrap gap-1">
          {genres.slice(0, 2).map((genre) => (
            <Badge key={genre} variant="outline" className="text-xs">
              {genre}
            </Badge>
          ))}
        </div>
      </div>
      <Link href={`/manga/${slug || title.toLowerCase().replace(/\s+/g, "-")}`} className="absolute inset-0">
        <span className="sr-only">View {title}</span>
      </Link>
    </div>
  )
}
