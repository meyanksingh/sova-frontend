"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { date: "2023-01-01", value: 1000 },
  { date: "2023-02-01", value: 1050 },
  { date: "2023-03-01", value: 1100 },
  { date: "2023-04-01", value: 1075 },
  { date: "2023-05-01", value: 1150 },
  { date: "2023-06-01", value: 1200 },
]

export default function PerformanceChart() {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

