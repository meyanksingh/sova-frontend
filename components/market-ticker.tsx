"use client"

import { ArrowUpIcon, ArrowDownIcon } from "lucide-react"
import { useTheme } from "next-themes"

export function MarketTicker() {
  const { theme } = useTheme();
  const marketData = [
    { name: "NIFTY 50", value: 22456.8, change: 0.75 },
    { name: "SENSEX", value: 73876.45, change: 0.68 },
    { name: "BANKNIFTY", value: 48234.2, change: -0.32 },
    { name: "USDINR", value: 83.25, change: -0.15 },
    { name: "GOLD", value: 72450.0, change: 1.25 },
    { name: "CRUDEOIL", value: 6780.5, change: 2.1 },
  ];
  console.log(theme);
  return (
    <div className="rounded-lg overflow-hidden border bg-background">
      <div className={`flex whitespace-nowrap p-4 animate-scroll`}>
        {marketData.concat(marketData).map((item, index) => (
          <div key={index} className="flex items-center px-4">
            <span className="font-bold mr-2 text-primary">{item.name}</span>
            <span className={`mr-2`}>{item.value.toLocaleString()}</span>
            <span className={`flex items-center ${item.change >= 0 ? "text-green-500" : "text-red-500"}`}>
              {item.change >= 0 ? <ArrowUpIcon className="w-4 h-4 mr-1" /> : <ArrowDownIcon className="w-4 h-4 mr-1" />}
              <span>{Math.abs(item.change)}%</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
