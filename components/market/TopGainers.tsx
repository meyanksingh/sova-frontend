import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon } from "lucide-react"

const topGainersData = [
  { symbol: "TATASTEEL", name: "Tata Steel Ltd.", price: 145.75, change: 8.2, volume: "12.5M" },
  { symbol: "RELIANCE", name: "Reliance Industries", price: 2456.3, change: 5.7, volume: "8.3M" },
  { symbol: "HDFCBANK", name: "HDFC Bank Ltd.", price: 1678.45, change: 4.9, volume: "6.7M" },
  { symbol: "INFY", name: "Infosys Ltd.", price: 1456.2, change: 4.5, volume: "5.2M" },
  { symbol: "TCS", name: "Tata Consultancy Services", price: 3245.6, change: 4.2, volume: "3.8M" },
  { symbol: "WIPRO", name: "Wipro Ltd.", price: 432.75, change: 3.8, volume: "4.1M" },
  { symbol: "ICICIBANK", name: "ICICI Bank Ltd.", price: 945.3, change: 3.5, volume: "7.2M" },
  { symbol: "SBIN", name: "State Bank of India", price: 567.8, change: 3.2, volume: "9.5M" },
]

interface TopGainersProps {
  compact?: boolean
}

export function TopGainers({ compact = false }: TopGainersProps) {
  if (compact) {
    return (
      <div className="space-y-2">
        {topGainersData.slice(0, 5).map((stock) => (
          <div key={stock.symbol} className="flex justify-between items-center p-2 hover:bg-muted/50 rounded-md">
            <div>
              <div className="font-medium">{stock.symbol}</div>
              <div className="text-xs text-muted-foreground">{stock.name}</div>
            </div>
            <div className="flex flex-col items-end">
              <div>₹{stock.price.toFixed(2)}</div>
              <div className="text-green-500 flex items-center text-sm">
                <ArrowUpIcon className="h-3 w-3 mr-1" />
                {stock.change}%
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {topGainersData.map((stock) => (
        <Card key={stock.symbol} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex justify-between items-center">
              <span>{stock.symbol}</span>
              <span className="text-green-500 flex items-center text-sm">
                <ArrowUpIcon className="h-4 w-4 mr-1" />
                {stock.change}%
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-1">{stock.name}</p>
            <div className="flex justify-between items-center">
              <span className="font-bold">₹{stock.price.toFixed(2)}</span>
              <span className="text-xs text-muted-foreground">Vol: {stock.volume}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

