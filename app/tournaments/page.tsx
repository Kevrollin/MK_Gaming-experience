import Link from "next/link"
import Image from "next/image"
import { Clock, ChevronRight, Filter, Search, ChevronLeft, Gamepad2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TournamentsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl neon-text">Tournaments</h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Compete in tournaments across various games and win amazing prizes
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search tournaments..." className="w-full pl-8 md:w-[300px]" />
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
                  <Select defaultValue="upcoming">
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="ongoing">Ongoing</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Link href="/tournaments/create">
                <Button>
                  Create Tournament
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="game-card">
                <CardHeader>
                  <div className="relative h-48 w-full">
                    <Image
                      src="/placeholder.svg?height=200&width=400"
                      alt="Chess Tournament"
                      fill
                      className="object-cover rounded-t-lg"
                    />
                    <div className="absolute top-2 left-2 flex gap-2">
                      <Badge className="bg-blue-500">Chess</Badge>
                      <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                        Upcoming
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="mt-4">World Chess Championship</CardTitle>
                  <CardDescription>Global tournament with players from 50+ countries</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Prize Pool:</span>
                      <span className="font-bold">$10,000</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Participants:</span>
                      <span>128/256</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Start Date:</span>
                      <span>March 25, 2025</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Format:</span>
                      <span>Swiss System</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    In 3 days
                  </Badge>
                  <Link href="/tournaments/chess-championship">
                    <Button>Register Now</Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="game-card">
                <CardHeader>
                  <div className="relative h-48 w-full">
                    <Image
                      src="/placeholder.svg?height=200&width=400"
                      alt="E-Football Tournament"
                      fill
                      className="object-cover rounded-t-lg"
                    />
                    <div className="absolute top-2 left-2 flex gap-2">
                      <Badge className="bg-blue-500">E-Football</Badge>
                      <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                        Registration Closed
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="mt-4">Pro League Season 5</CardTitle>
                  <CardDescription>The biggest E-Football tournament of the year</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Prize Pool:</span>
                      <span className="font-bold">$25,000</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Participants:</span>
                      <span>64/64</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Start Date:</span>
                      <span>March 28, 2025</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Format:</span>
                      <span>Group Stage + Knockout</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    In 5 days
                  </Badge>
                  <Button variant="secondary" disabled>
                    Tournament Full
                  </Button>
                </CardFooter>
              </Card>

              <Card className="game-card">
                <CardHeader>
                  <div className="relative h-48 w-full">
                    <Image
                      src="/placeholder.svg?height=200&width=400"
                      alt="PUBG Tournament"
                      fill
                      className="object-cover rounded-t-lg"
                    />
                    <div className="absolute top-2 left-2 flex gap-2">
                      <Badge className="bg-blue-500">PUBG</Badge>
                      <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                        Upcoming
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="mt-4">Battle Royale Masters</CardTitle>
                  <CardDescription>Squad-based competition with teams from around the world</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Prize Pool:</span>
                      <span className="font-bold">$50,000</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Participants:</span>
                      <span>32/50 Teams</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Start Date:</span>
                      <span>April 5, 2025</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Format:</span>
                      <span>Battle Royale (5 Rounds)</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    In 1 week
                  </Badge>
                  <Link href="/tournaments/pubg-masters">
                    <Button>Register Team</Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="game-card">
                <CardHeader>
                  <div className="relative h-48 w-full">
                    <Image
                      src="/placeholder.svg?height=200&width=400"
                      alt="Fortnite Tournament"
                      fill
                      className="object-cover rounded-t-lg"
                    />
                    <div className="absolute top-2 left-2 flex gap-2">
                      <Badge className="bg-blue-500">Fortnite</Badge>
                      <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                        Upcoming
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="mt-4">Fortnite World Cup</CardTitle>
                  <CardDescription>Solo and duo competition with the best players worldwide</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Prize Pool:</span>
                      <span className="font-bold">$100,000</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Participants:</span>
                      <span>156/200</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Start Date:</span>
                      <span>April 12, 2025</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Format:</span>
                      <span>Qualifiers + Finals</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    In 2 weeks
                  </Badge>
                  <Link href="/tournaments/fortnite-cup">
                    <Button>Register Now</Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="game-card">
                <CardHeader>
                  <div className="relative h-48 w-full">
                    <Image
                      src="/placeholder.svg?height=200&width=400"
                      alt="Call of Duty Tournament"
                      fill
                      className="object-cover rounded-t-lg"
                    />
                    <div className="absolute top-2 left-2 flex gap-2">
                      <Badge className="bg-blue-500">Call of Duty</Badge>
                      <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                        Upcoming
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="mt-4">Warzone Championship</CardTitle>
                  <CardDescription>Team-based battle royale competition</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Prize Pool:</span>
                      <span className="font-bold">$30,000</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Participants:</span>
                      <span>28/40 Teams</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Start Date:</span>
                      <span>April 18, 2025</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Format:</span>
                      <span>Battle Royale (6 Rounds)</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    In 3 weeks
                  </Badge>
                  <Link href="/tournaments/warzone-championship">
                    <Button>Register Team</Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="game-card">
                <CardHeader>
                  <div className="relative h-48 w-full">
                    <Image
                      src="/placeholder.svg?height=200&width=400"
                      alt="League of Legends Tournament"
                      fill
                      className="object-cover rounded-t-lg"
                    />
                    <div className="absolute top-2 left-2 flex gap-2">
                      <Badge className="bg-blue-500">League of Legends</Badge>
                      <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                        Upcoming
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="mt-4">Summoner's Cup</CardTitle>
                  <CardDescription>5v5 team competition for League of Legends players</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Prize Pool:</span>
                      <span className="font-bold">$40,000</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Participants:</span>
                      <span>16/32 Teams</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Start Date:</span>
                      <span>April 25, 2025</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Format:</span>
                      <span>Double Elimination</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    In 4 weeks
                  </Badge>
                  <Link href="/tournaments/summoners-cup">
                    <Button>Register Team</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>

            <div className="mt-8 flex justify-center">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" disabled>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="bg-blue-500 hover:bg-blue-600">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
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

