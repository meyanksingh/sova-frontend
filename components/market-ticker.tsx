"use client"

import { useMarketData } from "@/context/MarketDataContext";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react"

export function MarketTicker() {
  const { marketData } = useMarketData();
  return (
      <div className="rounded-lg overflow-hidden border bg-background">
        <div className={`flex whitespace-nowrap p-4`}>
          {marketData.map((item, index) => (
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
