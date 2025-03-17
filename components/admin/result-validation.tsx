"use client"

import { useState } from "react"
import Image from "next/image"
import { Check, X, AlertTriangle, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { validateGameResult } from "@/lib/api"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface ResultValidationProps {
  resultId: string
  adminId: string
  matchDetails: {
    game: string
    tournament: string
    player1: {
      id: string
      username: string
    }
    player2: {
      id: string
      username: string
    }
    submittedBy: string
    result: "win" | "loss" | "draw"
    score?: string
    notes?: string
    screenshotUrl: string
    submittedAt: string
  }
  onValidated?: () => void
}

export function ResultValidation({ resultId, adminId, matchDetails, onValidated }: ResultValidationProps) {
  const [isValidating, setIsValidating] = useState(false)
  const [isRejecting, setIsRejecting] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")
  const [showScreenshot, setShowScreenshot] = useState(false)
  const { toast } = useToast()

  const handleValidate = async () => {
    setIsValidating(true)

    try {
      const response = await validateGameResult(resultId, true, adminId)

      if (response.success) {
        toast({
          title: "Result validated",
          description: "The game result has been validated successfully",
        })

        if (onValidated) {
          onValidated()
        }
      } else {
        throw new Error(response.message || "Failed to validate result")
      }
    } catch (error) {
      toast({
        title: "Validation failed",
        description: error instanceof Error ? error.message : "An error occurred while validating the result",
        variant: "destructive",
      })
    } finally {
      setIsValidating(false)
    }
  }

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      toast({
        title: "Reason required",
        description: "Please provide a reason for rejecting this result",
        variant: "destructive",
      })
      return
    }

    setIsRejecting(true)

    try {
      const response = await validateGameResult(resultId, false, adminId, rejectionReason)

      if (response.success) {
        toast({
          title: "Result rejected",
          description: "The game result has been rejected",
        })

        setRejectionReason("")

        if (onValidated) {
          onValidated()
        }
      } else {
        throw new Error(response.message || "Failed to reject result")
      }
    } catch (error) {
      toast({
        title: "Rejection failed",
        description: error instanceof Error ? error.message : "An error occurred while rejecting the result",
        variant: "destructive",
      })
    } finally {
      setIsRejecting(false)
    }
  }

  const submittedByPlayer1 = matchDetails.submittedBy === matchDetails.player1.id
  const submitter = submittedByPlayer1 ? matchDetails.player1 : matchDetails.player2
  const opponent = submittedByPlayer1 ? matchDetails.player2 : matchDetails.player1

  return (
    <div className="space-y-4 border rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Match Result Validation</h3>
          <p className="text-sm text-muted-foreground">
            {matchDetails.game} • {matchDetails.tournament}
          </p>
        </div>
        <div className="flex gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <X className="h-4 w-4 mr-1" />
                Reject
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Reject Result</AlertDialogTitle>
                <AlertDialogDescription>
                  Please provide a reason for rejecting this result. This will be shared with the player.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <Textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Reason for rejection..."
                className="mt-2"
                rows={4}
              />
              <AlertDialogFooter className="mt-4">
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleReject} disabled={isRejecting}>
                  {isRejecting ? "Rejecting..." : "Reject Result"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button variant="default" size="sm" onClick={handleValidate} disabled={isValidating}>
            <Check className="h-4 w-4 mr-1" />
            {isValidating ? "Validating..." : "Validate"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="text-sm font-medium">Match Details</div>
          <div className="text-sm">
            <span className="text-muted-foreground">Players:</span> {matchDetails.player1.username} vs{" "}
            {matchDetails.player2.username}
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">Submitted by:</span> {submitter.username}
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">Result:</span>{" "}
            <span
              className={
                matchDetails.result === "win" ? "text-green-500" : matchDetails.result === "loss" ? "text-red-500" : ""
              }
            >
              {submitter.username}{" "}
              {matchDetails.result === "win" ? "won" : matchDetails.result === "loss" ? "lost" : "drew"}
              {matchDetails.result !== "draw" ? ` against ${opponent.username}` : ""}
            </span>
          </div>
          {matchDetails.score && (
            <div className="text-sm">
              <span className="text-muted-foreground">Score:</span> {matchDetails.score}
            </div>
          )}
          {matchDetails.notes && (
            <div className="text-sm">
              <span className="text-muted-foreground">Notes:</span> {matchDetails.notes}
            </div>
          )}
          <div className="text-sm">
            <span className="text-muted-foreground">Submitted at:</span>{" "}
            {new Date(matchDetails.submittedAt).toLocaleString()}
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium">Screenshot</div>
          <div className="relative h-32 w-full rounded-md overflow-hidden border">
            <Image
              src={matchDetails.screenshotUrl || "/placeholder.svg"}
              alt="Game result screenshot"
              fill
              className="object-cover"
            />
            <Button
              variant="secondary"
              size="sm"
              className="absolute bottom-2 right-2"
              onClick={() => setShowScreenshot(true)}
            >
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-center p-3 rounded-md bg-yellow-500/10 border border-yellow-500/20">
        <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
        <p className="text-xs">
          Please carefully review the screenshot and match details before validating or rejecting this result.
          Validation will update tournament standings and player ratings.
        </p>
      </div>

      <Dialog open={showScreenshot} onOpenChange={setShowScreenshot}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Result Screenshot</DialogTitle>
            <DialogDescription>
              Screenshot submitted by {submitter.username} for the match against {opponent.username}
            </DialogDescription>
          </DialogHeader>
          <div className="relative h-[500px] w-full rounded-md overflow-hidden border">
            <Image
              src={matchDetails.screenshotUrl || "/placeholder.svg"}
              alt="Game result screenshot"
              fill
              className="object-contain"
            />
          </div>
          <DialogFooter>
            <Button onClick={() => setShowScreenshot(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

