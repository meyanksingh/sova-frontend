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
  minimum_margin?: number;
  three_month_return?: number;
  six_month_return?: number;
  one_year_return?: number;
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
        console.log("response:::::::::::",response);
        
        const enhancedStrategies = response.map((strategy: Strategy) => ({
          ...strategy,
          minimum_margin: Math.round((Math.random() * 2 + 0.5) * 10) / 10,
          three_month_return: Math.round((Math.random() * 10 + 5) * 10) / 10,
          six_month_return: Math.round((Math.random() * 15 + 10) * 10) / 10,
          one_year_return: Math.round((Math.random() * 20 + 15) * 10) / 10,
        }));
        
        setStrategies(enhancedStrategies)
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
      console.log(response);
      
      if (response.type === "success") {
        toast.success("Strategy deployed successfully");
        router.push(`/strategy/${strategyId}`);
      }
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
                  name={strategy.name}
                  description={strategy.description}
                  category={strategy.category}
                  minimumMargin={strategy.minimum_margin}
                  threeMonthReturn={strategy.three_month_return}
                  sixMonthReturn={strategy.six_month_return}
                  oneYearReturn={strategy.one_year_return}
                  createdAt={strategy.created_at}
                  updatedAt={strategy.updated_at}
                  isActive={strategy.is_active}
                  onDeploy={() => handleDeploy(String(strategy.id))}
                />
              ))}
            </div>
          )}
        </div>
      </AuthorizedLayout>
    </div>
  )
}
