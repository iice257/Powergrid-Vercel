"use client"

import { motion } from "framer-motion"
import { InteractiveCard } from "@/components/interactive-card"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatsChart } from "@/components/stats-chart"
import { BarChart3, TrendingUp, Zap, Users, Target, Award, MapPin, Clock, Download, Filter } from "lucide-react"
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
} from "recharts"

// Mock data with actual values
const weeklyData = [
  { day: "Mon", uptime: 85, outages: 2, reports: 12, credits: 45, efficiency: 78 },
  { day: "Tue", uptime: 92, outages: 1, reports: 8, credits: 38, efficiency: 85 },
  { day: "Wed", uptime: 78, outages: 3, reports: 15, credits: 52, efficiency: 72 },
  { day: "Thu", uptime: 95, outages: 1, reports: 6, credits: 28, efficiency: 91 },
  { day: "Fri", uptime: 88, outages: 2, reports: 10, credits: 41, efficiency: 82 },
  { day: "Sat", uptime: 91, outages: 1, reports: 7, credits: 33, efficiency: 87 },
  { day: "Sun", uptime: 87, outages: 2, reports: 9, credits: 39, efficiency: 80 },
]

const monthlyData = [
  { month: "Jan", uptime: 82, credits: 1200, reports: 89, accuracy: 91, users: 1150 },
  { month: "Feb", uptime: 85, credits: 1350, reports: 95, accuracy: 93, users: 1200 },
  { month: "Mar", uptime: 78, credits: 1100, reports: 78, accuracy: 89, users: 1180 },
  { month: "Apr", uptime: 91, credits: 1500, reports: 112, accuracy: 95, users: 1300 },
  { month: "May", uptime: 88, credits: 1400, reports: 98, accuracy: 92, users: 1250 },
  { month: "Jun", uptime: 93, credits: 1600, reports: 125, accuracy: 96, users: 1400 },
]

const areaComparison = [
  { name: "Your Area", value: 89, color: "#4ade80" },
  { name: "City Average", value: 76, color: "#f59e0b" },
  { name: "National", value: 68, color: "#ef4444" },
]

const hourlyPattern = [
  { hour: "00", usage: 45, outages: 8, demand: 65 },
  { hour: "04", usage: 32, outages: 12, demand: 45 },
  { hour: "08", usage: 78, outages: 3, demand: 85 },
  { hour: "12", usage: 95, outages: 1, demand: 98 },
  { hour: "16", usage: 88, outages: 2, demand: 92 },
  { hour: "20", usage: 92, outages: 1, demand: 95 },
]

const detailedReports = [
  {
    id: 1,
    date: "2024-01-15",
    time: "14:30",
    location: "Ikeja GRA",
    status: "Outage",
    duration: "2h 15m",
    reporter: "Sarah K.",
    verified: true,
    credits: 50,
  },
  {
    id: 2,
    date: "2024-01-15",
    time: "16:45",
    location: "Victoria Island",
    status: "Restored",
    duration: "N/A",
    reporter: "Mike O.",
    verified: true,
    credits: 25,
  },
  {
    id: 3,
    date: "2024-01-14",
    time: "09:20",
    location: "Lekki Phase 1",
    status: "Outage",
    duration: "4h 30m",
    reporter: "Ada M.",
    verified: false,
    credits: 0,
  },
  {
    id: 4,
    date: "2024-01-14",
    time: "13:50",
    location: "Surulere",
    status: "Restored",
    duration: "N/A",
    reporter: "John D.",
    verified: true,
    credits: 25,
  },
  {
    id: 5,
    date: "2024-01-13",
    time: "11:15",
    location: "Yaba",
    status: "Outage",
    duration: "1h 45m",
    reporter: "Grace L.",
    verified: true,
    credits: 40,
  },
  {
    id: 6,
    date: "2024-01-13",
    time: "19:30",
    location: "Ikoyi",
    status: "Restored",
    duration: "N/A",
    reporter: "David A.",
    verified: true,
    credits: 25,
  },
  {
    id: 7,
    date: "2024-01-12",
    time: "08:45",
    location: "Gbagada",
    status: "Outage",
    duration: "3h 20m",
    reporter: "Kemi R.",
    verified: true,
    credits: 45,
  },
  {
    id: 8,
    date: "2024-01-12",
    time: "15:10",
    location: "Ajah",
    status: "Restored",
    duration: "N/A",
    reporter: "Tunde B.",
    verified: false,
    credits: 0,
  },
]

