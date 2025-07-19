"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { useTheme } from "@/components/theme-provider"
import { Home, Map, BarChart3, MoreHorizontal, Sun, Moon, Zap, Award } from "lucide-react"

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/map", label: "Map", icon: Map },
  { href: "/stats", label: "Stats", icon: BarChart3 },
  { href: "/more", label: "More", icon: MoreHorizontal },
]

export function DesktopSidebar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [notifications] = useState(3)

  const userStats = {
    streak: 12,
    credits: 2450,
    reports: 156,
    accuracy: 95,
    rank: 8,
    level: "Gold Reporter",
  }

  return (
    <motion.aside
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="hidden lg:flex fixed left-0 top-0 h-full w-64 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-r flex-col z-40"
    >
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-xl">⚡</span>
          </div>
          <div>
            <h1 className="font-bold text-xl">PowerGrid</h1>
            <p className="text-xs text-muted-foreground">Power Tracking</p>
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-6 border-b">
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-12 w-12 border-2 border-primary/20">
            <AvatarImage src="/placeholder.svg?height=48&width=48&text=JD" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold">John Doe</h3>
            <div className="flex items-center gap-1">
              <Badge variant="secondary" className="text-xs">
                {userStats.level}
              </Badge>
              <span className="text-xs text-muted-foreground">#{userStats.rank}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="text-center p-2 rounded-lg bg-muted/50">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Zap className="w-3 h-3 text-primary" />
              <span className="text-sm font-bold text-primary">{userStats.streak}</span>
            </div>
            <p className="text-xs text-muted-foreground">Streak</p>
          </div>
          <div className="text-center p-2 rounded-lg bg-muted/50">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Award className="w-3 h-3 text-green-500" />
              <span className="text-sm font-bold text-green-500">{userStats.credits}</span>
            </div>
            <p className="text-xs text-muted-foreground">Credits</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span>Accuracy</span>
            <span className="font-semibold">{userStats.accuracy}%</span>
          </div>
          <Progress value={userStats.accuracy} className="h-1.5" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href
            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
              >
                <Link href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={`w-full justify-start gap-3 h-11 transition-all duration-300 ${
                      isActive ? "bg-primary text-primary-foreground shadow-lg" : "hover:bg-muted"
                    }`}
                  >
                    <div className="relative">
                      <item.icon className="h-5 w-5" />
                      {item.label === "More" && notifications > 0 && (
                        <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-xs bg-red-500 text-white border-0">
                          {notifications}
                        </Badge>
                      )}
                    </div>
                    <span className="font-medium">{item.label}</span>
                  </Button>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </nav>

      {/* Theme Toggle */}
      <div className="p-4 border-t">
        <Button
          variant="outline"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="w-full gap-2 bg-transparent"
        >
          <motion.div
            initial={false}
            animate={{ rotate: theme === "dark" ? 180 : 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </motion.div>
          <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
        </Button>
      </div>

      {/* Footer */}
      <div className="p-4 border-t">
        <div className="text-center text-xs text-muted-foreground">
          <p>PowerGrid v1.2.0</p>
          <p>© 2024 PowerGrid</p>
        </div>
      </div>
    </motion.aside>
  )
}
