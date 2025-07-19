"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "@/components/theme-provider"
import { Home, Map, BarChart3, MoreHorizontal, Sun, Moon, Zap, Bell, User, MapPin } from "lucide-react"

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/map", label: "Map", icon: Map },
  { href: "/stats", label: "Stats", icon: BarChart3 },
  { href: "/more", label: "More", icon: MoreHorizontal },
]

export function TopNavigation() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [notifications] = useState(3)

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="hidden lg:flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50"
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex items-center gap-3"
      >
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
          className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10"
        >
          <Zap className="h-6 w-6 text-primary" />
        </motion.div>
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            PowerGrid
          </h1>
          <p className="text-xs text-muted-foreground">Track Your Power</p>
        </div>
      </motion.div>

      {/* Navigation Items */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex items-center gap-2 p-1 rounded-2xl bg-muted/50"
      >
        {navItems.map((item, index) => {
          const isActive = pathname === item.href
          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            >
              <Link href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className={`relative gap-2 px-4 py-2 transition-all duration-300 ${
                    isActive ? "bg-primary text-primary-foreground shadow-lg" : "hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-primary rounded-lg -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Button>
              </Link>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Right Side Actions */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
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
      </motion.div>
    </motion.nav>
  )
}
