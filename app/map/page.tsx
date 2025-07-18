"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Zap, ZapOff, Users, Filter } from "lucide-react"
import { motion } from "framer-motion"

interface MapReport {
  id: string
  lat: number
  lng: number
  status: "on" | "off"
  timestamp: Date
  userStreak: number
  description?: string
}

export default function MapPage() {
  const [reports, setReports] = useState<MapReport[]>([])
  const [timeFilter, setTimeFilter] = useState("24h")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading map reports
    const loadReports = async () => {
      setIsLoading(true)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockReports: MapReport[] = [
        {
          id: "1",
          lat: 6.5244,
          lng: 3.3792,
          status: "on",
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
          userStreak: 15,
          description: "Power restored after 3-hour outage",
        },
        {
          id: "2",
          lat: 6.52,
          lng: 3.38,
          status: "off",
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
          userStreak: 8,
          description: "Sudden power outage in residential area",
        },
        {
          id: "3",
          lat: 6.528,
          lng: 3.375,
          status: "on",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          userStreak: 22,
        },
        {
          id: "4",
          lat: 6.518,
          lng: 3.382,
          status: "off",
          timestamp: new Date(Date.now() - 45 * 60 * 1000),
          userStreak: 5,
          description: "Transformer issue reported",
        },
        {
          id: "5",
          lat: 6.535,
          lng: 3.385,
          status: "on",
          timestamp: new Date(Date.now() - 15 * 60 * 1000),
          userStreak: 12,
          description: "Power back online",
        },
      ]

      setReports(mockReports)
      setIsLoading(false)
    }

    loadReports()
  }, [])

  const filteredReports = reports.filter((report) => {
    if (statusFilter !== "all" && report.status !== statusFilter) return false

    const now = new Date()
    const reportTime = report.timestamp
    const hoursDiff = (now.getTime() - reportTime.getTime()) / (1000 * 60 * 60)

    switch (timeFilter) {
      case "1h":
        return hoursDiff <= 1
      case "6h":
        return hoursDiff <= 6
      case "24h":
        return hoursDiff <= 24
      case "7d":
        return hoursDiff <= 168
      default:
        return true
    }
  })

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  const getStatusColor = (status: "on" | "off") => {
    return status === "on" ? "bg-green-500" : "bg-red-500"
  }

  const getStatusBgColor = (status: "on" | "off") => {
    return status === "on"
      ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400"
      : "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400"
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold">Community Map</h1>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading community reports...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Community Map</h1>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {filteredReports.length} reports
          </Badge>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">Last hour</SelectItem>
              <SelectItem value="6h">Last 6 hours</SelectItem>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All status</SelectItem>
              <SelectItem value="on">Power ON</SelectItem>
              <SelectItem value="off">Power OFF</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Map Visualization */}
      <div className="p-4">
        <Card className="h-64 bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-700 relative overflow-hidden">
          <CardContent className="h-full flex items-center justify-center relative">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            <div className="text-center z-10">
              <MapPin className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
              <p className="text-muted-foreground font-medium">Lagos Area Power Map</p>
              <p className="text-sm text-muted-foreground mt-1">
                Showing {filteredReports.length} reports in your area
              </p>
            </div>

            {/* Simulated map markers */}
            <div className="absolute inset-0 p-4">
              {filteredReports.slice(0, 6).map((report, index) => (
                <motion.div
                  key={report.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className={`absolute w-4 h-4 rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-125 transition-transform ${getStatusColor(report.status)}`}
                  style={{
                    left: `${15 + ((index * 12) % 70)}%`,
                    top: `${20 + ((index * 17) % 50)}%`,
                  }}
                  title={`Power ${report.status.toUpperCase()} - ${formatTimeAgo(report.timestamp)}`}
                >
                  {/* Pulse animation for recent reports */}
                  {index < 2 && (
                    <div
                      className={`absolute inset-0 rounded-full animate-ping ${getStatusColor(report.status)} opacity-75`}
                    ></div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-2 text-xs">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>Power ON</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span>Power OFF</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Stats */}
      <div className="px-4 pb-4">
        <div className="grid grid-cols-3 gap-3">
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-green-600">
                {filteredReports.filter((r) => r.status === "on").length}
              </div>
              <div className="text-xs text-muted-foreground">Power ON</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-red-600">
                {filteredReports.filter((r) => r.status === "off").length}
              </div>
              <div className="text-xs text-muted-foreground">Power OFF</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-blue-600">
                {Math.round((filteredReports.filter((r) => r.status === "on").length / filteredReports.length) * 100) ||
                  0}
                %
              </div>
              <div className="text-xs text-muted-foreground">Uptime</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Reports List */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Reports</h2>
          <Badge variant="outline" className="flex items-center gap-1">
            <Filter className="h-3 w-3" />
            {filteredReports.length} filtered
          </Badge>
        </div>

        {filteredReports.length > 0 ? (
          filteredReports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-card rounded-lg border p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-full ${getStatusBgColor(report.status)}`}>
                    {report.status === "on" ? <Zap className="h-4 w-4" /> : <ZapOff className="h-4 w-4" />}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">Power {report.status === "on" ? "ON" : "OFF"}</span>
                      <Badge variant="outline" className="text-xs">
                        {report.userStreak} day streak
                      </Badge>
                    </div>

                    {report.description && <p className="text-sm text-muted-foreground mb-2">{report.description}</p>}

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {report.lat.toFixed(4)}, {report.lng.toFixed(4)}
                      </span>
                      <span>{formatTimeAgo(report.timestamp)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-8">
            <MapPin className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
            <p className="text-muted-foreground">No reports found for the selected filters</p>
            <p className="text-sm text-muted-foreground mt-1">Try adjusting your filter settings</p>
          </div>
        )}
      </div>
    </div>
  )
}
