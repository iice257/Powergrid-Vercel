"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { InteractiveCard } from "@/components/interactive-card"
import { CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Zap, Clock } from "lucide-react"

interface AreaPageProps {
  params: {
    slug: string
  }
}

export default function AreaPage({ params }: AreaPageProps) {
  const router = useRouter()
  const areaName = params.slug.charAt(0).toUpperCase() + params.slug.slice(1)

  const [powerStatus] = useState<"on" | "off">("on")

  const areaData = {
    currentStatus: "Power On",
    lastOutage: "3 hours ago",
    weeklyStats: {
      timePowered: "90%",
      downtime: "2h 30m",
    },
    history: [
      { area: "Ikeja", reports: 16 },
      { area: "Yaba", reports: 5 },
      { area: "Surulere", reports: 20 },
    ],
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
        <div className="flex items-center p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="text-white hover:bg-slate-800 mr-4"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold">{areaName}</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Power Status */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-emerald-500 font-medium">Power On</span>
          </div>
        </motion.div>

        {/* Current Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <InteractiveCard className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-slate-400 text-sm mb-1">Current Status</h3>
                  <p className="text-2xl font-bold text-white">Power On</p>
                </div>

                <div>
                  <h3 className="text-slate-400 text-sm mb-1">Last Outage</h3>
                  <p className="text-xl font-semibold text-white">3 hours ago</p>
                </div>
              </div>
            </CardContent>
          </InteractiveCard>
        </motion.div>

        {/* Weekly Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-lg font-semibold mb-4">Past Week</h2>
          <div className="grid grid-cols-2 gap-4">
            <InteractiveCard className="bg-slate-800 border-slate-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 text-sm">Time Powered</span>
                  <Zap className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="text-2xl font-bold text-white">90%</div>
              </CardContent>
            </InteractiveCard>

            <InteractiveCard className="bg-slate-800 border-slate-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 text-sm">Downtime</span>
                  <Clock className="w-4 h-4 text-slate-400" />
                </div>
                <div className="text-2xl font-bold text-white">2h 30m</div>
              </CardContent>
            </InteractiveCard>
          </div>
        </motion.div>

        {/* Report Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-4"
        >
          <Button
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 text-lg font-medium"
            onClick={() => {
              /* Handle report */
            }}
          >
            Report
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
