"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays, Activity, Rocket, TrendingUp, LineChart, ArrowDownToLine } from "lucide-react"

interface StrategyCardProps {
  name: string;
  description: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  onDeploy: () => Promise<void>;
  three_months_return: number;
  three_months_sharpe: number;
  three_months_max_drawdown: number;
  six_months_return: number;
  six_months_sharpe: number;
  six_months_max_drawdown: number;
  one_year_return: number;
  one_year_sharpe: number;
  one_year_max_drawdown: number;
}

export function StrategyCard({ 
  name, 
  description, 
  category, 
  createdAt, 
  updatedAt, 
  isActive,
  onDeploy,
  three_months_return,
  three_months_sharpe,
  three_months_max_drawdown,
  six_months_return,
  six_months_sharpe,
  six_months_max_drawdown,
  one_year_return,
  one_year_sharpe,
  one_year_max_drawdown
}: StrategyCardProps) {
  const [isDeploying, setIsDeploying] = useState(false)

  const handleDeploy = async () => {
    setIsDeploying(true)
    try {
      await onDeploy()
    } finally {
      setIsDeploying(false)
    }
  }

  const getDeployButtonTooltip = () => {
    if (!isActive) return "Strategy is inactive"
    return ""
  }

  return (
    <Card className="hover:bg-accent/5 transition-colors">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{name}</CardTitle>
          <Badge variant={isActive ? 'default' : 'secondary'}>
            {isActive ? 'Active' : 'Inactive'}
          </Badge>
        </div>
        <Badge variant="outline" className="w-fit">
          {category}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>

        <div className="grid grid-cols-3 gap-4 py-2">
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">3M</div>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              <span className="font-medium">{three_months_return.toFixed(1)}%</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <LineChart className="h-3 w-3" />
              <span>SR: {three_months_sharpe.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <ArrowDownToLine className="h-3 w-3" />
              <span>DD: {three_months_max_drawdown.toFixed(1)}%</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">6M</div>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              <span className="font-medium">{six_months_return.toFixed(1)}%</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <LineChart className="h-3 w-3" />
              <span>SR: {six_months_sharpe.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <ArrowDownToLine className="h-3 w-3" />
              <span>DD: {six_months_max_drawdown.toFixed(1)}%</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">1Y</div>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              <span className="font-medium">{one_year_return.toFixed(1)}%</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <LineChart className="h-3 w-3" />
              <span>SR: {one_year_sharpe.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <ArrowDownToLine className="h-3 w-3" />
              <span>DD: {one_year_max_drawdown.toFixed(1)}%</span>
            </div>
          </div>
        </div>
        
        

        <div className="mt-4">
          <Button
            className="w-full"
            onClick={handleDeploy}
            disabled={isDeploying || !isActive}
            title={getDeployButtonTooltip()}
          >
            <Rocket className="mr-2 h-4 w-4" />
            {isDeploying ? "Deploying..." : "Deploy Strategy"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 