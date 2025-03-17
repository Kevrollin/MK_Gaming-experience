// Replace the entire file with this implementation that uses Supabase
import { supabase } from "./supabase"

// Types
export type LiveGame = {
  id: string
  game: string
  gameSlug: string
  tournament: string
  tournamentId: string
  player1: {
    id: string
    username: string
    avatar: string
    level: number
  }
  player2: {
    id: string
    username: string
    avatar: string
    level: number
  }
  startTime: string
  viewers: number
  status: "in_progress" | "starting" | "ending"
}

export type AdvancingPlayer = {
  id: string
  username: string
  avatar: string
  level: number
  game: string
  gameSlug: string
  tournament: string
  tournamentId: string
  advancedAt: string
  nextStage: string
}

export type Tournament = {
  id: string
  title: string
  description: string
  game: string
  gameSlug: string
  prizePool: string
  participants: {
    current: number
    max: number
  }
  startDate: string
  registrationDeadline: string
  format: string
  skillLevel: string
  image: string
  isRegistered: boolean
}

export type Game = {
  id: string
  name: string
  slug: string
  description: string
  image: string
  activePlayers: number
  activeTournaments: number
  categories: string[]
  platforms: string[]
  features: string[]
}

export type Player = {
  id: string
  username: string
  email: string
  avatar: string
  level: number
  joinedAt: string
  gameRatings: Record<string, number>
  achievements: {
    id: string
    title: string
    description: string
    game: string
    earnedAt: string
    badge: "gold" | "silver" | "bronze"
  }[]
  tournaments: {
    id: string
    title: string
    game: string
    date: string
    result: string
    prize?: string
  }[]
}

// API functions using Supabase
export async function fetchLiveGames(): Promise<LiveGame[]> {
  try {
    const { data, error } = await supabase.from("live_games").select("*")

    if (error) throw error

    return data.map((game) => ({
      id: game.id,
      game: game.game_name,
      gameSlug: game.game_slug,
      tournament: game.tournament_name,
      tournamentId: game.tournament_id,
      player1: {
        id: game.player1_id,
        username: game.player1_username,
        avatar: game.player1_avatar || "/placeholder.svg?height=40&width=40",
        level: game.player1_level,
      },
      player2: {
        id: game.player2_id,
        username: game.player2_username,
        avatar: game.player2_avatar || "/placeholder.svg?height=40&width=40",
        level: game.player2_level,
      },
      startTime: game.scheduled_date || new Date().toISOString(),
      viewers: Math.floor(Math.random() * 100) + 1, // Random viewers count
      status: "in_progress",
    }))
  } catch (error) {
    console.error("Error fetching live games:", error)
    return []
  }
}

export async function fetchAdvancingPlayers(): Promise<AdvancingPlayer[]> {
  try {
    const { data, error } = await supabase.from("advancing_players").select("*")

    if (error) throw error

    return data.map((player) => ({
      id: player.id,
      username: player.username,
      avatar: player.avatar_url || "/placeholder.svg?height=40&width=40",
      level: player.level,
      game: player.game_name,
      gameSlug: player.game_slug,
      tournament: player.tournament_name,
      tournamentId: player.tournament_id,
      advancedAt: player.advanced_at,
      nextStage: player.current_stage_name,
    }))
  } catch (error) {
    console.error("Error fetching advancing players:", error)
    return []
  }
}

