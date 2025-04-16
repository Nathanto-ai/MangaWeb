import { cn } from "@/lib/utils"

interface SkeletonLoaderProps {
  className?: string
}

export function SkeletonLoader({ className }: SkeletonLoaderProps) {
  return (
    <div className={cn("flex flex-col overflow-hidden rounded-lg border bg-background", className)}>
      <div className="relative aspect-[2/3] animate-pulse bg-muted"></div>
      <div className="p-3 space-y-2">
        <div className="h-4 w-3/4 animate-pulse rounded bg-muted"></div>
        <div className="h-3 w-1/2 animate-pulse rounded bg-muted"></div>
        <div className="h-3 w-1/4 animate-pulse rounded bg-muted"></div>
        <div className="flex gap-1 pt-1">
          <div className="h-5 w-12 animate-pulse rounded-full bg-muted"></div>
          <div className="h-5 w-16 animate-pulse rounded-full bg-muted"></div>
        </div>
      </div>
    </div>
  )
}
