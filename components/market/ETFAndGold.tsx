import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon, TrendingUp, DollarSign } from "lucide-react"

const etfAndGoldData = [
  {
    symbol: "GOLDBEES",
    name: "Nippon India Gold BeES",
    price: 45.75,
    change: 1.2,
    aum: "₹2,345 Cr",
    category: "Gold ETF",
  },
  {
    symbol: "NIFTYBEES",
    name: "Nippon India Nifty BeES",
    price: 210.3,
    change: 0.8,
    aum: "₹5,678 Cr",
    category: "Index ETF",
  },
  {
    symbol: "BANKBEES",
    name: "Nippon India Bank BeES",
    price: 380.45,
    change: -0.5,
    aum: "₹1,234 Cr",
    category: "Sector ETF",
  },
  {
    symbol: "LIQUIDBEES",
    name: "Nippon India Liquid BeES",
    price: 1000.0,
    change: 0.1,
    aum: "₹3,456 Cr",
    category: "Liquid ETF",
  },
  {
    symbol: "SGBMAR28",
    name: "Sovereign Gold Bond 2028",
    price: 6120.75,
    change: 1.5,
    aum: "N/A",
    category: "Gold Bond",
  },
  {
    symbol: "SILVBEES",
    name: "Nippon India Silver BeES",
    price: 65.3,
    change: 2.1,
    aum: "₹876 Cr",
    category: "Silver ETF",
  },
]

export function ETFAndGold() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {etfAndGoldData.map((item) => (
        <Card key={item.symbol} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex justify-between items-center">
              <span>{item.symbol}</span>
              <span className={`flex items-center text-sm ${item.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                {item.change >= 0 ? (
                  <ArrowUpIcon className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDownIcon className="h-4 w-4 mr-1" />
                )}
                {Math.abs(item.change)}%
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-1">{item.name}</p>
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold">₹{item.price.toFixed(2)}</span>
              <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">{item.category}</span>
            </div>
            <div className="flex items-center mt-2 text-xs text-muted-foreground">
              {item.aum !== "N/A" ? (
                <>
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>AUM: {item.aum}</span>
                </>
              ) : (
                <>
                  <DollarSign className="h-3 w-3 mr-1" />
                  <span>Government Bond</span>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

