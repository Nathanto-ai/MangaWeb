"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, BookOpen, Clock, Heart } from "lucide-react"
import { ChapterList } from "@/components/chapter-list"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useBookmarks } from "@/context/bookmarks-context"
import { useAuth } from "@/context/auth-context"
import Head from "next/head"

interface MangaDetailPageProps {
  params: {
    slug: string
  }
}

export default function MangaDetailPage({ params }: MangaDetailPageProps) {
  const { isBookmarked, toggleBookmark } = useBookmarks()
  const { isLoggedIn } = useAuth()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // In a real app, you would fetch the manga data based on the slug
  // For now, we'll use mock data
  const manga = {
    title: "One Piece",
    slug: "one-piece",
    cover: "/placeholder.svg?height=600&width=400",
    author: "Eiichiro Oda",
    artist: "Eiichiro Oda",
    status: "Ongoing",
    releaseYear: 1997,
    rating: 4.9,
    genres: ["Adventure", "Fantasy", "Action", "Comedy", "Drama", "Shounen"],
    synopsis:
      'Gol D. Roger, a man referred to as the "Pirate King," is set to be executed by the World Government. But just before his death, he confirms the existence of a great treasure, One Piece, located somewhere within the vast ocean known as the Grand Line. Announcing that One Piece can be claimed by anyone worthy enough to reach it, the Pirate King is executed and the Great Age of Pirates begins. Twenty-two years later, a young man named Monkey D. Luffy is ready to embark on his own adventure, searching for One Piece and striving to become the new Pirate King.',
    chapters: [
      { number: 1088, title: "Egghead Incident", releaseDate: "2023-08-06", views: 1250000 },
      { number: 1087, title: "Luffy's Dream", releaseDate: "2023-07-30", views: 1200000 },
      { number: 1086, title: "A Message to the World", releaseDate: "2023-07-23", views: 1150000 },
      { number: 1085, title: "The Will of Ohara", releaseDate: "2023-07-16", views: 1100000 },
      { number: 1084, title: "Beyond the Flames", releaseDate: "2023-07-09", views: 1050000 },
      { number: 1083, title: "The Legend of Vegapunk", releaseDate: "2023-07-02", views: 1000000 },
      { number: 1082, title: "Awakening", releaseDate: "2023-06-25", views: 950000 },
      { number: 1081, title: "The Seraphim Project", releaseDate: "2023-06-18", views: 900000 },
      { number: 1080, title: "The Ancient Kingdom", releaseDate: "2023-06-11", views: 850000 },
      { number: 1079, title: "The Final Road Poneglyph", releaseDate: "2023-06-04", views: 800000 },
    ],
    chapter: "Chapter 1088",
  }

  const handleToggleBookmark = () => {
    toggleBookmark({
      title: manga.title,
      cover: manga.cover,
      chapter: manga.chapter,
      rating: manga.rating,
      genres: manga.genres,
      slug: params.slug,
    })
  }

  return (
    <>
      <Head>
        <title>{`${manga.title} | MangaVerse`}</title>
        <meta name="description" content={manga.synopsis.substring(0, 160)} />
        <meta property="og:title" content={`${manga.title} | MangaVerse`} />
        <meta property="og:description" content={manga.synopsis.substring(0, 160)} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={manga.cover} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${manga.title} | MangaVerse`} />
        <meta name="twitter:description" content={manga.synopsis.substring(0, 160)} />
      </Head>

      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Explore", href: "/explore" },
              { label: manga.title, href: `/manga/${params.slug}`, active: true },
            ]}
          />

          <div className="grid gap-8 md:grid-cols-[300px_1fr] lg:gap-12">
            <div className="space-y-4">
              <div className="relative aspect-[2/3] overflow-hidden rounded-lg border">
                <Image
                  src={manga.cover || "/placeholder.svg"}
                  alt={manga.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="flex flex-col gap-2">
                <Button className="w-full" asChild>
                  <Link href={`/chapter/${params.slug}/1`}>
                    <BookOpen className="mr-2 h-4 w-4" />
                    Read First Chapter
                  </Link>
                </Button>
                {mounted && isLoggedIn && (
                  <Button
                    variant={isBookmarked(params.slug) ? "default" : "outline"}
                    className="w-full"
                    onClick={handleToggleBookmark}
                  >
                    <Heart className={`mr-2 h-4 w-4 ${isBookmarked(params.slug) ? "fill-primary-foreground" : ""}`} />
                    {isBookmarked(params.slug) ? "Bookmarked" : "Add to Bookmarks"}
                  </Button>
                )}
              </div>

              <div className="rounded-lg border p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <span className="text-sm font-medium">{manga.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Released</span>
                  <span className="text-sm font-medium">{manga.releaseYear}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Author</span>
                  <span className="text-sm font-medium">{manga.author}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Artist</span>
                  <span className="text-sm font-medium">{manga.artist}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Rating</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                    <span className="text-sm font-medium">{manga.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">{manga.title}</h1>
                <div className="flex flex-wrap gap-2 mb-4">
                  {manga.genres.map((genre) => (
                    <Link href={`/genres/${genre.toLowerCase().replace(/\s+/g, "-")}`} key={genre}>
                      <Badge variant="secondary" className="hover:bg-secondary/80">
                        {genre}
                      </Badge>
                    </Link>
                  ))}
                </div>
                <p className="text-muted-foreground">{manga.synopsis}</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold tracking-tight">Chapters</h2>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-4 w-4" />
                    <span>Updated weekly</span>
                  </div>
                </div>

                <ChapterList chapters={manga.chapters} mangaSlug={params.slug} />
              </div>
            </div>
          </div>
        </div>
        <SiteFooter />
      </div>
    </>
  )
}
