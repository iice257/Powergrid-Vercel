"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Bell, Zap, MapPin, Clock, Settings } from "lucide-react"

const notifications = [
  {
    id: 1,
    type: "outage",
    title: "Power outage in Ikeja",
    description: "Power has gone off",
    time: "2 minutes ago",
    area: "Ikeja",
    status: "new",
  },
  {
    id: 2,
    type: "restoration",
    title: "Power restored in Victoria Island",
    description: "Power is back on",
    time: "1 hour ago",
    area: "Victoria Island",
    status: "read",
  },
  {
    id: 3,
    type: "outage",
    title: "Power outage in Yaba",
    description: "Multiple reports of power outage",
    time: "3 hours ago",
    area: "Yaba",
    status: "read",
  },
]

export default function NotificationsPage() {
  const [realTimeAlerts, setRealTimeAlerts] = useState(true)

  return (
    <div className="min-h-screen bg-slate-900 text-white pb-20 lg:pb-0">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur border-b border-slate-800">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-2xl font-bold">Notifications</h1>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Settings */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-emerald-500" />
                  <div>
                    <h3 className="font-semibold">Real-time alerts</h3>
                    <p className="text-sm text-slate-400">Get notified about power availability.</p>
                  </div>
                </div>
                <Switch checked={realTimeAlerts} onCheckedChange={setRealTimeAlerts} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className={`border-slate-700 ${notification.status === "new" ? "bg-slate-800" : "bg-slate-800/50"}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-2 rounded-full ${
                        notification.type === "outage"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-emerald-500/20 text-emerald-400"
                      }`}
                    >
                      {notification.type === "outage" ? <Zap className="h-4 w-4" /> : <Zap className="h-4 w-4" />}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{notification.title}</h3>
                        {notification.status === "new" && (
                          <Badge className="bg-emerald-500 text-white text-xs">New</Badge>
                        )}
                      </div>
                      <p className="text-slate-400 text-sm mb-2">{notification.description}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {notification.time}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {notification.area}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {notifications.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <Bell className="h-12 w-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-400 mb-2">No notifications yet</h3>
            <p className="text-slate-500">You'll see power updates and alerts here</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
