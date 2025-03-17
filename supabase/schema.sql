-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ===============================
-- PROFILES TABLE
-- Extends the auth.users table with additional user information
-- ===============================
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  country TEXT,
  level INTEGER NOT NULL DEFAULT 1,
  experience_points INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  is_admin BOOLEAN DEFAULT false NOT NULL,
  is_verified BOOLEAN DEFAULT false NOT NULL,
  discord_username TEXT,
  twitter_username TEXT
);

-- ===============================
-- GAMES TABLE
-- Stores information about different games available on the platform
-- ===============================
CREATE TABLE games (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  image_url TEXT,
  rules TEXT,
  categories TEXT[] DEFAULT '{}',
  platforms TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL
);

-- ===============================
-- SKILL_LEVELS TABLE
-- Defines different skill levels for each game
-- ===============================
CREATE TABLE skill_levels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  game_id UUID REFERENCES games(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  rating_range TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE(game_id, name)
);

-- ===============================
-- PLAYER_GAME_STATS TABLE
-- Tracks player statistics for each game
-- ===============================
CREATE TABLE player_game_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  player_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  game_id UUID REFERENCES games(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER NOT NULL DEFAULT 1000,
  wins INTEGER NOT NULL DEFAULT 0,
  losses INTEGER NOT NULL DEFAULT 0,
  draws INTEGER NOT NULL DEFAULT 0,
  tournaments_played INTEGER NOT NULL DEFAULT 0,
  tournaments_won INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE(player_id, game_id)
);

-- ===============================
-- TOURNAMENTS TABLE
-- Stores information about tournaments
-- ===============================
CREATE TABLE tournaments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  game_id UUID REFERENCES games(id) ON DELETE CASCADE NOT NULL,
  description TEXT,
  format TEXT NOT NULL,
  prize_pool DECIMAL(10, 2),
  prize_distribution JSONB,
  max_participants INTEGER NOT NULL,
  registration_open_date TIMESTAMP WITH TIME ZONE NOT NULL,
  registration_close_date TIMESTAMP WITH TIME ZONE NOT NULL,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL DEFAULT 'upcoming', -- upcoming, registration_closed, in_progress, completed, cancelled
  created_by UUID REFERENCES profiles(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  rules TEXT,
  image_url TEXT,
  min_skill_level TEXT,
  is_team_based BOOLEAN DEFAULT false NOT NULL,
  team_size INTEGER DEFAULT 1,
  match_deadline_hours INTEGER DEFAULT 72, -- Hours to complete a match before forfeit
  CHECK (status IN ('upcoming', 'registration_closed', 'in_progress', 'completed', 'cancelled'))
);

-- ===============================
-- TOURNAMENT_PARTICIPANTS TABLE
-- Tracks players registered for tournaments
-- ===============================
CREATE TABLE tournament_participants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tournament_id UUID REFERENCES tournaments(id) ON DELETE CASCADE NOT NULL,
  player_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  registration_date TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  status TEXT NOT NULL DEFAULT 'registered', -- registered, active, eliminated, advanced, winner, disqualified
  current_stage INTEGER DEFAULT 1,
  seed INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE(tournament_id, player_id),
  CHECK (status IN ('registered', 'active', 'eliminated', 'advanced', 'winner', 'disqualified'))
);

-- ===============================
-- TOURNAMENT_STAGES TABLE
-- Defines the stages of a tournament (e.g., group stage, quarterfinals)
-- ===============================
CREATE TABLE tournament_stages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tournament_id UUID REFERENCES tournaments(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  stage_number INTEGER NOT NULL,
  stage_type TEXT NOT NULL, -- group, knockout, round_robin, swiss
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE(tournament_id, stage_number),
  CHECK (stage_type IN ('group', 'knockout', 'round_robin', 'swiss'))
);

