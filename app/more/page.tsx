"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  User,
  Settings,
  Bell,
  Shield,
  HelpCircle,
  Star,
  Share2,
  LogOut,
  Moon,
  Sun,
  Globe,
  Smartphone,
  Award,
  ChevronRight,
} from "lucide-react"
import { useTheme } from "next/themes"
import { motion } from "framer-motion"

export default function MorePage() {
  const { theme, setTheme } = useTheme() || { theme: "dark", setTheme: () => {} }
  const [notifications, setNotifications] = useState(true)
  const [locationSharing, setLocationSharing] = useState(false)

  const menuItems = [
    {
      category: "Account",
      items: [
        { icon: User, label: "Profile", description: "Manage your account", action: () => {} },
        { icon: Award, label: "Rewards", description: "245 credits available", badge: "245", action: () => {} },
        { icon: Settings, label: "Preferences", description: "App settings", action: () => {} },
      ],
    },
    {
      category: "App Settings",
      items: [
        {
          icon: theme === "dark" ? Moon : Sun,
          label: "Dark Mode",
          description: "Toggle dark theme",
          toggle: true,
          value: theme === "dark",
          action: () => setTheme(theme === "dark" ? "light" : "dark"),
        },
        {
          icon: Bell,
          label: "Notifications",
          description: "Push notifications",
          toggle: true,
          value: notifications,
          action: () => setNotifications(!notifications),
        },
        {
          icon: Shield,
          label: "Location Sharing",
          description: "Share location with reports",
          toggle: true,
          value: locationSharing,
          action: () => setLocationSharing(!locationSharing),
        },
        { icon: Globe, label: "Language", description: "English", action: () => {} },
      ],
    },
    {
      category: "Support",
      items: [
        { icon: HelpCircle, label: "Help & FAQ", description: "Get support", action: () => {} },
        { icon: Star, label: "Rate App", description: "Rate us on app store", action: () => {} },
        { icon: Share2, label: "Share App", description: "Invite friends", action: () => {} },
        { icon: Smartphone, label: "App Version", description: "v1.0.0", action: () => {} },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="p-4 border-b">
        <h1 className="text-2xl font-bold">More</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Profile Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder.svg?height=64&width=64&text=JD" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">John Doe</h3>
                  <p className="text-sm text-muted-foreground">john@example.com</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary">7 day streak</Badge>
                    <Badge variant="outline">245 credits</Badge>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Menu Sections */}
        {menuItems.map((section, sectionIndex) => (
          <motion.div
            key={section.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (sectionIndex + 1) * 0.1 }}
            className="space-y-3"
          >
            <h2 className="text-lg font-semibold text-muted-foreground px-2">{section.category}</h2>

            <Card>
              <CardContent className="p-0">
                {section.items.map((item, index) => (
                  <div key={item.label}>
                    <div
                      className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={item.action}
                    >
                      <div className="p-2 rounded-full bg-muted">
                        <item.icon className="h-4 w-4" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{item.label}</span>
                          {item.badge && (
                            <Badge variant="secondary" className="text-xs">
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>

                      {item.toggle ? (
                        <Switch checked={item.value} onCheckedChange={() => item.action()} />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>

                    {index < section.items.length - 1 && <Separator className="ml-16" />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {/* Sign Out */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Button
            variant="outline"
            className="w-full justify-start gap-2 h-12 text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-900/20 bg-transparent"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </motion.div>

        {/* App Info */}
        <div className="text-center text-sm text-muted-foreground space-y-1 pt-4">
          <p>PowerGrid v1.0.0</p>
          <p>Made with ⚡ for reliable power tracking</p>
        </div>
      </div>
    </div>
  )
}
