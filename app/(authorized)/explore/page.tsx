import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TopGainers } from "@/components/market/TopGainers"
import { TopLosers } from "@/components/market/TopLosers"
import { StocksInNews } from "@/components/market/StocksInNews"
import { ETFAndGold } from "@/components/market/ETFAndGold"
import { MarketOverview } from "@/components/market/MarketOverview"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AuthorizedLayout from "../AuthorizedLayout"


export default function MarketPage() {
  return (
    <AuthorizedLayout>
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Market Explorer</h1>

      {/* Top Gainers and Losers Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Top Gainers</CardTitle>
          </CardHeader>
          <CardContent>
            <TopGainers compact={true} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Top Losers</CardTitle>
          </CardHeader>
          <CardContent>
            <TopLosers compact={true} />
          </CardContent>
        </Card>
      </div>

      {/* Market Overview Section */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Market Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <MarketOverview />
        </CardContent>
      </Card>

      {/* Tabbed Sections */}
      <Tabs defaultValue="news" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="news">Stocks in News</TabsTrigger>
          <TabsTrigger value="etf">ETF & Gold</TabsTrigger>
        </TabsList>
        <TabsContent value="news" className="mt-4">
          <StocksInNews />
        </TabsContent>
        <TabsContent value="etf" className="mt-4">
          <ETFAndGold />
        </TabsContent>
      </Tabs>
    </div>
    </AuthorizedLayout>
  )
}

