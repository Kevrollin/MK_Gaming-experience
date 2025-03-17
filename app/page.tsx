import Link from "next/link"
import Image from "next/image"
import { Trophy, Users, Gamepad2, Shield, ChevronRight, Star, Zap, Activity, Award } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LiveGames } from "@/components/live-games"
import { AdvancingPlayers } from "@/components/advancing-players"
import { TournamentCards } from "@/components/tournament-cards"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none neon-text">
                    COMPETE. CONQUER. <span className="text-blue-500">BECOME A LEGEND.</span>
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Join the ultimate gaming platform where players compete in tournaments, win prizes, and rise through
                    the ranks to gaming glory.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/register">
                    <Button className="animate-pulse-glow">
                      Join Now
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/tournaments">
                    <Button variant="outline">Browse Tournaments</Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[300px] w-full md:h-[400px] lg:h-[500px]">
                  <Image
                    src="/placeholder.svg?height=500&width=500"
                    alt="Gaming Hero"
                    fill
                    className="object-cover rounded-lg shadow-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Live Games & Advancing Players Section */}
        <section className="py-12 md:py-16 bg-muted/30 animated-bg">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2">
              {/* Live Games */}
              <Card className="border-blue-500/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-bold flex items-center">
                      <Activity className="mr-2 h-5 w-5 text-blue-500 animate-pulse" />
                      Live Games
                    </CardTitle>
                    <Link href="/live">
                      <Button variant="ghost" size="sm">
                        View All
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                  <CardDescription>Watch real-time matches happening right now</CardDescription>
                </CardHeader>
                <CardContent>
                  <LiveGames />
                </CardContent>
              </Card>

              {/* Advancing Players */}
              <Card className="border-blue-500/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-bold flex items-center">
                      <Award className="mr-2 h-5 w-5 text-blue-500" />
                      Advancing Players
                    </CardTitle>
                    <Link href="/leaderboards">
                      <Button variant="ghost" size="sm">
                        View All
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                  <CardDescription>Players who have advanced to the next tournament level</CardDescription>
                </CardHeader>
                <CardContent>
                  <AdvancingPlayers />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Games Section */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl neon-text">
                  Featured Games
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Compete in the most popular online games and tournaments
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="game-card">
                <CardHeader>
                  <div className="relative h-48 w-full">
                    <Image
                      src="/placeholder.svg?height=200&width=400"
                      alt="Chess"
                      fill
                      className="object-cover rounded-t-lg"
                    />
                  </div>
                  <CardTitle className="mt-4">Chess</CardTitle>
                  <CardDescription>Test your strategic skills against players worldwide</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      5,240 Players
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Trophy className="h-3 w-3" />
                      12 Active Tournaments
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/games/chess" className="w-full">
                    <Button variant="default" className="w-full">
                      Play Now
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="game-card">
                <CardHeader>
                  <div className="relative h-48 w-full">
                    <Image
                      src="/placeholder.svg?height=200&width=400"
                      alt="E-Football"
                      fill
                      className="object-cover rounded-t-lg"
                    />
                  </div>
                  <CardTitle className="mt-4">E-Football</CardTitle>
                  <CardDescription>Compete in virtual football leagues and tournaments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      8,750 Players
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Trophy className="h-3 w-3" />
                      18 Active Tournaments
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/games/efootball" className="w-full">
                    <Button variant="default" className="w-full">
                      Play Now
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="game-card">
                <CardHeader>
                  <div className="relative h-48 w-full">
                    <Image
                      src="/placeholder.svg?height=200&width=400"
                      alt="PUBG"
                      fill
                      className="object-cover rounded-t-lg"
                    />
                  </div>
                  <CardTitle className="mt-4">PUBG</CardTitle>
                  <CardDescription>Battle royale competitions with teams worldwide</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      12,480 Players
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Trophy className="h-3 w-3" />
                      24 Active Tournaments
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/games/pubg" className="w-full">
                    <Button variant="default" className="w-full">
                      Play Now
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
            <div className="flex justify-center mt-8">
              <Link href="/games">
                <Button variant="outline">
                  View All Games
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Upcoming Tournaments Section */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl neon-text">
                  Upcoming Tournaments
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Register now to compete for glory and amazing prizes
                </p>
              </div>
            </div>

            <TournamentCards />

            <div className="flex justify-center mt-8">
              <Link href="/tournaments">
                <Button variant="outline">
                  View All Tournaments
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl neon-text">
                  Why Choose GameArena?
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  The ultimate platform for competitive gamers
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader>
                  <Trophy className="h-10 w-10 text-blue-500 mb-2" />
                  <CardTitle>Competitive Tournaments</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Regular tournaments across multiple games with real prizes and recognition.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Shield className="h-10 w-10 text-blue-500 mb-2" />
                  <CardTitle>Anti-Cheat Protection</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Advanced anti-cheat systems to ensure fair play in all competitions.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Star className="h-10 w-10 text-blue-500 mb-2" />
                  <CardTitle>Skill-Based Matchmaking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Compete against players of similar skill levels for balanced gameplay.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Zap className="h-10 w-10 text-blue-500 mb-2" />
                  <CardTitle>Live Streaming</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Watch live tournaments, follow your favorite players, and learn from the best.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 animated-bg">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl neon-text">
                  Ready to Compete?
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of players and start your competitive gaming journey today
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/register">
                  <Button size="lg" className="animate-pulse-glow">
                    Create Account
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/games">
                  <Button variant="outline" size="lg">
                    Browse Games
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-background/80 backdrop-blur-sm">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <Gamepad2 className="h-6 w-6 text-blue-500" />
            <p className="text-center text-sm leading-loose md:text-left">© 2025 GameArena. All rights reserved.</p>
          </div>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground underline underline-offset-4">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground underline underline-offset-4">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground underline underline-offset-4">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

