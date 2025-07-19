"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Home, Map, BarChart3, MoreHorizontal } from "lucide-react"

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/map", label: "Map", icon: Map },
  { href: "/stats", label: "Stats", icon: BarChart3 },
  { href: "/more", label: "More", icon: MoreHorizontal },
]

export function BottomNavigation() {
  const pathname = usePathname()
  const [notifications] = useState(3)

  return (
    <motion.nav
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t"
    >
      <div className="flex items-center justify-around p-2">
        {navItems.map((item, index) => {
          const isActive = pathname === item.href
          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
            >
              <Link href={item.href}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`flex flex-col gap-1 h-16 w-16 p-2 transition-all duration-300 ${
                    isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-primary"
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
                  <span className="text-xs font-medium">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeMobileTab"
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-primary rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Button>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </motion.nav>
  )
}
