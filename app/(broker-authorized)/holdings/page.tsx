"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import AuthorizedLayout from "../AuthorizedLayout"
// import { api } from "@/services/api"
// import { Holding } from "@/types/api"

interface Holding {
  symbol: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  value: number;
}

export default function Holdings() {
  const [holdings, setHoldings] = useState<Holding[]>([]) // Specify the type for holdings
  const [isLoading, setIsLoading] = useState(true) // Set initial loading state to true
  const [error, setError] = useState<string | null>(null)
  const [clientId, setClientId] = useState<string>("")
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [currentView, setCurrentView] = useState("dashboard")

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        // const response = await api.getHoldings()
        // setHoldings(response || [])
        setHoldings([]); // Placeholder for testing
      } catch (err) {
        setError("Failed to load holdings. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchHoldings()
  }, [])

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>

  return (
    <div className="min-h-screen bg-background">
      <AuthorizedLayout>
        <div className="container mx-auto p-6 space-y-8">

          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Current Holdings</CardTitle>
            </CardHeader>
            <CardContent>
              {holdings.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <h3 className="text-lg font-semibold mb-2">No Holdings Found</h3>
                  <p className="">You currently don't have any holdings in your portfolio.</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Symbol</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Average Price</TableHead>
                      <TableHead>Current Price</TableHead>
                      <TableHead>Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {holdings.map((holding) => (
                      <TableRow key={holding.symbol}>
                        <TableCell>{holding.symbol}</TableCell>
                        <TableCell>{holding.quantity}</TableCell>
                        <TableCell>{holding.averagePrice.toFixed(2)}</TableCell>
                        <TableCell>{holding.currentPrice.toFixed(2)}</TableCell>
                        <TableCell>{holding.value.toFixed(2)}</TableCell>
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
