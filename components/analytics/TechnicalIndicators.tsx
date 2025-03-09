import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { TrendingUp, TrendingDown, Activity } from "lucide-react"

export function TechnicalIndicators() {
  const indicators = [
    {
      name: "Moving Average",
      value: "Bullish",
      details: "50 EMA > 200 EMA",
      signal: "positive",
    },
    {
      name: "Bollinger Bands",
      value: "Neutral",
      details: "Price within bands",
      signal: "neutral",
    },
    {
      name: "Support & Resistance",
      value: "Above Support",
      details: "S1: 19250, R1: 19650",
      signal: "positive",
    },
    {
      name: "RSI",
      value: "Overbought",
      details: "RSI: 72.5",
      signal: "negative",
    },
    {
      name: "MACD",
      value: "Bullish Crossover",
      details: "MACD > Signal Line",
      signal: "positive",
    },
  ]

  return (
    <div className="space-y-4">
      {indicators.map((indicator, index) => (
        <div key={index}>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {indicator.signal === "positive" ? (
                <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
              ) : indicator.signal === "negative" ? (
                <TrendingDown className="h-4 w-4 mr-2 text-red-500" />
              ) : (
                <Activity className="h-4 w-4 mr-2 text-yellow-500" />
              )}
              <span className="font-medium">{indicator.name}</span>
            </div>
            <Badge
              variant="outline"
              className={
                indicator.signal === "positive"
                  ? "bg-green-500/10 text-green-500 border-green-500/20"
                  : indicator.signal === "negative"
                    ? "bg-red-500/10 text-red-500 border-red-500/20"
                    : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
              }
            >
              {indicator.value}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1 ml-6">{indicator.details}</p>
          {index < indicators.length - 1 && <Separator className="my-3" />}
        </div>
      ))}
    </div>
  )
}

