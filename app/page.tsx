"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Zap, ZapOff, MapPin, BarChart3, Award, Clock } from "lucide-react"
import { motion } from "framer-motion"

interface PowerLog {
  id: string
  status: "on" | "off"
  timestamp: Date
  location?: string
}

interface UserStats {
  currentStreak: number
  totalCredits: number
  todayUptime: number
  lastLogTime?: Date
}

export default function HomePage() {
  const [powerStatus, setPowerStatus] = useState<"on" | "off">("on")
  const [isLogging, setIsLogging] = useState(false)
  const [userStats, setUserStats] = useState<UserStats>({
    currentStreak: 7,
    totalCredits: 245,
    todayUptime: 87,
    lastLogTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  })

  const handlePowerToggle = async (status: "on" | "off") => {
    setIsLogging(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newLog: PowerLog = {
      id: Date.now().toString(),
      status,
      timestamp: new Date(),
      location: "Current Location",
    }

    // Store in localStorage (offline-first)
    const existingLogs = JSON.parse(localStorage.getItem("powerLogs") || "[]")
    localStorage.setItem("powerLogs", JSON.stringify([newLog, ...existingLogs]))

    setPowerStatus(status)
    setUserStats((prev) => ({
      ...prev,
      currentStreak: prev.currentStreak + 1,
      totalCredits: prev.totalCredits + 5,
      lastLogTime: new Date(),
    }))

    setIsLogging(false)
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40&text=JD" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-lg font-semibold">Good morning, John!</h1>
            <p className="text-sm text-muted-foreground">Ready to track power?</p>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
      </div>

      <div className="p-4 space-y-6">
        {/* Power Status Card */}
        <Card className="relative overflow-hidden">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl">Power Status</CardTitle>
            <CardDescription>Tap to log current status</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="flex justify-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant={powerStatus === "on" ? "default" : "outline"}
                  onClick={() => handlePowerToggle("on")}
                  disabled={isLogging}
                  className="h-16 w-24 flex-col gap-1"
                >
                  <Zap className="h-6 w-6" />
                  ON
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant={powerStatus === "off" ? "destructive" : "outline"}
                  onClick={() => handlePowerToggle("off")}
                  disabled={isLogging}
                  className="h-16 w-24 flex-col gap-1"
                >
                  <ZapOff className="h-6 w-6" />
                  OFF
                </Button>
              </motion.div>
            </div>

            {isLogging && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-muted-foreground">
                Logging status...
              </motion.div>
            )}
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{userStats.todayUptime}%</div>
              <div className="text-sm text-muted-foreground">Today's Uptime</div>
              <Progress value={userStats.todayUptime} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{userStats.currentStreak}</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
              <div className="flex justify-center mt-2">
                <Award className="h-4 w-4 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Credits & Last Log */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  {userStats.totalCredits} Credits
                </Badge>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {userStats.lastLogTime ? formatTimeAgo(userStats.lastLogTime) : "Never"}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-16 flex-col gap-1 bg-transparent">
              <MapPin className="h-5 w-5" />
              View Map
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-1 bg-transparent">
              <BarChart3 className="h-5 w-5" />
              View Stats
            </Button>
          </div>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <div className="flex-1">
                <div className="text-sm font-medium">Power restored</div>
                <div className="text-xs text-muted-foreground">2 hours ago</div>
              </div>
              <Badge variant="secondary">+5 credits</Badge>
            </div>

            <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
              <div className="h-2 w-2 rounded-full bg-red-500"></div>
              <div className="flex-1">
                <div className="text-sm font-medium">Outage reported</div>
                <div className="text-xs text-muted-foreground">5 hours ago</div>
              </div>
              <Badge variant="secondary">+3 credits</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
