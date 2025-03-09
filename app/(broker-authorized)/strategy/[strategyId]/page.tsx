"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect } from "react"
import StrategyDetails from "@/components/StrategyDetails"
import VMLogsViewer from "@/components/VMLogsViewer"
import PerformanceChart from "@/components/PerformanceChart"
import StrategyActions from "@/components/StrategyActions"
import RecentTrades from "@/components/RecentTrades"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BrokerAuthWrapper } from "../../broker-auth-wrapper"
import { useStrategy } from "@/context/StrategyContext"
import { mockStrategies } from "@/app/(authorized)/marketplace/page" // Import the mock data for fallback

export default function StrategyPage() {
  const params = useParams()
  const router = useRouter()
  const strategyId = params.strategyId as string
  const { selectedStrategy } = useStrategy()

  // Fallback to the mock data if no strategy is selected from the marketplace
  // Find the strategy in the mock data that matches the ID
  const fallbackStrategy = mockStrategies.find(s => s.id === strategyId)

  // Use the selected strategy or fallback to mock data if not found
  const strategyData = selectedStrategy || fallbackStrategy || {
    id: strategyId,
    name: "Unknown Strategy",
    description: "Strategy details not available",
    category: "Unknown",
    is_active: false,
    // Add default values for other required fields
    // ...
  }

  // Format the strategy data for the StrategyDetails component
  const formattedStrategyData = {
    id: strategyData.id,
    name: strategyData.name,
    description: strategyData.description,
    category: strategyData.category,
    parameters: [
      { name: "Return (3m)", value: `${strategyData.three_months_return}%` },
      { name: "Sharpe (3m)", value: strategyData.three_months_sharpe },
      { name: "Max Drawdown (3m)", value: `${strategyData.three_months_max_drawdown}%` },
    ],
    performance: {
      totalReturn: `${strategyData.one_year_return}%`,
      sharpeRatio: strategyData.one_year_sharpe,
      maxDrawdown: `${strategyData.one_year_max_drawdown}%`,
    },
    status: strategyData.is_active ? "Active" : "Inactive",
  }

  return (
    <div className="min-h-screen bg-background px-4">
      <BrokerAuthWrapper>
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4 mt-7 mx-4">
          <h3 className="text-2xl font-bold text-primary lg:mb-0">{formattedStrategyData.name}</h3>
          <StrategyActions status={formattedStrategyData.status} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
          <Card className="bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <PerformanceChart />
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Strategy Information</CardTitle>
            </CardHeader>
            <CardContent>
              <StrategyDetails strategy={formattedStrategyData} />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
          <Card className="bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg">
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

          <Card className="bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg">
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
