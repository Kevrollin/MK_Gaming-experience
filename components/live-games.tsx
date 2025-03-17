"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Activity, Clock } from "lucide-react"
import { fetchLiveGames } from "@/lib/api" // Use the updated API function
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export function LiveGames() {
  const [games, setGames] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadLiveGames()

    // Set up polling for live updates
    const interval = setInterval(loadLiveGames, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const loadLiveGames = async () => {
    try {
      setIsLoading(true)
      const data = await fetchLiveGames()
      setGames(data)
    } catch (error) {
      console.error("Error loading live games:", error)
      toast({
        title: "Error",
        description: "Failed to load live games. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center p-6">
        <p>Loading live games...</p>
      </div>
    )
  }

  if (games.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <p className="mb-2">No live games at the moment.</p>
        <p className="text-sm text-muted-foreground">Check back later or browse upcoming tournaments.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {games.map((game) => (
        <Card key={game.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col sm:flex-row">
              <div className="flex-1 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-blue-500">{game.game_name}</Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Activity className="h-3 w-3 text-red-500" />
                    Live
                  </Badge>
                </div>

                <Link href={`/tournaments/${game.tournament_slug}`} className="hover:underline">
                  <h3 className="font-medium">{game.tournament_name}</h3>
                </Link>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="relative h-8 w-8 overflow-hidden rounded-full">
                      <Image
                        src={game.player1_avatar || "/placeholder.svg?height=32&width=32"}
                        alt={game.player1_username}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <Link href={`/players/${game.player1_id}`} className="text-sm font-medium hover:underline">
                        {game.player1_username}
                      </Link>
                      <div className="text-xs text-muted-foreground">Level {game.player1_level}</div>
                    </div>
                  </div>

                  <div className="text-center">
                    <span className="text-lg font-bold">VS</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div>
                      <Link
                        href={`/players/${game.player2_id}`}
                        className="text-sm font-medium hover:underline text-right block"
                      >
                        {game.player2_username}
                      </Link>
                      <div className="text-xs text-muted-foreground text-right">Level {game.player2_level}</div>
                    </div>
                    <div className="relative h-8 w-8 overflow-hidden rounded-full">
                      <Image
                        src={game.player2_avatar || "/placeholder.svg?height=32&width=32"}
                        alt={game.player2_username}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    Started {new Date(game.scheduled_date).toLocaleTimeString()}
                  </div>

                  <Link href={`/matches/${game.id}`}>
                    <Button size="sm" variant="outline">
                      Watch
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

