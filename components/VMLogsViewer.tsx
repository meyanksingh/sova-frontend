"use client"

import { useState, useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"

// Hardcoded log data
const logData = [
  { timestamp: "2024-01-17 10:00:01", level: "INFO", message: "Strategy initialized" },
  { timestamp: "2024-01-17 10:00:02", level: "DEBUG", message: "Fetching market data for BANKNIFTY" },
  { timestamp: "2024-01-17 10:00:03", level: "INFO", message: "Calculating option chain parameters" },
  { timestamp: "2024-01-17 10:00:04", level: "DEBUG", message: "BANKNIFTY 47500 CE: 150.25, BANKNIFTY 47000 PE: 85.50" },
  { timestamp: "2024-01-17 10:00:05", level: "INFO", message: "Buy signal detected for BANKNIFTY 47500 CE" },
  { timestamp: "2024-01-17 10:00:06", level: "WARNING", message: "Margin requirement exceeds available funds" },
  { timestamp: "2024-01-17 10:00:07", level: "INFO", message: "Placing market order for 25 lots of BANKNIFTY 47500 CE" },
  { timestamp: "2024-01-17 10:00:08", level: "DEBUG", message: "Order sent to broker" },
  { timestamp: "2024-01-17 10:00:09", level: "INFO", message: "Order filled at ₹150.25" },
  { timestamp: "2024-01-17 10:00:10", level: "DEBUG", message: "Updating strategy positions" },
]

export default function VMLogsViewer() {
  const [logs, setLogs] = useState(logData)

  useEffect(() => {
    // Simulate real-time log updates
    const interval = setInterval(() => {
      const strikes = [47000, 47200, 47500, 47800]
      const optionTypes = ["CE", "PE"]
      const strike = strikes[Math.floor(Math.random() * strikes.length)]
      const type = optionTypes[Math.floor(Math.random() * optionTypes.length)]
      const price = (Math.random() * 200 + 50).toFixed(2)
      
      const newLog = {
        timestamp: new Date().toISOString().replace("T", " ").substr(0, 19),
        level: ["INFO", "DEBUG", "WARNING"][Math.floor(Math.random() * 3)],
        message: `BANKNIFTY ${strike} ${type} trading at ₹${price}`,
      }
      setLogs((prevLogs) => [...prevLogs.slice(-99), newLog])
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <ScrollArea className="h-[400px] w-full rounded-md border p-4">
      {logs.map((log, index) => (
        <div key={index} className="mb-1">
          <span className="text-muted-foreground">{log.timestamp}</span>{" "}
          <span className={`font-semibold ${getLogLevelColor(log.level)}`}>[{log.level}]</span>{" "}
          <span>{log.message}</span>
        </div>
      ))}
    </ScrollArea>
  )
}

function getLogLevelColor(level: string) {
  switch (level) {
    case "DEBUG":
      return "text-blue-500"
    case "INFO":
      return "text-green-500"
    case "WARNING":
      return "text-yellow-500"
    case "ERROR":
      return "text-red-500"
    default:
      return "text-muted-foreground"
  }
}
