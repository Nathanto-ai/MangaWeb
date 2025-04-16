import Link from "next/link"
import { Breadcrumbs } from "@/components/breadcrumbs"
import {
  FlameIcon as Fire,
  Heart,
  Star,
  TrendingUp,
  BookOpen,
  Clock,
  Sword,
  Laugh,
  Skull,
  Zap,
  Ghost,
  Gamepad2,
} from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

// Mock data for genres
const genres = [
  { name: "Action", icon: Fire, count: 1245 },
  { name: "Romance", icon: Heart, count: 987 },
  { name: "Fantasy", icon: Star, count: 856 },
  { name: "Adventure", icon: TrendingUp, count: 743 },
  { name: "Drama", icon: BookOpen, count: 621 },
  { name: "Slice of Life", icon: Clock, count: 512 },
  { name: "Comedy", icon: Laugh, count: 498 },
  { name: "Horror", icon: Skull, count: 321 },
  { name: "Sci-Fi", icon: Zap, count: 287 },
  { name: "Supernatural", icon: Ghost, count: 265 },
  { name: "Mystery", icon: Sword, count: 243 },
  { name: "Sports", icon: Gamepad2, count: 198 },
]

export default function GenresPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Genres", href: "/genres", active: true },
          ]}
        />

        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Manga Genres</h1>
          <p className="text-muted-foreground">Browse manga by your favorite genres</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {genres.map((genre) => {
            const Icon = genre.icon
            return (
              <Link
                key={genre.name}
                href={`/genres/${genre.name.toLowerCase()}`}
                className="group relative overflow-hidden rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              >
                <div className="p-6 flex flex-col items-center text-center">
                  <Icon className="h-8 w-8 mb-2 text-primary" />
                  <h3 className="font-medium">{genre.name}</h3>
                  <p className="text-xs text-muted-foreground">{genre.count} titles</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}
