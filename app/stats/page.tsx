"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, Zap, Award, Calendar } from "lucide-react"
import { motion } from "framer-motion"

interface StatsData {
  dailyUptime: Array<{ day: string; uptime: number; downtime: number }>
  weeklyTrends: Array<{ week: string; reliability: number }>
  monthlyComparison: Array<{ name: string; value: number; color: string }>
  achievements: Array<{ title: string; description: string; earned: boolean; date?: Date }>
}

export default function StatsPage() {
  const [statsData, setStatsData] = useState<StatsData | null>(null)
  const [selectedPeriod, setSelectedPeriod] = useState("7d")

  useEffect(() => {
    // Simulate loading stats data
    const mockData: StatsData = {
      dailyUptime: [
        { day: "Mon", uptime: 85, downtime: 15 },
        { day: "Tue", uptime: 92, downtime: 8 },
        { day: "Wed", uptime: 78, downtime: 22 },
        { day: "Thu", uptime: 95, downtime: 5 },
        { day: "Fri", uptime: 88, downtime: 12 },
        { day: "Sat", uptime: 91, downtime: 9 },
        { day: "Sun", uptime: 87, downtime: 13 },
      ],
      weeklyTrends: [
        { week: "Week 1", reliability: 82 },
        { week: "Week 2", reliability: 89 },
        { week: "Week 3", reliability: 76 },
        { week: "Week 4", reliability: 91 },
      ],
      monthlyComparison: [
        { name: "Uptime", value: 87, color: "#22c55e" },
        { name: "Downtime", value: 13, color: "#ef4444" },
      ],
      achievements: [
        {
          title: "First Logger",
          description: "Logged your first power status",
          earned: true,
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
        {
          title: "Week Warrior",
          description: "Logged power status for 7 consecutive days",
          earned: true,
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        },
        {
          title: "Community Helper",
          description: "Submit 10 detailed outage reports",
          earned: false,
        },
        {
          title: "Streak Master",
          description: "Maintain a 30-day logging streak",
          earned: false,
        },
      ],
    }

    setTimeout(() => setStatsData(mockData), 500)
  }, [])

  if (!statsData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your stats...</p>
        </div>
      </div>
    )
  }

  const totalUptime = Math.round(
    statsData.dailyUptime.reduce((acc, day) => acc + day.uptime, 0) / statsData.dailyUptime.length,
  )

  const longestStreak = 15 // Mock data
  const totalCredits = 245 // Mock data
  const reliabilityScore = 87 // Mock data

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="p-4 border-b">
        <h1 className="text-2xl font-bold mb-2">Your Stats</h1>
        <p className="text-muted-foreground">Track your power logging journey</p>
      </div>

      <div className="p-4 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">{totalUptime}%</div>
                <div className="text-sm text-muted-foreground">Avg Uptime</div>
                <div className="flex items-center justify-center mt-2 text-xs text-green-600">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +5% vs last week
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">{longestStreak}</div>
                <div className="text-sm text-muted-foreground">Longest Streak</div>
                <div className="flex items-center justify-center mt-2">
                  <Award className="h-3 w-3 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">{totalCredits}</div>
                <div className="text-sm text-muted-foreground">Total Credits</div>
                <div className="flex items-center justify-center mt-2 text-xs text-purple-600">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +25 this week
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600 mb-1">{reliabilityScore}</div>
                <div className="text-sm text-muted-foreground">Reliability Score</div>
                <Progress value={reliabilityScore} className="mt-2" />
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Charts */}
        <Tabs defaultValue="daily" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>

          <TabsContent value="daily">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="h-5 w-5" />
                  Daily Uptime (Last 7 Days)
                </CardTitle>
                <CardDescription>Your power availability throughout the week</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={statsData.dailyUptime}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="uptime" fill="#22c55e" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="weekly">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Weekly Reliability Trends
                </CardTitle>
                <CardDescription>Track your area's power reliability over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={statsData.weeklyTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="reliability"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monthly">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Monthly Overview
                </CardTitle>
                <CardDescription>Overall power availability this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center">
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={statsData.monthlyComparison}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {statsData.monthlyComparison.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 mt-4">
                  {statsData.monthlyComparison.map((entry) => (
                    <div key={entry.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                      <span className="text-sm">
                        {entry.name}: {entry.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Achievements
            </CardTitle>
            <CardDescription>Your milestones and accomplishments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {statsData.achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center gap-3 p-3 rounded-lg border ${
                  achievement.earned
                    ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                    : "bg-muted/50"
                }`}
              >
                <div
                  className={`p-2 rounded-full ${
                    achievement.earned
                      ? "bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-400"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Award className="h-4 w-4" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{achievement.title}</span>
                    {achievement.earned && (
                      <Badge variant="secondary" className="text-xs">
                        Earned
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  {achievement.earned && achievement.date && (
                    <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {achievement.date.toLocaleDateString()}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
