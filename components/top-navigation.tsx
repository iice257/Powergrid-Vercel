"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Zap, Map, BarChart3, MoreHorizontal, MapPin, Sun, Moon, Bell } from "lucide-react"
import { useTheme } from "next/themes"
import { motion } from "framer-motion"

export function TopNavigation() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme() || { theme: "dark", setTheme: () => {} }
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const navItems = [
    { href: "/", icon: Zap, label: "Home", color: "from-cyan-400 to-blue-500" },
    { href: "/map", icon: Map, label: "Map", color: "from-green-400 to-emerald-500" },
    { href: "/stats", icon: BarChart3, label: "Stats", color: "from-purple-400 to-pink-500" },
    { href: "/more", icon: MoreHorizontal, label: "More", color: "from-orange-400 to-red-500" },
  ]

  if (!mounted) return null

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="p-2 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg"
            >
              <Zap className="h-6 w-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                PowerGrid
              </h1>
              <p className="text-xs text-muted-foreground">Track Your Power</p>
            </div>
          </motion.div>

          {/* Navigation Items */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex items-center gap-2"
          >
            {navItems.map((item, index) => {
              const isActive = pathname === item.href
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                >
                  <Link href={item.href}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      size="sm"
                      className={`
                        relative h-10 px-3 transition-all duration-300 group
                        ${
                          isActive
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                            : "hover:bg-primary/10 hover:text-primary"
                        }
                      `}
                    >
                      <div className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        <span className="hidden sm:inline text-sm font-medium">{item.label}</span>
                      </div>

                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-primary rounded-md -z-10"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </Button>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Right Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex items-center gap-3"
          >
            {/* Location */}
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              <Button variant="outline" size="sm" className="gap-2 h-10 bg-transparent">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="hidden md:inline text-sm">Lagos, Ikeja</span>
              </Button>
            </motion.div>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative h-10 w-10">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-primary">3</Badge>
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-10 w-10"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  )
}
