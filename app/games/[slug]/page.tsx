"use client"

import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Gamepad2, Users, Trophy, Star, ChevronRight, Clock, Award, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { fetchGameDetails } from "@/lib/api"

interface GamePageProps {
  params: {
    slug: string
  }
}

export default async function GamePage({ params }: GamePageProps) {
  const { slug } = params
  
  // In a real app, this would fetch data from an API
  // For now, we'll use mock data based on the slug
  const gameData = await fetchGameDetails(slug)
  
  if (!gameData) {
    notFound()
  }
  
  // Mock data for preview
  const mockGameData = {
    id: "chess",
    name: "Chess",
    slug: "chess",
    description: "Test your strategic skills against players worldwide in the classic game of chess. Compete in tournaments, improve your rating, and climb the leaderboards.",
    longDescription: "Chess is a two-player strategy board game played on a checkered board with 64 squares arranged in an 8×8 grid. Each player begins with 16 pieces: one king, one queen, two rooks, two knights, two bishops, and eight pawns. The objective is to checkmate the opponent's king, whereby the king is under immediate attack (in \"check\") and there is no way for it to escape. On our platform, you can play chess against opponents of similar skill levels, participate in tournaments with various time controls, and track your progress with our comprehensive rating system.",
    image: "/placeholder.svg?height=400&width=800",
    activePlayers: 5240,
    activeTournaments: 12,
    categories: ["Strategy", "Board Game", "1v1"],
    platforms: ["PC", "Mobile", "Browser"],
    features: ["Ranked Matches", "Tournaments", "Skill-Based Matchmaking", "Leaderboards"],
    rules: "Chess is played on a square board of eight rows and eight columns. Each player starts with 16 pieces: one king, one queen, two rooks, two knights, two bishops, and eight pawns. The goal is to checkmate the opponent's king by placing it under an inescapable threat of capture.",
    skillLevels: [
      { name: "Beginner", rating: "0-800", description: "New to chess or still learning the basic rules and piece movements." },
      { name: "Intermediate", rating: "800-1400", description: "Understands basic tactics and strategies, but still developing consistency." },
      { name: "Advanced", rating: "1400-2000", description: "Strong understanding of chess principles, tactics, and some advanced strategies." },
      { name: "Expert", rating: "2000+", description: "Mastery of chess concepts, deep strategic understanding, and strong tactical awareness." }
    ],
    upcomingTournaments: [
      {
        id: "wcc-2025",
        title: "World Chess Championship",
        startDate: "2025-03-25T12:00:00Z",
        registrationDeadline: "2025-03-22T23:59:59Z",
        prizePool: "$10,000",
        participants: {
          current: 128,
          max: 256
        }
      },
      {
        id: "chess-masters-cup",
        title: "Chess Masters Cup",
        startDate: "2025-04-10T15:00:00Z",
        registrationDeadline: "2025-04-07T23:59:59Z",
        prizePool: "$5,000",
        participants: {
          current: 64,
          max: 128
        }
      }
    ],
    topPlayers: [
      {
        id: "p1",
        username: "GrandMaster42",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 2450,
        level: 10,
        country: "United States"
      },
      {
        id: "p2",
        username: "ChessMaster99",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 2380,
        level: 9,
        country: "Russia"
      },
      {
        id: "p3",
        username: "StrategyGuru",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 2310,
        level: 8,
        country: "India"
      },
      {
        id: "p4",
        username: "ChessWizard",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 2290,
        level: 8,
        country: "Norway"
      },
      {
        id: "p5",
        username: "KnightMover",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 2240,
        level: 7,
        country: "China"
      }
    ]
  }
  
  // Use mock data for preview
  const game = gameData || mockGameData
  
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-12 md:py-16 border-b">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge>{game.categories[0]}</Badge>
                    {game.categories.slice(1).map((category, index) => (
                      <Badge key={index} variant="outline">{category}</Badge>
                    ))};
                  </div>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl neon-text">
                    {game.name}
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    {game.description}
                  </p>
                </div>
                <div className="flex flex-col gap-4 min-[400px]:flex-row">
                  <Link href={`/games/${game.slug}/play`}>
                    <Button className="animate-pulse-glow">
                      Play Now
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href={`/tournaments?game=${game.slug}`}>
                    <Button variant="outline">
                      Browse Tournaments
                    </Button>
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="flex flex-col items-center justify-center p-4 bg-muted/30 rounded-lg">
                    <Users className="h-6 w-6 text-blue-500 mb-2" />
                    <div className="text-2xl font-bold">{game.activePlayers.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Active Players</div>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 bg-muted/30 rounded-lg">
                    <Trophy className="h-6 w-6 text-blue-500 mb-2" />
                    <div className="text-2xl font-bold">{game.activeTournaments}</div>
                    <div className="text-sm text-muted-foreground">Active Tournaments</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[300px] w-full md:h-[400px]">
                  <Image
                    src={game.image || "/placeholder.svg"}
                    alt={game.name}
                    fill
                    className="object-cover rounded-lg shadow-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Game Details Section */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="tournaments">Tournaments</TabsTrigger>
                <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
                <TabsTrigger value="how-to-play">How to Play</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-6 space-y-8">
                <div className="grid gap-6 lg:grid-cols-3">
                  <div className="lg:col-span-2 space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-4">About {game.name}</h2>
                      <p className="text-muted-foreground">
                        {game.longDescription}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold mb-3">Features</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {game.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10">
                              <Check className="h-4 w-4 text-blue-500" />
                            </div>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold mb-3">Skill Levels</h3>
                      <div className="space-y-4">
                        {game.skillLevels.map((level, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10 mt-1">
                              {index === 0 ? (
                                <Star className="h-4 w-4 text-blue-500" />
                              ) : index === 1 ? (
                                <Star className="h-4 w-4 text-blue-500" />
                              ) : index === 2 ? (
                                <Award className="h-4 w-4 text-blue-500" />
                              ) : (
                                <Trophy className="h-4 w-4 text-blue-500" />
                              )}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium">{level.name}</h4>
                                <Badge variant="outline">{level.rating}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">
                                {level.description}
                              </p>
                            </div>
                          </div>
                        ))};
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Trophy className="h-5 w-5 text-blue-500" />
                          Top Players
                        </CardTitle>
                        <CardDescription>
                          The highest rated players in {game.name}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="divide-y">
                          {game.topPlayers.map((player: typeof game.topPlayers[0], index: number) => (
                            <Link 
                              key={player.id} 
                              href={`/players/${player.id}`}
                              className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <div className="text-sm font-medium w-5 text-center">
                                  {index + 1}
                                </div>
                                <div className="relative h-8 w-8 overflow-hidden rounded-full">
                                  <Image
                                    src={player.avatar || "/placeholder.svg"}
                                    alt={player.username}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div>
                                  <div className="font-medium">{player.username}</div>
                                  <div className="text-xs text-muted-foreground">
                                    Level {player.level} • {player.country}
                                  </div>
                                </div>
                              </div>
                              <div className="font-bold">{player.rating}</div>
                            </Link>
                          ))};
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-center p-4">
                        <Link href={`/leaderboards?game=${game.slug}`}>
                          <Button variant="outline" size="sm">
                            View Full Leaderboard
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Clock className="h-5 w-5 text-blue-500" />
                          Upcoming Tournaments
                        </CardTitle>
                        <CardDescription>
                          Register now to compete
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="divide-y">
                          {game.upcomingTournaments.map((tournament) => (
                            <Link 
                              key={tournament.id} 
                              href={`/tournaments/${tournament.id}`}
                              className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                            >
                              <div>
                                <div className="font-medium">{tournament.title}</div>
                                <div className="text-xs text-muted-foreground">
                                  Starts {new Date(tournament.startDate).toLocaleDateString()} • 
                                  Prize: {tournament.prizePool}
                                </div>
                              </div>
                              <Button size="sm">Register</Button>
                            </Link>
                          ))};
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-center p-4">
                        <Link href={`/tournaments?game=${game.slug}`}>
                          <Button variant="outline" size="sm">
                            View All Tournaments
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Gamepad2 className="h-5 w-5 text-blue-500" />
                          Available On
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {game.platforms.map((platform, index) => (
                            <Badge key={index} variant="outline">{platform}</Badge>
                          ))};
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="tournaments" className="mt-6 space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">{game.name} Tournaments</h2>
                  <Link href={`/tournaments/create?game=${game.slug}`}>
                    <Button>
                      Create Tournament
                    </Button>
                  </Link>
                </div>
                
                <Tabs defaultValue="upcoming" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="upcoming" className="mt-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {game.upcomingTournaments.map((tournament) => (
                        <Card key={tournament.id} className="game-card">
                          <CardHeader>
                            <div className="relative h-40 w-full">
                              <Image
                                src="/placeholder.svg?height=160&width=320"
                                alt={tournament.title}
                                fill
                                className="object-cover rounded-t-lg"
                              />
                              <div className="absolute top-2 left-2">
                                <Badge className="bg-blue-500">{game.name}</Badge>
                              </div>
                            </div>
                            <CardTitle className="mt-4">{tournament.title}</CardTitle>
                            <CardDescription>
                              Registration open until {new Date(tournament.registrationDeadline).toLocaleDateString()}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Prize Pool:</span>
                                <span className="font-bold">{tournament.prizePool}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Participants:</span>
                                <span>{tournament.participants.current}/{tournament.participants.max}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Start Date:</span>
                                <span>{new Date(tournament.startDate).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Link href={`/tournaments/${tournament.id}`} className="w-full">
                              <Button className="w-full">Register Now</Button>
                            </Link>
                          </CardFooter>
                        </Card>
                      ))};
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="ongoing" className="mt-6">
                    <div className="flex flex-col items-center justify-center p-8 text-center">
                      <Trophy className="h-12 w-12 text-blue-500 mb-4" />
                      <h3 className="text-xl font-bold mb-2">No Ongoing Tournaments</h3>
                      <p className="text-muted-foreground max-w-md">
                        There are no ongoing tournaments for {game.name} at the moment.
                        Check back soon or browse upcoming tournaments.
                      </p>
                      <Link href={`/tournaments?game=${game.slug}&status=upcoming`} className="mt-4">
                        <Button>
                          Browse Upcoming Tournaments
                        </Button>
                      </Link>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="completed" className="mt-6">
                    <div className="flex flex-col items-center justify-center p-8 text-center">
                      <Trophy className="h-12 w-12 text-blue-500 mb-4" />
                      <h3 className="text-xl font-bold mb-2">Tournament History</h3>
                      <p className="text-muted-foreground max-w-md">
                        View past tournaments, winners, and results.
                      </p>
                      <Link href={`/tournaments?game=${game.slug}&status=completed`} className="mt-4">
                        <Button>
                          View Tournament History
                        </Button>
                      </Link>
                    </div>
                  </TabsContent>
                </Tabs>
              </TabsContent>
              
              <TabsContent value="leaderboard" className="mt-6 space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">{game.name} Leaderboard</h2>
                  <Link href={`/leaderboards?game=${game.slug}`}>
                    <Button variant="outline">
                      View Full Leaderboard
                    </Button>
                  </Link>
                </div>
                
                <div className="rounded-lg border overflow-hidden">
                  <div className="grid grid-cols-12 gap-4 bg-muted/50 p-3 text-sm font-medium">
                    <div className="col-span-1 text-center">#</div>
                    <div className="col-span-5">Player</div>
                    <div className="col-span-2 text-center">Rating</div>
                    <div className="col-span-2 text-center">Level</div>
                    <div className="col-span-2 text-center">Country</div>
                  </div>
                  <div className="divide-y">
                    {game.topPlayers.map((player, index) => (
                      <Link 
                        key={player.id} 
                        href={`/players/${player.id}`}
                        className="grid grid-cols-12 gap-4 p-3 items-center hover:bg-muted/20 transition-colors"
                      >
                        <div className="col-span-1 text-center font-bold">{index + 1}</div>
                        <div className="col-span-5 flex items-center gap-3">
                          <div className="relative h-8 w-8 overflow-hidden rounded-full">
                            <Image
                              src={player.avatar || "/placeholder.svg"}
                              alt={player.username}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="font-medium">{player.username}</div>
                        </div>
                        <div className="col-span-2 text-center font-bold">{player.rating}</div>
                        <div className="col-span-2 text-center">
                          <Badge variant="outline">Level {player.level}</Badge>
                        </div>
                        <div className="col-span-2 text-center">{player.country}</div>
                      </Link>
                    ))};
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
        {/* Hero Section */}
        <section className="relative py-12 md:py-16 border-b">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge>{game.categories[0]}</Badge>
                    {game.categories.slice(1).map((category, index) => (
                      <Badge key={index} variant="outline">{category}</Badge>
                    ))};
                  </div>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl neon-text">
                    {game.name}
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    {game.description}
                  </p>
                </div>
                <div className="flex flex-col gap-4 min-[400px]:flex-row">
                  <Link href={`/games/${game.slug}/play`}>
                    <Button className="animate-pulse-glow">
                      Play Now
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href={`/tournaments?game=${game.slug}`}>
                    <Button variant="outline">
                      Browse Tournaments
                    </Button>
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="flex flex-col items-center justify-center p-4 bg-muted/30 rounded-lg">
                    <Users className="h-6 w-6 text-blue-500 mb-2" />
                    <div className="text-2xl font-bold">{game.activePlayers.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Active Players</div>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 bg-muted/30 rounded-lg">
                    <Trophy className="h-6 w-6 text-blue-500 mb-2" />
                    <div className="text-2xl font-bold">{game.activeTournaments}</div>
                    <div className="text-sm text-muted-foreground">Active Tournaments</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[300px] w-full md:h-[400px]">
                  <Image
                    src={game.image || "/placeholder.svg"}
                    alt={game.name}
                    fill
                    className="object-cover rounded-lg shadow-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Game Details Section */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="tournaments">Tournaments</TabsTrigger>
                <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
                <TabsTrigger value="how-to-play">How to Play</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-6 space-y-8">
                <div className="grid gap-6 lg:grid-cols-3">
                  <div className="lg:col-span-2 space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-4">About {game.name}</h2>
                      <p className="text-muted-foreground">
                        {game.longDescription}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold mb-3">Features</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {game.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10">
                              <Check className="h-4 w-4 text-blue-500" />
                            </div>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold mb-3">Skill Levels</h3>
                      <div className="space-y-4">
                        {game.skillLevels.map((level, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10 mt-1">
                              {index === 0 ? (
                                <Star className="h-4 w-4 text-blue-500" />
                              ) : index === 1 ? (
                                <Star className="h-4 w-4 text-blue-500" />
                              ) : index === 2 ? (
                                <Award className="h-4 w-4 text-blue-500" />
                              ) : (
                                <Trophy className="h-4 w-4 text-blue-500" />
                              )}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium">{level.name}</h4>
                                <Badge variant="outline">{level.rating}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">
                                {level.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Trophy className="h-5 w-5 text-blue-500" />
                          Top Players
                        </CardTitle>
                        <CardDescription>
                          The highest rated players in {game.name}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="divide-y">
                          {game.topPlayers.map((player, index) => (
                            <Link 
                              key={player.id} 
                              href={`/players/${player.id}`}
                              className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <div className="text-sm font-medium w-5 text-center">
                                  {index + 1}
                                </div>
                                <div className="relative h-8 w-8 overflow-hidden rounded-full">
                                  <Image
                                    src={player.avatar || "/placeholder.svg"}
                                    alt={player.username}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div>
                                  <div className="font-medium">{player.username}</div>
                                  <div className="text-xs text-muted-foreground">
                                    Level {player.level} • {player.country}
                                  </div>
                                </div>
                              </div>
                              <div className="font-bold">{player.rating}</div>
                            </Link>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-center p-4">
                        <Link href={`/leaderboards?game=${game.slug}`}>
                          <Button variant="outline" size="sm">
                            View Full Leaderboard
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Clock className="h-5 w-5 text-blue-500" />
                          Upcoming Tournaments
                        </CardTitle>
                        <CardDescription>
                          Register now to compete
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="divide-y">
                          {game.upcomingTournaments.map((tournament) => (
                            <Link 
                              key={tournament.id} 
                              href={`/tournaments/${tournament.id}`}
                              className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                            >
                              <div>
                                <div className="font-medium">{tournament.title}</div>
                                <div className="text-xs text-muted-foreground">
                                  Starts {new Date(tournament.startDate).toLocaleDateString()} • 
                                  Prize: {tournament.prizePool}
                                </div>
                              </div>
                              <Button size="sm">Register</Button>
                            </Link>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-center p-4">
                        <Link href={`/tournaments?game=${game.slug}`}>
                          <Button variant="outline" size="sm">
                            View All Tournaments
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Gamepad2 className="h-5 w-5 text-blue-500" />
                          Available On
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {game.platforms.map((platform, index) => (
                            <Badge key={index} variant="outline">{platform}</Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="tournaments" className="mt-6 space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">{game.name} Tournaments</h2>
                  <Link href={`/tournaments/create?game=${game.slug}`}>
                    <Button>
                      Create Tournament
                    </Button>
                  </Link>
                </div>
                
                <Tabs defaultValue="upcoming" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="upcoming" className="mt-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {game.upcomingTournaments.map((tournament) => (
                        <Card key={tournament.id} className="game-card">
                          <CardHeader>
                            <div className="relative h-40 w-full">
                              <Image
                                src="/placeholder.svg?height=160&width=320"
                                alt={tournament.title}
                                fill
                                className="object-cover rounded-t-lg"
                              />
                              <div className="absolute top-2 left-2">
                                <Badge className="bg-blue-500">{game.name}</Badge>
                              </div>
                            </div>
                            <CardTitle className="mt-4">{tournament.title}</CardTitle>
                            <CardDescription>
                              Registration open until {new Date(tournament.registrationDeadline).toLocaleDateString()}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Prize Pool:</span>
                                <span className="font-bold">{tournament.prizePool}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Participants:</span>
                                <span>{tournament.participants.current}/{tournament.participants.max}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Start Date:</span>
                                <span>{new Date(tournament.startDate).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Link href={`/tournaments/${tournament.id}`} className="w-full">
                              <Button className="w-full">Register Now</Button>
                            </Link>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="ongoing" className="mt-6">
                    <div className="flex flex-col items-center justify-center p-8 text-center">
                      <Trophy className="h-12 w-12 text-blue-500 mb-4" />
                      <h3 className="text-xl font-bold mb-2">No Ongoing Tournaments</h3>
                      <p className="text-muted-foreground max-w-md">
                        There are no ongoing tournaments for {game.name} at the moment.
                        Check back soon or browse upcoming tournaments.
                      </p>
                      <Link href={`/tournaments?game=${game.slug}&status=upcoming`} className="mt-4">
                        <Button>
                          Browse Upcoming Tournaments
                        </Button>
                      </Link>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="completed" className="mt-6">
                    <div className="flex flex-col items-center justify-center p-8 text-center">
                      <Trophy className="h-12 w-12 text-blue-500 mb-4" />
                      <h3 className="text-xl font-bold mb-2">Tournament History</h3>
                      <p className="text-muted-foreground max-w-md">
                        View past tournaments, winners, and results.
                      </p>
                      <Link href={`/tournaments?game=${game.slug}&status=completed`} className="mt-4">
                        <Button>
                          View Tournament History
                        </Button>
                      </Link>
                    </div>
                  </TabsContent>
                </Tabs>
              </TabsContent>
              
              <TabsContent value="leaderboard" className="mt-6 space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">{game.name} Leaderboard</h2>
                  <Link href={`/leaderboards?game=${game.slug}`}>
                    <Button variant="outline">
                      View Full Leaderboard
                    </Button>
                  </Link>
                </div>
                
                <div className="rounded-lg border overflow-hidden">
                  <div className="grid grid-cols-12 gap-4 bg-muted/50 p-3 text-sm font-medium">
                    <div className="col-span-1 text-center">#</div>
                    <div className="col-span-5">Player</div>
                    <div className="col-span-2 text-center">Rating</div>
                    <div className="col-span-2 text-center">Level</div>
                    <div className="col-span-2 text-center">Country</div>
                  </div>
                  <div className="divide-y">
                    {game.topPlayers.map((player, index) => (
                      <Link
                        key={player.id}
                        href={`/players/${player.id}`}
                        className="grid grid-cols-12 gap-4 p-3 items-center hover:bg-muted/20 transition-colors"
                      >
                        <div className="col-span-1 text-center font-bold">{index + 1}</div>
                        <div className="col-span-5 flex items-center gap-3">
                          <div className="relative h-8 w-8 overflow-hidden rounded-full">
                            <Image
                              src={player.avatar || "/placeholder.svg"}
                              alt={player.username}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="font-medium">{player.username}</div>
                        </div>
                        <div className="col-span-2 text-center font-bold">{player.rating}</div>
                        <div className="col-span-2 text-center">
                          <Badge variant="outline">Level {player.level}</Badge>
                        </div>
                        <div className="col-span-2 text-center">{player.country}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
    </div>
  )
}