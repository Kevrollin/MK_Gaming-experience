"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Gamepad2, Menu } from "lucide-react"
import { useState } from "react"

import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { Button } from "@/components/ui/button"
import { useAuth } from "./auth-provider"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function SiteHeader() {
  const { user } = useAuth()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Gamepad2 className="h-6 w-6 text-blue-500" />
            <span className="font-heading text-xl font-bold tracking-wider neon-text">
              GAME<span className="text-blue-500">ARENA</span>
            </span>
          </Link>

          <div className="hidden md:flex">
            <MainNav />
          </div>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <UserNav />
          ) : (
            <div className="hidden md:flex gap-2">
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/register">
                <Button variant="default">Sign Up</Button>
              </Link>
            </div>
          )}

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="md:hidden">
              <div className="flex flex-col gap-6 py-6">
                <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                  <Gamepad2 className="h-6 w-6 text-blue-500" />
                  <span className="font-heading text-xl font-bold tracking-wider">
                    GAME<span className="text-blue-500">ARENA</span>
                  </span>
                </Link>

                <nav className="flex flex-col gap-4">
                  <Link
                    href="/"
                    className={`text-sm font-medium ${pathname === "/" ? "text-blue-500" : "text-muted-foreground"}`}
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    href="/games"
                    className={`text-sm font-medium ${pathname.startsWith("/games") ? "text-blue-500" : "text-muted-foreground"}`}
                    onClick={() => setIsOpen(false)}
                  >
                    Games
                  </Link>
                  <Link
                    href="/tournaments"
                    className={`text-sm font-medium ${pathname.startsWith("/tournaments") ? "text-blue-500" : "text-muted-foreground"}`}
                    onClick={() => setIsOpen(false)}
                  >
                    Tournaments
                  </Link>
                  <Link
                    href="/leaderboards"
                    className={`text-sm font-medium ${pathname.startsWith("/leaderboards") ? "text-blue-500" : "text-muted-foreground"}`}
                    onClick={() => setIsOpen(false)}
                  >
                    Leaderboards
                  </Link>
                  <Link
                    href="/community"
                    className={`text-sm font-medium ${pathname.startsWith("/community") ? "text-blue-500" : "text-muted-foreground"}`}
                    onClick={() => setIsOpen(false)}
                  >
                    Community
                  </Link>
                </nav>

                {!user && (
                  <div className="flex flex-col gap-2">
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full">
                        Login
                      </Button>
                    </Link>
                    <Link href="/register" onClick={() => setIsOpen(false)}>
                      <Button variant="default" className="w-full">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

