"use client"
import { useState, useEffect } from "react"
import { StrategyCard } from "@/components/strategy-card"
import { toast } from "sonner"
import AuthorizedLayout from "../AuthorizedLayout"
import { getStrategies, deployStrategy } from "@/lib/api"
import { useRouter } from "next/navigation"

interface Strategy {
  id: string;
  name: string;
  description: string;
  category: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export default function StrategiesPage() {
  const [strategies, setStrategies] = useState<Strategy[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchStrategies = async () => {
      setLoading(true)
      try {
        const response = await getStrategies()
        setStrategies(response)
      } catch (err) {
        console.error("Error fetching strategies:", err)
        toast.error("Failed to load strategies")
        setStrategies([])
      } finally {
        setLoading(false)
      }
    }

    fetchStrategies()
  }, [])

  const handleDeploy = async (strategyId: string) => {
    if (!strategyId) {
      toast.error("Strategy ID is missing");
      return;
    }

    if (strategyId === '00000000-0000-0000-0000-000000000000') {
      toast.error("Invalid strategy ID");
      return;
    }

    try {
      const response = await deployStrategy(strategyId);
      console.log("Deployment response:", response);
      toast.success("Strategy deployed successfully");
    } catch (error) {
      console.error("Error deploying strategy:", error);
      toast.error("Failed to deploy strategy");
    }
  }
  return (
    <div className="min-h-screen bg-background">
      <AuthorizedLayout>
        <div className="container mx-auto p-6">
          <h1 className="text-2xl font-bold mb-4 text-primary">Marketplace</h1>
          {loading ? (
            <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
              <div className="text-lg text-muted-foreground">Loading strategies...</div>
            </div>
          ) : strategies.length === 0 ? (
            <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
              <div className="text-lg text-muted-foreground">No strategies available</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {strategies.map((strategy) => (
                <StrategyCard 
                  key={strategy.id} 
                  id={strategy.id}
                  name={strategy.name}
                  description={strategy.description}
                  category={strategy.category}
                  createdAt={strategy.created_at}
                  updatedAt={strategy.updated_at}
                  isActive={strategy.is_active}
                  onDeploy={() => handleDeploy(strategy.id)}
                />
              ))}
            </div>
          )}
        </div>
      </AuthorizedLayout>
    </div>
  )
}