-- ===============================
-- MATCHES TABLE
-- Stores information about individual matches
-- ===============================
CREATE TABLE matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tournament_id UUID REFERENCES tournaments(id) ON DELETE CASCADE NOT NULL,
  stage_id UUID REFERENCES tournament_stages(id) ON DELETE CASCADE,
  player1_id UUID REFERENCES profiles(id) NOT NULL,
  player2_id UUID REFERENCES profiles(id) NOT NULL,
  scheduled_date TIMESTAMP WITH TIME ZONE,
  completion_date TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL DEFAULT 'scheduled', -- scheduled, in_progress, completed, cancelled, player1_forfeit, player2_forfeit
  winner_id UUID REFERENCES profiles(id),
  result_type TEXT, -- win, loss, draw
  score TEXT,
  match_number INTEGER,
  next_match_id UUID REFERENCES matches(id),
  deadline TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled', 'player1_forfeit', 'player2_forfeit')),
  CHECK (result_type IN ('win', 'loss', 'draw', NULL))
);

-- ===============================
-- MATCH_RESULTS TABLE
-- Stores submitted results that need approval
-- ===============================
CREATE TABLE match_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  match_id UUID REFERENCES matches(id) ON DELETE CASCADE NOT NULL,
  submitted_by UUID REFERENCES profiles(id) NOT NULL,
  result TEXT NOT NULL, -- win, loss, draw
  score TEXT,
  notes TEXT,
  screenshot_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, approved, rejected
  reviewed_by UUID REFERENCES profiles(id),
  review_date TIMESTAMP WITH TIME ZONE,
  rejection_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  CHECK (status IN ('pending', 'approved', 'rejected')),
  CHECK (result IN ('win', 'loss', 'draw'))
);

-- ===============================
-- ACHIEVEMENTS TABLE
-- Defines achievements that players can earn
-- ===============================
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  game_id UUID REFERENCES games(id) ON DELETE CASCADE,
  points INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- ===============================
-- PLAYER_ACHIEVEMENTS TABLE
-- Tracks achievements earned by players
-- ===============================
CREATE TABLE player_achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  player_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  achievement_id UUID REFERENCES achievements(id) ON DELETE CASCADE NOT NULL,
  earned_date TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE(player_id, achievement_id)
);

-- ===============================
-- NOTIFICATIONS TABLE
-- Stores notifications for users
-- ===============================
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false NOT NULL,
  notification_type TEXT NOT NULL, -- match_scheduled, result_submitted, result_approved, result_rejected, tournament_starting, etc.
  related_entity_id UUID,
  related_entity_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- ===============================
-- LEADERBOARD VIEW
-- Automatically generates leaderboards based on player stats
-- ===============================
CREATE VIEW game_leaderboards AS
SELECT 
  pgs.game_id,
  g.name AS game_name,
  pgs.player_id,
  p.username,
  p.avatar_url,
  p.level,
  p.country,
  pgs.rating,
  pgs.wins,
  pgs.losses,
  pgs.draws,
  pgs.tournaments_played,
  pgs.tournaments_won,
  RANK() OVER (PARTITION BY pgs.game_id ORDER BY pgs.rating DESC) AS rank
FROM player_game_stats pgs
JOIN profiles p ON pgs.player_id = p.id
JOIN games g ON pgs.game_id = g.id;

-- ===============================
-- TOURNAMENT LEADERBOARD VIEW
-- Generates tournament-specific leaderboards
-- ===============================
CREATE VIEW tournament_leaderboards AS
SELECT 
  tp.tournament_id,
  t.name AS tournament_name,
  t.game_id,
  g.name AS game_name,
  tp.player_id,
  p.username,
  p.avatar_url,
  p.level,
  COUNT(m.id) FILTER (WHERE m.winner_id = tp.player_id) AS wins,
  COUNT(m.id) FILTER (WHERE m.status = 'completed' AND m.winner_id != tp.player_id AND (m.player1_id = tp.player_id OR m.player2_id = tp.player_id)) AS losses,
  COUNT(m.id) FILTER (WHERE m.status = 'completed' AND m.result_type = 'draw' AND (m.player1_id = tp.player_id OR m.player2_id = tp.player_id)) AS draws,
  tp.current_stage,
  tp.status,
  RANK() OVER (PARTITION BY tp.tournament_id ORDER BY COUNT(m.id) FILTER (WHERE m.winner_id = tp.player_id) DESC) AS rank
FROM tournament_participants tp
JOIN tournaments t ON tp.tournament_id = t.id
JOIN games g ON t.game_id = g.id
JOIN profiles p ON tp.player_id = p.id
LEFT JOIN matches m ON (m.player1_id = tp.player_id OR m.player2_id = tp.player_id) AND m.tournament_id = tp.tournament_id
GROUP BY tp.tournament_id, t.name, t.game_id, g.name, tp.player_id, p.username, p.avatar_url, p.level, tp.current_stage, tp.status;

