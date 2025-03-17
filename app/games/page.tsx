"use client"

import Link from "next/link"
import Image from "next/image"
import { Gamepad2, Filter, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function GamesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl neon-text">Games</h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore our collection of competitive games and start your journey to the top
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search games..." className="w-full pl-8 md:w-[300px]" />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Filter by:</span>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="strategy">Strategy</SelectItem>
                      <SelectItem value="sports">Sports</SelectItem>
                      <SelectItem value="fps">FPS</SelectItem>
                      <SelectItem value="battle-royale">Battle Royale</SelectItem>
                      <SelectItem value="moba">MOBA</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Platforms</SelectItem>
                      <SelectItem value="pc">PC</SelectItem>
                      <SelectItem value="console">Console</SelectItem>
                      <SelectItem value="mobile">Mobile</SelectItem>
                      <SelectItem value="cross-platform">Cross-Platform</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Tabs defaultValue="all" className="mt-8">
              <TabsList className="grid w-full grid-cols-5 md:w-auto">
                <TabsTrigger value="all">All Games</TabsTrigger>
                <TabsTrigger value="strategy">Strategy</TabsTrigger>
                <TabsTrigger value="sports">Sports</TabsTrigger>
                <TabsTrigger value="fps">FPS</TabsTrigger>
                <TabsTrigger value="battle-royale">Battle Royale</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {/* Chess */}
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
                      <div className="flex items-center justify-between mt-4">
                        <CardTitle>Chess</CardTitle>
                        <Badge>Strategy</Badge>
                      </div>
                      <CardDescription>
                        Test your strategic skills against players worldwide in the classic game of chess
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Active Players:</span>
                          <span>5,240</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Active Tournaments:</span>
                          <span>12</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Platforms:</span>
                          <span>PC, Mobile, Browser</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          <Badge variant="outline">1v1</Badge>
                          <Badge variant="outline">Ranked</Badge>
                          <Badge variant="outline">Tournaments</Badge>
                          <Badge variant="outline">Skill-Based</Badge>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Link href="/games/chess">
                        <Button variant="outline">Learn More</Button>
                      </Link>
                      <Link href="/games/chess/play">
                        <Button>Play Now</Button>
                      </Link>
                    </CardFooter>
                  </Card>

                  {/* E-Football */}
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
                      <div className="flex items-center justify-between mt-4">
                        <CardTitle>E-Football</CardTitle>
                        <Badge>Sports</Badge>
                      </div>
                      <CardDescription>
                        Compete in virtual football leagues and tournaments with realistic gameplay
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Active Players:</span>
                          <span>8,750</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Active Tournaments:</span>
                          <span>18</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Platforms:</span>
                          <span>PC, Console</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          <Badge variant="outline">1v1</Badge>
                          <Badge variant="outline">Leagues</Badge>
                          <Badge variant="outline">Tournaments</Badge>
                          <Badge variant="outline">Team Building</Badge>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Link href="/games/efootball">
                        <Button variant="outline">Learn More</Button>
                      </Link>
                      <Link href="/games/efootball/play">
                        <Button>Play Now</Button>
                      </Link>
                    </CardFooter>
                  </Card>

                  {/* PUBG */}
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
                      <div className="flex items-center justify-between mt-4">
                        <CardTitle>PUBG</CardTitle>
                        <Badge>Battle Royale</Badge>
                      </div>
                      <CardDescription>Battle royale competitions with teams from around the world</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Active Players:</span>
                          <span>12,480</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Active Tournaments:</span>
                          <span>24</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Platforms:</span>
                          <span>PC, Console, Mobile</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          <Badge variant="outline">Squad</Badge>
                          <Badge variant="outline">Solo</Badge>
                          <Badge variant="outline">Duo</Badge>
                          <Badge variant="outline">Cross-Platform</Badge>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Link href="/games/pubg">
                        <Button variant="outline">Learn More</Button>
                      </Link>
                      <Link href="/games/pubg/play">
                        <Button>Play Now</Button>
                      </Link>
                    </CardFooter>
                  </Card>

                  {/* Fortnite */}
                  <Card className="game-card">
                    <CardHeader>
                      <div className="relative h-48 w-full">
                        <Image
                          src="/placeholder.svg?height=200&width=400"
                          alt="Fortnite"
                          fill
                          className="object-cover rounded-t-lg"
                        />
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <CardTitle>Fortnite</CardTitle>
                        <Badge>Battle Royale</Badge>
                      </div>
                      <CardDescription>
                        Fast-paced battle royale with building mechanics and colorful gameplay
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Active Players:</span>
                          <span>15,320</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Active Tournaments:</span>
                          <span>20</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Platforms:</span>
                          <span>PC, Console, Mobile</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          <Badge variant="outline">Solo</Badge>
                          <Badge variant="outline">Duo</Badge>
                          <Badge variant="outline">Squad</Badge>
                          <Badge variant="outline">Cross-Platform</Badge>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Link href="/games/fortnite">
                        <Button variant="outline">Learn More</Button>
                      </Link>
                      <Link href="/games/fortnite/play">
                        <Button>Play Now</Button>
                      </Link>
                    </CardFooter>
                  </Card>

                  {/* Call of Duty */}
                  <Card className="game-card">
                    <CardHeader>
                      <div className="relative h-48 w-full">
                        <Image
                          src="/placeholder.svg?height=200&width=400"
                          alt="Call of Duty"
                          fill
                          className="object-cover rounded-t-lg"
                        />
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <CardTitle>Call of Duty</CardTitle>
                        <Badge>FPS</Badge>
                      </div>
                      <CardDescription>
                        Fast-paced first-person shooter with multiple game modes and competitive play
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Active Players:</span>
                          <span>10,890</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Active Tournaments:</span>
                          <span>15</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Platforms:</span>
                          <span>PC, Console</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          <Badge variant="outline">Team</Badge>
                          <Badge variant="outline">Warzone</Badge>
                          <Badge variant="outline">Multiplayer</Badge>
                          <Badge variant="outline">Cross-Platform</Badge>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Link href="/games/cod">
                        <Button variant="outline">Learn More</Button>
                      </Link>
                      <Link href="/games/cod/play">
                        <Button>Play Now</Button>
                      </Link>
                    </CardFooter>
                  </Card>

                  {/* League of Legends */}
                  <Card className="game-card">
                    <CardHeader>
                      <div className="relative h-48 w-full">
                        <Image
                          src="/placeholder.svg?height=200&width=400"
                          alt="League of Legends"
                          fill
                          className="object-cover rounded-t-lg"
                        />
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <CardTitle>League of Legends</CardTitle>
                        <Badge>MOBA</Badge>
                      </div>
                      <CardDescription>
                        Team-based strategy game with diverse champions and competitive gameplay
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Active Players:</span>
                          <span>9,750</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Active Tournaments:</span>
                          <span>10</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Platforms:</span>
                          <span>PC</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          <Badge variant="outline">5v5</Badge>
                          <Badge variant="outline">Team-Based</Badge>
                          <Badge variant="outline">Ranked</Badge>
                          <Badge variant="outline">Esports</Badge>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Link href="/games/lol">
                        <Button variant="outline">Learn More</Button>
                      </Link>
                      <Link href="/games/lol/play">
                        <Button>Play Now</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="strategy" className="mt-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {/* Chess */}
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
                      <div className="flex items-center justify-between mt-4">
                        <CardTitle>Chess</CardTitle>
                        <Badge>Strategy</Badge>
                      </div>
                      <CardDescription>
                        Test your strategic skills against players worldwide in the classic game of chess
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Active Players:</span>
                          <span>5,240</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Active Tournaments:</span>
                          <span>12</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Platforms:</span>
                          <span>PC, Mobile, Browser</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          <Badge variant="outline">1v1</Badge>
                          <Badge variant="outline">Ranked</Badge>
                          <Badge variant="outline">Tournaments</Badge>
                          <Badge variant="outline">Skill-Based</Badge>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Link href="/games/chess">
                        <Button variant="outline">Learn More</Button>
                      </Link>
                      <Link href="/games/chess/play">
                        <Button>Play Now</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="sports" className="mt-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {/* E-Football */}
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
                      <div className="flex items-center justify-between mt-4">
                        <CardTitle>E-Football</CardTitle>
                        <Badge>Sports</Badge>
                      </div>
                      <CardDescription>
                        Compete in virtual football leagues and tournaments with realistic gameplay
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Active Players:</span>
                          <span>8,750</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Active Tournaments:</span>
                          <span>18</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Platforms:</span>
                          <span>PC, Console</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          <Badge variant="outline">1v1</Badge>
                          <Badge variant="outline">Leagues</Badge>
                          <Badge variant="outline">Tournaments</Badge>
                          <Badge variant="outline">Team Building</Badge>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Link href="/games/efootball">
                        <Button variant="outline">Learn More</Button>
                      </Link>
                      <Link href="/games/efootball/play">
                        <Button>Play Now</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="fps" className="mt-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {/* Call of Duty */}
                  <Card className="game-card">
                    <CardHeader>
                      <div className="relative h-48 w-full">
                        <Image
                          src="/placeholder.svg?height=200&width=400"
                          alt="Call of Duty"
                          fill
                          className="object-cover rounded-t-lg"
                        />
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <CardTitle>Call of Duty</CardTitle>
                        <Badge>FPS</Badge>
                      </div>
                      <CardDescription>
                        Fast-paced first-person shooter with multiple game modes and competitive play
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Active Players:</span>
                          <span>10,890</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Active Tournaments:</span>
                          <span>15</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Platforms:</span>
                          <span>PC, Console</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          <Badge variant="outline">Team</Badge>
                          <Badge variant="outline">Warzone</Badge>
                          <Badge variant="outline">Multiplayer</Badge>
                          <Badge variant="outline">Cross-Platform</Badge>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Link href="/games/cod">
                        <Button variant="outline">Learn More</Button>
                      </Link>
                      <Link href="/games/cod/play">
                        <Button>Play Now</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="battle-royale" className="mt-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {/* PUBG */}
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
                      <div className="flex items-center justify-between mt-4">
                        <CardTitle>PUBG</CardTitle>
                        <Badge>Battle Royale</Badge>
                      </div>
                      <CardDescription>Battle royale competitions with teams from around the world</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Active Players:</span>
                          <span>12,480</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Active Tournaments:</span>
                          <span>24</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Platforms:</span>
                          <span>PC, Console, Mobile</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          <Badge variant="outline">Squad</Badge>
                          <Badge variant="outline">Solo</Badge>
                          <Badge variant="outline">Duo</Badge>
                          <Badge variant="outline">Cross-Platform</Badge>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Link href="/games/pubg">
                        <Button variant="outline">Learn More</Button>
                      </Link>
                      <Link href="/games/pubg/play">
                        <Button>Play Now</Button>
                      </Link>
                    </CardFooter>
                  </Card>

                  {/* Fortnite */}
                  <Card className="game-card">
                    <CardHeader>
                      <div className="relative h-48 w-full">
                        <Image
                          src="/placeholder.svg?height=200&width=400"
                          alt="Fortnite"
                          fill
                          className="object-cover rounded-t-lg"
                        />
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <CardTitle>Fortnite</CardTitle>
                        <Badge>Battle Royale</Badge>
                      </div>
                      <CardDescription>
                        Fast-paced battle royale with building mechanics and colorful gameplay
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Active Players:</span>
                          <span>15,320</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Active Tournaments:</span>
                          <span>20</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Platforms:</span>
                          <span>PC, Console, Mobile</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          <Badge variant="outline">Solo</Badge>
                          <Badge variant="outline">Duo</Badge>
                          <Badge variant="outline">Squad</Badge>
                          <Badge variant="outline">Cross-Platform</Badge>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Link href="/games/fortnite">
                        <Button variant="outline">Learn More</Button>
                      </Link>
                      <Link href="/games/fortnite/play">
                        <Button>Play Now</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
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

