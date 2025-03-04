"use client";

import { useEffect, useState } from "react";
import { MarginCard } from "@/components/margin-card";
import { BrokerAuthWrapper } from "../broker-auth-wrapper";
import { getMargin } from "@/lib/api";

export default function MarginPage() {
  const [marginData, setMarginData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarginData = async () => {
      try {
        const response = await getMargin();
        console.log("this is my margin data", response)
        const balanceList = response?.data?.result?.BalanceList;
        if (Array.isArray(balanceList) && balanceList.length > 0) {
          setMarginData(balanceList[0]);
        } else {
          throw new Error("Invalid margin data format");
        }
      } catch (error: any) {
        setError(error.response?.data?.message || "Failed to fetch margin data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarginData();
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  return (
    <BrokerAuthWrapper>
      <div className="container mx-auto p-6">
        {marginData ? (
          <MarginCard marginData={marginData} />
        ) : (
          <div className="text-center">No margin data available</div>
        )}
      </div>
    </BrokerAuthWrapper>
  );
}
