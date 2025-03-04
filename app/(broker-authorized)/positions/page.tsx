"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BrokerAuthWrapper } from "../broker-auth-wrapper";
import { getPositions } from "@/lib/api";

interface Position {
  symbol: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  pnl: number;
}

export default function Positions() {
  const [positions, setPositions] = useState<Position[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        setIsLoading(true);
        const response = await getPositions();
        console.log("Fetched Positions Data:", response);

        // Extract positions list safely
        const positionsList = response?.data?.result?.positionsList;
        if (Array.isArray(positionsList)) {
          setPositions(positionsList); // Set the extracted positions list
        } else {
          throw new Error("Invalid positions data format");
        }
      } catch (err) {
        setError("Failed to fetch positions. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPositions();
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }


  return (
    <div className="min-h-screen bg-background">
      <BrokerAuthWrapper>
        <div className="container mx-auto p-6 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Current Positions</CardTitle>
            </CardHeader>
            <CardContent>
              {positions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <h3 className="text-lg font-semibold mb-2">No Positions Found</h3>
                  <p className="">You currently don't have any open positions.</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Symbol</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Average Price</TableHead>
                      <TableHead>Current Price</TableHead>
                      <TableHead>P&L</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {positions.map((position, index) => (
                      <TableRow key={index}>
                        <TableCell>{position.symbol}</TableCell>
                        <TableCell>{position.quantity}</TableCell>
                        <TableCell>{position.averagePrice?.toFixed(2) || "0.00"}</TableCell>
                        <TableCell>{position.currentPrice?.toFixed(2) || "0.00"}</TableCell>
                        <TableCell className={position.pnl >= 0 ? "text-green-600" : "text-red-600"}>
                          {position.pnl?.toFixed(2) || "0.00"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </BrokerAuthWrapper>
    </div>
  );
}
