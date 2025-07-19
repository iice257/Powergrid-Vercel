"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { InteractiveCard } from "@/components/interactive-card"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Zap,
  ZapOff,
  MapPin,
  Clock,
  Users,
  Filter,
  Target,
  TrendingUp,
  AlertTriangle,
  Search,
  Plus,
  Star,
  Home,
  Building,
  GraduationCap,
  ShoppingBag,
  Navigation,
  Trash2,
  Save,
} from "lucide-react"

interface SavedLocation {
  id: number
  name: string
  address: string
  type: string
  coordinates: { x: number; y: number }
  isActive: boolean
  isCurrent?: boolean
}

export default function MapPage() {
  const [timeFilter, setTimeFilter] = useState("24h")
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddLocation, setShowAddLocation] = useState(false)
  const [newLocation, setNewLocation] = useState({
    name: "",
    address: "",
    type: "starred",
  })
  const [editingLocation, setEditingLocation] = useState<number | null>(null)

  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>([
    {
      id: 1,
      name: "Current Location",
      address: "Ikeja, Lagos State",
      type: "current",
      coordinates: { x: 80, y: 60 },
      isActive: true,
      isCurrent: true,
    },
    {
      id: 2,
      name: "Work Office",
      address: "Victoria Island, Lagos",
      type: "work",
      coordinates: { x: 180, y: 90 },
      isActive: true,
    },
    {
      id: 3,
      name: "Sister's Shop",
      address: "Lekki Phase 1, Lagos",
      type: "starred",
      coordinates: { x: 220, y: 120 },
      isActive: false,
    },
    {
      id: 4,
      name: "James' House",
      address: "Surulere, Lagos",
      type: "home",
      coordinates: { x: 120, y: 140 },
      isActive: true,
    },
    {
      id: 5,
      name: "University Campus",
      address: "Yaba, Lagos",
      type: "school",
      coordinates: { x: 60, y: 160 },
      isActive: false,
    },
  ])

  const reports = [
    {
      id: 1,
      location: "Ikeja",
      status: "on",
      timestamp: "2 mins ago",
      reporter: "Sarah K.",
      streak: 12,
      reliability: 95,
      coordinates: { x: 80, y: 60 },
    },
    {
      id: 2,
      location: "Victoria Island",
      status: "off",
      timestamp: "15 mins ago",
      reporter: "Mike O.",
      streak: 8,
      reliability: 87,
      coordinates: { x: 180, y: 90 },
    },
    {
      id: 3,
      location: "Lekki",
      status: "on",
      timestamp: "32 mins ago",
      reporter: "Ada M.",
      streak: 23,
      reliability: 92,
      coordinates: { x: 220, y: 120 },
    },
    {
      id: 4,
      location: "Surulere",
      status: "on",
      timestamp: "1 hour ago",
      reporter: "John D.",
      streak: 5,
      reliability: 78,
      coordinates: { x: 120, y: 140 },
    },
    {
      id: 5,
      location: "Yaba",
      status: "off",
      timestamp: "2 hours ago",
      reporter: "Kemi A.",
      streak: 15,
      reliability: 89,
      coordinates: { x: 60, y: 160 },
    },
  ]

  const areaStats = {
    totalReports: 1247,
    activeReporters: 89,
    avgUptime: 89,
    topArea: "Ikeja",
    outageAlerts: 3,
    restoredAreas: 7,
  }

  const locationTypes = [
    { value: "starred", label: "Starred Location", icon: Star, color: "#f59e0b" },
    { value: "home", label: "Home", icon: Home, color: "#22c55e" },
    { value: "work", label: "Work", icon: Building, color: "#3b82f6" },
    { value: "school", label: "School", icon: GraduationCap, color: "#8b5cf6" },
    { value: "shop", label: "Shop", icon: ShoppingBag, color: "#ef4444" },
    { value: "current", label: "Current Location", icon: Navigation, color: "#06b6d4" },
  ]

  const getLocationTypeInfo = (type: string) => {
    return locationTypes.find((t) => t.value === type) || locationTypes[0]
  }

  const filteredReports = reports.filter((report) => {
    if (statusFilter !== "all" && report.status !== statusFilter) return false
    return true
  })

  const filteredLocations = savedLocations.filter(
    (location) =>
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.address.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddLocation = () => {
    if (newLocation.name && newLocation.address) {
      const newId = Math.max(...savedLocations.map((l) => l.id)) + 1
      setSavedLocations([
        ...savedLocations,
        {
          id: newId,
          ...newLocation,
          coordinates: { x: Math.random() * 250 + 25, y: Math.random() * 150 + 25 },
          isActive: true,
        },
      ])
      setNewLocation({ name: "", address: "", type: "starred" })
      setShowAddLocation(false)
    }
  }

  const handleDeleteLocation = (id: number) => {
    setSavedLocations(savedLocations.filter((l) => l.id !== id))
  }

  const toggleLocationActive = (id: number) => {
    setSavedLocations(savedLocations.map((l) => (l.id === id ? { ...l, isActive: !l.isActive } : l)))
  }

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
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">Community Grid Map</h1>
          <p className="text-lg text-muted-foreground">Real-time power updates from your neighbors</p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <InteractiveCard>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-5 h-5 text-primary" />
                <Badge variant="secondary" className="text-xs">
                  Active
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-primary">{areaStats.activeReporters}</p>
                <p className="text-xs text-muted-foreground">reporters online</p>
              </div>
            </CardContent>
          </InteractiveCard>

          <InteractiveCard>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Target className="w-5 h-5 text-green-500" />
                <Badge variant="secondary" className="text-xs">
                  Lagos
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-green-500">{areaStats.avgUptime}%</p>
                <p className="text-xs text-muted-foreground">area uptime</p>
              </div>
            </CardContent>
          </InteractiveCard>

          <InteractiveCard>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <Badge variant="destructive" className="text-xs">
                  Alerts
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-red-500">{areaStats.outageAlerts}</p>
                <p className="text-xs text-muted-foreground">active outages</p>
              </div>
            </CardContent>
          </InteractiveCard>

          <InteractiveCard>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                <Badge variant="secondary" className="text-xs">
                  Today
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-blue-500">{areaStats.restoredAreas}</p>
                <p className="text-xs text-muted-foreground">areas restored</p>
              </div>
            </CardContent>
          </InteractiveCard>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <InteractiveCard>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Grid Heatmap
                  </CardTitle>
                  <Badge variant="outline" className="text-xs">
                    Live Data
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Filters</span>
                  </div>
                  <div className="flex space-x-2">
                    <Select value={timeFilter} onValueChange={setTimeFilter}>
                      <SelectTrigger className="w-24 h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1h">1h</SelectItem>
                        <SelectItem value="24h">24h</SelectItem>
                        <SelectItem value="7d">7d</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-20 h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="on">On</SelectItem>
                        <SelectItem value="off">Off</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Interactive Map */}
                <div className="relative h-96 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl overflow-hidden border">
                  <svg viewBox="0 0 300 200" className="w-full h-full">
                    {/* Grid Background */}
                    <defs>
                      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
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
                    <rect width="100%" height="100%" fill="url(#grid)" />

                    {/* Saved Locations */}
                    {savedLocations
                      .filter((loc) => loc.isActive)
                      .map((location) => {
                        const typeInfo = getLocationTypeInfo(location.type)
                        return (
                          <g key={`saved-${location.id}`}>
                            <circle
                              cx={location.coordinates.x}
                              cy={location.coordinates.y}
                              r="6"
                              fill={typeInfo.color}
                              stroke="#fff"
                              strokeWidth="2"
                              className={location.isCurrent ? "animate-pulse" : ""}
                            />
                            <text
                              x={location.coordinates.x}
                              y={location.coordinates.y - 12}
                              textAnchor="middle"
                              className="text-xs fill-current font-medium"
                            >
                              {location.name}
                            </text>
                          </g>
                        )
                      })}

                    {/* Area Markers */}
                    {filteredReports.map((report) => (
                      <g key={report.id}>
                        <circle
                          cx={report.coordinates.x}
                          cy={report.coordinates.y}
                          r="8"
                          fill={report.status === "on" ? "#22c55e" : "#ef4444"}
                          filter="url(#glow)"
                          className={report.status === "on" ? "animate-pulse" : ""}
                        />
                        <text
                          x={report.coordinates.x}
                          y={report.coordinates.y + 20}
                          textAnchor="middle"
                          className="text-xs fill-current"
                        >
                          {report.location}
                        </text>
                      </g>
                    ))}
                  </svg>

                  {/* Legend */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-background/80 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span>Power ON ({filteredReports.filter((r) => r.status === "on").length})</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span>Power OFF ({filteredReports.filter((r) => r.status === "off").length})</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {filteredReports.length} reports
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </InteractiveCard>
          </motion.div>

          {/* Side Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Saved Locations */}
            <InteractiveCard>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">My Locations</CardTitle>
                  <Dialog open={showAddLocation} onOpenChange={setShowAddLocation}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="gap-2">
                        <Plus className="w-4 h-4" />
                        Add
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Location</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="location-name">Location Name</Label>
                          <Input
                            id="location-name"
                            placeholder="e.g., Sister's Shop, James' House"
                            value={newLocation.name}
                            onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location-address">Address</Label>
                          <Input
                            id="location-address"
                            placeholder="e.g., Lekki Phase 1, Lagos"
                            value={newLocation.address}
                            onChange={(e) => setNewLocation({ ...newLocation, address: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location-type">Location Type</Label>
                          <Select
                            value={newLocation.type}
                            onValueChange={(value) => setNewLocation({ ...newLocation, type: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {locationTypes
                                .filter((t) => t.value !== "current")
                                .map((type) => (
                                  <SelectItem key={type.value} value={type.value}>
                                    <div className="flex items-center gap-2">
                                      <type.icon className="w-4 h-4" style={{ color: type.color }} />
                                      {type.label}
                                    </div>
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" onClick={() => setShowAddLocation(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleAddLocation}>
                            <Save className="w-4 h-4 mr-2" />
                            Save Location
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {/* Search */}
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search locations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {filteredLocations.map((location) => {
                  const typeInfo = getLocationTypeInfo(location.type)
                  return (
                    <div
                      key={location.id}
                      className={`flex items-center space-x-3 p-3 rounded-2xl border transition-colors ${
                        location.isActive
                          ? "bg-card/50 border-primary/20 hover:bg-muted/50"
                          : "bg-muted/30 border-muted hover:bg-muted/50"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center`}
                        style={{ backgroundColor: `${typeInfo.color}20` }}
                      >
                        <typeInfo.icon className="w-5 h-5" style={{ color: typeInfo.color }} />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">{location.name}</span>
                          {location.isCurrent && (
                            <Badge variant="secondary" className="text-xs">
                              Current
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{location.address}</p>
                        <p className="text-xs text-muted-foreground">{typeInfo.label}</p>
                      </div>

                      <div className="flex items-center space-x-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => toggleLocationActive(location.id)}
                        >
                          {location.isActive ? (
                            <MapPin className="w-4 h-4 text-primary" />
                          ) : (
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                          )}
                        </Button>
                        {!location.isCurrent && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500 hover:text-red-600"
                            onClick={() => handleDeleteLocation(location.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </InteractiveCard>

            {/* Recent Reports */}
            <InteractiveCard>
              <CardHeader>
                <CardTitle className="text-lg">Recent Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredReports.slice(0, 4).map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center space-x-3 p-3 rounded-2xl bg-card/50 border border-primary/5 hover:bg-muted/50 transition-colors"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        report.status === "on" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {report.status === "on" ? <Zap className="w-5 h-5" /> : <ZapOff className="w-5 h-5" />}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-3 h-3 text-muted-foreground" />
                        <span className="text-sm font-medium">{report.location}</span>
                        <Badge variant="secondary" className="text-xs">
                          {report.reliability}%
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {report.timestamp} • {report.reporter}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <Badge variant="outline" className="text-xs">
                        {report.streak} days
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </InteractiveCard>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
