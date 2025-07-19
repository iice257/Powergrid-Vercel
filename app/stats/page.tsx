"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatsChart } from "@/components/stats-chart"
import { BarChart3, TrendingUp, Zap, Users, Target } from "lucide-react"
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Mock data
const weeklyData = [
  { day: "Mon", uptime: 85, outages: 2, reports: 12 },
  { day: "Tue", uptime: 92, outages: 1, reports: 8 },
  { day: "Wed", uptime: 78, outages: 3, reports: 15 },
  { day: "Thu", uptime: 95, outages: 1, reports: 6 },
  { day: "Fri", uptime: 88, outages: 2, reports: 10 },
  { day: "Sat", uptime: 91, outages: 1, reports: 7 },
  { day: "Sun", uptime: 87, outages: 2, reports: 9 },
]

const monthlyData = [
  { month: "Jan", uptime: 82, credits: 1200 },
  { month: "Feb", uptime: 85, credits: 1350 },
  { month: "Mar", uptime: 78, credits: 1100 },
  { month: "Apr", uptime: 91, credits: 1500 },
  { month: "May", uptime: 88, credits: 1400 },
  { month: "Jun", uptime: 93, credits: 1600 },
]

const areaComparison = [
  { name: "Your Area", value: 89, color: "#4ade80" },
  { name: "City Average", value: 76, color: "#f59e0b" },
  { name: "National", value: 68, color: "#ef4444" },
]

export default function StatsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pt-20">
      <div className="max-w-7xl mx-auto p-4 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-lg text-muted-foreground">Detailed insights into power grid performance</p>
        </div>

        {/* Main Chart - Moved to Top */}
        <div className="mb-8">
          <Card className="rounded-3xl glass-card border-primary/10 shadow-xl neon-glow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-primary" />
                Power Trends Overview
              </CardTitle>
              <CardDescription>Monthly power statistics and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <StatsChart />
            </CardContent>
          </Card>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="rounded-3xl glass-card border-primary/10 shadow-xl neon-glow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Zap className="w-8 h-8 text-primary" />
                <Badge className="bg-green-500/20 text-green-400">+12%</Badge>
              </div>
              <div className="space-y-2">
                <p className="text-2xl font-bold">89%</p>
                <p className="text-sm text-muted-foreground">Average Uptime</p>
                <Progress value={89} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl glass-card border-primary/10 shadow-xl neon-glow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="w-8 h-8 text-green-500" />
                <Badge className="bg-blue-500/20 text-blue-400">This Month</Badge>
              </div>
              <div className="space-y-2">
                <p className="text-2xl font-bold">2,450</p>
                <p className="text-sm text-muted-foreground">Credits Earned</p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl glass-card border-primary/10 shadow-xl neon-glow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Users className="w-8 h-8 text-purple-500" />
                <Badge className="bg-purple-500/20 text-purple-400">Rank #8</Badge>
              </div>
              <div className="space-y-2">
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-muted-foreground">Reports Submitted</p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl glass-card border-primary/10 shadow-xl neon-glow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Target className="w-8 h-8 text-yellow-500" />
                <Badge className="bg-yellow-500/20 text-yellow-400">12 Days</Badge>
              </div>
              <div className="space-y-2">
                <p className="text-2xl font-bold">95%</p>
                <p className="text-sm text-muted-foreground">Accuracy Rate</p>
                <Progress value={95} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analytics */}
        <Tabs defaultValue="weekly" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 glass-card">
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
          </TabsList>

          <TabsContent value="weekly" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="rounded-3xl glass-card border-primary/10 shadow-xl neon-glow-card">
                <CardHeader>
                  <CardTitle>Weekly Uptime</CardTitle>
                  <CardDescription>Power availability throughout the week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={weeklyData}>
                        <defs>
                          <linearGradient id="uptimeGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4ade80" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#4ade80" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="day" axisLine={false} tickLine={false} />
                        <YAxis hide />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(0,0,0,0.8)",
                            border: "none",
                            borderRadius: "12px",
                            color: "white",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="uptime"
                          stroke="#4ade80"
                          strokeWidth={3}
                          fill="url(#uptimeGradient)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-3xl glass-card border-primary/10 shadow-xl neon-glow-card">
                <CardHeader>
                  <CardTitle>Reports Submitted</CardTitle>
                  <CardDescription>Your contribution to the community</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={weeklyData}>
                        <XAxis dataKey="day" axisLine={false} tickLine={false} />
                        <YAxis hide />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(0,0,0,0.8)",
                            border: "none",
                            borderRadius: "12px",
                            color: "white",
                          }}
                        />
                        <Bar dataKey="reports" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="monthly" className="space-y-6">
            <Card className="rounded-3xl glass-card border-primary/10 shadow-xl neon-glow-card">
              <CardHeader>
                <CardTitle>Monthly Performance</CardTitle>
                <CardDescription>Long-term trends and patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyData}>
                      <defs>
                        <linearGradient id="monthlyGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="month" axisLine={false} tickLine={false} />
                      <YAxis hide />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(0,0,0,0.8)",
                          border: "none",
                          borderRadius: "12px",
                          color: "white",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="uptime"
                        stroke="#8b5cf6"
                        strokeWidth={3}
                        fill="url(#monthlyGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-6">
            <Card className="rounded-3xl glass-card border-primary/10 shadow-xl neon-glow-card">
              <CardHeader>
                <CardTitle>Performance Comparison</CardTitle>
                <CardDescription>How you compare to others</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center mb-6">
                  <div className="w-64 h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={areaComparison}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={120}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {areaComparison.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {areaComparison.map((item) => (
                    <div key={item.name} className="text-center">
                      <div className="w-4 h-4 rounded-full mx-auto mb-2" style={{ backgroundColor: item.color }} />
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xl font-bold" style={{ color: item.color }}>
                        {item.value}%
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
