import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownIcon } from "lucide-react"

const topLosersData = [
  { symbol: "SUNPHARMA", name: "Sun Pharmaceutical", price: 876.25, change: -6.8, volume: "7.2M" },
  { symbol: "BAJAJFINSV", name: "Bajaj Finserv Ltd.", price: 1543.7, change: -5.3, volume: "3.5M" },
  { symbol: "ASIANPAINT", name: "Asian Paints Ltd.", price: 3210.45, change: -4.7, volume: "2.8M" },
  { symbol: "MARUTI", name: "Maruti Suzuki India", price: 9876.3, change: -4.2, volume: "1.9M" },
  { symbol: "HCLTECH", name: "HCL Technologies", price: 1098.65, change: -3.9, volume: "4.3M" },
  { symbol: "AXISBANK", name: "Axis Bank Ltd.", price: 876.4, change: -3.5, volume: "6.1M" },
  { symbol: "KOTAKBANK", name: "Kotak Mahindra Bank", price: 1765.3, change: -3.2, volume: "3.7M" },
  { symbol: "HINDUNILVR", name: "Hindustan Unilever", price: 2543.75, change: -2.8, volume: "2.5M" },
]

interface TopLosersProps {
  compact?: boolean
}

export function TopLosers({ compact = false }: TopLosersProps) {
  if (compact) {
    return (
      <div className="space-y-2">
        {topLosersData.slice(0, 5).map((stock) => (
          <div key={stock.symbol} className="flex justify-between items-center p-2 hover:bg-muted/50 rounded-md">
            <div>
              <div className="font-medium">{stock.symbol}</div>
              <div className="text-xs text-muted-foreground">{stock.name}</div>
            </div>
            <div className="flex flex-col items-end">
              <div>₹{stock.price.toFixed(2)}</div>
              <div className="text-red-500 flex items-center text-sm">
                <ArrowDownIcon className="h-3 w-3 mr-1" />
                {Math.abs(stock.change)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {topLosersData.map((stock) => (
        <Card key={stock.symbol} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex justify-between items-center">
              <span>{stock.symbol}</span>
              <span className="text-red-500 flex items-center text-sm">
                <ArrowDownIcon className="h-4 w-4 mr-1" />
                {Math.abs(stock.change)}%
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

