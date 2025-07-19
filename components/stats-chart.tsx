"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const powerData = [
  { time: "00:00", status: 85, outages: 2 },
  { time: "04:00", status: 92, outages: 1 },
  { time: "08:00", status: 78, outages: 4 },
  { time: "12:00", status: 95, outages: 0 },
  { time: "16:00", status: 88, outages: 2 },
  { time: "20:00", status: 82, outages: 3 },
  { time: "24:00", status: 90, outages: 1 },
]

export function StatsChart() {
  return (
    <Card className="neon-glow">
      <CardHeader>
        <CardTitle>Power Status Trends</CardTitle>
        <CardDescription>24-hour power availability in your area</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            status: {
              label: "Power Status %",
              color: "hsl(var(--primary))",
            },
            outages: {
              label: "Outages",
              color: "hsl(var(--destructive))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={powerData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="time" className="text-xs" />
              <YAxis className="text-xs" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="status"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
