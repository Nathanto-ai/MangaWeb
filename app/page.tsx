import Link from "next/link"
import Image from "next/image"
import { Clock, FlameIcon as Fire, Star, TrendingUp, Heart, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MangaCard } from "@/components/manga-card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 overflow-x-hidden">
        {/* Hero section */}
        <section className="w-full py-6 md:py-12 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Discover Your Next Favorite Manga</h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Explore thousands of manga titles, from classics to the latest releases. Read online, track your
                    progress, and join a community of manga enthusiasts.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild>
                    <Link href="/explore">Browse Library</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/explore?tab=updated">Today's Updates</Link>
                  </Button>
                </div>
              </div>
              <Image
                src="/placeholder.svg?height=300&width=500"
                width={500}
                height={300}
                alt="Featured manga collage"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
              />
            </div>
          </div>
        </section>

        {/* Explore section */}
        <section className="w-full py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Explore Manga</h2>
                <p className="text-muted-foreground">Find your next reading adventure</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="hidden md:flex" asChild>
                  <Link href="/explore?tab=trending">
                    <Fire className="mr-2 h-4 w-4" />
                    Trending
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="hidden md:flex" asChild>
                  <Link href="/explore?tab=updated">
                    <Clock className="mr-2 h-4 w-4" />
                    Latest
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/explore">View All</Link>
                </Button>
              </div>
            </div>

            <div className="w-full max-w-full">
              <Tabs defaultValue="popular" className="w-full">
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

                {/* Popular tab content */}
                <TabsContent value="popular" className="space-y-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                    <MangaCard
                      title="One Piece"
                      cover="/placeholder.svg?height=320&width=240"
                      chapter="Chapter 1088"
                      rating={4.9}
                      genres={["Adventure", "Fantasy"]}
                      slug="one-piece"
                    />
                    <MangaCard
                      title="Jujutsu Kaisen"
                      cover="/placeholder.svg?height=320&width=240"
                      chapter="Chapter 253"
                      rating={4.8}
                      genres={["Action", "Supernatural"]}
                      slug="jujutsu-kaisen"
                    />
                    <MangaCard
                      title="Chainsaw Man"
                      cover="/placeholder.svg?height=320&width=240"
                      chapter="Chapter 156"
                      rating={4.7}
                      genres={["Action", "Horror"]}
                      slug="chainsaw-man"
                    />
                    <MangaCard
                      title="My Hero Academia"
                      cover="/placeholder.svg?height=320&width=240"
                      chapter="Chapter 420"
                      rating={4.6}
                      genres={["Action", "Superhero"]}
                      slug="my-hero-academia"
                    />
                    <MangaCard
                      title="Demon Slayer"
                      cover="/placeholder.svg?height=320&width=240"
                      chapter="Chapter 205"
                      rating={4.8}
                      genres={["Action", "Supernatural"]}
                      slug="demon-slayer"
                    />
                    <MangaCard
                      title="Tokyo Revengers"
                      cover="/placeholder.svg?height=320&width=240"
                      chapter="Chapter 278"
                      rating={4.5}
                      genres={["Action", "Drama"]}
                      slug="tokyo-revengers"
                    />
                    <MangaCard
                      title="Spy x Family"
                      cover="/placeholder.svg?height=320&width=240"
                      chapter="Chapter 92"
                      rating={4.9}
                      genres={["Action", "Comedy"]}
                      className="hidden md:block"
                      slug="spy-x-family"
                    />
                    <MangaCard
                      title="Black Clover"
                      cover="/placeholder.svg?height=320&width=240"
                      chapter="Chapter 368"
                      rating={4.6}
                      genres={["Fantasy", "Action"]}
                      className="hidden md:block"
                      slug="black-clover"
                    />
                    <MangaCard
                      title="Dragon Ball Super"
                      cover="/placeholder.svg?height=320&width=240"
                      chapter="Chapter 97"
                      rating={4.7}
                      genres={["Action", "Adventure"]}
                      className="hidden lg:block"
                      slug="dragon-ball-super"
                    />
                    <MangaCard
                      title="One Punch Man"
                      cover="/placeholder.svg?height=320&width=240"
                      chapter="Chapter 192"
                      rating={4.8}
                      genres={["Action", "Comedy"]}
                      className="hidden lg:block"
                      slug="one-punch-man"
                    />
                    <MangaCard
                      title="Boruto"
                      cover="/placeholder.svg?height=320&width=240"
                      chapter="Chapter 80"
                      rating={4.3}
                      genres={["Action", "Adventure"]}
                      className="hidden xl:block"
                      slug="boruto"
                    />
                    <MangaCard
                      title="Attack on Titan"
                      cover="/placeholder.svg?height=320&width=240"
                      chapter="Chapter 139"
                      rating={4.9}
                      genres={["Action", "Drama"]}
                      className="hidden xl:block"
                      slug="attack-on-titan"
                    />
                  </div>
                  <div className="flex justify-center">
                    <Button variant="outline" asChild>
                      <Link href="/explore?tab=popular">Load More</Link>
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="updated" className="space-y-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                    <MangaCard
                      title="Jujutsu Kaisen"
                      cover="/placeholder.svg?height=320&width=240"
                      chapter="Chapter 253"
                      rating={4.8}
                      genres={["Action", "Supernatural"]}
                      updatedAt="2 hours ago"
                      slug="jujutsu-kaisen"
                    />
                    <MangaCard
                      title="One Piece"
                      cover="/placeholder.svg?height=320&width=240"
                      chapter="Chapter 1088"
                      rating={4.9}
                      genres={["Adventure", "Fantasy"]}
                      updatedAt="5 hours ago"
                      slug="one-piece"
                    />
                    <MangaCard
                      title="My Hero Academia"
                      cover="/placeholder.svg?height=320&width=240"
                      chapter="Chapter 420"
                      rating={4.6}
                      genres={["Action", "Superhero"]}
                      updatedAt="8 hours ago"
                      slug="my-hero-academia"
                    />
                    <MangaCard
                      title="Chainsaw Man"
                      cover="/placeholder.svg?height=320&width=240"
                      chapter="Chapter 156"
                      rating={4.7}
                      genres={["Action", "Horror"]}
                      updatedAt="12 hours ago"
                      slug="chainsaw-man"
                    />
                    <MangaCard
                      title="Blue Lock"
                      cover="/placeholder.svg?height=320&width=240"
                      chapter="Chapter 232"
                      rating={4.7}
                      genres={["Sports", "Drama"]}
                      updatedAt="1 day ago"
                      slug="blue-lock"
                    />
                    <MangaCard
                      title="Kaiju No. 8"
                      cover="/placeholder.svg?height=320&width=240"
                      chapter="Chapter 98"
                      rating={4.6}
                      genres={["Action", "Sci-Fi"]}
                      updatedAt="1 day ago"
                      slug="kaiju-no-8"
                    />
                  </div>
                  <div className="flex justify-center">
                    <Button variant="outline" asChild>
                      <Link href="/explore?tab=updated">Load More</Link>
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="new" className="space-y-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                    <MangaCard
                      title="Sakamoto Days"
                      cover="/placeholder.svg?height=320&width=240"
                      chapter="Chapter 1"
                      rating={4.5}
                      genres={["Action", "Comedy"]}
                      isNew={true}
                      slug="sakamoto-days"
                    />
                    <MangaCard
                      title="Dandadan"
                      cover="/placeholder.svg?height=320&width=240"
                      chapter="Chapter 1"
                      rating={4.7}
                      genres={["Supernatural", "Comedy"]}
                      isNew={true}
                      slug="dandadan"
                    />
                    <MangaCard
                      title="Witch Watch"
                      cover="/placeholder.svg?height=320&width=240"
                      chapter="Chapter 1"
                      rating={4.4}
                      genres={["Comedy", "Supernatural"]}
                      isNew={true}
                      slug="witch-watch"
                    />
                    <MangaCard
                      title="Ayashimon"
                      cover="/placeholder.svg?height=320&width=240"
                      chapter="Chapter 1"
                      rating={4.3}
                      genres={["Action", "Supernatural"]}
                      isNew={true}
                      slug="ayashimon"
                    />
                    <MangaCard
                      title="Doron Dororon"
                      cover="/placeholder.svg?height=320&width=240"
                      chapter="Chapter 1"
                      rating={4.2}
                      genres={["Action", "Supernatural"]}
                      isNew={true}
                      slug="doron-dororon"
                    />
                    <MangaCard
                      title="Earthchild"
                      cover="/placeholder.svg?height=320&width=240"
                      chapter="Chapter 1"
                      rating={4.1}
                      genres={["Sci-Fi", "Drama"]}
                      isNew={true}
                      slug="earthchild"
                    />
                  </div>
                  <div className="flex justify-center">
                    <Button variant="outline" asChild>
                      <Link href="/explore?tab=new">Load More</Link>
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="trending" className="space-y-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                    <MangaCard
                      title="Chainsaw Man"
                      cover="/placeholder.svg?height=320&width=240"
                      chapter="Chapter 156"
                      rating={4.7}
                      genres={["Action", "Horror"]}
                      trending={true}
                      slug="chainsaw-man"
                    />
                    <MangaCard
                      title="Jujutsu Kaisen"
                      cover="/placeholder.svg?height=320&width=240"
                      chapter="Chapter 253"
                      rating={4.8}
                      genres={["Action", "Supernatural"]}
                      trending={true}
                      slug="jujutsu-kaisen"
                    />
                    <MangaCard
                      title="One Piece"
                      cover="/placeholder.svg?height=320&width=240"
                      chapter="Chapter 1088"
                      rating={4.9}
                      genres={["Adventure", "Fantasy"]}
                      trending={true}
                      slug="one-piece"
                    />
                    <MangaCard
                      title="Spy x Family"
                      cover="/placeholder.svg?height=320&width=240"
                      chapter="Chapter 92"
                      rating={4.9}
                      genres={["Action", "Comedy"]}
                      trending={true}
                      slug="spy-x-family"
                    />
                    <MangaCard
                      title="Blue Lock"
                      cover="/placeholder.svg?height=320&width=240"
                      chapter="Chapter 232"
                      rating={4.7}
                      genres={["Sports", "Drama"]}
                      trending={true}
                      slug="blue-lock"
                    />
                    <MangaCard
                      title="Dandadan"
                      cover="/placeholder.svg?height=320&width=240"
                      chapter="Chapter 25"
                      rating={4.7}
                      genres={["Supernatural", "Comedy"]}
                      trending={true}
                      slug="dandadan"
                    />
                  </div>
                  <div className="flex justify-center">
                    <Button variant="outline" asChild>
                      <Link href="/explore?tab=trending">Load More</Link>
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* Genres section */}
        <section className="w-full py-12 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Genres</h2>
                <p className="text-muted-foreground">Explore manga by your favorite genres</p>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/genres">View All Genres</Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <Link
                href="/genres/action"
                className="group relative overflow-hidden rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              >
                <div className="p-6 flex flex-col items-center text-center">
                  <Fire className="h-8 w-8 mb-2 text-primary" />
                  <h3 className="font-medium">Action</h3>
                  <p className="text-xs text-muted-foreground">1,245 titles</p>
                </div>
              </Link>
              <Link
                href="/genres/romance"
                className="group relative overflow-hidden rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              >
                <div className="p-6 flex flex-col items-center text-center">
                  <Heart className="h-8 w-8 mb-2 text-primary" />
                  <h3 className="font-medium">Romance</h3>
                  <p className="text-xs text-muted-foreground">987 titles</p>
                </div>
              </Link>
              <Link
                href="/genres/fantasy"
                className="group relative overflow-hidden rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              >
                <div className="p-6 flex flex-col items-center text-center">
                  <Star className="h-8 w-8 mb-2 text-primary" />
                  <h3 className="font-medium">Fantasy</h3>
                  <p className="text-xs text-muted-foreground">856 titles</p>
                </div>
              </Link>
              <Link
                href="/genres/adventure"
                className="group relative overflow-hidden rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              >
                <div className="p-6 flex flex-col items-center text-center">
                  <TrendingUp className="h-8 w-8 mb-2 text-primary" />
                  <h3 className="font-medium">Adventure</h3>
                  <p className="text-xs text-muted-foreground">743 titles</p>
                </div>
              </Link>
              <Link
                href="/genres/drama"
                className="group relative overflow-hidden rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              >
                <div className="p-6 flex flex-col items-center text-center">
                  <BookOpen className="h-8 w-8 mb-2 text-primary" />
                  <h3 className="font-medium">Drama</h3>
                  <p className="text-xs text-muted-foreground">621 titles</p>
                </div>
              </Link>
              <Link
                href="/genres/slice-of-life"
                className="group relative overflow-hidden rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              >
                <div className="p-6 flex flex-col items-center text-center">
                  <Clock className="h-8 w-8 mb-2 text-primary" />
                  <h3 className="font-medium">Slice of Life</h3>
                  <p className="text-xs text-muted-foreground">512 titles</p>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
