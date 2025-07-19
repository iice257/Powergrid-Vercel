"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Zap, MapPin, Clock, TrendingUp, CheckCircle, Users, Activity, Plus } from "lucide-react"
import { motion } from "framer-motion"
import { PowerStatusModal } from "@/components/power-status-modal"
import { StatsChart } from "@/components/stats-chart"

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const stats = [
    { label: "Power Status", value: "92%", icon: Zap, color: "text-green-500", trend: "+5%" },
    { label: "Active Users", value: "1,247", icon: Users, color: "text-blue-500", trend: "+12%" },
    { label: "Reports Today", value: "34", icon: Activity, color: "text-purple-500", trend: "+8%" },
    { label: "Avg Uptime", value: "18.5h", icon: Clock, color: "text-orange-500", trend: "+2h" },
  ]

  const recentReports = [
    { id: 1, location: "Victoria Island", status: "online", time: "2 min ago", user: "John D." },
    { id: 2, location: "Ikeja GRA", status: "offline", time: "5 min ago", user: "Sarah M." },
    { id: 3, location: "Lekki Phase 1", status: "online", time: "8 min ago", user: "Mike R." },
    { id: 4, location: "Surulere", status: "unstable", time: "12 min ago", user: "Ada K." },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="p-4 space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Power Status</h1>
              <p className="text-muted-foreground">Lagos, Ikeja • Real-time updates</p>
            </div>
            <Button onClick={() => setIsModalOpen(true)} className="gap-2 bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4" />
              Report
            </Button>
          </div>
        </motion.div>

        {/* Current Status Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="neon-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-green-500/10">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Power Available</h3>
                    <p className="text-sm text-muted-foreground">Last updated 2 minutes ago</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                  92% Uptime
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Grid Stability</span>
                  <span className="font-medium">Excellent</span>
                </div>
                <Progress value={92} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Last outage: 6 hours ago</span>
                  <span>Duration: 45 minutes</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Card className="neon-glow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    <Badge variant="outline" className="text-xs">
                      {stat.trend}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <StatsChart />
        </motion.div>

        {/* Recent Reports */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card className="neon-glow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Reports
              </CardTitle>
              <CardDescription>Latest power status updates from your area</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentReports.map((report, index) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        report.status === "online"
                          ? "bg-green-500"
                          : report.status === "offline"
                            ? "bg-red-500"
                            : "bg-yellow-500"
                      }`}
                    />
                    <div>
                      <p className="font-medium text-sm">{report.location}</p>
                      <p className="text-xs text-muted-foreground">by {report.user}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={report.status === "online" ? "default" : "destructive"} className="text-xs">
                      {report.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{report.time}</p>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-2 gap-4"
        >
          <Card className="neon-glow">
            <CardContent className="p-4 text-center">
              <MapPin className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold mb-1">View Map</h3>
              <p className="text-xs text-muted-foreground mb-3">See power status across Lagos</p>
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                Open Map
              </Button>
            </CardContent>
          </Card>

          <Card className="neon-glow">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold mb-1">Analytics</h3>
              <p className="text-xs text-muted-foreground mb-3">Detailed power statistics</p>
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                View Stats
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <PowerStatusModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
