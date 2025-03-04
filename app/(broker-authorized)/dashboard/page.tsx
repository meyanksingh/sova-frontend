"use client"


import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MarketNews } from "@/components/market-news"
import { DailyPerformanceChart } from "@/components/daily-performance-chart"
import InvestmentData from "@/components/investment-data"
import AuthorizedLayout from "../AuthorizedLayout"

export default function DashboardPage() {


  const metrics = [
    {
      title: "Mark to Market",
      value: "₹2,45,678",
      change: "+12.5%",
      changeText: "from last month",
      isPositive: true,
    },
    {
      title: "Percentage Returns",
      value: "18.75%",
      change: "+2.3%",
      changeText: "from last month",
      isPositive: true,
    },
    {
      title: "Active Strategies",
      value: "7",
      change: "2",
      changeText: "pending execution",
      isPositive: true,
    },
    {
      title: "Value at Risk (VaR)",
      value: "₹32,450",
      change: "-5.2%",
      changeText: "from yesterday",
      isPositive: false,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <AuthorizedLayout>
        <main className="container max-w-screen-2xl p-4 md:p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-1.5">
                    <p className="text-sm font-medium text-primary">{metric.title}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-bold">{metric.value}</p>
                      <div
                        className={`flex items-center text-sm ${metric.isPositive ? "text-green-500" : "text-red-500"}`}
                      >
                        <span>{metric.change}</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{metric.changeText}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-primary">Daily Performance Chart</h3>
                <DailyPerformanceChart />
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-primary">Market News</h3>
                  <Button variant="ghost" className="text-sm text-primary">
                    View All
                  </Button>
                </div>
                <MarketNews newsCount={5} />
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
      </AuthorizedLayout>
    </div>
  )
}

