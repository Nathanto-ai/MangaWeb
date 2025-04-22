"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MangaGrid } from "@/components/manga-grid"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { FlameIcon as Fire, Clock, Star, TrendingUp } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function ExplorePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  // State to track the currently active tab
  const [activeTab, setActiveTab] = useState("popular")

  // Effect to sync the active tab with URL query parameters
  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab && ["popular", "updated", "new", "trending"].includes(tab)) {
      setActiveTab(tab)
    }
  }, [searchParams])

  /**
   * Handle tab change
   * Updates the active tab state and updates the URL query parameter
   * Uses the scroll: false option to prevent page jumping
   */
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    router.push(`/explore?tab=${value}`, { scroll: false })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="container px-4 py-8 md:px-6 md:py-12 overflow-x-hidden">
        {/* Breadcrumb navigation */}
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Explore", href: "/explore", active: true },
          ]}
        />

        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Explore Manga</h1>
          <p className="text-muted-foreground">Discover new series and keep up with your favorites</p>
        </div>

        {/* Tabbed content */}
        <div className="w-full">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            {/* Horizontally scrollable tab list */}
            <div className="overflow-x-auto pb-2 -mx-4 px-4">
              <TabsList className="mb-6 w-max min-w-full inline-flex">
                <TabsTrigger value="popular" className="flex items-center gap-2 whitespace-nowrap">
                  <Fire className="h-4 w-4" />
                  Popular
                </TabsTrigger>
                <TabsTrigger value="updated" className="flex items-center gap-2 whitespace-nowrap">
                  <Clock className="h-4 w-4" />
                  Recently Updated
                </TabsTrigger>
                <TabsTrigger value="new" className="flex items-center gap-2 whitespace-nowrap">
                  <Star className="h-4 w-4" />
                  New Releases
                </TabsTrigger>
                <TabsTrigger value="trending" className="flex items-center gap-2 whitespace-nowrap">
                  <TrendingUp className="h-4 w-4" />
                  Trending
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Tab content panels - each renders a MangaGrid with the appropriate category */}
            <TabsContent value="popular">
              <MangaGrid category="popular" />
            </TabsContent>
            <TabsContent value="updated">
              <MangaGrid category="updated" />
            </TabsContent>
            <TabsContent value="new">
              <MangaGrid category="new" />
            </TabsContent>
            <TabsContent value="trending">
              <MangaGrid category="trending" />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}
