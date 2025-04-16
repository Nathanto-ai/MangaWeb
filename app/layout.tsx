import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/context/auth-context"
import { BookmarksProvider } from "@/context/bookmarks-context"

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <AuthProvider>
            <BookmarksProvider>{children}</BookmarksProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
