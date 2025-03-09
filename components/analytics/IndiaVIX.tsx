import { TrendingUp, TrendingDown } from "lucide-react"

interface IndiaVIXProps {
  compact?: boolean
}

export function IndiaVIX({ compact = false }: IndiaVIXProps) {
  // Hardcoded data
  const vixValue = 14.25
  const vixChange = -0.75
  const isUp = vixChange >= 0

  if (compact) {
    return (
      <div className="flex flex-col items-center">
        <div className="text-sm font-medium text-muted-foreground mb-1">India VIX</div>
        <div className="text-xl font-bold">{vixValue.toFixed(2)}</div>
        <div className={`text-xs ${isUp ? "text-red-500" : "text-green-500"} mt-1`}>
          {isUp ? "+" : ""}
          {vixChange.toFixed(2)}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center">
      <div className="text-3xl font-bold">{vixValue.toFixed(2)}</div>
      <div className={`flex items-center mt-2 ${isUp ? "text-red-500" : "text-green-500"}`}>
        {isUp ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
        <span>
          {Math.abs(vixChange).toFixed(2)} ({Math.abs((vixChange / (vixValue + vixChange)) * 100).toFixed(2)}%)
        </span>
      </div>
      <p className="text-xs text-muted-foreground mt-4 text-center">Lower VIX indicates decreased market volatility</p>
    </div>
  )
}

