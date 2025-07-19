"use client"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Home, Map, BarChart3, Settings, Zap, Trophy, Users, Bell, HelpCircle, LogOut } from "lucide-react"

const navigationItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Community Grid", href: "/map", icon: Map },
  { name: "Analytics", href: "/stats", icon: BarChart3 },
  { name: "Settings", href: "/more", icon: Settings },
]

const quickStats = [
  { label: "Current Streak", value: "12 days", icon: Trophy, color: "text-yellow-500" },
  { label: "Today's Uptime", value: "89%", icon: Zap, color: "text-green-500" },
  { label: "Community Rank", value: "#8", icon: Users, color: "text-primary" },
]

export function DesktopSidebar() {
  const pathname = usePathname()

  return (
    <div className="h-full flex flex-col p-6">
      {/* Logo & Brand */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
          <Zap className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">PowerGrid</h1>
          <p className="text-xs text-muted-foreground">Lagos Power Tracker</p>
        </div>
      </div>

      {/* User Profile */}
      <div className="flex items-center gap-3 p-4 rounded-2xl glass-card mb-8">
        <Avatar className="h-12 w-12 ring-2 ring-primary/20">
          <AvatarImage src="/placeholder.svg?height=48&width=48&text=A" />
          <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-bold">
            A
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="font-semibold text-foreground">Alex Johnson</p>
          <p className="text-xs text-muted-foreground">Power Tracker Pro</p>
        </div>
        <Badge variant="secondary" className="bg-primary/20 text-primary border-0 text-xs">
          2.4K
        </Badge>
      </div>

      {/* Quick Stats */}
      <div className="space-y-3 mb-8">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Quick Stats</h3>
        {quickStats.map((stat) => (
          <div key={stat.label} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors">
            <stat.icon className={`w-5 h-5 ${stat.color}`} />
            <div className="flex-1">
              <p className="text-sm font-medium">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Navigation</h3>
        {navigationItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          )
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="space-y-2 pt-6 border-t border-border/50">
        <Button variant="ghost" className="w-full justify-start gap-3 h-12">
          <Bell className="w-5 h-5" />
          Notifications
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-3 h-12">
          <HelpCircle className="w-5 h-5" />
          Help & Support
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 h-12 text-red-500 hover:text-red-400 hover:bg-red-500/10"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}
