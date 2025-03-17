export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          country: string | null
          level: number
          experience_points: number
          created_at: string
          updated_at: string
          is_admin: boolean
          is_verified: boolean
          discord_username: string | null
          twitter_username: string | null
        }
        Insert: {
          id: string
          username: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          country?: string | null
          level?: number
          experience_points?: number
          created_at?: string
          updated_at?: string
          is_admin?: boolean
          is_verified?: boolean
          discord_username?: string | null
          twitter_username?: string | null
        }
        Update: {
          id?: string
          username?: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          country?: string | null
          level?: number
          experience_points?: number
          created_at?: string
          updated_at?: string
          is_admin?: boolean
          is_verified?: boolean
          discord_username?: string | null
          twitter_username?: string | null
        }
      }
      games: {
        Row: {
          id: string
          name: string
          slug: string
          description: string
          long_description: string | null
          image_url: string | null
          rules: string | null
          categories: string[] | null
          platforms: string[] | null
          features: string[] | null
          created_at: string
          updated_at: string
          is_active: boolean
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description: string
          long_description?: string | null
          image_url?: string | null
          rules?: string | null
          categories?: string[] | null
          platforms?: string[] | null
          features?: string[] | null
          created_at?: string
          updated_at?: string
          is_active?: boolean
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string
          long_description?: string | null
          image_url?: string | null
          rules?: string | null
          categories?: string[] | null
          platforms?: string[] | null
          features?: string[] | null
          created_at?: string
          updated_at?: string
          is_active?: boolean
        }
      }
      skill_levels: {
        Row: {
          id: string
          game_id: string
          name: string
          rating_range: string
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          game_id: string
          name: string
          rating_range: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          game_id?: string
          name?: string
          rating_range?: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      player_game_stats: {
        Row: {
          id: string
          player_id: string
          game_id: string
          rating: number
          wins: number
          losses: number
          draws: number
          tournaments_played: number
          tournaments_won: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          player_id: string
          game_id: string
          rating?: number
          wins?: number
          losses?: number
          draws?: number
          tournaments_played?: number
          tournaments_won?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          player_id?: string
          game_id?: string
          rating?: number
          wins?: number
          losses?: number
          draws?: number
          tournaments_played?: number
          tournaments_won?: number
          created_at?: string
          updated_at?: string
        }
      }
      tournaments: {
        Row: {
          id: string
          name: string
          slug: string
          game_id: string
          description: string | null
          format: string
          prize_pool: number | null
          prize_distribution: Json | null
          max_participants: number
          registration_open_date: string
          registration_close_date: string
          start_date: string
          end_date: string | null
          status: string
          created_by: string
          created_at: string
          updated_at: string
          rules: string | null
          image_url: string | null
          min_skill_level: string | null
          is_team_based: boolean
          team_size: number
          match_deadline_hours: number
        }
        Insert: {
          id?: string
          name: string
          slug: string
          game_id: string
          description?: string | null
          format: string
          prize_pool?: number | null
          prize_distribution?: Json | null
          max_participants: number
          registration_open_date: string
          registration_close_date: string
          start_date: string
          end_date?: string | null
          status?: string
          created_by: string
          created_at?: string
          updated_at?: string
          rules?: string | null
          image_url?: string | null
          min_skill_level?: string | null
          is_team_based?: boolean
          team_size?: number
          match_deadline_hours?: number
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          game_id?: string
          description?: string | null
          format?: string
          prize_pool?: number | null
          prize_distribution?: Json | null
          max_participants?: number
          registration_open_date?: string
          registration_close_date?: string
          start_date?: string
          end_date?: string | null
          status?: string
          created_by?: string
          created_at?: string
          updated_at?: string
          rules?: string | null
          image_url?: string | null
          min_skill_level?: string | null
          is_team_based?: boolean
          team_size?: number
          match_deadline_hours?: number
        }
      }
      tournament_participants: {
        Row: {
          id: string
          tournament_id: string
          player_id: string
          registration_date: string
          status: string
          current_stage: number
          seed: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          tournament_id: string
          player_id: string
          registration_date?: string
          status?: string
          current_stage?: number
          seed?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          tournament_id?: string
          player_id?: string
          registration_date?: string
          status?: string
          current_stage?: number
          seed?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      tournament_stages: {
        Row: {
          id: string
          tournament_id: string
          name: string
          stage_number: number
          stage_type: string
          start_date: string | null
          end_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          tournament_id: string
          name: string
          stage_number: number
          stage_type: string
          start_date?: string | null
          end_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          tournament_id?: string
          name?: string
          stage_number?: number
          stage_type?: string
          start_date?: string | null
          end_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      matches: {
        Row: {
          id: string
          tournament_id: string
          stage_id: string | null
          player1_id: string
          player2_id: string
          scheduled_date: string | null
          completion_date: string | null
          status: string
          winner_id: string | null
          result_type: string | null
          score: string | null
          match_number: number | null
          next_match_id: string | null
          deadline: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          tournament_id: string
          stage_id?: string | null
          player1_id: string
          player2_id: string
          scheduled_date?: string | null
          completion_date?: string | null
          status?: string
          winner_id?: string | null
          result_type?: string | null
          score?: string | null
          match_number?: number | null
          next_match_id?: string | null
          deadline?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          tournament_id?: string
          stage_id?: string | null
          player1_id?: string
          player2_id?: string
          scheduled_date?: string | null
          completion_date?: string | null
          status?: string
          winner_id?: string | null
          result_type?: string | null
          score?: string | null
          match_number?: number | null
          next_match_id?: string | null
          deadline?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      match_results: {
        Row: {
          id: string
          match_id: string
          submitted_by: string
          result: string
          score: string | null
          notes: string | null
          screenshot_url: string | null
          status: string
          reviewed_by: string | null
          review_date: string | null
          rejection_reason: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          match_id: string
          submitted_by: string
          result: string
          score?: string | null
          notes?: string | null
          screenshot_url?: string | null
          status?: string
          reviewed_by?: string | null
          review_date?: string | null
          rejection_reason?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          match_id?: string
          submitted_by?: string
          result?: string
          score?: string | null
          notes?: string | null
          screenshot_url?: string | null
          status?: string
          reviewed_by?: string | null
          review_date?: string | null
          rejection_reason?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      achievements: {
        Row: {
          id: string
          name: string
          description: string
          image_url: string | null
          game_id: string | null
          points: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          image_url?: string | null
          game_id?: string | null
          points?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          image_url?: string | null
          game_id?: string | null
          points?: number
          created_at?: string
          updated_at?: string
        }
      }
      player_achievements: {
        Row: {
          id: string
          player_id: string
          achievement_id: string
          earned_date: string
          created_at: string
        }
        Insert: {
          id?: string
          player_id: string
          achievement_id: string
          earned_date?: string
          created_at?: string
        }
        Update: {
          id?: string
          player_id?: string
          achievement_id?: string
          earned_date?: string
          created_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          message: string
          is_read: boolean
          notification_type: string
          related_entity_id: string | null
          related_entity_type: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          message: string
          is_read?: boolean
          notification_type: string
          related_entity_id?: string | null
          related_entity_type?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          message?: string
          is_read?: boolean
          notification_type?: string
          related_entity_id?: string | null
          related_entity_type?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      game_leaderboards: {
        Row: {
          game_id: string
          game_name: string
          player_id: string
          username: string
          avatar_url: string | null
          level: number
          country: string | null
          rating: number
          wins: number
          losses: number
          draws: number
          tournaments_played: number
          tournaments_won: number
          rank: number
        }
      }
      tournament_leaderboards: {
        Row: {
          tournament_id: string
          tournament_name: string
          game_id: string
          game_name: string
          player_id: string
          username: string
          avatar_url: string | null
          level: number
          wins: number
          losses: number
          draws: number
          current_stage: number
          status: string
          rank: number
        }
      }
      active_tournaments: {
        Row: {
          id: string
          name: string
          slug: string
          game_id: string
          description: string | null
          format: string
          prize_pool: number | null
          prize_distribution: Json | null
          max_participants: number
          registration_open_date: string
          registration_close_date: string
          start_date: string
          end_date: string | null
          status: string
          created_by: string
          created_at: string
          updated_at: string
          rules: string | null
          image_url: string | null
          min_skill_level: string | null
          is_team_based: boolean
          team_size: number
          match_deadline_hours: number
          game_name: string
          game_slug: string
          current_participants: number
          created_by_username: string
        }
      }
      live_games: {
        Row: {
          id: string
          tournament_id: string
          tournament_name: string
          tournament_slug: string
          player1_id: string
          player1_username: string
          player1_avatar: string | null
          player1_level: number
          player2_id: string
          player2_username: string
          player2_avatar: string | null
          player2_level: number
          game_id: string
          game_name: string
          game_slug: string
          scheduled_date: string | null
          status: string
        }
      }
      advancing_players: {
        Row: {
          id: string
          player_id: string
          username: string
          avatar_url: string | null
          level: number
          tournament_id: string
          tournament_name: string
          tournament_slug: string
          game_id: string
          game_name: string
          game_slug: string
          current_stage: number
          current_stage_name: string
          advanced_at: string
        }
      }
    }
    Functions: {
      [_ in string]: never
    }
    Enums: {
      [_ in string]: never
    }
  }
}

