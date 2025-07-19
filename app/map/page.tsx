"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { InteractiveCard } from "@/components/interactive-card"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Zap, ZapOff, MapPin, Clock, Users, Filter, Target, TrendingUp, AlertTriangle } from "lucide-react"

export default function MapPage() {
  const [timeFilter, setTimeFilter] = useState("24h")
  const [statusFilter, setStatusFilter] = useState("all")

  const reports = [
    {
      id: 1,
      location: "Ikeja",
      status: "on",
      timestamp: "2 mins ago",
      reporter: "Sarah K.",
      streak: 12,
      reliability: 95,
      coordinates: { x: 80, y: 60 },
    },
    {
      id: 2,
      location: "Victoria Island",
      status: "off",
      timestamp: "15 mins ago",
      reporter: "Mike O.",
      streak: 8,
      reliability: 87,
      coordinates: { x: 180, y: 90 },
    },
    {
      id: 3,
      location: "Lekki",
      status: "on",
      timestamp: "32 mins ago",
      reporter: "Ada M.",
      streak: 23,
      reliability: 92,
      coordinates: { x: 220, y: 120 },
    },
    {
      id: 4,
      location: "Surulere",
      status: "on",
      timestamp: "1 hour ago",
      reporter: "John D.",
      streak: 5,
      reliability: 78,
      coordinates: { x: 120, y: 140 },
    },
    {
      id: 5,
      location: "Yaba",
      status: "off",
      timestamp: "2 hours ago",
      reporter: "Kemi A.",
      streak: 15,
      reliability: 89,
      coordinates: { x: 60, y: 160 },
    },
  ]

  const areaStats = {
    totalReports: 1247,
    activeReporters: 89,
    avgUptime: 89,
    topArea: "Ikeja",
    outageAlerts: 3,
    restoredAreas: 7,
  }

  const areaLeaders = [
    { area: "Ikeja", uptime: 95, trend: "up", reports: 234, color: "#22c55e" },
    { area: "Lekki", uptime: 92, trend: "up", reports: 189, color: "#3b82f6" },
    { area: "Victoria Island", uptime: 87, trend: "down", reports: 156, color: "#f59e0b" },
    { area: "Surulere", uptime: 78, trend: "up", reports: 123, color: "#ef4444" },
    { area: "Yaba", uptime: 85, trend: "up", reports: 98, color: "#8b5cf6" },
  ]

  const filteredReports = reports.filter((report) => {
    if (statusFilter !== "all" && report.status !== statusFilter) return false
    return true
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pt-20 lg:pt-24 pb-20">
      <div className="max-w-7xl mx-auto p-4 lg:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">Community Grid Map</h1>
          <p className="text-lg text-muted-foreground">Real-time power updates from your neighbors</p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <InteractiveCard>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-5 h-5 text-primary" />
                <Badge variant="secondary" className="text-xs">
                  Active
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-primary">{areaStats.activeReporters}</p>
                <p className="text-xs text-muted-foreground">reporters online</p>
              </div>
            </CardContent>
          </InteractiveCard>

          <InteractiveCard>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Target className="w-5 h-5 text-green-500" />
                <Badge variant="secondary" className="text-xs">
                  Lagos
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-green-500">{areaStats.avgUptime}%</p>
                <p className="text-xs text-muted-foreground">area uptime</p>
              </div>
            </CardContent>
          </InteractiveCard>

          <InteractiveCard>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <Badge variant="destructive" className="text-xs">
                  Alerts
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-red-500">{areaStats.outageAlerts}</p>
                <p className="text-xs text-muted-foreground">active outages</p>
              </div>
            </CardContent>
          </InteractiveCard>

          <InteractiveCard>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                <Badge variant="secondary" className="text-xs">
                  Today
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-blue-500">{areaStats.restoredAreas}</p>
                <p className="text-xs text-muted-foreground">areas restored</p>
              </div>
            </CardContent>
          </InteractiveCard>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <InteractiveCard>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Grid Heatmap
                  </CardTitle>
                  <Badge variant="outline" className="text-xs">
                    Live Data
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Filters</span>
                  </div>
                  <div className="flex space-x-2">
                    <Select value={timeFilter} onValueChange={setTimeFilter}>
                      <SelectTrigger className="w-24 h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1h">1h</SelectItem>
                        <SelectItem value="24h">24h</SelectItem>
                        <SelectItem value="7d">7d</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-20 h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="on">On</SelectItem>
                        <SelectItem value="off">Off</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Interactive Map */}
                <div className="relative h-96 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl overflow-hidden border">
                  <svg viewBox="0 0 300 200" className="w-full h-full">
                    {/* Grid Background */}
                    <defs>
                      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(79, 172, 254, 0.1)" strokeWidth="1" />
                      </pattern>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />

                    {/* Area Markers */}
                    {filteredReports.map((report) => (
                      <g key={report.id}>
                        <circle
                          cx={report.coordinates.x}
                          cy={report.coordinates.y}
                          r="8"
                          fill={report.status === "on" ? "#22c55e" : "#ef4444"}
                          filter="url(#glow)"
                          className={report.status === "on" ? "animate-pulse" : ""}
                        />
                        <text
                          x={report.coordinates.x}
                          y={report.coordinates.y + 20}
                          textAnchor="middle"
                          className="text-xs fill-current"
                        >
                          {report.location}
                        </text>
                      </g>
                    ))}
                  </svg>

                  {/* Legend */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-background/80 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span>Power ON ({filteredReports.filter((r) => r.status === "on").length})</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span>Power OFF ({filteredReports.filter((r) => r.status === "off").length})</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {filteredReports.length} reports
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </InteractiveCard>
          </motion.div>

          {/* Side Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Recent Reports */}
            <InteractiveCard>
              <CardHeader>
                <CardTitle className="text-lg">Recent Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredReports.slice(0, 4).map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center space-x-3 p-3 rounded-2xl bg-card/50 border border-primary/5 hover:bg-muted/50 transition-colors"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        report.status === "on" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {report.status === "on" ? <Zap className="w-5 h-5" /> : <ZapOff className="w-5 h-5" />}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-3 h-3 text-muted-foreground" />
                        <span className="text-sm font-medium">{report.location}</span>
                        <Badge variant="secondary" className="text-xs">
                          {report.reliability}%
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {report.timestamp} • {report.reporter}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <Badge variant="outline" className="text-xs">
                        {report.streak} days
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </InteractiveCard>

            {/* Area Leaders */}
            <InteractiveCard>
              <CardHeader>
                <CardTitle className="text-lg">Top Performing Areas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {areaLeaders.map((area, index) => (
                  <div
                    key={area.area}
                    className="flex items-center justify-between p-3 rounded-2xl bg-card/50 border border-primary/5 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary/60 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{index + 1}</span>
                      </div>
                      <div>
                        <span className="font-medium">{area.area}</span>
                        <p className="text-xs text-muted-foreground">{area.reports} reports</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-semibold">{area.uptime}%</span>
                      <Badge variant={area.trend === "up" ? "default" : "secondary"} className="text-xs">
                        {area.trend === "up" ? "📈" : "📉"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </InteractiveCard>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
