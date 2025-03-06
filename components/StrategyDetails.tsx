import { Badge } from "@/components/ui/badge"

interface Parameter {
  name: string
  value: string | number
}

interface Performance {
  totalReturn: string
  sharpeRatio: number
  maxDrawdown: string
}

interface StrategyProps {
  strategy: {
    id: string
    name: string
    description: string
    category: string
    parameters: Parameter[]
    performance: Performance
  }
}

export default function StrategyDetails({ strategy }: StrategyProps) {
  return (
    
    <div className="space-y-4">
      <div>
        <Badge variant="outline" className="mb-2">
          {strategy.category}
        </Badge>
        <p className="text-sm text-muted-foreground">{strategy.description}</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Parameters</h3>
        <div className="grid grid-cols-2 gap-2">
          {strategy.parameters.map((param, index) => (
            <div key={index} className="bg-muted/50 p-2 rounded">
              <div className="text-sm text-muted-foreground">{param.name}</div>
              <div className="font-medium">{param.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Performance</h3>
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-muted/50 p-2 rounded">
            <div className="text-sm text-muted-foreground">Total Return</div>
            <div className="font-medium text-green-500">{strategy.performance.totalReturn}</div>
          </div>
          <div className="bg-muted/50 p-2 rounded">
            <div className="text-sm text-muted-foreground">Sharpe Ratio</div>
            <div className="font-medium">{strategy.performance.sharpeRatio}</div>
          </div>
          <div className="bg-muted/50 p-2 rounded">
            <div className="text-sm text-muted-foreground">Max Drawdown</div>
            <div className="font-medium text-red-500">{strategy.performance.maxDrawdown}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

