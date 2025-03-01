"use client"

import { useState } from "react"
import { Bell, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { MarketTicker } from "@/components/market-ticker"
import { MarketNews } from "@/components/market-news"
import { Sidebar } from "@/components/sidebar"
import { DailyPerformanceChart } from "@/components/daily-performance-chart"
import InvestmentData from "@/components/investment-data"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function DashboardPage() {
  const { theme, setTheme } = useTheme()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [currentView, setCurrentView] = useState("dashboard")

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
      <Sidebar
        onNavigate={setCurrentView}
        currentView={currentView}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className={`transition-all duration-300 ${isSidebarOpen ? "md:ml-64" : "md:ml-16"}`}>
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 max-w-screen-2xl items-center">
            <div className="mr-4 hidden md:flex">
              <a className="mr-6 flex items-center space-x-2" href="/">
                <span className="hidden font-bold sm:inline-block">Sova Terminal</span>
              </a>
            </div>
            <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
              <div className="w-full flex-1 md:w-auto md:flex-none">{/* Add search here if needed */}</div>
              <nav className="flex items-center space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-4 w-4" />
                      <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-600" />
                      <span className="sr-only">Toggle notifications</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>No new notifications</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/avatars/01.png" alt="John Doe" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </nav>
            </div>
          </div>
        </header>

        <div className="container max-w-screen-2xl mt-4">
          <MarketTicker />
        </div>

        <main className="container max-w-screen-2xl p-4 md:p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-1.5">
                    <p className="text-sm font-medium text-muted-foreground text-primary">{metric.title}</p>
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
      </div>
    </div>
  )
}

