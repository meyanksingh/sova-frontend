"use client"

import { useParams } from "next/navigation"
import StrategyDetails from "@/components/StrategyDetails"
import VMLogsViewer from "@/components/VMLogsViewer"
import PerformanceChart from "@/components/PerformanceChart"
import StrategyActions from "@/components/StrategyActions"
import RecentTrades from "@/components/RecentTrades"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BrokerAuthWrapper } from "../../broker-auth-wrapper"

// Hardcoded strategy data
const strategyData = {
  id: "123456",
  name: "Moving Average Crossover",
  description: "A strategy that uses two moving averages to determine trend direction and potential entry/exit points.",
  category: "Trend Following",
  parameters: [
    { name: "Short MA Period", value: 10 },
    { name: "Long MA Period", value: 50 },
    { name: "Asset", value: "AAPL" },
  ],
  performance: {
    totalReturn: "15.2%",
    sharpeRatio: 1.8,
    maxDrawdown: "-8.5%",
  },
  status: "Active",
}

export default function StrategyPage() {
  const params = useParams()
  const strategyId = params.strategyId as string

  return (
    <div className="min-h-screen bg-background px-4"> {/* Added left and right padding to the page */}
      <BrokerAuthWrapper>
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4 mt-7 mx-4"> {/* Added margin left and right */}
          <h3 className="text-2xl font-bold text-primary  lg:mb-0">{strategyData.name}</h3>
          <StrategyActions status={strategyData.status} /> {/* Fixed syntax error by closing the component */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
          <Card className="bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg"> {/* Removed extra padding */}
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <PerformanceChart />
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg"> {/* Removed extra padding */}
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Strategy Information</CardTitle>
            </CardHeader>
            <CardContent>
              <StrategyDetails strategy={strategyData} />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
          <Card className="bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg"> {/* Removed extra padding */}
            <CardHeader>
              <CardTitle className="text-xl font-semibold">VM Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="logs" className="w-full">
                <TabsList>
                  <TabsTrigger value="logs">Logs</TabsTrigger>
                  <TabsTrigger value="metrics">Metrics</TabsTrigger>
                </TabsList>
                <TabsContent value="logs">
                  <VMLogsViewer />
                </TabsContent>
                <TabsContent value="metrics">
                  <div className="text-muted-foreground">Metrics visualization coming soon...</div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg"> {/* Removed extra padding */}
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Recent Trades</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentTrades />
            </CardContent>
          </Card>
        </div>
      </BrokerAuthWrapper>
    </div>
  )
}
