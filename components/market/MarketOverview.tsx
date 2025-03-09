"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpIcon, ArrowDownIcon, TrendingUp, TrendingDown, BarChart2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const indexData = [
  {
    name: "NIFTY 50",
    value: 19567.25,
    change: 125.3,
    percentChange: 0.65,
    dayRange: { low: 19425.1, high: 19589.45 },
    advances: 32,
    declines: 18,
  },
  {
    name: "SENSEX",
    value: 65432.1,
    change: 387.45,
    percentChange: 0.58,
    dayRange: { low: 65120.25, high: 65498.75 },
    advances: 21,
    declines: 9,
  },
  {
    name: "NIFTY BANK",
    value: 45678.9,
    change: -156.7,
    percentChange: -0.34,
    dayRange: { low: 45567.8, high: 45890.15 },
    advances: 4,
    declines: 8,
  },
  {
    name: "NIFTY IT",
    value: 32456.75,
    change: 234.5,
    percentChange: 0.72,
    dayRange: { low: 32345.6, high: 32567.8 },
    advances: 9,
    declines: 1,
  },
]

const sectorPerformance = [
  { name: "IT", change: 1.8 },
  { name: "Pharma", change: 1.2 },
  { name: "FMCG", change: 0.7 },
  { name: "Auto", change: 0.5 },
  { name: "Metal", change: -0.3 },
  { name: "Banking", change: -0.5 },
  { name: "Realty", change: -1.2 },
  { name: "Oil & Gas", change: -1.5 },
]

export function MarketOverview() {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <div className="space-y-4">
      <Tabs defaultValue="indices" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="indices">Market Indices</TabsTrigger>
          <TabsTrigger value="sectors">Sector Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="indices" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left column - Index List */}
            <div className="space-y-3">
              {indexData.map((index, i) => (
                <div
                  key={index.name}
                  className={`flex justify-between items-center p-3 rounded-md cursor-pointer hover:bg-muted/50 ${i === selectedIndex ? "bg-muted/50 border border-muted-foreground/20" : ""}`}
                  onClick={() => setSelectedIndex(i)}
                >
                  <div>
                    <div className="font-medium">{index.name}</div>
                    <div
                      className={`flex items-center text-sm ${index.percentChange >= 0 ? "text-green-500" : "text-red-500"}`}
                    >
                      {index.percentChange >= 0 ? (
                        <ArrowUpIcon className="h-3 w-3 mr-1" />
                      ) : (
                        <ArrowDownIcon className="h-3 w-3 mr-1" />
                      )}
                      {index.percentChange >= 0 ? "+" : ""}
                      {index.percentChange.toFixed(2)}%
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{index.value.toFixed(2)}</div>
                    <div className={`text-sm ${index.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                      {index.change >= 0 ? "+" : ""}
                      {index.change.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right column - Selected Index Details */}
            <div className="bg-muted/30 p-4 rounded-md">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-bold">{indexData[selectedIndex].name}</h3>
                  <div
                    className={`flex items-center ${indexData[selectedIndex].percentChange >= 0 ? "text-green-500" : "text-red-500"}`}
                  >
                    {indexData[selectedIndex].percentChange >= 0 ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    <span className="font-medium">
                      {indexData[selectedIndex].value.toFixed(2)} (
                      {indexData[selectedIndex].percentChange >= 0 ? "+" : ""}
                      {indexData[selectedIndex].percentChange.toFixed(2)}%)
                    </span>
                  </div>
                </div>
                <BarChart2 className="h-10 w-10 text-primary/50" />
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center text-sm text-muted-foreground mb-1">
                    <span>Day Range</span>
                    <span>
                      {indexData[selectedIndex].dayRange.low.toFixed(2)} -{" "}
                      {indexData[selectedIndex].dayRange.high.toFixed(2)}
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{
                        width: `${
                          ((indexData[selectedIndex].value - indexData[selectedIndex].dayRange.low) /
                            (indexData[selectedIndex].dayRange.high - indexData[selectedIndex].dayRange.low)) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center text-sm mb-1">
                    <span>Advances vs Declines</span>
                    <span>
                      {indexData[selectedIndex].advances} : {indexData[selectedIndex].declines}
                    </span>
                  </div>
                  <div className="flex h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-green-500"
                      style={{
                        width: `${
                          (indexData[selectedIndex].advances /
                            (indexData[selectedIndex].advances + indexData[selectedIndex].declines)) *
                          100
                        }%`,
                      }}
                    ></div>
                    <div
                      className="bg-red-500"
                      style={{
                        width: `${
                          (indexData[selectedIndex].declines /
                            (indexData[selectedIndex].advances + indexData[selectedIndex].declines)) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-muted/50 p-3 rounded-md text-center">
                    <div className="text-sm text-muted-foreground">Volume</div>
                    <div className="font-medium">₹12,345 Cr</div>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-md text-center">
                    <div className="text-sm text-muted-foreground">Open Interest</div>
                    <div className="font-medium">₹8,765 Cr</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="sectors" className="mt-4">
          <div className="space-y-4">
            {sectorPerformance.map((sector) => (
              <div key={sector.name} className="flex items-center space-x-4">
                <div className="w-24 font-medium">{sector.name}</div>
                <Progress
                  value={50 + sector.change * 10}
                  className={`h-2 flex-1 ${sector.change >= 0 ? "bg-muted" : "bg-muted"}`}
                />
                <div className={`w-16 text-right ${sector.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {sector.change >= 0 ? "+" : ""}
                  {sector.change.toFixed(1)}%
                </div>
              </div>
            ))}

            <div className="bg-muted/30 p-4 rounded-md mt-6">
              <h3 className="font-medium mb-2">Sector Insights</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>IT sector leading gains on strong Q1 results and positive global cues</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Pharma stocks rally on FDA approvals and export growth</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Oil & Gas under pressure due to crude price volatility</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Banking stocks decline on margin pressure concerns</span>
                </li>
              </ul>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

