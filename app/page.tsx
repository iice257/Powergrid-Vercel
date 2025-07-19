"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { InteractiveCard } from "@/components/interactive-card"
import { CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PowerStatusModal } from "@/components/power-status-modal"
import { StatsChart } from "@/components/stats-chart"
import { Zap, ZapOff, Clock, RefreshCw, Map, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function HomePage() {
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [powerStatus, setPowerStatus] = useState<"on" | "off">("on")
  const [lastUpdate, setLastUpdate] = useState("2 mins ago")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [canRefresh, setCanRefresh] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000) // Update every minute
    return () => clearInterval(timer)
  }, [])

  const handleRefresh = async () => {
    if (!canRefresh || isRefreshing) return

    setIsRefreshing(true)

    // Simulate refresh with minimum 0.5 seconds
    const startTime = Date.now()

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000 + 500))

    const elapsed = Date.now() - startTime
    const remainingTime = Math.max(0, 500 - elapsed)

    if (remainingTime > 0) {
      await new Promise((resolve) => setTimeout(resolve, remainingTime))
    }

    setLastUpdate("Just now")
    setIsRefreshing(false)

    // Update to "1 min ago" after 1 minute
    setTimeout(() => setLastUpdate("1 min ago"), 60000)
  }

  const handleReportSubmitted = (status: "on" | "off") => {
    setPowerStatus(status)
    setLastUpdate("Just now")
    setCanRefresh(false)

    // Re-enable refresh after 30 minutes (for demo, using 30 seconds)
    setTimeout(() => setCanRefresh(true), 30000)

    // Update to "1 min ago" after 1 minute
    setTimeout(() => setLastUpdate("1 min ago"), 60000)
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 17) return "Good afternoon"
    return "Good evening"
  }

  const getThemeColors = () => {
    if (powerStatus === "on") {
      return {
        bg: "from-green-400/20 to-green-500/10",
        border: "border-green-400/30",
        shadow: "shadow-green-400/20",
        text: "text-green-500",
        icon: "#22c55e",
      }
    } else {
      return {
        bg: "from-red-400/20 to-red-500/10",
        border: "border-red-400/30",
        shadow: "shadow-red-400/20",
        text: "text-red-500",
        icon: "#ef4444",
      }
    }
  }

  const themeColors = getThemeColors()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pt-20 lg:pt-24">
      <div className="max-w-7xl mx-auto p-4 lg:p-8">
        {/* Greeting Section with Power Status - Reduced spacing */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-6 gap-6"
        >
          {/* Left side - Greeting and Profile */}
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-primary/20">
              <AvatarImage src="/placeholder.svg?height=64&width=64&text=JD" />
              <AvatarFallback className="text-lg">JD</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold">{getGreeting()}, John!</h1>
              <div className="flex items-center gap-2 text-muted-foreground mt-1">
                <Clock className="w-4 h-4" />
                <span>{currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                <span>•</span>
                <span>Updated {lastUpdate}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={!canRefresh || isRefreshing}
                  className="h-6 w-6 p-0 ml-1"
                >
                  <RefreshCw className={`w-3 h-3 ${isRefreshing ? "animate-spin" : ""}`} />
                </Button>
              </div>
            </div>
          </div>

          {/* Right side - Minimized Power Status Card */}
          <InteractiveCard
            className={`relative overflow-hidden bg-gradient-to-r ${themeColors.bg} border-2 ${themeColors.border} shadow-lg ${themeColors.shadow} cursor-pointer`}
            onClick={() => setShowStatusModal(true)}
          >
            <CardContent className="p-6 flex items-center gap-4 min-w-[300px]">
              <div className="relative">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500`}
                  style={{
                    background:
                      powerStatus === "on"
                        ? `linear-gradient(135deg, ${themeColors.icon}, ${themeColors.icon}dd)`
                        : `linear-gradient(135deg, ${themeColors.icon}, ${themeColors.icon}dd)`,
                    boxShadow: `0 0 20px ${themeColors.icon}40`,
                  }}
                >
                  {powerStatus === "on" ? (
                    <Zap className="w-6 h-6 text-white" />
                  ) : (
                    <ZapOff className="w-6 h-6 text-white" />
                  )}
                </div>
              </div>
              <div>
                <h3 className={`text-xl font-bold ${themeColors.text}`}>
                  Power is {powerStatus === "on" ? "ON" : "OFF"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {powerStatus === "on" ? "Available in your area" : "Outage reported"}
                </p>
              </div>
            </CardContent>
          </InteractiveCard>
        </motion.div>

        {/* Main Dashboard Grid - Reduced top margin */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full max-w-[80%] mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-6 h-[600px]">
            {/* Left Column - Map Dashboard */}
            <InteractiveCard className="relative overflow-hidden">
              <CardContent className="p-6 h-full">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Map className="w-5 h-5 text-primary" />
                    Power Grid Map
                  </h2>
                  <Badge variant="outline">Live</Badge>
                </div>
                <div className="h-full bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <Map className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">Interactive Map</p>
                    <p className="text-sm">Real-time power status across Lagos</p>
                  </div>
                </div>
              </CardContent>
            </InteractiveCard>

            {/* Right Column */}
            <div className="flex flex-col gap-6">
              {/* Top - Analytics Chart (65% height) */}
              <InteractiveCard className="flex-[0.65]">
                <CardContent className="p-6 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      Analytics
                    </h2>
                    <Badge variant="outline">6 months</Badge>
                  </div>
                  <div className="h-full">
                    <StatsChart />
                  </div>
                </CardContent>
              </InteractiveCard>

              {/* Bottom - Stat Cards (35% height) */}
              <div className="flex-[0.35] grid grid-cols-1 gap-3">
                <div className="grid grid-cols-3 gap-3 h-full">
                  <InteractiveCard className="p-4 text-center hover:scale-105 transition-transform duration-300">
                    <div className="text-2xl font-bold text-primary">89%</div>
                    <div className="text-sm text-muted-foreground">Area Uptime</div>
                  </InteractiveCard>

                  <InteractiveCard className="p-4 text-center hover:scale-105 transition-transform duration-300">
                    <div className="text-2xl font-bold text-green-500">2,450</div>
                    <div className="text-sm text-muted-foreground">Your Credits</div>
                  </InteractiveCard>

                  <InteractiveCard className="p-4 text-center hover:scale-105 transition-transform duration-300">
                    <div className="text-2xl font-bold text-purple-500">95%</div>
                    <div className="text-sm text-muted-foreground">Accuracy</div>
                  </InteractiveCard>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <PowerStatusModal
        open={showStatusModal}
        onOpenChange={setShowStatusModal}
        onReportSubmitted={handleReportSubmitted}
        canRefresh={canRefresh}
      />
    </div>
  )
}