-- ===============================
-- ACTIVE TOURNAMENTS VIEW
-- Shows currently active tournaments
-- ===============================
CREATE VIEW active_tournaments AS
SELECT 
  t.*,
  g.name AS game_name,
  g.slug AS game_slug,
  COUNT(tp.id) AS current_participants,
  p.username AS created_by_username
FROM tournaments t
JOIN games g ON t.game_id = g.id
JOIN profiles p ON t.created_by = p.id
LEFT JOIN tournament_participants tp ON t.id = tp.tournament_id
WHERE t.status IN ('upcoming', 'registration_closed', 'in_progress')
GROUP BY t.id, g.name, g.slug, p.username;

-- ===============================
-- LIVE GAMES VIEW
-- Shows currently ongoing matches
-- ===============================
CREATE VIEW live_games AS
SELECT 
  m.id,
  m.tournament_id,
  t.name AS tournament_name,
  t.slug AS tournament_slug,
  m.player1_id,
  p1.username AS player1_username,
  p1.avatar_url AS player1_avatar,
  p1.level AS player1_level,
  m.player2_id,
  p2.username AS player2_username,
  p2.avatar_url AS player2_avatar,
  p2.level AS player2_level,
  g.id AS game_id,
  g.name AS game_name,
  g.slug AS game_slug,
  m.scheduled_date,
  m.status
FROM matches m
JOIN tournaments t ON m.tournament_id = t.id
JOIN games g ON t.game_id = g.id
JOIN profiles p1 ON m.player1_id = p1.id
JOIN profiles p2 ON m.player2_id = p2.id
WHERE m.status = 'in_progress';

-- ===============================
-- ADVANCING PLAYERS VIEW
-- Shows players who have recently advanced to the next stage
-- ===============================
CREATE VIEW advancing_players AS
SELECT 
  tp.id,
  tp.player_id,
  p.username,
  p.avatar_url,
  p.level,
  tp.tournament_id,
  t.name AS tournament_name,
  t.slug AS tournament_slug,
  g.id AS game_id,
  g.name AS game_name,
  g.slug AS game_slug,
  tp.current_stage,
  ts.name AS current_stage_name,
  tp.updated_at AS advanced_at
FROM tournament_participants tp
JOIN tournaments t ON tp.tournament_id = t.id
JOIN games g ON t.game_id = g.id
JOIN profiles p ON tp.player_id = p.id
JOIN tournament_stages ts ON ts.tournament_id = t.id AND ts.stage_number = tp.current_stage
WHERE tp.status = 'advanced'
ORDER BY tp.updated_at DESC;

-- ===============================
-- FUNCTIONS
-- ===============================

-- Function to update player ratings after a match
CREATE OR REPLACE FUNCTION update_player_ratings()
RETURNS TRIGGER AS $$
DECLARE
  player1_rating INTEGER;
  player2_rating INTEGER;
  rating_change INTEGER;
  k_factor INTEGER := 32; -- K-factor for ELO calculation
