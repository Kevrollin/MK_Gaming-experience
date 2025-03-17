"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Clock, Trophy } from "lucide-react"
import { fetchUpcomingTournaments } from "@/lib/api" // Use the updated API function
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function TournamentCards() {
  const { user } = useAuth()
  const [tournaments, setTournaments] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadTournaments()
  }, [user])

  const loadTournaments = async () => {
    try {
      setIsLoading(true)
      const data = await fetchUpcomingTournaments(user?.id)
      setTournaments(data)
    } catch (error) {
      console.error("Error loading tournaments:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="game-card">
            <CardHeader>
              <div className="h-48 w-full bg-muted animate-pulse rounded-t-lg"></div>
              <div className="h-6 w-3/4 bg-muted animate-pulse mt-4"></div>
              <div className="h-4 w-full bg-muted animate-pulse mt-2"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="h-4 w-1/4 bg-muted animate-pulse"></div>
                  <div className="h-4 w-1/4 bg-muted animate-pulse"></div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="h-4 w-1/4 bg-muted animate-pulse"></div>
                  <div className="h-4 w-1/4 bg-muted animate-pulse"></div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="h-4 w-1/4 bg-muted animate-pulse"></div>
                  <div className="h-4 w-1/4 bg-muted animate-pulse"></div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="h-10 w-full bg-muted animate-pulse rounded-md"></div>
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  if (tournaments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-center">
        <Trophy className="h-12 w-12 text-blue-500 mb-4" />
        <h3 className="text-xl font-bold mb-2">No Upcoming Tournaments</h3>
        <p className="text-muted-foreground max-w-md">
          There are no upcoming tournaments at the moment. Check back later or create your own tournament.
        </p>
        <Link href="/tournaments/create" className="mt-4">
          <Button>Create Tournament</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
      {tournaments.map((tournament) => (
        <Card key={tournament.id} className="game-card">
          <CardHeader>
            <div className="relative h-48 w-full">
              <Image
                src={tournament.image_url || "/placeholder.svg?height=200&width=400"}
                alt={tournament.name}
                fill
                className="object-cover rounded-t-lg"
              />
              <div className="absolute top-2 left-2 flex gap-2">
                <Badge className="bg-blue-500">{tournament.game.name}</Badge>
                <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                  {tournament.status.charAt(0).toUpperCase() + tournament.status.slice(1).replace("_", " ")}
                </Badge>
              </div>
            </div>
            <CardTitle className="mt-4">{tournament.name}</CardTitle>
            <CardDescription>{tournament.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Prize Pool:</span>
                <span className="font-bold">${tournament.prize_pool}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Participants:</span>
                <span>
                  {tournament.current_participants}/{tournament.max_participants}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Registration Deadline:</span>
                <span>{new Date(tournament.registration_close_date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Start Date:</span>
                <span>{new Date(tournament.start_date).toLocaleDateString()}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {getTimeUntil(tournament.start_date)}
            </Badge>
            <Link href={`/tournaments/${tournament.slug}`}>
              <Button disabled={tournament.isRegistered}>
                {tournament.isRegistered ? "Registered" : "Register Now"}
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

function getTimeUntil(dateString: string): string {
  const now = new Date()
  const date = new Date(dateString)
  const diffTime = date.getTime() - now.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays < 0) return "Started"
  if (diffDays === 0) return "Today"
  if (diffDays === 1) return "Tomorrow"
  if (diffDays < 7) return `In ${diffDays} days`
  if (diffDays < 30) return `In ${Math.floor(diffDays / 7)} weeks`
  return `In ${Math.floor(diffDays / 30)} months`
}

