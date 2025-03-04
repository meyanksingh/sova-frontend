"use client"

import { useEffect, useState } from "react"
import { MarginCard } from "@/components/margin-card"
import AuthorizedLayout from "../AuthorizedLayout"

export default function MarginPage() {
  const [marginData, setMarginData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Hardcoded margin data
    const hardcodedMarginData = {
      limitObject: {
        RMSSubLimits: {
          netMarginAvailable: 100000,
          cashAvailable: 50000,
          marginUtilized: 20000,
          collateral: 30000,
          MTM: 15000,
          RealizedMTM: 5000,
          UnrealizedMTM: 10000,
        },
        marginAvailable: {
          CashMarginAvailable: 40000,
          DirectCollateral: 20000,
          HoldingCollateral: 15000,
          PayInAmount: 10000,
          PayOutAmount: 5000,
        },
        marginUtilized: {
          MarginUsed: 25000,
          CNCAmountUsed: 10000,
          ExposureMarginPresent: 5000,
          TotalSpanMargin: 15000,
        },
      },
    };

    setMarginData(hardcodedMarginData);
    setIsLoading(false);
  }, [])

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>

  return (
    <AuthorizedLayout>
      <div className="container mx-auto p-6">
        {marginData && <MarginCard marginData={marginData} />}
      </div>
    </AuthorizedLayout>
  )
}
