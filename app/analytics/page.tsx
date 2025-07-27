"use client"

import { motion } from "framer-motion"
import { InteractiveCard } from "@/components/interactive-card"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3 } from "lucide-react"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis } from "recharts"

export default function AnalyticsPage() {
  const powerData = [
    { time: "12 AM", value: 45 },
    { time: "3 AM", value: 30 },
    { time: "6 AM", value: 85 },
    { time: "9 AM", value: 75 },
    { time: "12 PM", value: 90 },
    { time: "3 PM", value: 85 },
    { time: "6 PM", value: 95 },
    { time: "9 PM", value: 80 },
  ]

  const areaHistory = [
    { area: "Ikeja", reports: 16 },
    { area: "Yaba", reports: 5 },
    { area: "Surulere", reports: 20 },
  ]

  return (
    <div className="min-h-screen bg-slate-900 text-white pt-20 pb-20">
      <div className="p-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold mb-2">Analytics</h1>
        </motion.div>

        {/* Power Availability Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6"
        >
          <InteractiveCard className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <BarChart3 className="w-5 h-5 text-emerald-500" />
                Power Availability
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={powerData}>
                    <defs>
                      <linearGradient id="powerGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                    <YAxis hide />
                    <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} fill="url(#powerGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl font-bold text-white">42%</div>
                  <div className="text-sm text-slate-400">Uptime</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">4h 20m</div>
                  <div className="text-sm text-slate-400">Downtime</div>
                </div>
              </div>
            </CardContent>
          </InteractiveCard>
        </motion.div>

        {/* History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <InteractiveCard className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {areaHistory.map((item, index) => (
                  <div key={item.area} className="flex items-center justify-between">
                    <span className="text-white">{item.area}</span>
                    <span className="text-slate-400">{item.reports}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </InteractiveCard>
        </motion.div>
      </div>
    </div>
  )
}