BEGIN
  -- Only proceed if the result is approved
  IF NEW.status = 'approved' THEN
    -- Get current ratings
    SELECT rating INTO player1_rating FROM player_game_stats 
    WHERE player_id = (SELECT player1_id FROM matches WHERE id = NEW.match_id)
    AND game_id = (SELECT game_id FROM tournaments WHERE id = (SELECT tournament_id FROM matches WHERE id = NEW.match_id));
    
    SELECT rating INTO player2_rating FROM player_game_stats 
    WHERE player_id = (SELECT player2_id FROM matches WHERE id = NEW.match_id)
    AND game_id = (SELECT game_id FROM tournaments WHERE id = (SELECT tournament_id FROM matches WHERE id = NEW.match_id));
    
    -- Calculate rating change based on ELO formula
    -- This is a simplified version
    IF NEW.result = 'win' AND NEW.submitted_by = (SELECT player1_id FROM matches WHERE id = NEW.match_id) THEN
      -- Player 1 won
      rating_change := k_factor * (1 - 1 / (1 + 10 ^ ((player2_rating - player1_rating) / 400.0)));
      
      -- Update player 1 stats (winner)
      UPDATE player_game_stats 
      SET rating = rating + rating_change, 
          wins = wins + 1,
          updated_at = NOW()
      WHERE player_id = (SELECT player1_id FROM matches WHERE id = NEW.match_id)
      AND game_id = (SELECT game_id FROM tournaments WHERE id = (SELECT tournament_id FROM matches WHERE id = NEW.match_id));
      
      -- Update player 2 stats (loser)
      UPDATE player_game_stats 
      SET rating = GREATEST(1, rating - rating_change), 
          losses = losses + 1,
          updated_at = NOW()
      WHERE player_id = (SELECT player2_id FROM matches WHERE id = NEW.match_id)
      AND game_id = (SELECT game_id FROM tournaments WHERE id = (SELECT tournament_id FROM matches WHERE id = NEW.match_id));
      
      -- Update match with winner
      UPDATE matches 
      SET winner_id = (SELECT player1_id FROM matches WHERE id = NEW.match_id),
          result_type = 'win',
          score = NEW.score,
          status = 'completed',
          completion_date = NOW(),
          updated_at = NOW()
      WHERE id = NEW.match_id;
      
    ELSIF NEW.result = 'win' AND NEW.submitted_by = (SELECT player2_id FROM matches WHERE id = NEW.match_id) THEN
      -- Player 2 won
      rating_change := k_factor * (1 - 1 / (1 + 10 ^ ((player1_rating - player2_rating) / 400.0)));
      
      -- Update player 2 stats (winner)
      UPDATE player_game_stats 
      SET rating = rating + rating_change, 
          wins = wins + 1,
          updated_at = NOW()
      WHERE player_id = (SELECT player2_id FROM matches WHERE id = NEW.match_id)
      AND game_id = (SELECT game_id FROM tournaments WHERE id = (SELECT tournament_id FROM matches WHERE id = NEW.match_id));
      
      -- Update player 1 stats (loser)
      UPDATE player_game_stats 
      SET rating = GREATEST(1, rating - rating_change), 
          losses = losses + 1,
          updated_at = NOW()
      WHERE player_id = (SELECT player1_id FROM matches WHERE id = NEW.match_id)
      AND game_id = (SELECT game_id FROM tournaments WHERE id = (SELECT tournament_id FROM matches WHERE id = NEW.match_id));
      
      -- Update match with winner
      UPDATE matches 
      SET winner_id = (SELECT player2_id FROM matches WHERE id = NEW.match_id),
          result_type = 'win',
          score = NEW.score,
          status = 'completed',
          completion_date = NOW(),
          updated_at = NOW()
      WHERE id = NEW.match_id;
      
    ELSIF NEW.result = 'draw' THEN
      -- Draw - smaller rating change
      rating_change := k_factor * 0.5 * (0.5 - 1 / (1 + 10 ^ ((player2_rating - player1_rating) / 400.0)));
      
      -- Update player 1 stats
      UPDATE player_game_stats 
      SET rating = rating + rating_change, 
          draws = draws + 1,
          updated_at = NOW()
      WHERE player_id = (SELECT player1_id FROM matches WHERE id = NEW.match_id)
      AND game_id = (SELECT game_id FROM tournaments WHERE id = (SELECT tournament_id FROM matches WHERE id = NEW.match_id));
      
      -- Update player 2 stats
      UPDATE player_game_stats 
      SET rating = rating - rating_change, 
          draws = draws + 1,
          updated_at = NOW()
      WHERE player_id = (SELECT player2_id FROM matches WHERE id = NEW.match_id)
      AND game_id = (SELECT game_id FROM tournaments WHERE id = (SELECT tournament_id FROM matches WHERE id = NEW.match_id));
      
      -- Update match as a draw
      UPDATE matches 
      SET winner_id = NULL,
          result_type = 'draw',
          score = NEW.score,
          status = 'completed',
          completion_date = NOW(),
          updated_at = NOW()
      WHERE id = NEW.match_id;
    END IF;
    
    -- Create notifications for both players
    INSERT INTO notifications (user_id, title, message, notification_type, related_entity_id, related_entity_type)
    VALUES (
      (SELECT player1_id FROM matches WHERE id = NEW.match_id),
      'Match Result Approved',
      'Your match result has been approved by an administrator.',
      'result_approved',
      NEW.match_id,
      'match'
    );
    
    INSERT INTO notifications (user_id, title, message, notification_type, related_entity_id, related_entity_type)
    VALUES (
      (SELECT player2_id FROM matches WHERE id = NEW.match_id),
      'Match Result Approved',
      'Your match result has been approved by an administrator.',
      'result_approved',
      NEW.match_id,
      'match'
    );
    
    -- Check if we need to advance players to the next stage
    -- This would be more complex in a real implementation
    -- and would depend on the tournament format
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update ratings when a match result is approved
CREATE TRIGGER update_ratings_after_result_approval
AFTER UPDATE ON match_results
FOR EACH ROW
WHEN (OLD.status = 'pending' AND NEW.status = 'approved')
EXECUTE FUNCTION update_player_ratings();

