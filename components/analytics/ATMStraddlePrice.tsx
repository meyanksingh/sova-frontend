import { ArrowUpDown } from "lucide-react"

interface ATMStraddlePriceProps {
  compact?: boolean
}

export function ATMStraddlePrice({ compact = false }: ATMStraddlePriceProps) {
  // Hardcoded data
  const straddlePrice = 235.75
  const previousClose = 228.5
  const change = straddlePrice - previousClose
  const percentChange = (change / previousClose) * 100

  if (compact) {
    return (
      <div className="flex flex-col items-center">
        <div className="text-sm font-medium text-muted-foreground mb-1">ATM Straddle</div>
        <div className="text-xl font-bold">₹{straddlePrice.toFixed(2)}</div>
        <div className={`text-xs ${change >= 0 ? "text-red-500" : "text-green-500"} mt-1`}>
          {change >= 0 ? "+" : ""}
          {change.toFixed(2)}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center">
      <div className="text-3xl font-bold">₹{straddlePrice.toFixed(2)}</div>
      <div className={`flex items-center mt-2 ${change >= 0 ? "text-red-500" : "text-green-500"}`}>
        <ArrowUpDown className="h-4 w-4 mr-1" />
        <span>
          {change >= 0 ? "+" : ""}
          {change.toFixed(2)} ({change >= 0 ? "+" : ""}
          {percentChange.toFixed(2)}%)
        </span>
      </div>
      <p className="text-xs text-muted-foreground mt-4 text-center">Nifty 19500 CE + PE combined premium</p>
    </div>
  )
}

