"use client";

import { useMarketData } from "@/context/MarketDataContext";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { Marquee } from "./magicui/marquee";

export function MarketTicker() {
  const { marketData } = useMarketData();

  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s] border">
        {[...marketData, ...marketData].map((item) => (
          <div key={item.name} className="flex items-center p-2">
            <span className="font-bold mr-2 text-primary">{item.name}</span>
            <span className="mr-2">
              {item.value.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
            <span
              className={`flex items-center w-fit ${
                item.change >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {item.change >= 0 ? (
                <ArrowUpIcon className="w-4 h-4 mr-1" />
              ) : (
                <ArrowDownIcon className="w-4 h-4 mr-1" />
              )}
              <span>{Math.abs(item.change)}%</span>
            </span>
          </div>
        ))}
      </Marquee>
    </div>
  );
}
