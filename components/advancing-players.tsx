"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Award, ChevronRight } from "lucide-react"
import { fetchAdvancingPlayers } from "@/lib/api" // Use the updated API function
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export function AdvancingPlayers() {
  const [players, setPlayers] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadAdvancingPlayers()
  }, [])

  const loadAdvancingPlayers = async () => {
    try {
      setIsLoading(true)
      const data = await fetchAdvancingPlayers()
      setPlayers(data)
    } catch (error) {
      console.error("Error loading advancing players:", error)
      toast({
        title: "Error",
        description: "Failed to load advancing players. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center p-6">
        <p>Loading advancing players...</p>
      </div>
    )
  }

  if (players.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <p className="mb-2">No players have advanced recently.</p>
        <p className="text-sm text-muted-foreground">Check back later as tournaments progress.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {players.map((player) => (
        <Card key={player.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col sm:flex-row">
              <div className="flex-1 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-blue-500">{player.game_name}</Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Award className="h-3 w-3 text-green-500" />
                    Advanced
                  </Badge>
                </div>

                <Link href={`/tournaments/${player.tournament_slug}`} className="hover:underline">
                  <h3 className="font-medium">{player.tournament_name}</h3>
                </Link>

                <div className="mt-4 flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full">
                    <Image
                      src={player.avatar_url || "/placeholder.svg?height=40&width=40"}
                      alt={player.username}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <Link href={`/players/${player.player_id}`} className="font-medium hover:underline">
                      {player.username}
                    </Link>
                    <div className="text-xs text-muted-foreground">Level {player.level}</div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm">
                    Advanced to <span className="font-medium">{player.current_stage_name}</span>
                  </div>

                  <Link href={`/tournaments/${player.tournament_slug}`}>
                    <Button size="sm" variant="outline">
                      View Tournament
                      <ChevronRight className="ml-1 h-4 w-4" />
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

