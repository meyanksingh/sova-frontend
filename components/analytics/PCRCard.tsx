import { Scale } from "lucide-react"

interface PCRCardProps {
  compact?: boolean
}

export function PCRCard({ compact = false }: PCRCardProps) {
  // Hardcoded data
  const pcrValue = 0.85
  const pcrChange = 0.03
  const isUp = pcrChange >= 0

  if (compact) {
    return (
      <div className="flex flex-col items-center">
        <div className="text-sm font-medium text-muted-foreground mb-1">PCR</div>
        <div className="text-xl font-bold">{pcrValue.toFixed(2)}</div>
        <div className={`text-xs ${isUp ? "text-green-500" : "text-red-500"} mt-1`}>
          {isUp ? "+" : ""}
          {pcrChange.toFixed(2)}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center">
      <div className="text-3xl font-bold">{pcrValue.toFixed(2)}</div>
      <div className={`flex items-center mt-2 ${isUp ? "text-green-500" : "text-red-500"}`}>
        <Scale className="h-4 w-4 mr-1" />
        <span>
          {isUp ? "+" : ""}
          {pcrChange.toFixed(2)}
        </span>
      </div>
      <p className="text-xs text-muted-foreground mt-4 text-center">
        PCR &lt; 1: More call options (bullish)
        <br />
        PCR &gt; 1: More put options (bearish)
      </p>
    </div>
  )
}

