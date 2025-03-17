import Link from "next/link"
import Image from "next/image"
import { Gamepad2, Trophy, Medal, ChevronRight, Filter, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LeaderboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl neon-text">
                  Tournament Leaderboards
                </h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Track the progress of ongoing tournaments and see who's leading the competition
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search tournaments or players..."
                    className="w-full pl-8 md:w-[300px]"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Filter by:</span>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Game" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Games</SelectItem>
                      <SelectItem value="chess">Chess</SelectItem>
                      <SelectItem value="efootball">E-Football</SelectItem>
                      <SelectItem value="pubg">PUBG</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="ongoing">
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ongoing">Ongoing</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Link href="/tournaments">
                <Button variant="outline">Back to Tournaments</Button>
              </Link>
            </div>

            <Tabs defaultValue="ongoing" className="mt-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="ongoing">Ongoing Tournaments</TabsTrigger>
                <TabsTrigger value="completed">Completed Tournaments</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming Tournaments</TabsTrigger>
              </TabsList>

              <TabsContent value="ongoing" className="mt-6 space-y-8">
                {/* Chess Tournament */}
                <Card>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="relative h-16 w-16 overflow-hidden rounded-lg">
                          <Image src="/placeholder.svg?height=64&width=64" alt="Chess" fill className="object-cover" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <CardTitle>World Chess Championship</CardTitle>
                            <Badge>Chess</Badge>
                          </div>
                          <CardDescription>Quarter-Finals in progress • 32 players remaining</CardDescription>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="text-sm font-medium">Prize Pool: $10,000</div>
                        <div className="text-xs text-muted-foreground">Ends in 3 days</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-lg border overflow-hidden">
                      <div className="grid grid-cols-12 gap-4 bg-muted/50 p-3 text-sm font-medium">
                        <div className="col-span-1 text-center">#</div>
                        <div className="col-span-5">Player</div>
                        <div className="col-span-2 text-center">W/L/D</div>
                        <div className="col-span-2 text-center">Points</div>
                        <div className="col-span-2 text-center">Status</div>
                      </div>
                      <div className="divide-y">
                        {/* Player 1 */}
                        <div className="grid grid-cols-12 gap-4 p-3 items-center hover:bg-muted/20 transition-colors">
                          <div className="col-span-1 text-center font-bold">1</div>
                          <div className="col-span-5 flex items-center gap-3">
                            <div className="relative h-8 w-8 overflow-hidden rounded-full">
                              <Image
                                src="/placeholder.svg?height=32&width=32"
                                alt="Player"
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-medium">GrandMaster42</div>
                              <div className="text-xs text-muted-foreground">Level 8</div>
                            </div>
                          </div>
                          <div className="col-span-2 text-center">5/0/1</div>
                          <div className="col-span-2 text-center font-bold">5.5</div>
                          <div className="col-span-2 text-center">
                            <Badge className="bg-green-500">Advancing</Badge>
                          </div>
                        </div>

                        {/* Player 2 */}
                        <div className="grid grid-cols-12 gap-4 p-3 items-center hover:bg-muted/20 transition-colors">
                          <div className="col-span-1 text-center font-bold">2</div>
                          <div className="col-span-5 flex items-center gap-3">
                            <div className="relative h-8 w-8 overflow-hidden rounded-full">
                              <Image
                                src="/placeholder.svg?height=32&width=32"
                                alt="Player"
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-medium">ChessMaster99</div>
                              <div className="text-xs text-muted-foreground">Level 7</div>
                            </div>
                          </div>
                          <div className="col-span-2 text-center">5/1/0</div>
                          <div className="col-span-2 text-center font-bold">5.0</div>
                          <div className="col-span-2 text-center">
                            <Badge className="bg-green-500">Advancing</Badge>
                          </div>
                        </div>

                        {/* Player 3 */}
                        <div className="grid grid-cols-12 gap-4 p-3 items-center hover:bg-muted/20 transition-colors">
                          <div className="col-span-1 text-center font-bold">3</div>
                          <div className="col-span-5 flex items-center gap-3">
                            <div className="relative h-8 w-8 overflow-hidden rounded-full">
                              <Image
                                src="/placeholder.svg?height=32&width=32"
                                alt="Player"
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-medium">StrategyGuru</div>
                              <div className="text-xs text-muted-foreground">Level 6</div>
                            </div>
                          </div>
                          <div className="col-span-2 text-center">4/1/1</div>
                          <div className="col-span-2 text-center font-bold">4.5</div>
                          <div className="col-span-2 text-center">
                            <Badge className="bg-green-500">Advancing</Badge>
                          </div>
                        </div>

                        {/* Player 4 */}
                        <div className="grid grid-cols-12 gap-4 p-3 items-center hover:bg-muted/20 transition-colors">
                          <div className="col-span-1 text-center font-bold">4</div>
                          <div className="col-span-5 flex items-center gap-3">
                            <div className="relative h-8 w-8 overflow-hidden rounded-full">
                              <Image
                                src="/placeholder.svg?height=32&width=32"
                                alt="Player"
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-medium">ChessWizard</div>
                              <div className="text-xs text-muted-foreground">Level 7</div>
                            </div>
                          </div>
                          <div className="col-span-2 text-center">4/2/0</div>
                          <div className="col-span-2 text-center font-bold">4.0</div>
                          <div className="col-span-2 text-center">
                            <Badge className="bg-green-500">Advancing</Badge>
                          </div>
                        </div>

                        {/* Player 5 */}
                        <div className="grid grid-cols-12 gap-4 p-3 items-center hover:bg-muted/20 transition-colors">
                          <div className="col-span-1 text-center font-bold">5</div>
                          <div className="col-span-5 flex items-center gap-3">
                            <div className="relative h-8 w-8 overflow-hidden rounded-full">
                              <Image
                                src="/placeholder.svg?height=32&width=32"
                                alt="Player"
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-medium">KnightMover</div>
                              <div className="text-xs text-muted-foreground">Level 5</div>
                            </div>
                          </div>
                          <div className="col-span-2 text-center">3/2/1</div>
                          <div className="col-span-2 text-center font-bold">3.5</div>
                          <div className="col-span-2 text-center">
                            <Badge variant="outline">In Progress</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center mt-4">
                      <Link href="/tournaments/chess-championship">
                        <Button variant="outline">
                          View Full Leaderboard
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>

                {/* E-Football Tournament */}
                <Card>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="relative h-16 w-16 overflow-hidden rounded-lg">
                          <Image
                            src="/placeholder.svg?height=64&width=64"
                            alt="E-Football"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <CardTitle>Pro League Season 5</CardTitle>
                            <Badge>E-Football</Badge>
                          </div>
                          <CardDescription>Group Stage in progress • 32 players remaining</CardDescription>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="text-sm font-medium">Prize Pool: $25,000</div>
                        <div className="text-xs text-muted-foreground">Ends in 1 week</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-lg border overflow-hidden">
                      <div className="grid grid-cols-12 gap-4 bg-muted/50 p-3 text-sm font-medium">
                        <div className="col-span-1 text-center">#</div>
                        <div className="col-span-5">Player</div>
                        <div className="col-span-2 text-center">W/L/D</div>
                        <div className="col-span-2 text-center">Points</div>
                        <div className="col-span-2 text-center">Status</div>
                      </div>
                      <div className="divide-y">
                        {/* Player 1 */}
                        <div className="grid grid-cols-12 gap-4 p-3 items-center hover:bg-muted/20 transition-colors">
                          <div className="col-span-1 text-center font-bold">1</div>
                          <div className="col-span-5 flex items-center gap-3">
                            <div className="relative h-8 w-8 overflow-hidden rounded-full">
                              <Image
                                src="/placeholder.svg?height=32&width=32"
                                alt="Player"
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-medium">FootballKing</div>
                              <div className="text-xs text-muted-foreground">Level 8</div>
                            </div>
                          </div>
                          <div className="col-span-2 text-center">4/0/1</div>
                          <div className="col-span-2 text-center font-bold">13</div>
                          <div className="col-span-2 text-center">
                            <Badge className="bg-green-500">Group Leader</Badge>
                          </div>
                        </div>

                        {/* Player 2 */}
                        <div className="grid grid-cols-12 gap-4 p-3 items-center hover:bg-muted/20 transition-colors">
                          <div className="col-span-1 text-center font-bold">2</div>
                          <div className="col-span-5 flex items-center gap-3">
                            <div className="relative h-8 w-8 overflow-hidden rounded-full">
                              <Image
                                src="/placeholder.svg?height=32&width=32"
                                alt="Player"
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-medium">SoccerLegend</div>
                              <div className="text-xs text-muted-foreground">Level 7</div>
                            </div>
                          </div>
                          <div className="col-span-2 text-center">3/1/1</div>
                          <div className="col-span-2 text-center font-bold">10</div>
                          <div className="col-span-2 text-center">
                            <Badge variant="outline">In Progress</Badge>
                          </div>
                        </div>

                        {/* Player 3 */}
                        <div className="grid grid-cols-12 gap-4 p-3 items-center hover:bg-muted/20 transition-colors">
                          <div className="col-span-1 text-center font-bold">3</div>
                          <div className="col-span-5 flex items-center gap-3">
                            <div className="relative h-8 w-8 overflow-hidden rounded-full">
                              <Image
                                src="/placeholder.svg?height=32&width=32"
                                alt="Player"
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-medium">GoalScorer</div>
                              <div className="text-xs text-muted-foreground">Level 6</div>
                            </div>
                          </div>
                          <div className="col-span-2 text-center">3/2/0</div>
                          <div className="col-span-2 text-center font-bold">9</div>
                          <div className="col-span-2 text-center">
                            <Badge variant="outline">In Progress</Badge>
                          </div>
                        </div>

                        {/* Player 4 */}
                        <div className="grid grid-cols-12 gap-4 p-3 items-center hover:bg-muted/20 transition-colors">
                          <div className="col-span-1 text-center font-bold">4</div>
                          <div className="col-span-5 flex items-center gap-3">
                            <div className="relative h-8 w-8 overflow-hidden rounded-full">
                              <Image
                                src="/placeholder.svg?height=32&width=32"
                                alt="Player"
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-medium">MidfielderPro</div>
                              <div className="text-xs text-muted-foreground">Level 7</div>
                            </div>
                          </div>
                          <div className="col-span-2 text-center">2/2/1</div>
                          <div className="col-span-2 text-center font-bold">7</div>
                          <div className="col-span-2 text-center">
                            <Badge variant="outline">In Progress</Badge>
                          </div>
                        </div>

                        {/* Player 5 */}
                        <div className="grid grid-cols-12 gap-4 p-3 items-center hover:bg-muted/20 transition-colors">
                          <div className="col-span-1 text-center font-bold">5</div>
                          <div className="col-span-5 flex items-center gap-3">
                            <div className="relative h-8 w-8 overflow-hidden rounded-full">
                              <Image
                                src="/placeholder.svg?height=32&width=32"
                                alt="Player"
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-medium">DefenderElite</div>
                              <div className="text-xs text-muted-foreground">Level 5</div>
                            </div>
                          </div>
                          <div className="col-span-2 text-center">1/3/1</div>
                          <div className="col-span-2 text-center font-bold">4</div>
                          <div className="col-span-2 text-center">
                            <Badge variant="outline" className="bg-red-500/20 text-red-500 border-red-500/50">
                              At Risk
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center mt-4">
                      <Link href="/tournaments/pro-league-season-5">
                        <Button variant="outline">
                          View Full Leaderboard
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="completed" className="mt-6 space-y-8">
                {/* Completed Chess Tournament */}
                <Card>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="relative h-16 w-16 overflow-hidden rounded-lg">
                          <Image src="/placeholder.svg?height=64&width=64" alt="Chess" fill className="object-cover" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <CardTitle>Winter Chess Championship</CardTitle>
                            <Badge>Chess</Badge>
                          </div>
                          <CardDescription>Completed on January 15, 2025 • 128 participants</CardDescription>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="text-sm font-medium">Prize Pool: $8,000</div>
                        <div className="text-xs text-muted-foreground">Completed</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-lg border overflow-hidden">
                      <div className="grid grid-cols-12 gap-4 bg-muted/50 p-3 text-sm font-medium">
                        <div className="col-span-1 text-center">#</div>
                        <div className="col-span-5">Player</div>
                        <div className="col-span-2 text-center">W/L/D</div>
                        <div className="col-span-2 text-center">Points</div>
                        <div className="col-span-2 text-center">Prize</div>
                      </div>
                      <div className="divide-y">
                        {/* Winner */}
                        <div className="grid grid-cols-12 gap-4 p-3 items-center hover:bg-muted/20 transition-colors bg-blue-500/10">
                          <div className="col-span-1 text-center">
                            <Medal className="h-5 w-5 text-yellow-500 mx-auto" />
                          </div>
                          <div className="col-span-5 flex items-center gap-3">
                            <div className="relative h-8 w-8 overflow-hidden rounded-full">
                              <Image
                                src="/placeholder.svg?height=32&width=32"
                                alt="Player"
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-medium">GrandMaster42</div>
                              <div className="text-xs text-muted-foreground">Level 8</div>
                            </div>
                          </div>
                          <div className="col-span-2 text-center">12/1/2</div>
                          <div className="col-span-2 text-center font-bold">13</div>
                          <div className="col-span-2 text-center font-medium text-green-500">$4,000</div>
                        </div>

                        {/* Runner-up */}
                        <div className="grid grid-cols-12 gap-4 p-3 items-center hover:bg-muted/20 transition-colors bg-blue-500/5">
                          <div className="col-span-1 text-center">
                            <Medal className="h-5 w-5 text-gray-400 mx-auto" />
                          </div>
                          <div className="col-span-5 flex items-center gap-3">
                            <div className="relative h-8 w-8 overflow-hidden rounded-full">
                              <Image
                                src="/placeholder.svg?height=32&width=32"
                                alt="Player"
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-medium">ChessMaster99</div>
                              <div className="text-xs text-muted-foreground">Level 7</div>
                            </div>
                          </div>
                          <div className="col-span-2 text-center">11/2/2</div>
                          <div className="col-span-2 text-center font-bold">12</div>
                          <div className="col-span-2 text-center font-medium text-green-500">$2,000</div>
                        </div>

                        {/* Third Place */}
                        <div className="grid grid-cols-12 gap-4 p-3 items-center hover:bg-muted/20 transition-colors bg-blue-500/5">
                          <div className="col-span-1 text-center">
                            <Medal className="h-5 w-5 text-amber-700 mx-auto" />
                          </div>
                          <div className="col-span-5 flex items-center gap-3">
                            <div className="relative h-8 w-8 overflow-hidden rounded-full">
                              <Image
                                src="/placeholder.svg?height=32&width=32"
                                alt="Player"
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-medium">StrategyGuru</div>
                              <div className="text-xs text-muted-foreground">Level 6</div>
                            </div>
                          </div>
                          <div className="col-span-2 text-center">10/3/2</div>
                          <div className="col-span-2 text-center font-bold">11</div>
                          <div className="col-span-2 text-center font-medium text-green-500">$1,000</div>
                        </div>

                        {/* Fourth Place */}
                        <div className="grid grid-cols-12 gap-4 p-3 items-center hover:bg-muted/20 transition-colors">
                          <div className="col-span-1 text-center font-bold">4</div>
                          <div className="col-span-5 flex items-center gap-3">
                            <div className="relative h-8 w-8 overflow-hidden rounded-full">
                              <Image
                                src="/placeholder.svg?height=32&width=32"
                                alt="Player"
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-medium">ChessWizard</div>
                              <div className="text-xs text-muted-foreground">Level 7</div>
                            </div>
                          </div>
                          <div className="col-span-2 text-center">9/4/2</div>
                          <div className="col-span-2 text-center font-bold">10</div>
                          <div className="col-span-2 text-center font-medium text-green-500">$500</div>
                        </div>

                        {/* Fifth Place */}
                        <div className="grid grid-cols-12 gap-4 p-3 items-center hover:bg-muted/20 transition-colors">
                          <div className="col-span-1 text-center font-bold">5</div>
                          <div className="col-span-5 flex items-center gap-3">
                            <div className="relative h-8 w-8 overflow-hidden rounded-full">
                              <Image
                                src="/placeholder.svg?height=32&width=32"
                                alt="Player"
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-medium">KnightMover</div>
                              <div className="text-xs text-muted-foreground">Level 5</div>
                            </div>
                          </div>
                          <div className="col-span-2 text-center">8/5/2</div>
                          <div className="col-span-2 text-center font-bold">9</div>
                          <div className="col-span-2 text-center font-medium text-green-500">$500</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center mt-4">
                      <Link href="/tournaments/winter-chess-championship">
                        <Button variant="outline">
                          View Full Results
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="upcoming" className="mt-6 space-y-8">
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <Trophy className="h-12 w-12 text-blue-500 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Upcoming Tournament Leaderboards</h3>
                  <p className="text-muted-foreground max-w-md">
                    Leaderboards for upcoming tournaments will be available once the tournaments begin. Check back soon
                    or browse our upcoming tournaments to register.
                  </p>
                  <Link href="/tournaments" className="mt-4">
                    <Button>Browse Upcoming Tournaments</Button>
                  </Link>
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

