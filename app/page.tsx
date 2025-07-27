"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { InteractiveCard } from "@/components/interactive-card"
import { CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PowerStatusModal } from "@/components/power-status-modal"
import { Search, Clock, ChevronRight, BarChart3 } from "lucide-react"

export default function HomePage() {
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [powerStatus, setPowerStatus] = useState<"on" | "off">("on")
  const [searchQuery, setSearchQuery] = useState("")

  const lagosAreas = [
    { name: "Ikeja", status: "on", x: 30, y: 25 },
    { name: "Surulere", status: "on", x: 60, y: 35 },
    { name: "Lagos", status: "on", x: 45, y: 55 },
    { name: "Yaba", status: "off", x: 35, y: 45 },
    { name: "Victoria Island", status: "on", x: 70, y: 60 },
  ]

  const handleReportSubmitted = (status: "on" | "off") => {
    setPowerStatus(status)
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header with Search */}
      <div className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Power Status Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-3xl font-bold mb-2">Power On</h1>
          <Button
            variant="ghost"
            className="text-slate-400 hover:text-white p-0 h-auto justify-start"
            onClick={() => setShowStatusModal(true)}
          >
            Currently observing outages
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </motion.div>

        {/* Lagos Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <InteractiveCard className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="relative h-64 bg-slate-700 rounded-lg overflow-hidden">
                <svg viewBox="0 0 100 80" className="w-full h-full">
                  {/* Lagos outline */}
                  <path
                    d="M20,30 Q40,20 60,25 Q80,22 90,30 Q85,50 75,60 Q60,65 45,62 Q30,64 20,55 Q15,45 20,30 Z"
                    fill="rgba(71, 85, 105, 0.3)"
                    stroke="rgba(71, 85, 105, 0.5)"
                    strokeWidth="0.5"
                  />

                  {/* Area markers */}
                  {lagosAreas.map((area) => (
                    <g key={area.name}>
                      <circle
                        cx={area.x}
                        cy={area.y}
                        r="2"
                        fill={area.status === "on" ? "#10b981" : "#ef4444"}
                        className={area.status === "on" ? "animate-pulse" : ""}
                      />
                      <text x={area.x} y={area.y - 4} textAnchor="middle" className="text-xs fill-white" fontSize="4">
                        {area.name}
                      </text>
                    </g>
                  ))}
                </svg>

                {/* Lagos label */}
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-semibold text-white">Lagos</h3>
                </div>
              </div>
            </CardContent>
          </InteractiveCard>
        </motion.div>

        {/* Power Availability Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 gap-4"
        >
          <InteractiveCard className="bg-slate-800 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm">Power Availability</span>
                <BarChart3 className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="text-2xl font-bold text-white">76%</div>
              <div className="flex items-center mt-2">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((bar) => (
                    <div
                      key={bar}
                      className={`w-1 rounded-full ${bar <= 6 ? "bg-emerald-500" : "bg-slate-600"}`}
                      style={{ height: `${Math.random() * 20 + 10}px` }}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </InteractiveCard>

          <InteractiveCard className="bg-slate-800 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm">Last Outage</span>
                <Clock className="w-4 h-4 text-slate-400" />
              </div>
              <div className="text-2xl font-bold text-white">3h 24m</div>
              <div className="text-slate-400 text-sm mt-1">ago</div>
            </CardContent>
          </InteractiveCard>
        </motion.div>
      </div>

      <PowerStatusModal
        open={showStatusModal}
        onOpenChange={setShowStatusModal}
        onReportSubmitted={handleReportSubmitted}
        canRefresh={true}
      />
    </div>
  )
}
