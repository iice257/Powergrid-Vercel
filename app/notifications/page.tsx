"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { InteractiveCard } from "@/components/interactive-card"
import { CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Zap, ZapOff, Clock, MapPin } from "lucide-react"

export default function NotificationsPage() {
  const [realTimeAlerts, setRealTimeAlerts] = useState(true)

  const notifications = [
    {
      id: 1,
      type: "outage",
      title: "Power outage in Ikeja",
      description: "Power has gone off",
      time: "2m ago",
      location: "Ikeja",
      icon: ZapOff,
      color: "text-red-500",
    },
    {
      id: 2,
      type: "restored",
      title: "Power restored in Victoria Island",
      description: "Power is back on",
      time: "15m ago",
      location: "Victoria Island",
      icon: Zap,
      color: "text-emerald-500",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-900 text-white pt-20 pb-20">
      <div className="p-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold mb-2">Notifications</h1>
        </motion.div>

        {/* Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6"
        >
          <InteractiveCard className="bg-slate-800 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-white">Real-time alerts</h3>
                  <p className="text-sm text-slate-400">Get notified about power availability.</p>
                </div>
                <Switch checked={realTimeAlerts} onCheckedChange={setRealTimeAlerts} />
              </div>
            </CardContent>
          </InteractiveCard>
        </motion.div>

        {/* Notifications List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          {notifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            >
              <InteractiveCard className="bg-slate-800 border-slate-700">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center`}>
                      <notification.icon className={`w-5 h-5 ${notification.color}`} />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-medium text-white mb-1">{notification.title}</h3>
                      <p className="text-sm text-slate-400 mb-2">{notification.description}</p>

                      <div className="flex items-center space-x-4 text-xs text-slate-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{notification.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{notification.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </InteractiveCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
