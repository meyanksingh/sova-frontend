"use client"

import { useTheme } from "next-themes"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { date: "2024-03-01", pnl: 1500, nifty: 22450 },
  { date: "2024-03-02", pnl: 1200, nifty: 22500 },
  { date: "2024-03-03", pnl: 1800, nifty: 22550 },
  { date: "2024-03-04", pnl: 1600, nifty: 22480 },
  { date: "2024-03-05", pnl: 2000, nifty: 22600 },
  { date: "2024-03-06", pnl: 1900, nifty: 22580 },
  { date: "2024-03-07", pnl: 2200, nifty: 22650 },
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
            dataKey="date"
            stroke={isDark ? "hsl(var(--muted-foreground))" : "#9e9e9e"}
            fontSize={12}
            tickFormatter={(value) => new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
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

