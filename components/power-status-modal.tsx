"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Zap, ZapOff, MapPin, Clock, CheckCircle, AlertCircle } from "lucide-react"

interface PowerStatusModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onReportSubmitted: (status: "on" | "off") => void
  canRefresh: boolean
}

export function PowerStatusModal({ open, onOpenChange, onReportSubmitted, canRefresh }: PowerStatusModalProps) {
  const [selectedStatus, setSelectedStatus] = useState<"on" | "off">("on")
  const [comments, setComments] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Show success state for 1 second, then close and update
    setTimeout(() => {
      onReportSubmitted(selectedStatus)
      onOpenChange(false)
      setIsSubmitted(false)
      setComments("")
    }, 1500)
  }

  const handleClose = () => {
    if (!isSubmitting) {
      onOpenChange(false)
      setIsSubmitted(false)
      setComments("")
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Report Power Status
          </DialogTitle>
          <DialogDescription>Help your community by reporting the current power status in your area</DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="py-8 text-center"
            >
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Report Submitted!</h3>
              <p className="text-muted-foreground">Thank you for helping your community stay informed</p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Location Info */}
              <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm">Lagos, Ikeja • Nigeria</span>
                <Badge variant="outline" className="ml-auto text-xs">
                  Detected
                </Badge>
              </div>

              {/* Status Selection */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Current Power Status</Label>
                <RadioGroup
                  value={selectedStatus}
                  onValueChange={(value) => setSelectedStatus(value as "on" | "off")}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="on" id="power-on" />
                    <Label
                      htmlFor="power-on"
                      className="flex items-center gap-2 cursor-pointer p-3 rounded-lg border hover:bg-muted/50 transition-colors flex-1"
                    >
                      <Zap className="w-4 h-4 text-green-500" />
                      <span>Power ON</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="off" id="power-off" />
                    <Label
                      htmlFor="power-off"
                      className="flex items-center gap-2 cursor-pointer p-3 rounded-lg border hover:bg-muted/50 transition-colors flex-1"
                    >
                      <ZapOff className="w-4 h-4 text-red-500" />
                      <span>Power OFF</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Comments */}
              <div className="space-y-2">
                <Label htmlFor="comments">Additional Comments (Optional)</Label>
                <Textarea
                  id="comments"
                  placeholder="Any additional details about the power situation..."
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className="min-h-[80px]"
                />
              </div>

              {/* Warning for recent reports */}
              {!canRefresh && (
                <div className="flex items-start gap-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium text-yellow-700 dark:text-yellow-400">Recent Report Submitted</p>
                    <p className="text-yellow-600 dark:text-yellow-500">
                      You've recently submitted a report. Please wait before submitting another one.
                    </p>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="flex-1 bg-transparent"
                >
                  Cancel
                </Button>
                <Button onClick={handleSubmit} disabled={isSubmitting} className="flex-1 gap-2">
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Reporting...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      Submit Report
                    </>
                  )}
                </Button>
              </div>

              {/* Info */}
              <div className="text-xs text-muted-foreground text-center pt-2 border-t">
                <div className="flex items-center justify-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>Reports are verified by the community</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
