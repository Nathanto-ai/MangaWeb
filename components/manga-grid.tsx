"use client"

import { useState } from "react"
import { MangaCard } from "@/components/manga-card"
import { Button } from "@/components/ui/button"
import { SkeletonLoader } from "@/components/skeleton-loader"

// Mock data - in a real app, this would come from an API
const MANGA_DATA = {
  popular: [
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
    {
      title: "Dragon Ball Super",
      cover: "/placeholder.svg?height=320&width=240",
      chapter: "Chapter 97",
      rating: 4.7,
      genres: ["Action", "Adventure"],
      slug: "dragon-ball-super",
    },
    {
      title: "One Punch Man",
      cover: "/placeholder.svg?height=320&width=240",
      chapter: "Chapter 192",
      rating: 4.8,
      genres: ["Action", "Comedy"],
      slug: "one-punch-man",
    },
    {
      title: "Boruto",
      cover: "/placeholder.svg?height=320&width=240",
      chapter: "Chapter 80",
      rating: 4.3,
      genres: ["Action", "Adventure"],
      slug: "boruto",
    },
    {
      title: "Attack on Titan",
      cover: "/placeholder.svg?height=320&width=240",
      chapter: "Chapter 139",
      rating: 4.9,
      genres: ["Action", "Drama"],
      slug: "attack-on-titan",
    },
  ],
  updated: [
    {
      title: "Jujutsu Kaisen",
      cover: "/placeholder.svg?height=320&width=240",
      chapter: "Chapter 253",
      rating: 4.8,
      genres: ["Action", "Supernatural"],
      updatedAt: "2 hours ago",
      slug: "jujutsu-kaisen",
    },
    {
      title: "One Piece",
      cover: "/placeholder.svg?height=320&width=240",
      chapter: "Chapter 1088",
      rating: 4.9,
      genres: ["Adventure", "Fantasy"],
      updatedAt: "5 hours ago",
      slug: "one-piece",
    },
    {
      title: "My Hero Academia",
      cover: "/placeholder.svg?height=320&width=240",
      chapter: "Chapter 420",
      rating: 4.6,
      genres: ["Action", "Superhero"],
      updatedAt: "8 hours ago",
      slug: "my-hero-academia",
    },
    {
      title: "Chainsaw Man",
      cover: "/placeholder.svg?height=320&width=240",
      chapter: "Chapter 156",
      rating: 4.7,
      genres: ["Action", "Horror"],
      updatedAt: "12 hours ago",
      slug: "chainsaw-man",
    },
    {
      title: "Blue Lock",
      cover: "/placeholder.svg?height=320&width=240",
      chapter: "Chapter 232",
      rating: 4.7,
      genres: ["Sports", "Drama"],
      updatedAt: "1 day ago",
      slug: "blue-lock",
    },
    {
      title: "Kaiju No. 8",
      cover: "/placeholder.svg?height=320&width=240",
      chapter: "Chapter 98",
      rating: 4.6,
      genres: ["Action", "Sci-Fi"],
      updatedAt: "1 day ago",
      slug: "kaiju-no-8",
    },
  ],
  new: [
    {
      title: "Sakamoto Days",
      cover: "/placeholder.svg?height=320&width=240",
      chapter: "Chapter 1",
      rating: 4.5,
      genres: ["Action", "Comedy"],
      isNew: true,
      slug: "sakamoto-days",
    },
    {
      title: "Dandadan",
      cover: "/placeholder.svg?height=320&width=240",
      chapter: "Chapter 1",
      rating: 4.7,
      genres: ["Supernatural", "Comedy"],
      isNew: true,
      slug: "dandadan",
    },
    {
      title: "Witch Watch",
      cover: "/placeholder.svg?height=320&width=240",
      chapter: "Chapter 1",
      rating: 4.4,
      genres: ["Comedy", "Supernatural"],
      isNew: true,
      slug: "witch-watch",
    },
    {
      title: "Ayashimon",
      cover: "/placeholder.svg?height=320&width=240",
      chapter: "Chapter 1",
      rating: 4.3,
      genres: ["Action", "Supernatural"],
      isNew: true,
      slug: "ayashimon",
    },
    {
      title: "Doron Dororon",
      cover: "/placeholder.svg?height=320&width=240",
      chapter: "Chapter 1",
      rating: 4.2,
      genres: ["Action", "Supernatural"],
      isNew: true,
      slug: "doron-dororon",
    },
    {
      title: "Earthchild",
      cover: "/placeholder.svg?height=320&width=240",
      chapter: "Chapter 1",
      rating: 4.1,
      genres: ["Sci-Fi", "Drama"],
      isNew: true,
      slug: "earthchild",
    },
  ],
  trending: [
    {
      title: "Chainsaw Man",
      cover: "/placeholder.svg?height=320&width=240",
      chapter: "Chapter 156",
      rating: 4.7,
      genres: ["Action", "Horror"],
      trending: true,
      slug: "chainsaw-man",
    },
    {
      title: "Jujutsu Kaisen",
      cover: "/placeholder.svg?height=320&width=240",
      chapter: "Chapter 253",
      rating: 4.8,
      genres: ["Action", "Supernatural"],
      trending: true,
      slug: "jujutsu-kaisen",
    },
    {
      title: "One Piece",
      cover: "/placeholder.svg?height=320&width=240",
      chapter: "Chapter 1088",
      rating: 4.9,
      genres: ["Adventure", "Fantasy"],
      trending: true,
      slug: "one-piece",
    },
    {
      title: "Spy x Family",
      cover: "/placeholder.svg?height=320&width=240",
      chapter: "Chapter 92",
      rating: 4.9,
      genres: ["Action", "Comedy"],
      trending: true,
      slug: "spy-x-family",
    },
    {
      title: "Blue Lock",
      cover: "/placeholder.svg?height=320&width=240",
      chapter: "Chapter 232",
      rating: 4.7,
      genres: ["Sports", "Drama"],
      trending: true,
      slug: "blue-lock",
    },
    {
      title: "Dandadan",
      cover: "/placeholder.svg?height=320&width=240",
      chapter: "Chapter 25",
      rating: 4.7,
      genres: ["Supernatural", "Comedy"],
      trending: true,
      slug: "dandadan",
    },
  ],
}

interface MangaGridProps {
  category: "popular" | "updated" | "new" | "trending"
}

export function MangaGrid({ category }: MangaGridProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [items, setItems] = useState(MANGA_DATA[category])

  const loadMore = () => {
    setIsLoading(true)
    // Simulate loading more items
    setTimeout(() => {
      setItems([...items, ...MANGA_DATA[category].slice(0, 6)])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {items.map((manga, index) => (
          <MangaCard
            key={`${manga.title}-${index}`}
            title={manga.title}
            cover={manga.cover}
            chapter={manga.chapter}
            rating={manga.rating}
            genres={manga.genres}
            updatedAt={manga.updatedAt}
            isNew={manga.isNew}
            trending={manga.trending}
            slug={manga.slug || manga.title.toLowerCase().replace(/\s+/g, "-")}
          />
        ))}
      </div>

      {isLoading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {[...Array(6)].map((_, i) => (
            <SkeletonLoader key={i} />
          ))}
        </div>
      )}

      <div className="flex justify-center">
        <Button variant="outline" onClick={loadMore} disabled={isLoading}>
          {isLoading ? "Loading..." : "Load More"}
        </Button>
      </div>
    </div>
  )
}
