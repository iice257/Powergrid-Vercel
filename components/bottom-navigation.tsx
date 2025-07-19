"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Zap, Map, BarChart3, MoreHorizontal, Sun, Moon, Bell } from "lucide-react"
import { useTheme } from "next/themes"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export function BottomNavigation() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme() || { theme: "dark", setTheme: () => {} }
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const navItems = [
    { href: "/", icon: Zap, label: "Home" },
    { href: "/map", icon: Map, label: "Map" },
    { href: "/stats", icon: BarChart3, label: "Stats" },
    { href: "/more", icon: MoreHorizontal, label: "More" },
  ]

  if (!mounted) return null

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed bottom-0 left-0 right-0 z-50"
    >
      <div className="mx-4 mb-4">
        <div className="bg-background/90 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl shadow-black/20">
          <div className="flex items-center justify-between px-2 py-2">
            {/* Navigation Items */}
            <div className="flex items-center gap-1 flex-1">
              {navItems.map((item, index) => {
                const isActive = pathname === item.href
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className="flex-1"
                  >
                    <Link href={item.href} className="block">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`
                          w-full h-12 flex flex-col gap-1 p-2 transition-all duration-300 relative
                          ${
                            isActive
                              ? "text-primary bg-primary/10"
                              : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                          }
                        `}
                      >
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="relative">
                          <item.icon className="h-5 w-5" />
                          {isActive && (
                            <motion.div
                              layoutId="mobileActiveTab"
                              className="absolute inset-0 bg-primary/20 rounded-full -z-10"
                              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                          )}
                        </motion.div>
                        <span className="text-xs font-medium">{item.label}</span>
                      </Button>
                    </Link>
                  </motion.div>
                )
              })}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-1 ml-2">
              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative h-12 w-12 flex flex-col gap-1">
                <Bell className="h-4 w-4" />
                <Badge className="absolute top-1 right-1 h-4 w-4 p-0 text-xs bg-primary">3</Badge>
                <span className="text-xs">Alerts</span>
              </Button>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="h-12 w-12 flex flex-col gap-1"
              >
                {theme === "dark" ? (
                  <>
                    <Sun className="h-4 w-4" />
                    <span className="text-xs">Light</span>
                  </>
                ) : (
                  <>
                    <Moon className="h-4 w-4" />
                    <span className="text-xs">Dark</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
