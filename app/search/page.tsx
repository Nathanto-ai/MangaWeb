"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { MangaCard } from "@/components/manga-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SearchIcon } from "lucide-react"
import { SkeletonLoader } from "@/components/skeleton-loader"

// Mock data for search results
const MANGA_DATA = [
  {
    title: "One Piece",
    cover: "/placeholder.svg?height=320&width=240",
    chapter: "Chapter 1088",
    rating: 4.9,
    genres: ["Adventure", "Fantasy"],
    slug: "one-piece",
  },
  {
    title: "Jujutsu Kaisen",
    cover: "/placeholder.svg?height=320&width=240",
    chapter: "Chapter 253",
    rating: 4.8,
    genres: ["Action", "Supernatural"],
    slug: "jujutsu-kaisen",
  },
  {
    title: "Chainsaw Man",
    cover: "/placeholder.svg?height=320&width=240",
    chapter: "Chapter 156",
    rating: 4.7,
    genres: ["Action", "Horror"],
    slug: "chainsaw-man",
  },
  {
    title: "My Hero Academia",
    cover: "/placeholder.svg?height=320&width=240",
    chapter: "Chapter 420",
    rating: 4.6,
    genres: ["Action", "Superhero"],
    slug: "my-hero-academia",
  },
  {
    title: "Demon Slayer",
    cover: "/placeholder.svg?height=320&width=240",
    chapter: "Chapter 205",
    rating: 4.8,
    genres: ["Action", "Supernatural"],
    slug: "demon-slayer",
  },
  {
    title: "Tokyo Revengers",
    cover: "/placeholder.svg?height=320&width=240",
    chapter: "Chapter 278",
    rating: 4.5,
    genres: ["Action", "Drama"],
    slug: "tokyo-revengers",
  },
  {
    title: "Spy x Family",
    cover: "/placeholder.svg?height=320&width=240",
    chapter: "Chapter 92",
    rating: 4.9,
    genres: ["Action", "Comedy"],
    slug: "spy-x-family",
  },
  {
    title: "Black Clover",
    cover: "/placeholder.svg?height=320&width=240",
    chapter: "Chapter 368",
    rating: 4.6,
    genres: ["Fantasy", "Action"],
    slug: "black-clover",
  },
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [searchQuery, setSearchQuery] = useState(query)
  const [results, setResults] = useState<typeof MANGA_DATA>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (query) {
      setIsLoading(true)
      // Simulate search delay
      setTimeout(() => {
        const filteredResults = MANGA_DATA.filter((manga) => manga.title.toLowerCase().includes(query.toLowerCase()))
        setResults(filteredResults)
        setIsLoading(false)
      }, 500)
    } else {
      setResults([])
    }
  }, [query])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Update URL with search query
    const url = new URL(window.location.href)
    url.searchParams.set("q", searchQuery)
    window.history.pushState({}, "", url.toString())

    // Trigger search
    setIsLoading(true)
    setTimeout(() => {
      const filteredResults = MANGA_DATA.filter((manga) =>
        manga.title.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setResults(filteredResults)
      setIsLoading(false)
    }, 500)
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Search", href: "/search", active: true },
        ]}
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Search Manga</h1>

        <form onSubmit={handleSearch} className="flex w-full max-w-lg gap-2 mb-8">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for manga titles, authors, or genres..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button type="submit">Search</Button>
        </form>

        {query && (
          <p className="text-muted-foreground mb-6">
            {isLoading
              ? "Searching..."
              : results.length === 0
                ? "No results found"
                : `Found ${results.length} results for "${query}"`}
          </p>
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {[...Array(8)].map((_, i) => (
            <SkeletonLoader key={i} />
          ))}
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {results.map((manga, index) => (
            <MangaCard
              key={`${manga.slug}-${index}`}
              title={manga.title}
              cover={manga.cover}
              chapter={manga.chapter}
              rating={manga.rating}
              genres={manga.genres}
              slug={manga.slug}
            />
          ))}
        </div>
      ) : query ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No manga found</h3>
          <p className="text-muted-foreground">Try searching for something else or browse our categories</p>
        </div>
      ) : null}
    </div>
  )
}
