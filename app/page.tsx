"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { PowerStatusModal } from "@/components/power-status-modal"
import { Search, ChevronRight, Zap, MapPin, Clock, TrendingUp } from "lucide-react"
import Link from "next/link"

const areas = [
  { name: "Ikeja", status: "on", coords: { x: 35, y: 45 }, reports: 12 },
  { name: "Surulere", status: "on", coords: { x: 65, y: 35 }, reports: 8 },
  { name: "Lagos", status: "on", coords: { x: 45, y: 65 }, reports: 15 },
  { name: "Yaba", status: "off", coords: { x: 55, y: 55 }, reports: 23 },
  { name: "Victoria Island", status: "on", coords: { x: 50, y: 75 }, reports: 5 },
]

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const powerAvailability = 76
  const lastOutage = "3h 24m"

  return (
    <div className="min-h-screen bg-slate-900 text-white pb-20 lg:pb-0">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-40 bg-slate-900/95 backdrop-blur border-b border-slate-800">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <Search className="h-5 w-5 text-slate-400" />
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none text-white placeholder:text-slate-400 focus-visible:ring-0"
            />
          </div>
          <Button variant="ghost" size="icon">
            <div className="w-6 h-6 bg-slate-600 rounded-full" />
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Power Status Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold">Power On</h1>
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
              Currently observing outages
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </motion.div>

        {/* Lagos Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="bg-slate-800 border-slate-700 overflow-hidden">
            <CardContent className="p-0">
              <div className="relative h-64 bg-gradient-to-br from-slate-700 to-slate-800">
                {/* Map Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <defs>
                      <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100" height="100" fill="url(#grid)" />
                  </svg>
                </div>

                {/* Area Markers */}
                {areas.map((area, index) => (
                  <motion.div
                    key={area.name}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    style={{ left: `${area.coords.x}%`, top: `${area.coords.y}%` }}
                  >
                    <Link href={`/area/${area.name.toLowerCase()}`}>
                      <div className="relative group">
                        <div
                          className={`w-4 h-4 rounded-full ${
                            area.status === "on" ? "bg-emerald-500" : "bg-red-500"
                          } shadow-lg ring-4 ring-white/20 group-hover:scale-110 transition-transform`}
                        />
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-slate-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                            {area.name}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}

                {/* Lagos Label */}
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-2xl font-bold text-white">Lagos</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Power Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Power Availability */}
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-300">Power Availability</h3>
                <TrendingUp className="h-5 w-5 text-emerald-500" />
              </div>
              <div className="flex items-end gap-4">
                <div className="text-4xl font-bold text-emerald-500">{powerAvailability}%</div>
                <div className="flex-1 h-12 bg-slate-700 rounded overflow-hidden">
                  <div className="flex h-full items-end gap-1 px-2">
                    {[...Array(10)].map((_, i) => (
                      <div
                        key={i}
                        className={`flex-1 bg-emerald-500 rounded-t ${i < 7 ? "opacity-100" : "opacity-40"}`}
                        style={{ height: `${Math.random() * 80 + 20}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Last Outage */}
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-300">Last Outage</h3>
                <Clock className="h-5 w-5 text-slate-400" />
              </div>
              <div className="text-4xl font-bold text-white">{lastOutage}</div>
              <p className="text-slate-400 mt-2">ago</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 gap-4"
        >
          <Button
            onClick={() => setIsModalOpen(true)}
            className="h-16 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
          >
            <Zap className="h-5 w-5 mr-2" />
            Report Status
          </Button>
          <Link href="/map">
            <Button
              variant="outline"
              className="h-16 w-full border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
            >
              <MapPin className="h-5 w-5 mr-2" />
              View Map
            </Button>
          </Link>
        </motion.div>
      </div>

      <PowerStatusModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
