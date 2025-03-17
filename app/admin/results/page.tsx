"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { getPendingMatchResults } from "@/lib/supabase" // Use the Supabase helper function
import { ResultValidation } from "@/components/admin/result-validation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

export default function AdminResultsPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [pendingResults, setPendingResults] = useState<any[]>([])
  const [isLoadingResults, setIsLoadingResults] = useState(true)

  useEffect(() => {
    // Redirect if not admin
    if (!isLoading && (!user || !user.isAdmin)) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page.",
        variant: "destructive",
      })
      router.push("/")
      return
    }

    // Load pending results
    if (user) {
      loadPendingResults()
    }
  }, [user, isLoading, router, toast])

  // Update the loadPendingResults function to use the Supabase client
  const loadPendingResults = async () => {
    try {
      setIsLoadingResults(true)
      const results = await getPendingMatchResults()
      setPendingResults(results)
    } catch (error) {
      console.error("Error loading pending results:", error)
      toast({
        title: "Error",
        description: "Failed to load pending results. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoadingResults(false)
    }
  }

  const handleValidateResult = async (resultId: string) => {
    try {
      if (!user) return
      // await approveMatchResult(resultId, user.id) // Removed supabase import
      toast({
        title: "Success",
        description: "Match result has been approved.",
      })
      // Reload results
      loadPendingResults()
    } catch (error) {
      console.error("Error approving result:", error)
      toast({
        title: "Error",
        description: "Failed to approve result. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleRejectResult = async (resultId: string, reason: string) => {
    try {
      if (!user) return
      // await rejectMatchResult(resultId, user.id, reason) // Removed supabase import
      toast({
        title: "Success",
        description: "Match result has been rejected.",
      })
      // Reload results
      loadPendingResults()
    } catch (error) {
      console.error("Error rejecting result:", error)
      toast({
        title: "Error",
        description: "Failed to reject result. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return <div className="container py-10">Loading...</div>
  }

  if (!user || !user.isAdmin) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight neon-text">Result Management</h1>
        <Button onClick={loadPendingResults} disabled={isLoadingResults}>
          {isLoadingResults ? "Loading..." : "Refresh"}
        </Button>
      </div>

      <Tabs defaultValue="pending">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">Pending Results ({pendingResults.length})</TabsTrigger>
          <TabsTrigger value="approved">Approved Results</TabsTrigger>
          <TabsTrigger value="rejected">Rejected Results</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-6 mt-6">
          {isLoadingResults ? (
            <div className="flex items-center justify-center p-10">
              <p>Loading pending results...</p>
            </div>
          ) : pendingResults.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-10">
                <CardTitle className="mb-2">No Pending Results</CardTitle>
                <CardDescription>There are no match results waiting for approval at this time.</CardDescription>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {pendingResults.map((result) => (
                <ResultValidation
                  key={result.id}
                  resultId={result.id}
                  adminId={user.id}
                  matchDetails={{
                    game: result.tournaments.name,
                    tournament: result.tournaments.name,
                    player1: {
                      id: result.player1.id,
                      username: result.player1.username,
                    },
                    player2: {
                      id: result.player2.id,
                      username: result.player2.username,
                    },
                    submittedBy: result.submitted_by,
                    result: result.result,
                    score: result.score,
                    notes: result.notes,
                    screenshotUrl: result.screenshot_url,
                    submittedAt: result.created_at,
                  }}
                  onValidated={() => loadPendingResults()}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="approved" className="space-y-6 mt-6">
          <Card>
            <CardContent className="p-10">
              <p className="text-center">Approved results functionality will be implemented in the next phase.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rejected" className="space-y-6 mt-6">
          <Card>
            <CardContent className="p-10">
              <p className="text-center">Rejected results functionality will be implemented in the next phase.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

