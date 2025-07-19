"use client"

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, Legend } from "recharts"

const data = [
  { month: "Jan", uptime: 82, outages: 18, reports: 89, efficiency: 78 },
  { month: "Feb", uptime: 85, outages: 15, reports: 95, efficiency: 82 },
  { month: "Mar", uptime: 78, outages: 22, reports: 78, efficiency: 75 },
  { month: "Apr", uptime: 91, outages: 9, reports: 112, efficiency: 88 },
  { month: "May", uptime: 88, outages: 12, reports: 98, efficiency: 85 },
  { month: "Jun", uptime: 93, outages: 7, reports: 125, efficiency: 91 },
]

export function StatsChart() {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="uptimeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4ade80" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#4ade80" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="outagesGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="reportsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "currentColor" }} />
          <YAxis hide />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(0,0,0,0.8)",
              border: "none",
              borderRadius: "12px",
              color: "white",
            }}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="uptime"
            stackId="1"
            stroke="#4ade80"
            strokeWidth={2}
            fill="url(#uptimeGradient)"
            name="Uptime %"
          />
          <Area
            type="monotone"
            dataKey="reports"
            stackId="2"
            stroke="#06b6d4"
            strokeWidth={2}
            fill="url(#reportsGradient)"
            name="Reports"
          />
          <Area
            type="monotone"
            dataKey="outages"
            stackId="3"
            stroke="#ef4444"
            strokeWidth={2}
            fill="url(#outagesGradient)"
            name="Outages"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
