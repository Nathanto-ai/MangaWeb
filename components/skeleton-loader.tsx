import { cn } from "@/lib/utils"

// Props for the SkeletonLoader component
interface SkeletonLoaderProps {
  className?: string // Additional CSS classes to apply
}

/**
 * SkeletonLoader Component
 *
 * Renders a placeholder for a manga card with animated loading effects.
 *
 * @param {SkeletonLoaderProps} props - Component props
 * @param {string} [props.className] - Additional CSS classes to apply
 */
export function SkeletonLoader({ className }: SkeletonLoaderProps) {
  return (
    <div className={cn("flex flex-col overflow-hidden rounded-lg border bg-background", className)}>
      {/* Cover image placeholder with 2:3 aspect ratio */}
      <div className="relative aspect-[2/3] animate-pulse bg-muted"></div>

      {/* Content area with placeholder elements */}
      <div className="p-3 space-y-2">
        {/* Title placeholder */}
        <div className="h-4 w-3/4 animate-pulse rounded bg-muted"></div>

        {/* Chapter info placeholder */}
        <div className="h-3 w-1/2 animate-pulse rounded bg-muted"></div>

        {/* Rating placeholder */}
        <div className="h-3 w-1/4 animate-pulse rounded bg-muted"></div>

        {/* Genre badges placeholder */}
        <div className="flex gap-1 pt-1">
          <div className="h-5 w-12 animate-pulse rounded-full bg-muted"></div>
          <div className="h-5 w-16 animate-pulse rounded-full bg-muted"></div>
        </div>
      </div>
    </div>
  )
}
