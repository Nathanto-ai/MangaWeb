import Link from "next/link"
import { Eye, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Chapter {
  number: number
  title: string
  releaseDate: string
  views: number
}

interface ChapterListProps {
  chapters: Chapter[]
  mangaSlug: string
}

export function ChapterList({ chapters, mangaSlug }: ChapterListProps) {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border divide-y">
        {chapters.map((chapter) => (
          <div key={chapter.number} className="p-4 hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between">
              <Link href={`/chapter/${mangaSlug}/${chapter.number}`} className="flex-1 hover:underline">
                <div className="font-medium">Chapter {chapter.number}</div>
                <div className="text-sm text-muted-foreground">{chapter.title}</div>
              </Link>

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

      <div className="flex justify-center">
        <Button variant="outline">Load More Chapters</Button>
      </div>
    </div>
  )
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

function formatViews(views: number): string {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`
  } else if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`
  }
  return views.toString()
}
