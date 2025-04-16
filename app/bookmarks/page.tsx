"use client"

import { useEffect, useState } from "react"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { MangaCard } from "@/components/manga-card"
import { useBookmarks } from "@/context/bookmarks-context"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { BookMarked } from "lucide-react"

export default function BookmarksPage() {
  const { bookmarks } = useBookmarks()
  const { isLoggedIn } = useAuth()
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    // Redirect to login if not logged in
    if (!isLoggedIn) {
      router.push("/auth/login")
    }
  }, [isLoggedIn, router])

  // Don't render anything on the server to prevent hydration mismatch
  if (!isClient) {
    return null
  }

  // Don't render the page content if not logged in
  if (!isLoggedIn) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Bookmarks", href: "/bookmarks", active: true },
          ]}
        />

        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Your Bookmarks</h1>
          <p className="text-muted-foreground">Manga titles you've saved for later</p>
        </div>

        {bookmarks.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {bookmarks.map((manga, index) => (
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
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <BookMarked className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-xl font-medium mb-2">No bookmarks yet</h2>
            <p className="text-muted-foreground max-w-md mb-6">
              Start exploring manga and bookmark your favorites to find them here.
            </p>
          </div>
        )}
      </div>
      <SiteFooter />
    </div>
  )
}