-- Function to create initial player game stats when a player is created
CREATE OR REPLACE FUNCTION create_player_game_stats()
RETURNS TRIGGER AS $$
BEGIN
  -- Create player_game_stats entries for all active games
  INSERT INTO player_game_stats (player_id, game_id)
  SELECT NEW.id, id FROM games WHERE is_active = true;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to create player game stats for new players
CREATE TRIGGER create_player_game_stats_on_profile_creation
AFTER INSERT ON profiles
FOR EACH ROW
EXECUTE FUNCTION create_player_game_stats();

-- Function to create player game stats when a new game is added
CREATE OR REPLACE FUNCTION create_game_stats_for_all_players()
RETURNS TRIGGER AS $$
BEGIN
  -- Create player_game_stats entries for all players
  INSERT INTO player_game_stats (player_id, game_id)
  SELECT id, NEW.id FROM profiles;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to create player game stats when a new game is added
CREATE TRIGGER create_game_stats_on_game_creation
AFTER INSERT ON games
FOR EACH ROW
WHEN (NEW.is_active = true)
EXECUTE FUNCTION create_game_stats_for_all_players();

-- Function to automatically update tournament status based on dates
CREATE OR REPLACE FUNCTION update_tournament_status()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if registration is closed
  IF NEW.status = 'upcoming' AND NOW() >= NEW.registration_close_date THEN
    NEW.status := 'registration_closed';
  END IF;
  
  -- Check if tournament has started
  IF (NEW.status = 'upcoming' OR NEW.status = 'registration_closed') AND NOW() >= NEW.start_date THEN
    NEW.status := 'in_progress';
  END IF;
  
  -- Check if tournament has ended
  IF NEW.status = 'in_progress' AND NEW.end_date IS NOT NULL AND NOW() >= NEW.end_date THEN
    NEW.status := 'completed';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update tournament status
CREATE TRIGGER update_tournament_status_trigger
BEFORE INSERT OR UPDATE ON tournaments
FOR EACH ROW
EXECUTE FUNCTION update_tournament_status();

-- Function to check match deadlines and handle forfeits
CREATE OR REPLACE FUNCTION check_match_deadlines()
RETURNS VOID AS $$
DECLARE
  match_record RECORD;
BEGIN
  -- Find matches past their deadline
  FOR match_record IN 
    SELECT * FROM matches 
    WHERE status = 'scheduled' 
    AND deadline IS NOT NULL 
    AND deadline < NOW()
  LOOP
    -- Create a forfeit result
    -- In a real implementation, you might want more complex logic here
    UPDATE matches 
    SET status = 'player1_forfeit', -- Default to player1 forfeiting, but this could be more complex
        updated_at = NOW()
    WHERE id = match_record.id;
    
    -- Create notifications
    INSERT INTO notifications (user_id, title, message, notification_type, related_entity_id, related_entity_type)
    VALUES (
      match_record.player1_id,
      'Match Forfeited',
      'You have forfeited a match due to exceeding the deadline.',
      'match_forfeited',
      match_record.id,
      'match'
    );
    
    INSERT INTO notifications (user_id, title, message, notification_type, related_entity_id, related_entity_type)
    VALUES (
      match_record.player2_id,
      'Match Forfeited',
      'Your opponent has forfeited a match due to exceeding the deadline.',
      'match_forfeited',
      match_record.id,
      'match'
    );
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- ===============================
-- ROW LEVEL SECURITY POLICIES
-- ===============================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_game_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE tournaments ENABLE ROW LEVEL SECURITY;
ALTER TABLE tournament_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE tournament_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE match_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Profiles table policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Games table policies
CREATE POLICY "Games are viewable by everyone"
  ON games FOR SELECT
  USING (true);

