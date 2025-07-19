"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { InteractiveCard } from "@/components/interactive-card"
import { CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PowerStatusModal } from "@/components/power-status-modal"
import { useTheme } from "@/components/theme-provider"
import { Zap, ZapOff, MapPin, Clock, Users, RefreshCw, Sun, Moon, Bell, User } from "lucide-react"

export default function HomePage() {
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [powerStatus, setPowerStatus] = useState<"on" | "off">("on")
  const [lastUpdate, setLastUpdate] = useState("2 mins ago")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [canRefresh, setCanRefresh] = useState(true)
  const { theme, setTheme } = useTheme()
  const [notifications] = useState(3)

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
        bg: theme === "dark" ? "from-green-500/20 to-green-600/10" : "from-green-400/20 to-green-500/10",
        border: theme === "dark" ? "border-green-500/30" : "border-green-400/30",
        shadow: theme === "dark" ? "shadow-green-500/20" : "shadow-green-400/20",
        text: "text-green-500",
        icon: "#22c55e",
      }
    } else {
      return {
        bg: theme === "dark" ? "from-red-500/20 to-red-600/10" : "from-red-400/20 to-red-500/10",
        border: theme === "dark" ? "border-red-500/30" : "border-red-400/30",
        shadow: theme === "dark" ? "shadow-red-500/20" : "shadow-red-400/20",
        text: "text-red-500",
        icon: "#ef4444",
      }
    }
  }

  const themeColors = getThemeColors()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pt-20 lg:pt-24 overflow-hidden">
      <div className="max-w-7xl mx-auto p-4 lg:p-8 h-screen flex flex-col">
        {/* Header with Theme Toggle */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          {/* Left side - Greeting and Profile */}
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 border-2 border-primary/20">
              <AvatarImage src="/placeholder.svg?height=48&width=48&text=JD" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold">{getGreeting()}, John!</h1>
              <div className="flex items-center gap-2 text-muted-foreground">
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

          {/* Right side - Controls */}
          <div className="flex items-center gap-3">
            {/* Location */}
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              <Button variant="outline" size="sm" className="gap-2 h-10 bg-transparent">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="hidden md:inline text-sm">Lagos, Ikeja</span>
              </Button>
            </motion.div>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative h-10 w-10">
              <Bell className="h-4 w-4" />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-red-500 text-white border-0">
                  {notifications}
                </Badge>
              )}
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="relative overflow-hidden h-10 w-10"
            >
              <motion.div
                initial={false}
                animate={{
                  rotate: theme === "dark" ? 0 : 180,
                  scale: theme === "dark" ? 1 : 1,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative w-4 h-4"
              >
                {theme === "dark" ? (
                  <Moon className="w-4 h-4 text-primary absolute inset-0" />
                ) : (
                  <Sun className="w-4 h-4 text-primary absolute inset-0" />
                )}
              </motion.div>
            </Button>

            {/* Profile */}
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        {/* Main Content - Centered */}
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-2xl"
          >
            {/* Enhanced Power Status Card */}
            <InteractiveCard
              className={`relative overflow-hidden bg-gradient-to-br ${themeColors.bg} border-2 ${themeColors.border} shadow-2xl ${themeColors.shadow}`}
            >
              <CardContent className="p-12 text-center">
                {/* Animated Background Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${themeColors.bg} opacity-50 animate-pulse`} />

                <div className="relative z-10">
                  {/* Power Icon */}
                  <div className="flex items-center justify-center mb-8">
                    <div className="relative">
                      <div
                        className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl`}
                        style={{
                          background:
                            powerStatus === "on"
                              ? `linear-gradient(135deg, ${themeColors.icon}, ${themeColors.icon}dd)`
                              : `linear-gradient(135deg, ${themeColors.icon}, ${themeColors.icon}dd)`,
                          boxShadow: `0 0 40px ${themeColors.icon}40`,
                        }}
                      >
                        {powerStatus === "on" ? (
                          <Zap className="w-16 h-16 text-white" />
                        ) : (
                          <ZapOff className="w-16 h-16 text-white" />
                        )}
                      </div>
                      <div
                        className="absolute inset-0 rounded-full animate-ping"
                        style={{ backgroundColor: `${themeColors.icon}30` }}
                      />
                    </div>
                  </div>

                  {/* Status Text */}
                  <div className="space-y-4">
                    <h2 className={`text-5xl font-bold ${themeColors.text} mb-4`}>
                      Power is {powerStatus === "on" ? "ON" : "OFF"}
                    </h2>
                    <p className="text-xl text-muted-foreground mb-8">
                      {powerStatus === "on"
                        ? "Electricity is currently available in your area"
                        : "Power outage reported in your area"}
                    </p>

                    {/* Action Button */}
                    <Button
                      onClick={() => setShowStatusModal(true)}
                      size="lg"
                      className="gap-3 px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Zap className="w-5 h-5" />
                      Report Power Status
                    </Button>
                  </div>

                  {/* Stats Row */}
                  <div className="flex items-center justify-center gap-8 mt-12 pt-8 border-t border-border/50">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="w-5 h-5" />
                      <span className="font-medium">89 active reporters</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-5 h-5" />
                      <span className="font-medium">Updated {lastUpdate}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </InteractiveCard>

            {/* Quick Access Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-3 gap-4 mt-8"
            >
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
            </motion.div>
          </motion.div>
        </div>
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
