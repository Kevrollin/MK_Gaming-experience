import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true, // Ensure user session persistence
    autoRefreshToken: true, // Automatically refresh expired tokens
    detectSessionInUrl: true, // Detect OAuth session from URL
  },
});

// Helper function to get user profile
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

  if (error) throw error
  return data
}

// Helper function to check if user is admin
export async function isUserAdmin(userId: string): Promise<boolean> {
  const { data, error } = await supabase.from("profiles").select("is_admin").eq("id", userId).single()

  if (error) throw error
  return data?.is_admin || false
}

// Games related functions
export async function getGames() {
  const { data, error } = await supabase.from("games").select("*").order("name")

  if (error) throw error
  return data || []
}

export async function getGameBySlug(slug: string) {
  const { data, error } = await supabase
    .from("games")
    .select(`
      *,
      skill_levels(*)
    `)
    .eq("slug", slug)
    .single()

  if (error) throw error
  return data
}

// Tournament related functions
export async function getTournaments(filters?: {
  status?: string
  gameId?: string
}) {
  let query = supabase.from("tournaments").select(`
      *,
      games!inner(id, name, slug),
      profiles!inner(id, username, avatar_url)
    `)

  if (filters?.status) {
    query = query.eq("status", filters.status)
  }

  if (filters?.gameId) {
    query = query.eq("game_id", filters.gameId)
  }

  const { data, error } = await query.order("start_date")

  if (error) throw error
  return data || []
}

export async function getTournamentBySlug(slug: string) {
  const { data, error } = await supabase
    .from("tournaments")
    .select(`
      *,
      games!inner(id, name, slug),
      profiles!inner(id, username, avatar_url),
      tournament_stages(*)
    `)
    .eq("slug", slug)
    .single()

  if (error) throw error
  return data
}

export async function getTournamentParticipants(tournamentId: string) {
  const { data, error } = await supabase
    .from("tournament_participants")
    .select(`
      *,
      profiles!inner(id, username, avatar_url, level)
    `)
    .eq("tournament_id", tournamentId)

  if (error) throw error
  return data || []
}

export async function registerForTournament(tournamentId: string, playerId: string) {
  const { data, error } = await supabase
    .from("tournament_participants")
    .insert([{ tournament_id: tournamentId, player_id: playerId }])

  if (error) throw error
  return data
}

// Match related functions
export async function getMatches(filters?: {
  tournamentId?: string
  playerId?: string
  status?: string
}) {
  let query = supabase.from("matches").select(`
      *,
      tournaments!inner(id, name, slug, game_id),
      player1:profiles!player1_id(id, username, avatar_url, level),
      player2:profiles!player2_id(id, username, avatar_url, level),
      winner:profiles(id, username, avatar_url)
    `)

  if (filters?.tournamentId) {
    query = query.eq("tournament_id", filters.tournamentId)
  }

  if (filters?.playerId) {
    query = query.or(`player1_id.eq.${filters.playerId},player2_id.eq.${filters.playerId}`)
  }

  if (filters?.status) {
    query = query.eq("status", filters.status)
  }

  const { data, error } = await query.order("scheduled_date")

  if (error) throw error
  return data || []
}

export async function getMatchById(matchId: string) {
  const { data, error } = await supabase
    .from("matches")
    .select(`
      *,
      tournaments!inner(id, name, slug, game_id),
      player1:profiles!player1_id(id, username, avatar_url, level),
      player2:profiles!player2_id(id, username, avatar_url, level),
      winner:profiles(id, username, avatar_url)
    `)
    .eq("id", matchId)
    .single()

  if (error) throw error
  return data
}

// Match results functions
export async function submitMatchResult(
  matchId: string,
  submittedBy: string,
  result: "win" | "loss" | "draw",
  score?: string,
  notes?: string,
  screenshotUrl?: string,
) {
  const { data, error } = await supabase.from("match_results").insert([
    {
      match_id: matchId,
      submitted_by: submittedBy,
      result,
      score,
      notes,
      screenshot_url: screenshotUrl,
    },
  ])

  if (error) throw error
  return data
}

export async function getPendingMatchResults() {
  const { data, error } = await supabase
    .from("match_results")
    .select(`
      *,
      matches!inner(
        id, 
        tournament_id,
        player1_id,
        player2_id,
        status
      ),
      submitter:profiles!submitted_by(id, username, avatar_url),
      tournaments:matches!inner(
        tournaments(id, name, slug)
      ),
      player1:matches!inner(
        player1:profiles!player1_id(id, username, avatar_url)
      ),
      player2:matches!inner(
        player2:profiles!player2_id(id, username, avatar_url)
      )
    `)
    .eq("status", "pending")
    .order("created_at")

  if (error) throw error
  return data || []
}

export async function approveMatchResult(resultId: string, adminId: string) {
  const { data, error } = await supabase
    .from("match_results")
    .update({
      status: "approved",
      reviewed_by: adminId,
      review_date: new Date().toISOString(),
    })
    .eq("id", resultId)

  if (error) throw error
  return data
}

export async function rejectMatchResult(resultId: string, adminId: string, reason: string) {
  const { data, error } = await supabase
    .from("match_results")
    .update({
      status: "rejected",
      reviewed_by: adminId,
      review_date: new Date().toISOString(),
      rejection_reason: reason,
    })
    .eq("id", resultId)

  if (error) throw error
  return data
}

// Leaderboard functions
export async function getGameLeaderboard(gameId: string, limit = 100) {
  const { data, error } = await supabase
    .from("game_leaderboards")
    .select("*")
    .eq("game_id", gameId)
    .order("rank")
    .limit(limit)

  if (error) throw error
  return data || []
}

export async function getTournamentLeaderboard(tournamentId: string) {
  const { data, error } = await supabase
    .from("tournament_leaderboards")
    .select("*")
    .eq("tournament_id", tournamentId)
    .order("rank")

  if (error) throw error
  return data || []
}

// Live games and advancing players
export async function getLiveGames(limit = 10) {
  const { data, error } = await supabase.from("live_games").select("*").limit(limit)

  if (error) throw error
  return data || []
}

export async function getAdvancingPlayers(limit = 10) {
  const { data, error } = await supabase.from("advancing_players").select("*").limit(limit)

  if (error) throw error
  return data || []
}

// Notifications
export async function getUserNotifications(userId: string) {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data || []
}

export async function markNotificationAsRead(notificationId: string) {
  const { data, error } = await supabase.from("notifications").update({ is_read: true }).eq("id", notificationId)

  if (error) throw error
  return data
}

export async function fetchUpcomingTournaments(userId?: string) {
  const query = supabase
    .from("tournaments")
    .select(`
            *,
            games!inner(name),
            (EXISTS (SELECT 1 FROM tournament_participants tp WHERE tp.tournament_id = tournaments.id AND tp.player_id = '${userId}')) as isRegistered
        `)
    .eq("status", "upcoming")
    .order("start_date")

  const { data, error } = await query

  if (error) {
    console.error("Error fetching upcoming tournaments:", error)
    return []
  }

  return data
}