const areaPerformance = [
  { area: "Ikeja", uptime: 89, reports: 156, activeUsers: 89, avgResponse: "12m", reliability: 94 },
  { area: "Victoria Island", uptime: 92, reports: 134, activeUsers: 67, avgResponse: "8m", reliability: 96 },
  { area: "Lekki", uptime: 85, reports: 189, activeUsers: 112, avgResponse: "15m", reliability: 91 },
  { area: "Surulere", uptime: 78, reports: 98, activeUsers: 45, avgResponse: "18m", reliability: 87 },
  { area: "Yaba", uptime: 91, reports: 145, activeUsers: 78, avgResponse: "10m", reliability: 93 },
  { area: "Ikoyi", uptime: 94, reports: 87, activeUsers: 34, avgResponse: "7m", reliability: 97 },
]

const mapAreas = [
  { id: 1, name: "Ikeja", x: 30, y: 40, status: "on", uptime: 89, reports: 156 },
  { id: 2, name: "Victoria Island", x: 60, y: 70, status: "on", uptime: 92, reports: 134 },
  { id: 3, name: "Lekki", x: 80, y: 85, status: "off", uptime: 85, reports: 189 },
  { id: 4, name: "Surulere", x: 45, y: 55, status: "on", uptime: 78, reports: 98 },
  { id: 5, name: "Yaba", x: 35, y: 65, status: "on", uptime: 91, reports: 145 },
  { id: 6, name: "Ikoyi", x: 55, y: 75, status: "on", uptime: 94, reports: 87 },
  { id: 7, name: "Gbagada", x: 25, y: 80, status: "off", uptime: 76, reports: 67 },
  { id: 8, name: "Ajah", x: 90, y: 90, status: "on", uptime: 88, reports: 123 },
]

const achievements = [
  { title: "Streak Master", description: "12 day reporting streak", icon: "🔥", earned: true, date: "2024-01-10" },
  { title: "Community Hero", description: "100+ verified reports", icon: "🏆", earned: true, date: "2024-01-05" },
  { title: "Early Bird", description: "First to report 10 times", icon: "🌅", earned: false, date: null },
  { title: "Night Owl", description: "Report after midnight 5 times", icon: "🦉", earned: true, date: "2023-12-28" },
  { title: "Accuracy Expert", description: "95%+ accuracy rate", icon: "🎯", earned: true, date: "2024-01-08" },
  { title: "Social Connector", description: "50+ report interactions", icon: "🤝", earned: false, date: null },
]

const correlationData = [
  { temperature: 25, outages: 2, demand: 65 },
  { temperature: 28, outages: 3, demand: 72 },
  { temperature: 32, outages: 5, demand: 85 },
  { temperature: 35, outages: 8, demand: 95 },
  { temperature: 38, outages: 12, demand: 98 },
  { temperature: 30, outages: 4, demand: 78 },
  { temperature: 27, outages: 2, demand: 68 },
]

