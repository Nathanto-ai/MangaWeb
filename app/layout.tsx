import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/context/auth-context"
import { BookmarksProvider } from "@/context/bookmarks-context"

// Global metadata for the site
// These values are used for SEO and social sharing
export const metadata = {
  title: {
    default: "MangaVerse - Discover and Read Manga Online",
    template: "%s | MangaVerse",
  },
  description:
    "Explore thousands of manga titles, from classics to the latest releases. Read online, track your progress, and join a community of manga enthusiasts.",
  keywords: ["manga", "read manga", "online manga", "manga reader", "manga community", "manga library"],
  authors: [{ name: "MangaVerse Team" }],
  creator: "MangaVerse",
  publisher: "MangaVerse",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mangaverse.example.com",
    title: "MangaVerse - Discover and Read Manga Online",
    description:
      "Explore thousands of manga titles, from classics to the latest releases. Read online, track your progress, and join a community of manga enthusiasts.",
    siteName: "MangaVerse",
  },
  twitter: {
    card: "summary_large_image",
    title: "MangaVerse - Discover and Read Manga Online",
    description:
      "Explore thousands of manga titles, from classics to the latest releases. Read online, track your progress, and join a community of manga enthusiasts.",
    creator: "@mangaverse",
  },
  robots: {
    index: true,
    follow: true,
  },
}

/**
 * RootLayout Component
 *
 * Wraps the entire application with necessary providers:
 * - ThemeProvider: For light/dark mode support
 * - AuthProvider: For authentication state
 * - BookmarksProvider: For bookmark management
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* Theme provider with dark mode as default */}
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {/* Authentication provider */}
          <AuthProvider>
            {/* Bookmarks provider */}
            <BookmarksProvider>{children}</BookmarksProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
