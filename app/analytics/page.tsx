"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, MapPin, BarChart3 } from "lucide-react"

const analyticsData = {
  powerAvailability: 42,
  uptime: "4h 20m",
  downtime: "2h 40m",
  areas: [
    { name: "Ikeja", reports: 16, trend: "up" },
    { name: "Yaba", reports: 5, trend: "down" },
    { name: "Surulere", reports: 20, trend: "up" },
  ],
}

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white pb-20 lg:pb-0">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur border-b border-slate-800">
        <div className="flex items-center gap-4 p-4">
          <div className="p-2 bg-slate-800 rounded-lg">
            <BarChart3 className="h-6 w-6 text-emerald-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Analytics</h1>
            <p className="text-sm text-slate-400">POWERGRID</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Power Availability Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-slate-300 mb-6">Power Availability</h3>

              {/* Chart Area */}
              <div className="relative h-48 mb-6">
                <svg className="w-full h-full" viewBox="0 0 400 200">
                  {/* Grid Lines */}
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#374151" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="400" height="200" fill="url(#grid)" opacity="0.3" />

                  {/* Chart Line */}
                  <path
                    d="M 20 150 Q 80 120 120 100 T 200 80 T 280 90 T 360 70"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="3"
                    className="drop-shadow-lg"
                  />

                  {/* Data Points */}
                  {[
                    { x: 20, y: 150 },
                    { x: 120, y: 100 },
                    { x: 200, y: 80 },
                    { x: 280, y: 90 },
                    { x: 360, y: 70 },
                  ].map((point, index) => (
                    <circle key={index} cx={point.x} cy={point.y} r="4" fill="#10B981" className="drop-shadow-lg" />
                  ))}
                </svg>

                {/* Time Labels */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-slate-500 px-4">
                  <span>12 AM</span>
                  <span>6 AM</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-3xl font-bold text-emerald-500">{analyticsData.powerAvailability}%</div>
                  <div className="text-sm text-slate-400">Uptime</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">{analyticsData.uptime}</div>
                  <div className="text-sm text-slate-400">Downtime</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-slate-300 mb-4">History</h3>
              <div className="space-y-3">
                {analyticsData.areas.map((area, index) => (
                  <div key={area.name} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      <span className="font-medium">{area.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">{area.reports}</span>
                      <TrendingUp className={`h-4 w-4 ${area.trend === "up" ? "text-emerald-500" : "text-red-500"}`} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