CREATE POLICY "Only admins can insert games"
  ON games FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND is_admin = true
  ));

CREATE POLICY "Only admins can update games"
  ON games FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND is_admin = true
  ));

-- Skill levels table policies
CREATE POLICY "Skill levels are viewable by everyone"
  ON skill_levels FOR SELECT
  USING (true);

CREATE POLICY "Only admins can insert skill levels"
  ON skill_levels FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND is_admin = true
  ));

CREATE POLICY "Only admins can update skill levels"
  ON skill_levels FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND is_admin = true
  ));

-- Player game stats policies
CREATE POLICY "Player game stats are viewable by everyone"
  ON player_game_stats FOR SELECT
  USING (true);

CREATE POLICY "Only admins can update player game stats"
  ON player_game_stats FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND is_admin = true
  ));

-- Tournaments table policies
CREATE POLICY "Tournaments are viewable by everyone"
  ON tournaments FOR SELECT
  USING (true);

CREATE POLICY "Only admins can insert tournaments"
  ON tournaments FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND is_admin = true
  ));

CREATE POLICY "Only admins can update tournaments"
  ON tournaments FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND is_admin = true
  ));

-- Tournament participants policies
CREATE POLICY "Tournament participants are viewable by everyone"
  ON tournament_participants FOR SELECT
  USING (true);

CREATE POLICY "Players can register themselves for tournaments"
  ON tournament_participants FOR INSERT
  WITH CHECK (
    auth.uid() = player_id AND
    EXISTS (
      SELECT 1 FROM tournaments
      WHERE id = tournament_id
      AND status = 'upcoming'
      AND NOW() BETWEEN registration_open_date AND registration_close_date
    )
  );

CREATE POLICY "Only admins can update tournament participants"
  ON tournament_participants FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND is_admin = true
  ));

-- Tournament stages policies
CREATE POLICY "Tournament stages are viewable by everyone"
  ON tournament_stages FOR SELECT
  USING (true);

CREATE POLICY "Only admins can insert tournament stages"
  ON tournament_stages FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND is_admin = true
  ));

CREATE POLICY "Only admins can update tournament stages"
  ON tournament_stages FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND is_admin = true
  ));

-- Matches policies
CREATE POLICY "Matches are viewable by everyone"
  ON matches FOR SELECT
  USING (true);

CREATE POLICY "Only admins can insert matches"
  ON matches FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND is_admin = true
  ));

CREATE POLICY "Only admins can update matches"
  ON matches FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND is_admin = true
  ));

-- Match results policies
CREATE POLICY "Match results are viewable by everyone"
  ON match_results FOR SELECT
  USING (true);

CREATE POLICY "Players can submit their own match results"
  ON match_results FOR INSERT
  WITH CHECK (
    auth.uid() = submitted_by AND
    EXISTS (
      SELECT 1 FROM matches
      WHERE id = match_id
      AND (player1_id = auth.uid() OR player2_id = auth.uid())
      AND status = 'scheduled'
    )
  );

CREATE POLICY "Only admins can update match results"
  ON match_results FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND is_admin = true
  ));

-- Achievements policies
CREATE POLICY "Achievements are viewable by everyone"
  ON achievements FOR SELECT
  USING (true);

CREATE POLICY "Only admins can insert achievements"
  ON achievements FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND is_admin = true
  ));

CREATE POLICY "Only admins can update achievements"
  ON achievements FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND is_admin = true
  ));

-- Player achievements policies
CREATE POLICY "Player achievements are viewable by everyone"
  ON player_achievements FOR SELECT
  USING (true);

CREATE POLICY "Only admins can insert player achievements"
  ON player_achievements FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND is_admin = true
  ));

-- Notifications policies
CREATE POLICY "Users can view their own notifications"
  ON notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "System can insert notifications"
  ON notifications FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update their own notifications"
  ON notifications FOR UPDATE
  USING (auth.uid() = user_id);