export async function fetchUpcomingTournaments(userId?: string): Promise<Tournament[]> {
  try {
    const query = supabase
      .from("tournaments")
      .select(`
        *,
        games!inner(name, slug),
        tournament_participants!inner(player_id)
      `)
      .eq("status", "upcoming")
      .order("start_date")

    const { data, error } = await query

    if (error) throw error

    // Count participants
    const participantCounts = await supabase
      .from("tournament_participants")
      .select("tournament_id, count", { count: "exact" })
      .in(
        "tournament_id",
        data.map((t) => t.id),
      )
      .group_by("tournament_id")

    return data.map((tournament) => {
      const participantCount = participantCounts.data?.find((p) => p.tournament_id === tournament.id)?.count || 0
      const isRegistered = userId ? tournament.tournament_participants.some((p) => p.player_id === userId) : false

      return {
        id: tournament.id,
        title: tournament.name,
        description: tournament.description || "",
        game: tournament.games.name,
        gameSlug: tournament.games.slug,
        prizePool: tournament.prize_pool?.toString() || "0",
        participants: {
          current: participantCount,
          max: tournament.max_participants,
        },
        startDate: tournament.start_date,
        registrationDeadline: tournament.registration_close_date,
        format: tournament.format,
        skillLevel: tournament.min_skill_level || "All Levels",
        image: tournament.image_url || "/placeholder.svg?height=200&width=400",
        isRegistered,
      }
    })
  } catch (error) {
    console.error("Error fetching upcoming tournaments:", error)
    return []
  }
}

export async function fetchGames(): Promise<Game[]> {
  try {
    const { data, error } = await supabase.from("games").select("*").order("name")

    if (error) throw error

    // Get player counts for each game
    const playerCounts = await supabase
      .from("player_game_stats")
      .select("game_id, count", { count: "exact" })
      .group_by("game_id")

    // Get tournament counts for each game
    const tournamentCounts = await supabase
      .from("tournaments")
      .select("game_id, count", { count: "exact" })
      .in("status", ["upcoming", "in_progress"])
      .group_by("game_id")

    return data.map((game) => {
      const playerCount = playerCounts.data?.find((p) => p.game_id === game.id)?.count || 0
      const tournamentCount = tournamentCounts.data?.find((t) => t.game_id === game.id)?.count || 0

      return {
        id: game.id,
        name: game.name,
        slug: game.slug,
        description: game.description,
        image: game.image_url || "/placeholder.svg?height=200&width=400",
        activePlayers: playerCount,
        activeTournaments: tournamentCount,
        categories: game.categories || [],
        platforms: game.platforms || [],
        features: game.features || [],
      }
    })
  } catch (error) {
    console.error("Error fetching games:", error)
    return []
  }
}

export async function fetchGameDetails(slug: string): Promise<Game | null> {
  try {
    const { data, error } = await supabase.from("games").select("*").eq("slug", slug).single()

    if (error) throw error

    // Get player count
    const { count: playerCount } = await supabase
      .from("player_game_stats")
      .select("*", { count: "exact" })
      .eq("game_id", data.id)

    // Get tournament count
    const { count: tournamentCount } = await supabase
      .from("tournaments")
      .select("*", { count: "exact" })
      .eq("game_id", data.id)
      .in("status", ["upcoming", "in_progress"])

    return {
      id: data.id,
      name: data.name,
      slug: data.slug,
      description: data.description,
      image: data.image_url || "/placeholder.svg?height=200&width=400",
      activePlayers: playerCount || 0,
      activeTournaments: tournamentCount || 0,
      categories: data.categories || [],
      platforms: data.platforms || [],
      features: data.features || [],
    }
  } catch (error) {
    console.error("Error fetching game details:", error)
    return null
  }
}

export async function fetchTournamentDetails(id: string): Promise<Tournament | null> {
  try {
    const { data, error } = await supabase
      .from("tournaments")
      .select(`
        *,
        games!inner(name, slug)
      `)
      .eq("id", id)
      .single()

    if (error) throw error

    // Get participant count
    const { count: participantCount } = await supabase
      .from("tournament_participants")
      .select("*", { count: "exact" })
      .eq("tournament_id", data.id)

    return {
      id: data.id,
      title: data.name,
      description: data.description || "",
      game: data.games.name,
      gameSlug: data.games.slug,
      prizePool: data.prize_pool?.toString() || "0",
      participants: {
        current: participantCount || 0,
        max: data.max_participants,
      },
      startDate: data.start_date,
      registrationDeadline: data.registration_close_date,
      format: data.format,
      skillLevel: data.min_skill_level || "All Levels",
      image: data.image_url || "/placeholder.svg?height=200&width=400",
      isRegistered: false, // This will be set by the component based on user state
    }
  } catch (error) {
    console.error("Error fetching tournament details:", error)
    return null
  }
}

