import Link from "next/link"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { MangaGrid } from "@/components/manga-grid"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

interface GenrePageProps {
  params: {
    genre: string
  }
}

export default function GenrePage({ params }: GenrePageProps) {
  // Format the genre name for display (e.g., "slice-of-life" -> "Slice of Life")
  const formattedGenre = params.genre
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Genres", href: "/genres" },
            { label: formattedGenre, href: `/genres/${params.genre}`, active: true },
          ]}
        />

        <div className="flex items-center gap-4 mb-8">
          <Link href="/genres">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              All Genres
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">{formattedGenre} Manga</h1>
            <p className="text-muted-foreground">Explore the best {formattedGenre.toLowerCase()} manga titles</p>
          </div>
        </div>

        <MangaGrid category="popular" />
      </div>
      <SiteFooter />
    </div>
  )
}
