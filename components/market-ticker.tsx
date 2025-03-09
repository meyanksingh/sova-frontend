"use client";

import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { Marquee } from "./magicui/marquee";

const marketData = [
  { name: "NIFTY", value: 22450.75, change: 0.45 },
  { name: "BANKNIFTY", value: 47320.50, change: -0.32 },
  { name: "SENSEX", value: 74125.25, change: 0.28 },
  { name: "FINNIFTY", value: 21840.60, change: -0.15 }
];

export function MarketTicker() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s] border">
        {[...marketData, ...marketData].map((item, index) => (
          <div key={`${item.name}-${index}`} className="flex items-center p-2">
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
