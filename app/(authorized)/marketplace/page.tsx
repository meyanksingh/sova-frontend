"use client"
import { useState, useEffect } from "react"
import { StrategyCard } from "@/components/strategy-card"
import { toast } from "sonner"
import AuthorizedLayout from "../AuthorizedLayout"
import { useRouter } from "next/navigation"
import { useStrategy } from "@/context/StrategyContext"

// Export the mock strategies for reuse
export const mockStrategies = [
  {
    id: "1",
    name: "Momentum Trading",
    description: "Capitalize on continuing market trends using technical indicators and price movement.",
    category: "Technical",
    is_active: true,
    three_months_return: 10.5,
    three_months_volatility: 12.3,
    three_months_sharpe: 0.85,
    three_months_max_drawdown: -15.2,
    three_months_sortino: 0.92,
    three_months_calmar: 0.69,
    six_months_return: 18.7,
    six_months_volatility: 11.8,
    six_months_sharpe: 1.58,
    six_months_max_drawdown: -18.4,
    six_months_sortino: 1.45,
    six_months_calmar: 1.02,
    one_year_return: 32.4,
    one_year_volatility: 13.2,
    one_year_sharpe: 2.45,
    one_year_max_drawdown: -22.1,
    one_year_sortino: 2.12,
    one_year_calmar: 1.47,
    created_at: "2023-04-15T10:30:00Z",
    updated_at: "2023-09-20T14:25:00Z"
  },
  {
    id: "2", 
    name: "Mean Reversion",
    description: "Strategy based on the idea that asset prices and returns eventually revert to their historical mean.",
    category: "Statistical",
    is_active: true,
    three_months_return: 8.2,
    three_months_volatility: 9.1,
    three_months_sharpe: 0.90,
    three_months_max_drawdown: -12.4,
    three_months_sortino: 0.95,
    three_months_calmar: 0.66,
    six_months_return: 15.8,
    six_months_volatility: 10.2,
    six_months_sharpe: 1.55,
    six_months_max_drawdown: -16.8,
    six_months_sortino: 1.38,
    six_months_calmar: 0.94,
    one_year_return: 28.6,
    one_year_volatility: 11.5,
    one_year_sharpe: 2.49,
    one_year_max_drawdown: -19.2,
    one_year_sortino: 2.05,
    one_year_calmar: 1.49,
    created_at: "2023-07-24T14:15:00Z",
    updated_at: "2023-08-12T09:45:00Z"
  },
  {
    id: "3",
    name: "Pairs Trading",
    description: "Market-neutral strategy that matches a long position with a short position in two historically correlated securities.",
    category: "Statistical", 
    is_active: false,
    three_months_return: 5.8,
    three_months_volatility: 7.2,
    three_months_sharpe: 0.81,
    three_months_max_drawdown: -9.5,
    three_months_sortino: 0.88,
    three_months_calmar: 0.61,
    six_months_return: 12.4,
    six_months_volatility: 8.1,
    six_months_sharpe: 1.53,
    six_months_max_drawdown: -13.2,
    six_months_sortino: 1.35,
    six_months_calmar: 0.94,
    one_year_return: 24.2,
    one_year_volatility: 9.8,
    one_year_sharpe: 2.47,
    one_year_max_drawdown: -16.5,
    one_year_sortino: 2.02,
    one_year_calmar: 1.47,
    created_at: "2023-09-05T11:20:00Z",
    updated_at: "2023-09-05T11:20:00Z"
  },
  {
    id: "4",
    name: "Volatility Arbitrage",
    description: "Exploits differences between the implied volatility of options and the expected future realized volatility.",
    category: "Options",
    is_active: true,
    three_months_return: 7.5,
    three_months_volatility: 8.8,
    three_months_sharpe: 0.85,
    three_months_max_drawdown: -11.2,
    three_months_sortino: 0.91,
    three_months_calmar: 0.67,
    six_months_return: 14.8,
    six_months_volatility: 9.5,
    six_months_sharpe: 1.56,
    six_months_max_drawdown: -15.4,
    six_months_sortino: 1.42,
    six_months_calmar: 0.96,
    one_year_return: 26.5,
    one_year_volatility: 10.8,
    one_year_sharpe: 2.45,
    one_year_max_drawdown: -18.2,
    one_year_sortino: 2.08,
    one_year_calmar: 1.46,
    created_at: "2023-06-18T08:45:00Z",
    updated_at: "2023-08-02T16:30:00Z"
  },
  {
    id: "5",
    name: "Dollar-Cost Averaging",
    description: "Investing a fixed amount at regular intervals regardless of asset price movements.",
    category: "Passive",
    is_active: true,
    three_months_return: 4.2,
    three_months_volatility: 5.1,
    three_months_sharpe: 0.82,
    three_months_max_drawdown: -7.4,
    three_months_sortino: 0.89,
    three_months_calmar: 0.57,
    six_months_return: 9.8,
    six_months_volatility: 6.2,
    six_months_sharpe: 1.58,
    six_months_max_drawdown: -10.8,
    six_months_sortino: 1.45,
    six_months_calmar: 0.91,
    one_year_return: 19.6,
    one_year_volatility: 7.5,
    one_year_sharpe: 2.61,
    one_year_max_drawdown: -13.2,
    one_year_sortino: 2.15,
    one_year_calmar: 1.48,
    created_at: "2023-05-10T13:40:00Z",
    updated_at: "2023-05-10T13:40:00Z"
  },
  {
    id: "6",
    name: "Swing Trading",
    description: "Capturing short to medium-term gains in a stock over a period of days or weeks.",
    category: "Technical",
    is_active: true,
    three_months_return: 9.8,
    three_months_volatility: 11.2,
    three_months_sharpe: 0.88,
    three_months_max_drawdown: -14.5,
    three_months_sortino: 0.94,
    three_months_calmar: 0.68,
    six_months_return: 17.5,
    six_months_volatility: 12.1,
    six_months_sharpe: 1.45,
    six_months_max_drawdown: -19.2,
    six_months_sortino: 1.32,
    six_months_calmar: 0.91,
    one_year_return: 31.2,
    one_year_volatility: 13.8,
    one_year_sharpe: 2.26,
    one_year_max_drawdown: -23.5,
    one_year_sortino: 1.95,
    one_year_calmar: 1.33,
    created_at: "2023-08-30T15:25:00Z",
    updated_at: "2023-08-30T15:25:00Z"
  },
  {
    id: "7",
    name: "Sentiment Analysis",
    description: "Trading based on analyzing news, social media, and market sentiment data using NLP algorithms.",
    category: "Alternative Data",
    is_active: true,
    three_months_return: 6.8,
    three_months_volatility: 8.5,
    three_months_sharpe: 0.80,
    three_months_max_drawdown: -10.8,
    three_months_sortino: 0.87,
    three_months_calmar: 0.63,
    six_months_return: 13.5,
    six_months_volatility: 9.2,
    six_months_sharpe: 1.47,
    six_months_max_drawdown: -14.5,
    six_months_sortino: 1.34,
    six_months_calmar: 0.93,
    one_year_return: 25.8,
    one_year_volatility: 10.5,
    one_year_sharpe: 2.46,
    one_year_max_drawdown: -17.8,
    one_year_sortino: 2.05,
    one_year_calmar: 1.45,
    created_at: "2023-07-05T09:15:00Z",
    updated_at: "2023-09-01T10:20:00Z"
  },
  {
    id: "8",
    name: "Sector Rotation",
    description: "Shifting investment allocations across different market sectors based on economic cycles.",
    category: "Fundamental",
    is_active: false,
    three_months_return: 5.5,
    three_months_volatility: 7.8,
    three_months_sharpe: 0.71,
    three_months_max_drawdown: -11.5,
    three_months_sortino: 0.78,
    three_months_calmar: 0.48,
    six_months_return: 11.2,
    six_months_volatility: 8.9,
    six_months_sharpe: 1.26,
    six_months_max_drawdown: -15.8,
    six_months_sortino: 1.15,
    six_months_calmar: 0.71,
    one_year_return: 21.5,
    one_year_volatility: 10.2,
    one_year_sharpe: 2.11,
    one_year_max_drawdown: -19.5,
    one_year_sortino: 1.82,
    one_year_calmar: 1.10,
    created_at: "2023-06-22T12:10:00Z",
    updated_at: "2023-06-22T12:10:00Z"
  },
  {
    id: "9",
    name: "News-Based Trading",
    description: "Algorithmic strategy that trades based on news events and announcements.",
    category: "Event-Driven",
    is_active: true,
    three_months_return: 7.2,
    three_months_volatility: 9.5,
    three_months_sharpe: 0.76,
    three_months_max_drawdown: -12.8,
    three_months_sortino: 0.83,
    three_months_calmar: 0.56,
    six_months_return: 14.5,
    six_months_volatility: 10.8,
    six_months_sharpe: 1.34,
    six_months_max_drawdown: -17.2,
    six_months_sortino: 1.22,
    six_months_calmar: 0.84,
    one_year_return: 27.8,
    one_year_volatility: 12.5,
    one_year_sharpe: 2.22,
    one_year_max_drawdown: -21.5,
    one_year_sortino: 1.92,
    one_year_calmar: 1.29,
    created_at: "2023-09-10T14:50:00Z",
    updated_at: "2023-09-10T14:50:00Z"
  },
  {
    id: "10",
    name: "VWAP Strategy",
    description: "Trading around the Volume Weighted Average Price to minimize market impact.",
    category: "Technical",
    is_active: true,
    three_months_return: 6.5,
    three_months_volatility: 8.2,
    three_months_sharpe: 0.79,
    three_months_max_drawdown: -10.5,
    three_months_sortino: 0.86,
    three_months_calmar: 0.62,
    six_months_return: 13.2,
    six_months_volatility: 9.1,
    six_months_sharpe: 1.45,
    six_months_max_drawdown: -14.8,
    six_months_sortino: 1.32,
    six_months_calmar: 0.89,
    one_year_return: 24.5,
    one_year_volatility: 10.8,
    one_year_sharpe: 2.27,
    one_year_max_drawdown: -18.5,
    one_year_sortino: 1.95,
    one_year_calmar: 1.32,
    created_at: "2023-08-07T11:30:00Z",
    updated_at: "2023-08-20T16:45:00Z"
  },
  {
    id: "11",
    name: "Arbitrage Trading",
    description: "Exploiting price differences of identical or similar financial instruments on different markets.",
    category: "Statistical",
    is_active: true,
    three_months_return: 5.2,
    three_months_volatility: 6.5,
    three_months_sharpe: 0.80,
    three_months_max_drawdown: -8.5,
    three_months_sortino: 0.87,
    three_months_calmar: 0.61,
    six_months_return: 11.5,
    six_months_volatility: 7.2,
    six_months_sharpe: 1.60,
    six_months_max_drawdown: -12.2,
    six_months_sortino: 1.45,
    six_months_calmar: 0.94,
    one_year_return: 22.8,
    one_year_volatility: 8.5,
    one_year_sharpe: 2.68,
    one_year_max_drawdown: -15.5,
    one_year_sortino: 2.25,
    one_year_calmar: 1.47,
    created_at: "2023-07-15T10:05:00Z",
    updated_at: "2023-08-25T13:40:00Z"
  },
  {
    id: "12",
    name: "Breakout Trading",
    description: "Entering the market when the price breaks above or below established support or resistance levels.",
    category: "Technical",
    is_active: false,
    three_months_return: 8.8,
    three_months_volatility: 10.5,
    three_months_sharpe: 0.84,
    three_months_max_drawdown: -13.8,
    three_months_sortino: 0.90,
    three_months_calmar: 0.64,
    six_months_return: 16.5,
    six_months_volatility: 11.5,
    six_months_sharpe: 1.43,
    six_months_max_drawdown: -18.5,
    six_months_sortino: 1.30,
    six_months_calmar: 0.89,
    one_year_return: 29.5,
    one_year_volatility: 13.2,
    one_year_sharpe: 2.23,
    one_year_max_drawdown: -22.8,
    one_year_sortino: 1.92,
    one_year_calmar: 1.29,
    created_at: "2023-05-28T09:35:00Z",
    updated_at: "2023-07-12T14:20:00Z"
  },
  {
    id: "13",
    name: "Smart Beta",
    description: "Rules-based portfolio construction that aims to deliver better risk-adjusted returns than market cap-weighted indices.",
    category: "Factor-Based",
    is_active: true,
    three_months_return: 6.2,
    three_months_volatility: 7.5,
    three_months_sharpe: 0.83,
    three_months_max_drawdown: -9.8,
    three_months_sortino: 0.89,
    three_months_calmar: 0.63,
    six_months_return: 12.8,
    six_months_volatility: 8.5,
    six_months_sharpe: 1.51,
    six_months_max_drawdown: -13.5,
    six_months_sortino: 1.37,
    six_months_calmar: 0.95,
    one_year_return: 23.5,
    one_year_volatility: 9.8,
    one_year_sharpe: 2.40,
    one_year_max_drawdown: -16.8,
    one_year_sortino: 2.05,
    one_year_calmar: 1.40,
    created_at: "2023-06-30T11:15:00Z",
    updated_at: "2023-06-30T11:15:00Z"
  },
  {
    id: "14",
    name: "Dividend Growth",
    description: "Focuses on companies with a history of dividend increases and strong fundamentals.",
    category: "Income",
    is_active: true,
    three_months_return: 4.8,
    three_months_volatility: 5.8,
    three_months_sharpe: 0.83,
    three_months_max_drawdown: -7.8,
    three_months_sortino: 0.90,
    three_months_calmar: 0.62,
    six_months_return: 10.2,
    six_months_volatility: 6.5,
    six_months_sharpe: 1.57,
    six_months_max_drawdown: -11.2,
    six_months_sortino: 1.42,
    six_months_calmar: 0.91,
    one_year_return: 20.5,
    one_year_volatility: 7.8,
    one_year_sharpe: 2.63,
    one_year_max_drawdown: -14.2,
    one_year_sortino: 2.18,
    one_year_calmar: 1.44,
    created_at: "2023-08-22T13:25:00Z",
    updated_at: "2023-08-22T13:25:00Z"
  },
  {
    id: "15",
    name: "Index Futures Scalping",
    description: "Short-term trading of index futures contracts with small profit targets.",
    category: "High-Frequency",
    is_active: true,
    three_months_return: 7.8,
    three_months_volatility: 9.2,
    three_months_sharpe: 0.85,
    three_months_max_drawdown: -11.8,
    three_months_sortino: 0.91,
    three_months_calmar: 0.66,
    six_months_return: 15.2,
    six_months_volatility: 10.2,
    six_months_sharpe: 1.49,
    six_months_max_drawdown: -16.2,
    six_months_sortino: 1.35,
    six_months_calmar: 0.94,
    one_year_return: 28.2,
    one_year_volatility: 11.8,
    one_year_sharpe: 2.39,
    one_year_max_drawdown: -19.8,
    one_year_sortino: 2.02,
    one_year_calmar: 1.42,
    created_at: "2023-09-15T08:30:00Z",
    updated_at: "2023-09-15T08:30:00Z"
  }
];

