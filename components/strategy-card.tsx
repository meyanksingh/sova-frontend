"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays, Activity, Rocket } from "lucide-react"

interface StrategyCardProps {
  id: string;
  name: string;
  description: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  onDeploy: () => Promise<void>;
}

export function StrategyCard({ 
  id,
  name, 
  description, 
  category, 
  createdAt, 
  updatedAt, 
  isActive, 
  onDeploy 
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
          <h1>{id}</h1>
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
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center">
            <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
            <span className="text-muted-foreground">Created: </span>
            <span className="ml-1">
              {new Date(createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center">
            <Activity className="mr-2 h-4 w-4 opacity-70" />
            <span className="text-muted-foreground">Last Updated: </span>
            <span className="ml-1">
              {new Date(updatedAt).toLocaleDateString()}
            </span>
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