"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { X, MapPin, Zap } from "lucide-react"

interface PowerStatusModalProps {
  isOpen: boolean
  onClose: () => void
  defaultLocation?: string
}

export function PowerStatusModal({ isOpen, onClose, defaultLocation = "" }: PowerStatusModalProps) {
  const [location, setLocation] = useState(defaultLocation)
  const [powerStatus, setPowerStatus] = useState<"on" | "off" | null>(null)
  const [additionalInfo, setAdditionalInfo] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!location || !powerStatus) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    onClose()

    // Reset form
    setLocation("")
    setPowerStatus(null)
    setAdditionalInfo("")
  }

  const handleClose = () => {
    onClose()
    // Reset form
    setLocation("")
    setPowerStatus(null)
    setAdditionalInfo("")
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-md"
          >
            <Card className="bg-slate-900 border-slate-700 text-white">
              <CardContent className="p-0">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-700">
                  <div>
                    <h2 className="text-xl font-bold">Report Power Update</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" onClick={handleClose} className="text-slate-400">
                      Cancel
                    </Button>
                    <Button variant="ghost" size="icon" onClick={handleClose}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Enter location"
                        className="pl-10 bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  {/* Power Status */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-3">Power Status</label>
                    <div className="space-y-3">
                      <div
                        className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          powerStatus === "on"
                            ? "border-emerald-500 bg-emerald-500/10"
                            : "border-slate-600 bg-slate-800 hover:border-slate-500"
                        }`}
                        onClick={() => setPowerStatus("on")}
                      >
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            powerStatus === "on" ? "border-emerald-500" : "border-slate-400"
                          }`}
                        >
                          {powerStatus === "on" && <div className="w-2 h-2 rounded-full bg-emerald-500" />}
                        </div>
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-emerald-500" />
                          <span className="font-medium">Power is ON</span>
                        </div>
                      </div>

                      <div
                        className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          powerStatus === "off"
                            ? "border-red-500 bg-red-500/10"
                            : "border-slate-600 bg-slate-800 hover:border-slate-500"
                        }`}
                        onClick={() => setPowerStatus("off")}
                      >
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            powerStatus === "off" ? "border-red-500" : "border-slate-400"
                          }`}
                        >
                          {powerStatus === "off" && <div className="w-2 h-2 rounded-full bg-red-500" />}
                        </div>
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-red-500" />
                          <span className="font-medium">Power is OFF</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Optional</label>
                    <Textarea
                      value={additionalInfo}
                      onChange={(e) => setAdditionalInfo(e.target.value)}
                      placeholder="Add any additional information..."
                      className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400 resize-none"
                      rows={3}
                    />
                  </div>

                  {/* Help Text */}
                  <p className="text-sm text-slate-400">Your report will help keep the map up to date.</p>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-slate-700">
                  <Button
                    onClick={handleSubmit}
                    disabled={!location || !powerStatus || isSubmitting}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