interface Strategy {
  id: string;
  name: string;
  description: string;
  category: string;
  is_active: boolean;
  three_months_return: number;
  three_months_volatility: number;
  three_months_sharpe: number;
  three_months_max_drawdown: number;
  three_months_sortino: number;
  three_months_calmar: number;
  six_months_return: number;
  six_months_volatility: number;
  six_months_sharpe: number;
  six_months_max_drawdown: number;
  six_months_sortino: number;
  six_months_calmar: number;
  one_year_return: number;
  one_year_volatility: number;
  one_year_sharpe: number;
  one_year_max_drawdown: number;
  one_year_sortino: number;
  one_year_calmar: number;
  created_at: string;
  updated_at: string;
}

export default function StrategiesPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [strategies, setStrategies] = useState<Strategy[]>([])
  const { setSelectedStrategy } = useStrategy()

  useEffect(() => {
    const fetchStrategies = async () => {
      try {
        // Simulate loading from API
        setTimeout(() => {
          setStrategies(mockStrategies)
          setLoading(false)
        }, 500)
      } catch (error) {
        console.error("Error fetching strategies:", error)
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

    // Find the selected strategy from our data
    const selectedStrategy = strategies.find(s => s.id === strategyId);
    
    if (!selectedStrategy) {
      toast.error("Strategy not found");
      return;
    }
    
    // Save the selected strategy in the context
    setSelectedStrategy(selectedStrategy);
    
    // Show success message and navigate
    toast.success("Strategy deployed successfully");
    router.push(`/strategy/${strategyId}`);
  }

  return (
    <div className="min-h-screen bg-background">
      <AuthorizedLayout>
        <div className="container mx-auto p-6">
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
                  createdAt={strategy.created_at}
                  updatedAt={strategy.updated_at}
                  isActive={strategy.is_active}
                  three_months_return={strategy.three_months_return}
                  three_months_sharpe={strategy.three_months_sharpe}
                  three_months_max_drawdown={strategy.three_months_max_drawdown}
                  six_months_return={strategy.six_months_return}
                  six_months_sharpe={strategy.six_months_sharpe}
                  six_months_max_drawdown={strategy.six_months_max_drawdown}
                  one_year_return={strategy.one_year_return}
                  one_year_sharpe={strategy.one_year_sharpe}
                  one_year_max_drawdown={strategy.one_year_max_drawdown}
                  three_months_sortino={strategy.three_months_sortino}
                  three_months_calmar={strategy.three_months_calmar}
                  six_months_sortino={strategy.six_months_sortino}
                  six_months_calmar={strategy.six_months_calmar}
                  one_year_sortino={strategy.one_year_sortino}
                  one_year_calmar={strategy.one_year_calmar}
                  three_months_volatility={strategy.three_months_volatility}
                  six_months_volatility={strategy.six_months_volatility}
                  one_year_volatility={strategy.one_year_volatility}  
                  
                  
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
