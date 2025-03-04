"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import AuthorizedLayout from "../../(authorized)/AuthorizedLayout"

interface Order {
  AppOrderID: string;
  TradingSymbol: string;
  OrderType: string;
  OrderSide: string;
  OrderQuantity: number;
  OrderPrice: number;
  OrderStatus: string;
  ExchangeSegment: string;
  OrderGeneratedDateTime: string;
}

export default function Orderbook() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Hardcoded data for orders
    const hardcodedOrders: Order[] = [
      {
        AppOrderID: "1",
        TradingSymbol: "AAPL",
        OrderType: "Limit",
        OrderSide: "BUY",
        OrderQuantity: 10,
        OrderPrice: 150.00,
        OrderStatus: "Completed",
        ExchangeSegment: "NASDAQ",
        OrderGeneratedDateTime: "2023-10-01T10:00:00Z"
      },
      {
        AppOrderID: "2",
        TradingSymbol: "GOOGL",
        OrderType: "Market",
        OrderSide: "SELL",
        OrderQuantity: 5,
        OrderPrice: 2800.00,
        OrderStatus: "Pending",
        ExchangeSegment: "NASDAQ",
        OrderGeneratedDateTime: "2023-10-01T10:05:00Z"
      },
      {
        AppOrderID: "3",
        TradingSymbol: "TSLA",
        OrderType: "Stop",
        OrderSide: "BUY",
        OrderQuantity: 8,
        OrderPrice: 700.00,
        OrderStatus: "Rejected",
        ExchangeSegment: "NASDAQ",
        OrderGeneratedDateTime: "2023-10-01T10:10:00Z"
      },
    ];

    setOrders(hardcodedOrders);
    setIsLoading(false);
  }, [])

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'default';
      case 'Rejected':
        return 'destructive';
      case 'Pending':
        return 'secondary';
      default:
        return 'outline';
    }
  }

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>

  return (
    <div className="min-h-screen bg-background">
      <AuthorizedLayout>
        <div className="container mx-auto p-6 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Orderbook</CardTitle>
            </CardHeader>
            <CardContent>
              {orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Orders Found</h3>
                  <p className="text-gray-500">You haven't placed any orders yet.</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Symbol</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Side</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Exchange</TableHead>
                      <TableHead>Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.AppOrderID}>
                        <TableCell>{order.TradingSymbol}</TableCell>
                        <TableCell>{order.OrderType}</TableCell>
                        <TableCell>
                          <Badge variant={order.OrderSide === 'BUY' ? 'default' : 'destructive'}>
                            {order.OrderSide}
                          </Badge>
                        </TableCell>
                        <TableCell>{order.OrderQuantity}</TableCell>
                        <TableCell>{order.OrderPrice.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(order.OrderStatus)}>
                            {order.OrderStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>{order.ExchangeSegment}</TableCell>
                        <TableCell>
                          {order.OrderGeneratedDateTime}
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
