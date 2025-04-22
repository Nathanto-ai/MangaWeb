import Link from "next/link"
import { Eye, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

// Interface for chapter data
interface Chapter {
  number: number // Chapter number
  title: string // Chapter title
  releaseDate: string // Release date in ISO format
  views: number // Number of views
}

// Props for the ChapterList component
interface ChapterListProps {
  chapters: Chapter[] // Array of chapters to display
  mangaSlug: string // Slug of the manga for generating chapter URLs
}

/**
 * ChapterList Component
 *
 * Renders a list of chapters with metadata and navigation links.
 *
 * @param {ChapterListProps} props - Component props
 * @param {Chapter[]} props.chapters - Array of chapters to display
 * @param {string} props.mangaSlug - Slug of the manga for generating chapter URLs
 */
export function ChapterList({ chapters, mangaSlug }: ChapterListProps) {
  return (
    <div className="space-y-4">
      {/* Chapter list container */}
      <div className="rounded-lg border divide-y">
        {chapters.map((chapter) => (
          <div key={chapter.number} className="p-4 hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between">
              {/* Chapter title and link to reader */}
              <Link href={`/chapter/${mangaSlug}/${chapter.number}`} className="flex-1 hover:underline">
                <div className="font-medium">Chapter {chapter.number}</div>
                <div className="text-sm text-muted-foreground">{chapter.title}</div>
              </Link>

              {/* Chapter metadata - release date and views */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="mr-1 h-4 w-4" />
                  <span>{formatDate(chapter.releaseDate)}</span>
                </div>
                <div className="flex items-center">
                  <Eye className="mr-1 h-4 w-4" />
                  <span>{formatViews(chapter.views)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load more button */}
      <div className="flex justify-center">
        <Button variant="outline">Load More Chapters</Button>
      </div>
    </div>
  )
}

/**
 * Format a date string into a human-readable format
 *
 * @param {string} dateString - ISO date string to format
 * @returns {string} Formatted date string (e.g., "Aug 6, 2023")
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

/**
 * Format view count into a human-readable format
 * Converts large numbers to K/M format (e.g., 1.2M, 5.5K)
 *
 * @param {number} views - Number of views
 * @returns {string} Formatted view count
 */
function formatViews(views: number): string {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`
  } else if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`
  }
  return views.toString()
}
