import Link from "next/link"
import { ChevronRight } from "lucide-react"

// Interface for individual breadcrumb items
interface BreadcrumbItem {
  label: string // Display text for the breadcrumb
  href: string // URL the breadcrumb links to
  active?: boolean // Whether this is the current/active page
}

// Props for the Breadcrumbs component
interface BreadcrumbsProps {
  items: BreadcrumbItem[] // Array of breadcrumb items to display
}

/**
 * Breadcrumbs Component
 *
 * Renders a list of breadcrumb items with proper navigation and styling.
 *
 * @param {BreadcrumbsProps} props - Component props
 * @param {BreadcrumbItem[]} props.items - Array of breadcrumb items to display
 */
export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center space-x-2 text-sm">
        {items.map((item, index) => {
          // Determine if this is the last item in the breadcrumb trail
          const isLast = index === items.length - 1

          return (
            <li key={item.href} className="flex items-center">
              {/* Add separator chevron for all items except the first */}
              {index > 0 && <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />}

              {/* Render as span for current page, link for others */}
              {isLast || item.active ? (
                <span className="font-medium" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="text-muted-foreground hover:text-foreground transition-colors">
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
