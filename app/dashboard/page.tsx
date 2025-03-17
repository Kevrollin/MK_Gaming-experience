"use client"

import { useState } from "react"
import Image from "next/image"
import { Trophy, Star, Users, Clock, Edit, Save, X, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    username: user?.username || "",
    bio: "Competitive gamer with a passion for strategy games. Looking to improve my skills and compete in tournaments.",
    location: "New York, USA",
    discord: "gamer#1234",
    twitter: "@gamertag",
  })

  const handleSaveProfile = () => {
    setIsEditing(false)
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    })
  }

  const recentAchievements = [
    {
      title: "Chess Tournament Winner",
      date: "2 weeks ago",
      description: "1st place in the Regional Chess Championship",
      badge: "Gold",
    },
    {
      title: "E-Football Rising Star",
      date: "1 month ago",
      description: "Top 10 finish in the Pro League Qualifiers",
      badge: "Silver",
    },
    {
      title: "PUBG Squad Challenge",
      date: "2 months ago",
      description: "3rd place with team 'Victory Royale'",
      badge: "Bronze",
    },
  ]

  const upcomingTournaments = [
    {
      title: "Chess Masters Cup",
      date: "In 3 days",
      participants: "64 players",
      prize: "$5,000",
      game: "Chess",
    },
    {
      title: "E-Football League Season 6",
      date: "In 1 week",
      participants: "32 players",
      prize: "$10,000",
      game: "E-Football",
    },
    {
      title: "PUBG Battle Royale",
      date: "In 2 weeks",
      participants: "50 teams",
      prize: "$15,000",
      game: "PUBG",
    },
  ]

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight neon-text">My Profile</h1>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button onClick={handleSaveProfile}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
        <Card>
          <CardHeader className="relative">
            <div className="flex flex-col items-center">
              <div className="relative h-24 w-24 mb-2">
                <Image
                  src="/placeholder.svg?height=96&width=96"
                  alt={user.username}
                  fill
                  className="rounded-full object-cover border-2 border-blue-500"
                />
                {isEditing && (
                  <Button
                    size="icon"
                    variant="outline"
                    className="absolute bottom-0 right-0 rounded-full bg-background"
                  >
                    <Upload className="h-4 w-4" />
                    <span className="sr-only">Upload avatar</span>
                  </Button>
                )}
              </div>
              {isEditing ? (
                <div className="w-full space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={profileData.username}
                    onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                  />
                </div>
              ) : (
                <CardTitle>{user.username}</CardTitle>
              )}
              <CardDescription>Level {user.level} Player</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profileData.location}
                    onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discord">Discord</Label>
                  <Input
                    id="discord"
                    value={profileData.discord}
                    onChange={(e) => setProfileData({ ...profileData, discord: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input
                    id="twitter"
                    value={profileData.twitter}
                    onChange={(e) => setProfileData({ ...profileData, twitter: e.target.value })}
                  />
                </div>
              </div>
            ) : (
              <>
                <div>
                  <h3 className="font-medium">Bio</h3>
                  <p className="text-sm text-muted-foreground mt-1">{profileData.bio}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Location:</span>
                    <span className="text-sm text-muted-foreground">{profileData.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Discord:</span>
                    <span className="text-sm text-muted-foreground">{profileData.discord}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Twitter:</span>
                    <span className="text-sm text-muted-foreground">{profileData.twitter}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Member Since:</span>
                    <span className="text-sm text-muted-foreground">January 2023</span>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Tabs defaultValue="stats">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="stats">Game Stats</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="tournaments">Tournaments</TabsTrigger>
            </TabsList>
            <TabsContent value="stats" className="space-y-4">
              <h2 className="text-xl font-bold">Game Ratings</h2>
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Chess</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{user.gameRatings?.chess || 0}</div>
                    <p className="text-xs text-muted-foreground">Top 15% of players</p>
                    <div className="mt-2 h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-blue-500" style={{ width: "65%" }} />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">E-Football</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{user.gameRatings?.efootball || 0}</div>
                    <p className="text-xs text-muted-foreground">Top 25% of players</p>
                    <div className="mt-2 h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-blue-500" style={{ width: "45%" }} />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">PUBG</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{user.gameRatings?.pubg || 0}</div>
                    <p className="text-xs text-muted-foreground">Top 30% of players</p>
                    <div className="mt-2 h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-blue-500" style={{ width: "35%" }} />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <h2 className="text-xl font-bold mt-6">Recent Activity</h2>
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y divide-border">
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-muted p-2">
                          <Trophy className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Won Chess Match</p>
                          <p className="text-xs text-muted-foreground">vs. GrandMaster42</p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">2 days ago</p>
                    </div>
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-muted p-2">
                          <Users className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Joined Tournament</p>
                          <p className="text-xs text-muted-foreground">E-Football Pro League</p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">5 days ago</p>
                    </div>
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-muted p-2">
                          <Star className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Reached Level 5</p>
                          <p className="text-xs text-muted-foreground">Unlocked new rewards</p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">1 week ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-4">
              <h2 className="text-xl font-bold">Recent Achievements</h2>
              <div className="grid gap-4">
                {recentAchievements.map((achievement, index) => (
                  <Card key={index}>
                    <CardContent className="p-0">
                      <div className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-4">
                          <div className="rounded-full bg-muted p-2">
                            <Trophy className="h-4 w-4 text-blue-500" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium">{achievement.title}</p>
                              <Badge variant="outline">{achievement.badge}</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">{achievement.description}</p>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">{achievement.date}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex justify-center mt-4">
                <Button variant="outline">View All Achievements</Button>
              </div>
            </TabsContent>

            <TabsContent value="tournaments" className="space-y-4">
              <h2 className="text-xl font-bold">Upcoming Tournaments</h2>
              <div className="grid gap-4">
                {upcomingTournaments.map((tournament, index) => (
                  <Card key={index}>
                    <CardContent className="p-0">
                      <div className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-4">
                          <div className="rounded-full bg-muted p-2">
                            <Clock className="h-4 w-4 text-blue-500" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium">{tournament.title}</p>
                              <Badge>{tournament.game}</Badge>
                            </div>
                            <div className="flex gap-4 mt-1">
                              <p className="text-xs text-muted-foreground">{tournament.date}</p>
                              <p className="text-xs text-muted-foreground">{tournament.participants}</p>
                              <p className="text-xs text-muted-foreground">Prize: {tournament.prize}</p>
                            </div>
                          </div>
                        </div>
                        <Button size="sm">View</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex justify-center mt-4">
                <Button variant="outline">View All Tournaments</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

