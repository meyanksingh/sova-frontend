"use client"
import { useState } from "react"
import { StrategyCard } from "@/components/strategy-card"
import { toast } from "sonner"
import { BrokerAuthWrapper } from "../broker-auth-wrapper"

interface Strategy {
  id: string;
  name: string;
  description: string;
}

const hardcodedStrategies: Strategy[] = [
  { id: "1", name: "Strategy A", description: "Description for Strategy A" },
  { id: "2", name: "Strategy B", description: "Description for Strategy B" },
  { id: "3", name: "Strategy C", description: "Description for Strategy C" },
];

export default function StrategiesPage() {
  const [strategies, setStrategies] = useState<Strategy[]>(hardcodedStrategies)
  const [loading, setLoading] = useState(false)

  const handleDeploy = async (strategyId: string) => {
    if (!strategyId) {
      toast.error("Strategy ID is missing")
      return false
    }

    if (strategyId === '00000000-0000-0000-0000-000000000000') {
      toast.error("Invalid strategy ID")
      return false
    }

    // Simulate deployment success
    toast.success("Strategy deployed successfully")
    return true
  }

  if (loading) {
    return <div>Loading strategies...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <BrokerAuthWrapper>
        <div className="container mx-auto p-6">
          <h1 className="text-2xl font-bold mb-4 text-primary">Marketplace</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {strategies.map((strategy) => (
              <StrategyCard 
                key={strategy.id} 
                name={strategy.name}
                description={strategy.description}
                isActive={true} // Assuming all strategies are active for hardcoded data
                onDeploy={() => handleDeploy(strategy.id)}
              />
            ))}
          </div>
        </div>
      </BrokerAuthWrapper>
    </div>
  )
}
