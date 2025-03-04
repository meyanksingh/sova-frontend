"use client"

import { Card, CardContent } from "@/components/ui/card"
import { MarketNews } from "@/components/market-news"
import { DailyPerformanceChart } from "@/components/daily-performance-chart"
import InvestmentData from "@/components/investment-data"
import { BrokerAuthWrapper } from "../broker-auth-wrapper"

export default function DashboardPage() {
  const metrics = [
    {
      title: "Total Portfolio Value",
      value: "₹1,234,567",
      change: "+2.5%",
      trend: "up",
    },
    {
      title: "Day's P&L",
      value: "₹12,345",
      change: "+1.2%",
      trend: "up",
    },
    {
      title: "Open Positions",
      value: "5",
      change: "2 new",
      trend: "neutral",
    },
    {
      title: "Available Margin",
      value: "₹345,678",
      change: "-0.5%",
      trend: "down",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <BrokerAuthWrapper>
        <main className="container max-w-screen-2xl p-4 md:p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold">{metric.value}</h3>
                      <span className={`text-sm ${metric.trend === 'up' ? 'text-green-500' : metric.trend === 'down' ? 'text-red-500' : 'text-yellow-500'}`}>
                        {metric.change}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-primary">Daily Performance</h3>
                <DailyPerformanceChart />
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-primary">Market News</h3>
                <MarketNews />
              </CardContent>
            </Card>
          </div>

          <Card className="bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-primary">FII Investment Data (₹ Crore)</h3>
              <InvestmentData />
            </CardContent>
          </Card>
        </main>
      </BrokerAuthWrapper>
    </div>
  )
}

