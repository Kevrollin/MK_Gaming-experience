"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { X, AlertTriangle, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { submitGameResult } from "@/lib/api"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ResultSubmissionProps {
  matchId: string
  userId: string
  gameType: string
  opponent: {
    id: string
    username: string
  }
  onSuccess?: () => void
}

export function ResultSubmission({ matchId, userId, gameType, opponent, onSuccess }: ResultSubmissionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [screenshot, setScreenshot] = useState<File | null>(null)
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null)
  const [result, setResult] = useState<"win" | "loss" | "draw" | "">("")
  const [score, setScore] = useState("")
  const [notes, setNotes] = useState("")
  const [open, setOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file (JPEG, PNG, etc.)",
          variant: "destructive",
        })
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Screenshot must be less than 5MB",
          variant: "destructive",
        })
        return
      }

      setScreenshot(file)
      setScreenshotPreview(URL.createObjectURL(file))
    }
  }

  const clearScreenshot = () => {
    setScreenshot(null)
    setScreenshotPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate required fields
    if (!result) {
      toast({
        title: "Missing result",
        description: "Please select a result (win, loss, or draw)",
        variant: "destructive",
      })
      return
    }

    if (!screenshot) {
      toast({
        title: "Missing screenshot",
        description: "Please upload a screenshot of the game result",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Prepare result data
      const resultData = {
        result,
        score: score || undefined,
        notes: notes || undefined,
      }

      // Submit result with screenshot
      const response = await submitGameResult(matchId, userId, resultData, screenshot)

      if (response.success) {
        toast({
          title: "Result submitted",
          description: "Your game result has been submitted successfully",
        })

        // Reset form
        setResult("")
        setScore("")
        setNotes("")
        clearScreenshot()
        setOpen(false)

        // Call onSuccess callback if provided
        if (onSuccess) {
          onSuccess()
        }
      } else {
        throw new Error(response.message || "Failed to submit result")
      }
    } catch (error) {
      toast({
        title: "Submission failed",
        description: error instanceof Error ? error.message : "An error occurred while submitting your result",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getScoreInputLabel = () => {
    switch (gameType) {
      case "chess":
        return "Final Position (optional)"
      case "efootball":
        return "Final Score (e.g., 3-1)"
      case "pubg":
        return "Placement & Kills (e.g., #2, 8 kills)"
      default:
        return "Score (optional)"
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Submit Result</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Submit Game Result</DialogTitle>
          <DialogDescription>
            Submit your result for the match against {opponent.username}. A screenshot is required for verification.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="result">Match Result</Label>
            <Select value={result} onValueChange={(value) => setResult(value as "win" | "loss" | "draw")}>
              <SelectTrigger id="result">
                <SelectValue placeholder="Select result" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="win">Win</SelectItem>
                <SelectItem value="loss">Loss</SelectItem>
                <SelectItem value="draw">Draw</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="score">{getScoreInputLabel()}</Label>
            <Input
              id="score"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              placeholder={gameType === "efootball" ? "e.g., 3-1" : ""}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="screenshot">Screenshot</Label>
            <div className="flex flex-col items-center gap-4">
              {screenshotPreview ? (
                <div className="relative w-full h-[200px] rounded-md overflow-hidden border">
                  <Image
                    src={screenshotPreview || "/placeholder.svg"}
                    alt="Game result screenshot"
                    fill
                    className="object-contain"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={clearScreenshot}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div
                  className="flex flex-col items-center justify-center w-full h-[200px] rounded-md border border-dashed border-muted-foreground/50 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Click to upload a screenshot</p>
                  <p className="text-xs text-muted-foreground mt-1">PNG, JPG or WEBP (max. 5MB)</p>
                </div>
              )}
              <Input
                id="screenshot"
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleScreenshotChange}
                className="hidden"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes (optional)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any additional information about the match..."
              rows={3}
            />
          </div>

          <div className="flex items-center p-3 rounded-md bg-blue-500/10 border border-blue-500/20">
            <AlertTriangle className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
            <p className="text-xs">
              By submitting this result, you confirm that the information provided is accurate. False reporting may
              result in penalties including tournament disqualification.
            </p>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Result"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

