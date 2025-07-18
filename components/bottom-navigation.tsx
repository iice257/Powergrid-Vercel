"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Home, Map, BarChart3, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const tabs = [
  { id: "home", label: "Home", icon: Home, href: "/" },
  { id: "map", label: "Map", icon: Map, href: "/map" },
  { id: "stats", label: "Stats", icon: BarChart3, href: "/stats" },
  { id: "more", label: "More", icon: Menu, href: "/more" },
]

export function BottomNavigation() {
  const pathname = usePathname()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("home")

  const handleTabPress = (tab: (typeof tabs)[0]) => {
    setActiveTab(tab.id)
    router.push(tab.href)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = pathname === tab.href

          return (
            <motion.button
              key={tab.id}
              onClick={() => handleTabPress(tab)}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground",
              )}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{tab.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                />
              )}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
