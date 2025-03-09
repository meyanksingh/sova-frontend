"use client"

import { Badge } from "@/components/ui/badge"

interface Parameter {
  name: string
  value: string | number
}

interface StrategyDetailsProps {
  strategy: {
    id: string
    name: string
    description: string
    category: string
    parameters: Parameter[]
    performance: {
      totalReturn: string
      sharpeRatio: number
      maxDrawdown: string
    }
    status: string
  }
}

export default function StrategyDetails({ strategy }: StrategyDetailsProps) {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium text-muted-foreground">Strategy ID</h4>
        <p className="text-sm">{strategy.id}</p>
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-muted-foreground">Description</h4>
        <p className="text-sm">{strategy.description}</p>
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-muted-foreground">Category</h4>
        <Badge variant="secondary" className="mt-1">
          {strategy.category}
        </Badge>
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-muted-foreground">Parameters</h4>
        <div className="grid grid-cols-2 gap-2 mt-1">
          {strategy.parameters.map((param, index) => (
            <div key={index} className="text-sm flex justify-between border rounded p-2">
              <span className="text-muted-foreground">{param.name}:</span>
              <span className="font-medium">{param.value}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
        <Badge variant={strategy.status === "Active" ? "success" : "secondary"} className="mt-1">
          {strategy.status}
        </Badge>
      </div>
    </div>
  )
}


