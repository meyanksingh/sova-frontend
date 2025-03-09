import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpIcon, ArrowDownIcon, Newspaper } from "lucide-react"

const stocksInNewsData = [
  {
    symbol: "ADANIPORTS",
    name: "Adani Ports & SEZ",
    price: 765.3,
    change: 2.8,
    news: "Adani Ports acquires stake in Colombo port terminal",
    category: "Acquisition",
  },
  {
    symbol: "BHARTIARTL",
    name: "Bharti Airtel Ltd.",
    price: 876.45,
    change: -1.5,
    news: "Airtel announces 5G rollout in 10 more cities",
    category: "Expansion",
  },
  {
    symbol: "TATAMOTORS",
    name: "Tata Motors Ltd.",
    price: 543.2,
    change: 3.2,
    news: "Tata Motors reports 15% growth in Q1 sales",
    category: "Earnings",
  },
  {
    symbol: "ZOMATO",
    name: "Zomato Ltd.",
    price: 123.45,
    change: 5.7,
    news: "Zomato expands quick commerce service to 5 new cities",
    category: "Expansion",
  },
  {
    symbol: "IRCTC",
    name: "Indian Railway Catering",
    price: 654.3,
    change: -2.3,
    news: "IRCTC launches new premium lounge services",
    category: "Service",
  },
  {
    symbol: "YESBANK",
    name: "Yes Bank Ltd.",
    price: 18.75,
    change: 4.5,
    news: "Yes Bank completes fundraising through QIP",
    category: "Finance",
  },
]

export function StocksInNews() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {stocksInNewsData.map((stock) => (
        <Card key={stock.symbol} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">{stock.symbol}</CardTitle>
              <Badge variant="outline">{stock.category}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold">₹{stock.price.toFixed(2)}</span>
              <span className={`flex items-center text-sm ${stock.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                {stock.change >= 0 ? (
                  <ArrowUpIcon className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDownIcon className="h-4 w-4 mr-1" />
                )}
                {Math.abs(stock.change)}%
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-1">{stock.name}</p>
            <div className="flex items-center mt-2 text-sm">
              <Newspaper className="h-4 w-4 mr-2 text-primary" />
              {stock.news}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