export async function fetchPlayerProfile(id: string): Promise<Player | null> {
  try {
    const { data, error } = await supabase.from("profiles").select("*").eq("id", id).single()

    if (error) throw error

    // Get player game stats
    const { data: gameStats } = await supabase
      .from("player_game_stats")
      .select(`
        *,
        games!inner(name, slug)
      `)
      .eq("player_id", id)

    // Get player achievements
    const { data: achievements } = await supabase
      .from("player_achievements")
      .select(`
        *,
        achievements!inner(name, description, game_id, image_url),
        achievements!inner(games:game_id(name))
      `)
      .eq("player_id", id)

    // Get player tournaments
    const { data: tournaments } = await supabase
      .from("tournament_participants")
      .select(`
        *,
        tournaments!inner(id, name, game_id, start_date),
        tournaments!inner(games:game_id(name))
      `)
      .eq("player_id", id)

    const gameRatings: Record<string, number> = {}
    gameStats?.forEach((stat) => {
      gameRatings[stat.games.slug] = stat.rating
    })

    return {
      id: data.id,
      username: data.username,
      email: "", // Email is not stored in profiles table
      avatar: data.avatar_url || "/placeholder.svg?height=40&width=40",
      level: data.level,
      joinedAt: data.created_at,
      gameRatings,
      achievements:
        achievements?.map((a) => ({
          id: a.id,
          title: a.achievements.name,
          description: a.achievements.description,
          game: a.achievements.games.name,
          earnedAt: a.earned_date,
          badge: "gold", // Default badge type
        })) || [],
      tournaments:
        tournaments?.map((t) => ({
          id: t.tournaments.id,
          title: t.tournaments.name,
          game: t.tournaments.games.name,
          date: t.tournaments.start_date,
          result: t.status,
        })) || [],
    }
  } catch (error) {
    console.error("Error fetching player profile:", error)
    return null
  }
}

export async function registerForTournament(
  tournamentId: string,
  userId: string,
): Promise<{ success: boolean; message: string }> {
  try {
    const { error } = await supabase
      .from("tournament_participants")
      .insert([{ tournament_id: tournamentId, player_id: userId }])

    if (error) throw error

    return { success: true, message: "Successfully registered for tournament" }
  } catch (error) {
    console.error("Error registering for tournament:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to register for tournament",
    }
  }
}

export async function submitGameResult(
  matchId: string,
  userId: string,
  result: any,
  screenshot?: File,
): Promise<{ success: boolean; message: string }> {
  try {
    // First upload the screenshot if provided
    let screenshotUrl = null
    if (screenshot) {
      const fileName = `${userId}_${matchId}_${Date.now()}.${screenshot.name.split(".").pop()}`
      const { error: uploadError } = await supabase.storage.from("screenshots").upload(fileName, screenshot)

      if (uploadError) throw uploadError

      const { data } = supabase.storage.from("screenshots").getPublicUrl(fileName)
      screenshotUrl = data.publicUrl
    }

    // Then submit the result
    const { error } = await supabase.from("match_results").insert([
      {
        match_id: matchId,
        submitted_by: userId,
        result: result.result,
        score: result.score,
        notes: result.notes,
        screenshot_url: screenshotUrl,
      },
    ])

    if (error) throw error

    return { success: true, message: "Result submitted successfully" }
  } catch (error) {
    console.error("Error submitting game result:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to submit result",
    }
  }
}

export async function validateGameResult(
  resultId: string,
  isValid: boolean,
  adminId: string,
  reason?: string,
): Promise<{ success: boolean; message: string }> {
  try {
    const { error } = await supabase
      .from("match_results")
      .update({
        status: isValid ? "approved" : "rejected",
        reviewed_by: adminId,
        review_date: new Date().toISOString(),
        rejection_reason: reason,
      })
      .eq("id", resultId)

    if (error) throw error

    return {
      success: true,
      message: isValid ? "Result validated" : "Result rejected",
    }
  } catch (error) {
    console.error("Error validating game result:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to validate result",
    }
  }
}

