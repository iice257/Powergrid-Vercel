"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { CheckCircle } from "lucide-react"

interface PowerStatusModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onReportSubmitted: (status: "on" | "off") => void
  canRefresh: boolean
}

export function PowerStatusModal({ open, onOpenChange, onReportSubmitted, canRefresh }: PowerStatusModalProps) {
  const [selectedStatus, setSelectedStatus] = useState<"on" | "off">("on")
  const [location, setLocation] = useState("Ikeja")
  const [comments, setComments] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsSubmitted(true)

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
      <DialogContent className="sm:max-w-md bg-slate-900 border-slate-700 text-white">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={handleClose}
              disabled={isSubmitting}
              className="text-slate-400 hover:text-white p-0 h-auto"
            >
              Cancel
            </Button>
            <DialogTitle className="text-lg font-semibold">Report Power Update</DialogTitle>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="text-blue-400 hover:text-blue-300 p-0 h-auto bg-transparent hover:bg-transparent"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
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
              <p className="text-slate-400">Thank you for helping your community stay informed</p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Location */}
              <div className="space-y-2">
                <Label className="text-white">Location</Label>
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>

              {/* Status Selection */}
              <div className="space-y-4">
                <RadioGroup
                  value={selectedStatus}
                  onValueChange={(value) => setSelectedStatus(value as "on" | "off")}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="on" id="power-on" className="border-blue-500 text-blue-500" />
                    <Label htmlFor="power-on" className="text-white text-base">
                      Power is ON
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="off" id="power-off" className="border-slate-400 text-slate-400" />
                    <Label htmlFor="power-off" className="text-white text-base">
                      Power is OFF
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Optional Comments */}
              <div className="space-y-2">
                <Label className="text-white">Optional</Label>
                <Textarea
                  placeholder="Add any additional information..."
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 min-h-[100px]"
                />
              </div>

              {/* Helper Text */}
              <p className="text-slate-400 text-sm">Your report will help keep the map up to date.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
