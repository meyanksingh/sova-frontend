"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Sidebar } from "@/components/sidebar"
// import { api } from "@/services/api"
// import { Holding } from "@/types/api"

export default function Holdings() {
  const [holdings, setHoldings] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [clientId, setClientId] = useState<string>("")
  

  useEffect(() => {
    // const fetchHoldings = async () => {
    //   try {
    //     const response = await api.getHoldings()
    //     setHoldings(response || [])
    //   } catch (err) {
    //     setError("Failed to load holdings. Please try again later.")
    //   } finally {
    //     setIsLoading(false)
    //   }
    // }

    // fetchHoldings()
  }, [])

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-4xl font-bold mb-6">Holdings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Current Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          {holdings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Holdings Found</h3>
              <p className="text-gray-500">You currently don't have any holdings in your portfolio.</p>
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
  )
}
