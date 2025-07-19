"use client"

import { motion } from "framer-motion"
import { InteractiveCard } from "@/components/interactive-card"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Settings,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  CreditCard,
  MapPin,
  Smartphone,
  Globe,
  Moon,
  Sun,
  Zap,
  Award,
  Users,
  MessageSquare,
  Star,
  ChevronRight,
} from "lucide-react"
import { useTheme } from "@/components/theme-provider"

export default function MorePage() {
  const { theme, setTheme } = useTheme()

  const userStats = {
    streak: 12,
    credits: 2450,
    reports: 156,
    accuracy: 95,
    rank: 8,
    level: "Gold Reporter",
  }

  const menuSections = [
    {
      title: "Account",
      items: [
        { icon: User, label: "Profile Settings", description: "Manage your personal information", action: () => {} },
        {
          icon: CreditCard,
          label: "Billing & Credits",
          description: "View credits and payment history",
          badge: "2,450",
          action: () => {},
        },
        { icon: MapPin, label: "Location Settings", description: "Update your area and preferences", action: () => {} },
      ],
    },
    {
      title: "Preferences",
      items: [
        {
          icon: Bell,
          label: "Notifications",
          description: "Configure alert preferences",
          toggle: true,
          action: () => {},
        },
        { icon: Smartphone, label: "Mobile Settings", description: "App behavior and offline mode", action: () => {} },
        {
          icon: Globe,
          label: "Language & Region",
          description: "Change language and regional settings",
          value: "English (US)",
          action: () => {},
        },
      ],
    },
    {
      title: "Community",
      items: [
        {
          icon: Users,
          label: "Community Guidelines",
          description: "Learn about reporting standards",
          action: () => {},
        },
        {
          icon: MessageSquare,
          label: "Feedback & Support",
          description: "Send feedback or get help",
          action: () => {},
        },
        { icon: Star, label: "Rate the App", description: "Help us improve PowerGrid", action: () => {} },
      ],
    },
    {
      title: "Security & Privacy",
      items: [
        { icon: Shield, label: "Privacy Settings", description: "Control your data and privacy", action: () => {} },
        {
          icon: Settings,
          label: "Advanced Settings",
          description: "Developer options and diagnostics",
          action: () => {},
        },
      ],
    },
    {
      title: "Support",
      items: [
        { icon: HelpCircle, label: "Help Center", description: "FAQs and troubleshooting", action: () => {} },
        {
          icon: LogOut,
          label: "Sign Out",
          description: "Log out of your account",
          destructive: true,
          action: () => {},
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pt-20 lg:pt-24 pb-20">
      <div className="max-w-4xl mx-auto p-4 lg:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">Settings & More</h1>
          <p className="text-lg text-muted-foreground">Manage your account and app preferences</p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <InteractiveCard>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="h-16 w-16 border-2 border-primary/20">
                  <AvatarImage src="/placeholder.svg?height=64&width=64&text=JD" />
                  <AvatarFallback className="text-lg">JD</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-1">John Doe</h2>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{userStats.level}</Badge>
                    <Badge variant="outline">Rank #{userStats.rank}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Member since January 2024</p>
                </div>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <User className="w-4 h-4" />
                  Edit Profile
                </Button>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Zap className="w-4 h-4 text-primary" />
                    <span className="text-lg font-bold text-primary">{userStats.streak}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Day Streak</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <CreditCard className="w-4 h-4 text-green-500" />
                    <span className="text-lg font-bold text-green-500">{userStats.credits.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Credits</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <MessageSquare className="w-4 h-4 text-blue-500" />
                    <span className="text-lg font-bold text-blue-500">{userStats.reports}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Reports</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Award className="w-4 h-4 text-yellow-500" />
                    <span className="text-lg font-bold text-yellow-500">{userStats.accuracy}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Accuracy</p>
                </div>
              </div>
            </CardContent>
          </InteractiveCard>
        </motion.div>

        {/* Theme Toggle Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <InteractiveCard>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    {theme === "dark" ? (
                      <Moon className="w-5 h-5 text-primary" />
                    ) : (
                      <Sun className="w-5 h-5 text-primary" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold">Appearance</h3>
                    <p className="text-sm text-muted-foreground">
                      Currently using {theme === "dark" ? "dark" : "light"} mode
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="gap-2"
                >
                  {theme === "dark" ? (
                    <>
                      <Sun className="w-4 h-4" />
                      Light Mode
                    </>
                  ) : (
                    <>
                      <Moon className="w-4 h-4" />
                      Dark Mode
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </InteractiveCard>
        </motion.div>

        {/* Menu Sections */}
        <div className="space-y-6">
          {menuSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + sectionIndex * 0.1 }}
            >
              <InteractiveCard>
                <CardHeader>
                  <CardTitle className="text-lg">{section.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {section.items.map((item, itemIndex) => (
                    <div key={item.label}>
                      <div
                        className={`flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors cursor-pointer ${
                          item.destructive ? "hover:bg-red-500/10" : ""
                        }`}
                        onClick={item.action}
                      >
                        <div className={`p-2 rounded-lg ${item.destructive ? "bg-red-500/10" : "bg-muted"}`}>
                          <item.icon
                            className={`w-5 h-5 ${item.destructive ? "text-red-500" : "text-muted-foreground"}`}
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-medium ${item.destructive ? "text-red-500" : ""}`}>{item.label}</h4>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {item.badge && (
                            <Badge variant="secondary" className="text-xs">
                              {item.badge}
                            </Badge>
                          )}
                          {item.value && <span className="text-sm text-muted-foreground">{item.value}</span>}
                          {item.toggle ? (
                            <Switch defaultChecked />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                      {itemIndex < section.items.length - 1 && <Separator />}
                    </div>
                  ))}
                </CardContent>
              </InteractiveCard>
            </motion.div>
          ))}
        </div>

        {/* App Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 text-center text-sm text-muted-foreground"
        >
          <p>PowerGrid v1.2.0</p>
          <p>© 2024 PowerGrid. All rights reserved.</p>
        </motion.div>
      </div>
    </div>
  )
}
