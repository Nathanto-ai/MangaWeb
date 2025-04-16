"use client"

import type React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Search, Menu, BookOpen, User, LogOut, Heart, BookMarked } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/context/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function SiteHeader() {
  const router = useRouter()
  const { user, isLoggedIn, logout } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleLogout = () => {
    logout()
    router.push("/")
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-40 border-b bg-background overflow-hidden">
      <div className="container flex h-16 items-center justify-between py-4 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col gap-6 py-6">
                <Link href="/" className="flex items-center gap-2">
                  <BookOpen className="h-6 w-6" />
                  <span className="text-xl font-bold">MangaVerse</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
                    Home
                  </Link>
                  <Link href="/explore" className="text-sm font-medium hover:underline underline-offset-4">
                    Browse
                  </Link>
                  <Link href="/genres" className="text-sm font-medium hover:underline underline-offset-4">
                    Genres
                  </Link>
                  <Link href="/explore?tab=new" className="text-sm font-medium hover:underline underline-offset-4">
                    New Releases
                  </Link>
                  {isLoggedIn && (
                    <Link href="/bookmarks" className="text-sm font-medium hover:underline underline-offset-4">
                      Bookmarks
                    </Link>
                  )}
                  {!isLoggedIn ? (
                    <>
                      <Link href="/auth/login" className="text-sm font-medium hover:underline underline-offset-4">
                        Sign In
                      </Link>
                      <Link href="/auth/register" className="text-sm font-medium hover:underline underline-offset-4">
                        Register
                      </Link>
                    </>
                  ) : (
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-sm font-medium text-left hover:underline underline-offset-4"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  )}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            <span className="text-xl font-bold">MangaVerse</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
            Home
          </Link>
          <Link href="/explore" className="text-sm font-medium hover:underline underline-offset-4">
            Browse
          </Link>
          <Link href="/genres" className="text-sm font-medium hover:underline underline-offset-4">
            Genres
          </Link>
          <Link href="/explore?tab=new" className="text-sm font-medium hover:underline underline-offset-4">
            New Releases
          </Link>
          {isLoggedIn && (
            <Link href="/bookmarks" className="text-sm font-medium hover:underline underline-offset-4">
              Bookmarks
            </Link>
          )}
        </nav>
        <div className="flex items-center gap-1 sm:gap-4">
          <form onSubmit={handleSearch} className="hidden md:flex relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search manga..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link href="/search">
              <Search className="h-5 w-5 md:hidden" />
              <span className="sr-only">Search</span>
            </Link>
          </Button>
          {isLoggedIn && (
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link href="/bookmarks">
                <BookMarked className="h-5 w-5" />
                <span className="sr-only">Bookmarks</span>
              </Link>
            </Button>
          )}
          <ThemeToggle />

          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{user?.name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    {user?.name && <p className="font-medium">{user.name}</p>}
                    {user?.email && <p className="text-sm text-muted-foreground">{user.email}</p>}
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/bookmarks">
                    <Heart className="mr-2 h-4 w-4" />
                    <span>Bookmarks</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button size="sm" asChild className="hidden sm:flex">
              <Link href="/auth/login">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
