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
  const [activeTab, setActiveTab] = useState("popular")

  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab && ["popular", "updated", "new", "trending"].includes(tab)) {
      setActiveTab(tab)
    }
  }, [searchParams])

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    router.push(`/explore?tab=${value}`, { scroll: false })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="container px-4 py-8 md:px-6 md:py-12 overflow-x-hidden">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Explore", href: "/explore", active: true },
          ]}
        />

        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Explore Manga</h1>
          <p className="text-muted-foreground">Discover new series and keep up with your favorites</p>
        </div>

        <div className="w-full max-w-full">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <div className="max-w-full">
              <TabsList className="mb-6 w-max max-w-full">
                <TabsTrigger value="popular" className="flex items-center gap-2">
                  <Fire className="h-4 w-4" />
                  Popular
                </TabsTrigger>
                <TabsTrigger value="updated" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Recently Updated
                </TabsTrigger>
                <TabsTrigger value="new" className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  New Releases
                </TabsTrigger>
                <TabsTrigger value="trending" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Trending
                </TabsTrigger>
              </TabsList>
            </div>

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
