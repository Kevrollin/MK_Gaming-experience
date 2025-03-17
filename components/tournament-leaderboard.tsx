"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Medal } from "lucide-react"
import { getTournamentLeaderboard } from "@/lib/supabase"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

interface TournamentLeaderboardProps {
  tournamentId: string
  tournamentName: string
  gameName: string
}

export function TournamentLeaderboard({ tournamentId, tournamentName, gameName }: TournamentLeaderboardProps) {
  const [leaderboard, setLeaderboard] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadLeaderboard()
  }, [tournamentId])

  const loadLeaderboard = async () => {
    try {
      setIsLoading(true)
      const data = await getTournamentLeaderboard(tournamentId)
      setLeaderboard(data)
    } catch (error) {
      console.error("Error loading leaderboard:", error)
      toast({
        title: "Error",
        description: "Failed to load tournament leaderboard. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Tournament Leaderboard</CardTitle>
          <CardDescription>
            {tournamentName} • {gameName}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center p-6">
          <p>Loading leaderboard...</p>
        </CardContent>
      </Card>
    )
  }

  if (leaderboard.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Tournament Leaderboard</CardTitle>
          <CardDescription>
            {tournamentName} • {gameName}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-6">
          <p className="mb-2">No leaderboard data available yet.</p>
          <p className="text-sm text-muted-foreground">
            Leaderboard will be updated as matches are played and results are approved.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tournament Leaderboard</CardTitle>
        <CardDescription>
          {tournamentName} • {gameName}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border overflow-hidden">
          <div className="grid grid-cols-12 gap-4 bg-muted/50 p-3 text-sm font-medium">
            <div className="col-span-1 text-center">#</div>
            <div className="col-span-5">Player</div>
            <div className="col-span-2 text-center">W/L/D</div>
            <div className="col-span-2 text-center">Stage</div>
            <div className="col-span-2 text-center">Status</div>
          </div>
          <div className="divide-y">
            {leaderboard.map((player, index) => (
              <div
                key={player.player_id}
                className={`grid grid-cols-12 gap-4 p-3 items-center hover:bg-muted/20 transition-colors ${
                  index < 3 ? "bg-blue-500/5" : ""
                }`}
              >
                <div className="col-span-1 text-center">
                  {index === 0 ? (
                    <Medal className="h-5 w-5 text-yellow-500 mx-auto" />
                  ) : index === 1 ? (
                    <Medal className="h-5 w-5 text-gray-400 mx-auto" />
                  ) : index === 2 ? (
                    <Medal className="h-5 w-5 text-amber-700 mx-auto" />
                  ) : (
                    <span className="font-bold">{index + 1}</span>
                  )}
                </div>
                <div className="col-span-5 flex items-center gap-3">
                  <div className="relative h-8 w-8 overflow-hidden rounded-full">
                    <Image
                      src={player.avatar_url || "/placeholder.svg?height=32&width=32"}
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
                <div className="col-span-2 text-center">
                  {player.wins}/{player.losses}/{player.draws}
                </div>
                <div className="col-span-2 text-center">Stage {player.current_stage}</div>
                <div className="col-span-2 text-center">
                  <Badge
                    variant={
                      player.status === "winner"
                        ? "default"
                        : player.status === "eliminated"
                          ? "destructive"
                          : "outline"
                    }
                  >
                    {player.status.charAt(0).toUpperCase() + player.status.slice(1)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

