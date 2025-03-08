"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface StrategyCardProps {
  name: string;
  description: string;
  category: string;
  minimumMargin?: number;
  threeMonthReturn?: number;
  sixMonthReturn?: number;
  oneYearReturn?: number;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  onDeploy?: () => Promise<void>;
}

export function StrategyCard({ 
  name, 
  description, 
  category, 
  minimumMargin,
  threeMonthReturn,
  sixMonthReturn,
  oneYearReturn,
  createdAt,
  updatedAt,
  isActive,
  onDeploy
}: StrategyCardProps) {
  // Check if we have performance metrics
  const hasPerformanceMetrics = minimumMargin !== undefined || 
    threeMonthReturn !== undefined || 
    sixMonthReturn !== undefined || 
    oneYearReturn !== undefined;

  return (
    <Card className="hover:bg-accent/5 h-80 transition-colors flex flex-col">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{name}</CardTitle>
          <Badge variant={isActive ? 'default' : 'secondary'} className="rounded-full px-3 py-1">
            {isActive ? 'Active' : 'Inactive'}
          </Badge>
        </div>
        <p className="text-sm  text-white/80">{description}</p>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="space-y-4 flex-1">
          <div>
            <span className="text-sm font-medium text-muted-foreground">Category: </span>
            <Badge variant="outline" className="ml-1">{category}</Badge>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-lg font-medium text-white">Min Margin: <span className="text-white">{minimumMargin? `${minimumMargin}%` : "N/A"}</span></p>
                </div>
                <div>
                  <p className="text-lg font-medium text-white">3M Return: <span className="text-white"> {threeMonthReturn? `${threeMonthReturn}%` : "N/A"}</span></p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-lg font-medium text-white">6M Return: <span className="text-white">{sixMonthReturn? `${sixMonthReturn}%` : "N/A"}</span></p>
                </div>
                <div>
                  <p className="text-lg font-medium text-white">1Y Return: <span className="text-white">{oneYearReturn? `${oneYearReturn}%` : "N/A"}</span></p>
                </div>
            </div>
          </div>
         
        </div>

        {onDeploy && (
          <Button 
            className="w-full mt-4" 
            onClick={onDeploy}
            disabled={!isActive}
          >
            Deploy Strategy
          </Button>
        )}
      </CardContent>
    </Card>
  )
} 