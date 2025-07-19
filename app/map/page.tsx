"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Zap, ZapOff, MapPin, Clock, Users, Filter, Target } from "lucide-react"

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
    },
    {
      id: 2,
      location: "Victoria Island",
      status: "off",
      timestamp: "15 mins ago",
      reporter: "Mike O.",
      streak: 8,
      reliability: 87,
    },
    {
      id: 3,
      location: "Lekki",
      status: "on",
      timestamp: "32 mins ago",
      reporter: "Ada M.",
      streak: 23,
      reliability: 92,
    },
    {
      id: 4,
      location: "Surulere",
      status: "on",
      timestamp: "1 hour ago",
      reporter: "John D.",
      streak: 5,
      reliability: 78,
    },
  ]

  const areaStats = {
    totalReports: 1247,
    activeReporters: 89,
    avgUptime: 89,
    topArea: "Ikeja",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 pb-20">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 pt-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Community Grid 🗺️
          </h1>
          <p className="text-muted-foreground text-sm">Real-time power updates from your neighbors</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="rounded-3xl glass border-primary/10">
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
          </Card>

          <Card className="rounded-3xl glass border-primary/10">
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
          </Card>
        </div>

        {/* Map Visualization */}
        <Card className="rounded-3xl glass border-primary/10">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-primary">Grid Heatmap</h3>
                <Badge variant="outline" className="text-xs">
                  Live Data
                </Badge>
              </div>

              {/* Simplified map visualization */}
              <div className="relative h-48 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl overflow-hidden">
                <svg
                  viewBox="0 0 300 200"
                  className="w-full h-full"
                  style={{ filter: "drop-shadow(0 0 10px rgba(79, 172, 254, 0.3))" }}
                >
                  {/* Grid lines */}
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(79, 172, 254, 0.1)" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />

                  {/* Area markers */}
                  <circle cx="80" cy="60" r="8" fill="#22c55e" className="animate-pulse" />
                  <circle cx="180" cy="90" r="6" fill="#ef4444" />
                  <circle cx="220" cy="120" r="7" fill="#22c55e" className="animate-pulse" />
                  <circle cx="120" cy="140" r="5" fill="#22c55e" />
                  <circle cx="60" cy="160" r="6" fill="#f59e0b" />

                  {/* Area labels */}
                  <text x="80" y="80" textAnchor="middle" className="text-xs" fill="currentColor">
                    Ikeja
                  </text>
                  <text x="180" y="110" textAnchor="middle" className="text-xs" fill="currentColor">
                    VI
                  </text>
                  <text x="220" y="140" textAnchor="middle" className="text-xs" fill="currentColor">
                    Lekki
                  </text>
                </svg>

                {/* Legend */}
                <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
                  <div className="flex items-center space-x-2 text-xs">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Power ON</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>Power OFF</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card className="rounded-3xl glass border-primary/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Filters</span>
              </div>
              <div className="flex space-x-2">
                <Select value={timeFilter} onValueChange={setTimeFilter}>
                  <SelectTrigger className="w-24 h-8 text-xs rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1h">1h</SelectItem>
                    <SelectItem value="24h">24h</SelectItem>
                    <SelectItem value="7d">7d</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-20 h-8 text-xs rounded-lg">
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
          </CardContent>
        </Card>

        {/* Recent Reports */}
        <Card className="rounded-3xl glass border-primary/10">
          <CardHeader>
            <CardTitle className="text-lg">Recent Reports</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {reports.map((report) => (
              <div
                key={report.id}
                className="flex items-center space-x-3 p-3 rounded-2xl bg-card/50 border border-primary/5"
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
        </Card>

        {/* Area Leaders */}
        <Card className="rounded-3xl glass border-primary/10">
          <CardHeader>
            <CardTitle className="text-lg">Top Performing Areas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { area: "Ikeja", uptime: 95, trend: "up" },
              { area: "Lekki", uptime: 92, trend: "up" },
              { area: "Victoria Island", uptime: 87, trend: "down" },
              { area: "Surulere", uptime: 78, trend: "up" },
            ].map((area, index) => (
              <div
                key={area.area}
                className="flex items-center justify-between p-3 rounded-2xl bg-card/50 border border-primary/5"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary/60 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>
                  <span className="font-medium">{area.area}</span>
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
        </Card>
      </div>
    </div>
  )
}
