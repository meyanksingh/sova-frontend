"use client"

import { useState, useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"

// Hardcoded log data
const logData = [
  { timestamp: "2023-06-01 10:00:01", level: "INFO", message: "Strategy initialized" },
  { timestamp: "2023-06-01 10:00:02", level: "DEBUG", message: "Fetching market data for AAPL" },
  { timestamp: "2023-06-01 10:00:03", level: "INFO", message: "Calculating moving averages" },
  { timestamp: "2023-06-01 10:00:04", level: "DEBUG", message: "Short MA: 150.25, Long MA: 148.75" },
  { timestamp: "2023-06-01 10:00:05", level: "INFO", message: "Buy signal detected" },
  { timestamp: "2023-06-01 10:00:06", level: "WARNING", message: "Insufficient funds for full position" },
  { timestamp: "2023-06-01 10:00:07", level: "INFO", message: "Placing market order for 10 shares of AAPL" },
  { timestamp: "2023-06-01 10:00:08", level: "DEBUG", message: "Order sent to broker" },
  { timestamp: "2023-06-01 10:00:09", level: "INFO", message: "Order filled at $150.50" },
  { timestamp: "2023-06-01 10:00:10", level: "DEBUG", message: "Updating strategy state" },
]

export default function VMLogsViewer() {
  const [logs, setLogs] = useState(logData)

  useEffect(() => {
    // Simulate real-time log updates
    const interval = setInterval(() => {
      const newLog = {
        timestamp: new Date().toISOString().replace("T", " ").substr(0, 19),
        level: ["INFO", "DEBUG", "WARNING"][Math.floor(Math.random() * 3)],
        message: `Log message ${Math.floor(Math.random() * 1000)}`,
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

