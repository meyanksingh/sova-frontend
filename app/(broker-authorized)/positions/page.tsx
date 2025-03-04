"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import AuthorizedLayout from "../../(authorized)/AuthorizedLayout"

interface Position {
  symbol: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  pnl: number;
}

export default function Positions() {
  const [positions, setPositions] = useState<Position[]>([]) // Specify the type for positions
  const [isLoading, setIsLoading] = useState(true) // Set initial loading state to true
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Hardcoded data for positions
    const hardcodedPositions: Position[] = [
      { symbol: "AAPL", quantity: 10, averagePrice: 150.00, currentPrice: 155.00, pnl: 50.00 },
      { symbol: "GOOGL", quantity: 5, averagePrice: 2800.00, currentPrice: 2750.00, pnl: -250.00 },
      { symbol: "TSLA", quantity: 8, averagePrice: 700.00, currentPrice: 720.00, pnl: 160.00 },
    ];

    setPositions(hardcodedPositions);
    setIsLoading(false); // Set loading to false after data is set
  }, [])

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>

  return (
    <div className="min-h-screen bg-background">
      <AuthorizedLayout>
        <div className="container mx-auto p-6 space-y-8">

          <Card>
            <CardHeader>
              <CardTitle>Current Positions</CardTitle>
            </CardHeader>
            <CardContent>
              {positions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Positions Found</h3>
                  <p className="text-gray-500">You currently don't have any open positions.</p>
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
                    {positions.map((position) => (
                      <TableRow key={position.symbol}>
                        <TableCell>{position.symbol}</TableCell>
                        <TableCell>{position.quantity}</TableCell>
                        <TableCell>{position.averagePrice.toFixed(2)}</TableCell>
                        <TableCell>{position.currentPrice.toFixed(2)}</TableCell>
                        <TableCell className={position.pnl >= 0 ? "text-green-600" : "text-red-600"}>
                          {position.pnl.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </AuthorizedLayout>
    </div>
  )
}
