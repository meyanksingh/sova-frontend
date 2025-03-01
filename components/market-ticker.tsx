"use client"

import { ArrowUpIcon, ArrowDownIcon } from "lucide-react"
import { useEffect, useState } from "react"

const initialData = [
  { name: "NIFTY", value: 22456.8, change: 0.75 },
  { name: "SENSEX", value: 73876.45, change: 0.68 },
  { name: "BANKNIFTY", value: 48234.2, change: -0.32 },
  { name: "USDINR", value: 83.25, change: -0.15 },
  { name: "GOLD", value: 72450.0, change: 1.25 },
  { name: "CRUDEOIL", value: 6780.5, change: 2.1 },
]

export function MarketTicker() {
  const [marketData, setMarketData] = useState(initialData)

  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData((prevData) =>
        prevData.map((item) => ({
          ...item,
          value: item.value + (Math.random() - 0.5) * (item.value * 0.001),
          change: item.change + (Math.random() - 0.5) * 0.05,
        })),
      )
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-lg overflow-hidden border border-border/40">
      <div className="flex overflow-x-auto whitespace-nowrap scrollbar-hide">
        {marketData.map((item, index) => (
          <div key={item.name} className="inline-flex items-center px-6 py-2 border-r last:border-r-0 border-border/40">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-muted-foreground text-primary">{item.name}</span>
              <div className="flex items-center space-x-2">
                <span className="font-semibold tabular-nums">{item.value.toFixed(2)}</span>
                <span className={`flex items-center text-sm ${item.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {item.change >= 0 ? (
                    <ArrowUpIcon className="h-3 w-3 mr-0.5" />
                  ) : (
                    <ArrowDownIcon className="h-3 w-3 mr-0.5" />
                  )}
                  <span className="tabular-nums">{Math.abs(item.change).toFixed(2)}%</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

