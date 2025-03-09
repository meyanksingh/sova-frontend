import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BankNiftyOptionChain } from "@/components/analytics/BankNiftyOptionChain"
import { IndiaVIX } from "@/components/analytics/IndiaVIX"
import { PCRCard } from "@/components/analytics/PCRCard"
import { ATMStraddlePrice } from "@/components/analytics/ATMStraddlePrice"
import { TechnicalIndicators } from "@/components/analytics/TechnicalIndicators"
import { StraddleOptionChain } from "@/components/analytics/StraddleOptionChain"
import AuthorizedLayout from "../AuthorizedLayout"

export default function AnalyticsPage() {
  return (
    <AuthorizedLayout>
    <div className="container mx-auto p-6 space-y-4">

      {/* Compact metrics row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <IndiaVIX compact={true} />
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <ATMStraddlePrice compact={true} />
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <PCRCard compact={true} />
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-col items-center">
              <div className="text-sm font-medium text-muted-foreground mb-1">Market Breadth</div>
              <div className="text-xl font-bold">1.25</div>
              <div className="text-xs text-green-500 mt-1">+0.15</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main content area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left column - Option Chains */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader className="py-3 px-4">
              <CardTitle className="text-base font-medium">Nifty Straddle Option Chain</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 pt-0">
              <StraddleOptionChain />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="py-3 px-4">
              <CardTitle className="text-base font-medium">Bank Nifty Option Chain</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 pt-0">
              <BankNiftyOptionChain />
            </CardContent>
          </Card>
        </div>

        {/* Right column - Technical Indicators */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="py-3 px-4">
              <CardTitle className="text-base font-medium">Technical Indicators</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 pt-0">
              <TechnicalIndicators />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="py-3 px-4">
              <CardTitle className="text-base font-medium">Options Activity</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 pt-0">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Call Volume</span>
                  <span className="font-medium">1.25M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Put Volume</span>
                  <span className="font-medium">1.05M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Call OI</span>
                  <span className="font-medium">5.8M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Put OI</span>
                  <span className="font-medium">4.9M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Max Pain</span>
                  <span className="font-medium">19,500</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </AuthorizedLayout>
  )
}