export default function StatsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pt-20 lg:pt-24 pb-20">
      <div className="max-w-7xl mx-auto p-4 lg:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">Analytics Dashboard</h1>
              <p className="text-lg text-muted-foreground">Comprehensive insights into power grid performance</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="gap-2 bg-transparent">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
              <Button className="gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Main Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <InteractiveCard>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-primary" />
                Power Trends Overview
              </CardTitle>
              <CardDescription>Monthly power statistics and comprehensive trends</CardDescription>
            </CardHeader>
            <CardContent>
              <StatsChart />
            </CardContent>
          </InteractiveCard>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <InteractiveCard>
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
          </InteractiveCard>

          <InteractiveCard>
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
          </InteractiveCard>

          <InteractiveCard>
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
          </InteractiveCard>

          <InteractiveCard>
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
          </InteractiveCard>
        </motion.div>

        {/* Detailed Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="detailed">Detailed</TabsTrigger>
              <TabsTrigger value="map">Map View</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <InteractiveCard>
                  <CardHeader>
                    <CardTitle>Weekly Performance</CardTitle>
                    <CardDescription>Power availability and efficiency trends</CardDescription>
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
                            <linearGradient id="efficiencyGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                              <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
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
                          <Area
                            type="monotone"
                            dataKey="efficiency"
                            stroke="#06b6d4"
                            strokeWidth={2}
                            fill="url(#efficiencyGradient)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </InteractiveCard>

                <InteractiveCard>
                  <CardHeader>
                    <CardTitle>Reports & Credits</CardTitle>
                    <CardDescription>Your weekly contribution and earnings</CardDescription>
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
                          <Bar dataKey="credits" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </InteractiveCard>
              </div>

              <InteractiveCard>
                <CardHeader>
                  <CardTitle>24-Hour Power Pattern</CardTitle>
                  <CardDescription>Power usage and outage patterns throughout the day</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={hourlyPattern}>
                        <XAxis dataKey="hour" />
                        <YAxis />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(0,0,0,0.8)",
                            border: "none",
                            borderRadius: "12px",
                            color: "white",
                          }}
                        />
                        <Line type="monotone" dataKey="usage" stroke="#22c55e" strokeWidth={2} />
                        <Line type="monotone" dataKey="outages" stroke="#ef4444" strokeWidth={2} />
                        <Line type="monotone" dataKey="demand" stroke="#f59e0b" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </InteractiveCard>
            </TabsContent>

            <TabsContent value="detailed" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <InteractiveCard>
                  <CardHeader>
                    <CardTitle>Monthly Trends</CardTitle>
                    <CardDescription>Long-term performance analysis</CardDescription>
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
                </InteractiveCard>

                <InteractiveCard>
                  <CardHeader>
                    <CardTitle>Temperature vs Outages</CardTitle>
                    <CardDescription>Correlation analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart data={correlationData}>
                          <XAxis dataKey="temperature" name="Temperature" unit="°C" />
                          <YAxis dataKey="outages" name="Outages" />
                          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                          <Scatter dataKey="outages" fill="#ef4444" />
                        </ScatterChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </InteractiveCard>
              </div>

              <InteractiveCard>
                <CardHeader>
                  <CardTitle>Area Performance Comparison</CardTitle>
                  <CardDescription>Detailed metrics across different areas</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Area</TableHead>
                        <TableHead>Uptime</TableHead>
                        <TableHead>Reports</TableHead>
                        <TableHead>Active Users</TableHead>
                        <TableHead>Avg Response</TableHead>
                        <TableHead>Reliability</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {areaPerformance.map((area) => (
                        <TableRow key={area.area}>
                          <TableCell className="font-medium">{area.area}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress value={area.uptime} className="w-16 h-2" />
                              <span className="text-sm">{area.uptime}%</span>
                            </div>
                          </TableCell>
                          <TableCell>{area.reports}</TableCell>
                          <TableCell>{area.activeUsers}</TableCell>
                          <TableCell>{area.avgResponse}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                area.reliability > 95 ? "default" : area.reliability > 90 ? "secondary" : "destructive"
                              }
                            >
                              {area.reliability}%
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </InteractiveCard>
            </TabsContent>

            <TabsContent value="map" className="space-y-6">
              <InteractiveCard>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-6 h-6 text-primary" />
                    Lagos Power Grid Map
                  </CardTitle>
                  <CardDescription>Real-time power status across different areas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative h-96 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl overflow-hidden mb-6">
                    <svg viewBox="0 0 400 300" className="w-full h-full">
                      <defs>
                        <pattern id="mapGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(79, 172, 254, 0.1)" strokeWidth="1" />
                        </pattern>
                        <filter id="glow">
                          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                          <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#mapGrid)" />

                      {/* Lagos outline */}
                      <path
                        d="M50,100 Q100,80 150,90 Q200,85 250,95 Q300,90 350,100 Q340,150 320,180 Q280,200 240,190 Q200,195 160,185 Q120,180 80,160 Q60,140 50,100 Z"
                        fill="rgba(79, 172, 254, 0.1)"
                        stroke="rgba(79, 172, 254, 0.3)"
                        strokeWidth="2"
                      />

                      {mapAreas.map((area) => (
                        <g key={area.id}>
                          <circle
                            cx={area.x * 4}
                            cy={area.y * 3}
                            r={area.status === "on" ? "8" : "6"}
                            fill={area.status === "on" ? "#22c55e" : "#ef4444"}
                            filter="url(#glow)"
                            className={area.status === "on" ? "animate-pulse" : ""}
                          />
                          <text
                            x={area.x * 4}
                            y={area.y * 3 + 20}
                            textAnchor="middle"
                            className="text-xs fill-current"
                            fontSize="10"
                          >
                            {area.name}
                          </text>
                          <text
                            x={area.x * 4}
                            y={area.y * 3 + 32}
                            textAnchor="middle"
                            className="text-xs fill-current opacity-70"
                            fontSize="8"
                          >
                            {area.uptime}%
                          </text>
                        </g>
                      ))}
                    </svg>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {mapAreas.map((area) => (
                      <div key={area.id} className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                          <div
                            className={`w-3 h-3 rounded-full ${area.status === "on" ? "bg-green-500" : "bg-red-500"}`}
                          />
                          <span className="font-medium text-sm">{area.name}</span>
                        </div>
                        <div className="space-y-1 text-xs text-muted-foreground">
                          <div>Uptime: {area.uptime}%</div>
                          <div>Reports: {area.reports}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </InteractiveCard>
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <InteractiveCard>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-6 h-6 text-primary" />
                    Detailed Report History
                  </CardTitle>
                  <CardDescription>Complete log of all power status reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Reporter</TableHead>
                        <TableHead>Verified</TableHead>
                        <TableHead>Credits</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {detailedReports.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell>{report.date}</TableCell>
                          <TableCell>{report.time}</TableCell>
                          <TableCell>{report.location}</TableCell>
                          <TableCell>
                            <Badge variant={report.status === "Outage" ? "destructive" : "default"}>
                              {report.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{report.duration}</TableCell>
                          <TableCell>{report.reporter}</TableCell>
                          <TableCell>
                            {report.verified ? (
                              <Badge variant="secondary">✓ Verified</Badge>
                            ) : (
                              <Badge variant="outline">Pending</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <span
                              className={report.credits > 0 ? "text-green-500 font-medium" : "text-muted-foreground"}
                            >
                              {report.credits > 0 ? `+${report.credits}` : "0"}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </InteractiveCard>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              <InteractiveCard>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-6 h-6 text-primary" />
                    Your Achievements
                  </CardTitle>
                  <CardDescription>Unlock badges by contributing to the community</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {achievements.map((achievement, index) => (
                      <motion.div
                        key={achievement.title}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          achievement.earned
                            ? "border-primary bg-primary/5 shadow-lg"
                            : "border-muted bg-muted/20 opacity-60"
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-3xl mb-2">{achievement.icon}</div>
                          <h3 className="font-semibold mb-1">{achievement.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                          {achievement.earned ? (
                            <div className="space-y-1">
                              <Badge className="mb-1" variant="default">
                                Earned
                              </Badge>
                              <p className="text-xs text-muted-foreground">{achievement.date}</p>
                            </div>
                          ) : (
                            <Badge variant="outline">Locked</Badge>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </InteractiveCard>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
