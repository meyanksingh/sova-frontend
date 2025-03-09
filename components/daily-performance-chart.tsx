"use client"

import { useTheme } from "next-themes"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { time: "09:15", pnl: 0, nifty: 22450 },
  { time: "10:00", pnl: -200, nifty: 22480 },
  { time: "11:00", pnl: 800, nifty: 22500 },
  { time: "12:00", pnl: 300, nifty: 22520 },
  { time: "13:00", pnl: 1500, nifty: 22550 },
  { time: "14:00", pnl: 1800, nifty: 22580 },
  { time: "15:00", pnl: 1500, nifty: 22600 },
  { time: "15:30", pnl: 2200, nifty: 22650 },
]

export function DailyPerformanceChart() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "hsl(var(--border))" : "#e0e0e0"} opacity={0.4} />
          <XAxis
            dataKey="time"
            stroke={isDark ? "hsl(var(--muted-foreground))" : "#9e9e9e"}
            fontSize={12}
          />
          <YAxis yAxisId="left" stroke={isDark ? "hsl(var(--muted-foreground))" : "#9e9e9e"} fontSize={12} />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke={isDark ? "hsl(var(--muted-foreground))" : "#9e9e9e"}
            fontSize={12}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? "hsl(var(--card))" : "#fff",
              border: "1px solid hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
            labelStyle={{
              color: isDark ? "hsl(var(--foreground))" : "#000",
            }}
            formatter={(value: number) => [`₹${value.toLocaleString()}`, ""]}
          />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="pnl"
            name="P&L"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="nifty"
            name="Nifty"
            stroke={isDark ? "hsl(var(--success))" : "#22c55e"}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
