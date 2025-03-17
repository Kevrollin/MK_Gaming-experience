"use client"

import { Users, Trophy, Gamepad2, AlertTriangle, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight neon-text">Admin Dashboard</h1>
        <Button>Generate Report</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,345</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500">+5.2%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tournaments</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">54</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500">+12</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Games Played</CardTitle>
            <Gamepad2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28,459</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500">+18.3%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reports</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowDownRight className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500">-5</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tournaments">Tournaments</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Platform Activity</CardTitle>
                <CardDescription>User activity over the past 30 days</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[200px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Activity Chart</p>
                </div>
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Top Games</CardTitle>
                <CardDescription>Most popular games by player count</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-full">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">PUBG</p>
                        <p className="text-sm text-muted-foreground">12,480 players</p>
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-muted">
                        <div className="h-2 rounded-full bg-blue-500" style={{ width: "80%" }} />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-full">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">E-Football</p>
                        <p className="text-sm text-muted-foreground">8,750 players</p>
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-muted">
                        <div className="h-2 rounded-full bg-blue-500" style={{ width: "65%" }} />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-full">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Chess</p>
                        <p className="text-sm text-muted-foreground">5,240 players</p>
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-muted">
                        <div className="h-2 rounded-full bg-blue-500" style={{ width: "45%" }} />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-full">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Fortnite</p>
                        <p className="text-sm text-muted-foreground">4,120 players</p>
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-muted">
                        <div className="h-2 rounded-full bg-blue-500" style={{ width: "35%" }} />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-full">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Call of Duty</p>
                        <p className="text-sm text-muted-foreground">3,890 players</p>
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-muted">
                        <div className="h-2 rounded-full bg-blue-500" style={{ width: "30%" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Recent Reports</CardTitle>
                <CardDescription>Latest user reports that need attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Cheating Accusation</p>
                      <p className="text-xs text-muted-foreground">PUBG Tournament #42</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Review
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Abusive Behavior</p>
                      <p className="text-xs text-muted-foreground">Chess Match #128</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Review
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Technical Issue</p>
                      <p className="text-xs text-muted-foreground">E-Football League</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Review
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>New Users</CardTitle>
                <CardDescription>Recently registered users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-muted" />
                      <div>
                        <p className="text-sm font-medium">Alex Johnson</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">
                      View
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-muted" />
                      <div>
                        <p className="text-sm font-medium">Sarah Miller</p>
                        <p className="text-xs text-muted-foreground">5 hours ago</p>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">
                      View
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-muted" />
                      <div>
                        <p className="text-sm font-medium">James Wilson</p>
                        <p className="text-xs text-muted-foreground">1 day ago</p>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">
                      View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Tournaments</CardTitle>
                <CardDescription>Tournaments starting soon</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Chess Masters Cup</p>
                      <p className="text-xs text-muted-foreground">Starts in 3 days</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">E-Football League Season 6</p>
                      <p className="text-xs text-muted-foreground">Starts in 1 week</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">PUBG Battle Royale</p>
                      <p className="text-xs text-muted-foreground">Starts in 2 weeks</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tournaments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tournament Management</CardTitle>
              <CardDescription>Create, edit, and manage tournaments across all games</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="text-base font-medium">Active Tournaments</h3>
                    <p className="text-sm text-muted-foreground">Currently running tournaments</p>
                  </div>
                  <Button>Create Tournament</Button>
                </div>

                <div className="rounded-md border">
                  <div className="grid grid-cols-5 gap-4 p-4 font-medium">
                    <div>Name</div>
                    <div>Game</div>
                    <div>Participants</div>
                    <div>Status</div>
                    <div className="text-right">Actions</div>
                  </div>
                  <div className="divide-y divide-border">
                    <div className="grid grid-cols-5 gap-4 p-4 items-center">
                      <div>Chess Masters Cup</div>
                      <div>Chess</div>
                      <div>64/256</div>
                      <div>Registration Open</div>
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          Manage
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 gap-4 p-4 items-center">
                      <div>E-Football League Season 6</div>
                      <div>E-Football</div>
                      <div>64/64</div>
                      <div>Registration Closed</div>
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          Manage
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 gap-4 p-4 items-center">
                      <div>PUBG Battle Royale</div>
                      <div>PUBG</div>
                      <div>32/50 Teams</div>
                      <div>Registration Open</div>
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          Manage
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>View and manage user accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="text-base font-medium">All Users</h3>
                    <p className="text-sm text-muted-foreground">Manage user accounts and permissions</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">Export</Button>
                    <Button>Add User</Button>
                  </div>
                </div>

                <div className="rounded-md border">
                  <div className="grid grid-cols-5 gap-4 p-4 font-medium">
                    <div>User</div>
                    <div>Email</div>
                    <div>Level</div>
                    <div>Status</div>
                    <div className="text-right">Actions</div>
                  </div>
                  <div className="divide-y divide-border">
                    <div className="grid grid-cols-5 gap-4 p-4 items-center">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-muted" />
                        <span>Alex Johnson</span>
                      </div>
                      <div>alex@example.com</div>
                      <div>Level 5</div>
                      <div>Active</div>
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          Suspend
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 gap-4 p-4 items-center">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-muted" />
                        <span>Sarah Miller</span>
                      </div>
                      <div>sarah@example.com</div>
                      <div>Level 3</div>
                      <div>Active</div>
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          Suspend
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 gap-4 p-4 items-center">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-muted" />
                        <span>James Wilson</span>
                      </div>
                      <div>james@example.com</div>
                      <div>Level 2</div>
                      <div>Active</div>
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          Suspend
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

