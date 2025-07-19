"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { InteractiveCard } from "@/components/interactive-card"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  User,
  Settings,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  CreditCard,
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
  Camera,
  Save,
  Edit,
} from "lucide-react"
import { useTheme } from "@/components/theme-provider"

export default function MorePage() {
  const { theme, setTheme } = useTheme()
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+234 801 234 5678",
    bio: "Power grid enthusiast and community reporter",
    location: "Lagos, Ikeja",
  })

  // Check if we should scroll to profile section
  useEffect(() => {
    if (window.location.hash === "#profile") {
      const profileSection = document.getElementById("profile-section")
      if (profileSection) {
        profileSection.scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [])

  const userStats = {
    streak: 12,
    credits: 2450,
    reports: 156,
    accuracy: 95,
    rank: 8,
    level: "Gold Reporter",
  }

  const handleProfileSave = () => {
    setIsEditingProfile(false)
    // Here you would typically save to backend
    console.log("Profile saved:", profileData)
  }

  const menuSections = [
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

        {/* Profile Settings Card */}
        <motion.div
          id="profile-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <InteractiveCard>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Profile Settings
                </CardTitle>
                <Button
                  variant={isEditingProfile ? "default" : "outline"}
                  onClick={() => (isEditingProfile ? handleProfileSave() : setIsEditingProfile(true))}
                  className="gap-2"
                >
                  {isEditingProfile ? (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  ) : (
                    <>
                      <Edit className="w-4 h-4" />
                      Edit Profile
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Picture Section */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="h-20 w-20 border-2 border-primary/20">
                    <AvatarImage src="/placeholder.svg?height=80&width=80&text=JD" />
                    <AvatarFallback className="text-xl">JD</AvatarFallback>
                  </Avatar>
                  {isEditingProfile && (
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{userStats.level}</Badge>
                    <Badge variant="outline">Rank #{userStats.rank}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Member since January 2024</p>
                </div>
              </div>

              {/* Profile Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    disabled={!isEditingProfile}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    disabled={!isEditingProfile}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    disabled={!isEditingProfile}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profileData.location}
                    onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                    disabled={!isEditingProfile}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  disabled={!isEditingProfile}
                  rows={3}
                />
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t">
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
