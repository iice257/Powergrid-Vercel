"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PowerStatusModal } from "@/components/power-status-modal"
import { ArrowLeft, Zap, Clock } from "lucide-react"

const areaData = {
  ikeja: {
    name: "Ikeja",
    status: "on",
    lastOutage: "3 hours ago",
    weeklyStats: {
      uptime: 90,
      downtime: "2h 30m",
    },
    recentReports: [
      { time: "2 hours ago", status: "on", user: "Anonymous" },
      { time: "5 hours ago", status: "off", user: "John D." },
      { time: "1 day ago", status: "on", user: "Sarah M." },
    ],
  },
  yaba: {
    name: "Yaba",
    status: "off",
    lastOutage: "30 minutes ago",
    weeklyStats: {
      uptime: 65,
      downtime: "5h 45m",
    },
    recentReports: [
      { time: "30 minutes ago", status: "off", user: "Mike K." },
      { time: "2 hours ago", status: "on", user: "Anonymous" },
      { time: "6 hours ago", status: "off", user: "Lisa P." },
    ],
  },
}

export default function AreaDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const slug = params.slug as string
  const area = areaData[slug as keyof typeof areaData] || areaData.ikeja

  return (
    <div className="min-h-screen bg-slate-900 text-white pb-20 lg:pb-0">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur border-b border-slate-800">
        <div className="flex items-center gap-4 p-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-slate-400 hover:text-white">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">{area.name}</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Current Status */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-300">Current Status</h2>
                <Badge
                  variant={area.status === "on" ? "default" : "destructive"}
                  className={`${
                    area.status === "on" ? "bg-emerald-500 hover:bg-emerald-600" : "bg-red-500 hover:bg-red-600"
                  } text-white`}
                >
                  <div className={`w-2 h-2 rounded-full mr-2 ${area.status === "on" ? "bg-white" : "bg-white"}`} />
                  Power {area.status === "on" ? "On" : "Off"}
                </Badge>
              </div>
              <div className="text-3xl font-bold mb-2">Power {area.status === "on" ? "On" : "Off"}</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Last Outage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="h-5 w-5 text-slate-400" />
                <h3 className="text-lg font-semibold text-slate-300">Last Outage</h3>
              </div>
              <div className="text-2xl font-bold">{area.lastOutage}</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Weekly Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-slate-300 mb-4">Past Week</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-slate-400 mb-1">Time Powered</div>
                  <div className="text-2xl font-bold text-emerald-500">{area.weeklyStats.uptime}%</div>
                </div>
                <div>
                  <div className="text-sm text-slate-400 mb-1">Downtime</div>
                  <div className="text-2xl font-bold text-red-400">{area.weeklyStats.downtime}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Reports */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-slate-300 mb-4">Recent Reports</h3>
              <div className="space-y-3">
                {area.recentReports.map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-3 h-3 rounded-full ${report.status === "on" ? "bg-emerald-500" : "bg-red-500"}`}
                      />
                      <div>
                        <div className="font-medium">Power {report.status === "on" ? "restored" : "outage"}</div>
                        <div className="text-sm text-slate-400">
                          {report.time} by {report.user}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Report Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button
            onClick={() => setIsModalOpen(true)}
            className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-lg"
          >
            <Zap className="h-5 w-5 mr-2" />
            Report
          </Button>
        </motion.div>
      </div>

      <PowerStatusModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} defaultLocation={area.name} />
    </div>
  )
}
