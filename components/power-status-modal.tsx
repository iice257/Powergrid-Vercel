"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Zap, ZapOff, AlertTriangle, MapPin, Clock, Send } from "lucide-react"
import { motion } from "framer-motion"

interface PowerStatusModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PowerStatusModal({ isOpen, onClose }: PowerStatusModalProps) {
  const [status, setStatus] = useState("online")
  const [location, setLocation] = useState("")
  const [customTime, setCustomTime] = useState("")
  const [details, setDetails] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const statusOptions = [
    { value: "online", label: "Power Available", icon: Zap, color: "text-green-500", bg: "bg-green-500/10" },
    { value: "offline", label: "No Power", icon: ZapOff, color: "text-red-500", bg: "bg-red-500/10" },
    {
      value: "unstable",
      label: "Unstable/Fluctuating",
      icon: AlertTriangle,
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    onClose()

    // Reset form
    setStatus("online")
    setLocation("")
    setCustomTime("")
    setDetails("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md glass">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Report Power Status
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Status Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Current Power Status</Label>
            <RadioGroup value={status} onValueChange={setStatus}>
              {statusOptions.map((option) => (
                <motion.div key={option.value} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Label
                    htmlFor={option.value}
                    className={`
                      flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all
                      ${
                        status === option.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }
                    `}
                  >
                    <RadioGroupItem value={option.value} id={option.value} />
                    <div className={`p-2 rounded-full ${option.bg}`}>
                      <option.icon className={`h-4 w-4 ${option.color}`} />
                    </div>
                    <span className="font-medium">{option.label}</span>
                  </Label>
                </motion.div>
              ))}
            </RadioGroup>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Location (Optional)
            </Label>
            <Input
              id="location"
              placeholder="e.g., Victoria Island, Lekki Phase 1"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-background/50"
            />
            <p className="text-xs text-muted-foreground">Leave empty to use your current location: Lagos, Ikeja</p>
          </div>

          {/* Custom Time */}
          <div className="space-y-2">
            <Label htmlFor="time" className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Time (Optional)
            </Label>
            <Input
              id="time"
              type="datetime-local"
              value={customTime}
              onChange={(e) => setCustomTime(e.target.value)}
              className="bg-background/50"
            />
            <p className="text-xs text-muted-foreground">Leave empty to use current time</p>
          </div>

          {/* Additional Details */}
          <div className="space-y-2">
            <Label htmlFor="details" className="text-sm font-medium">
              Additional Details (Optional)
            </Label>
            <Textarea
              id="details"
              placeholder="Any additional information about the power situation..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="bg-background/50 min-h-[80px]"
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 bg-transparent"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1 gap-2" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Submit Report
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
