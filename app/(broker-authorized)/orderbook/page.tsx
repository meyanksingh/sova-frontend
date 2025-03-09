"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { BrokerAuthWrapper } from "../broker-auth-wrapper"

interface Order {
  AppOrderID: number;
  TradingSymbol: string;
  OrderType: string;
  OrderSide: string;
  OrderQuantity: number;
  OrderPrice: number;
  OrderStatus: string;
  ExchangeSegment: string;
  OrderGeneratedDateTime: string;
}

const dummyOrders: Order[] = [
  {
    AppOrderID: 1,
    TradingSymbol: "BANKNIFTY25MAR47000CE",
    OrderType: "LIMIT",
    OrderSide: "BUY",
    OrderQuantity: 25,
    OrderPrice: 420.50,
    OrderStatus: "Completed",
    ExchangeSegment: "NFO",
    OrderGeneratedDateTime: "2024-03-10T09:15:00.000Z"
  },
  {
    AppOrderID: 2,
    TradingSymbol: "BANKNIFTY25MAR46500PE",
    OrderType: "MARKET",
    OrderSide: "SELL",
    OrderQuantity: 15,
    OrderPrice: 380.25,
    OrderStatus: "Completed",
    ExchangeSegment: "NFO",
    OrderGeneratedDateTime: "2024-03-10T09:20:00.000Z"
  },
  {
    AppOrderID: 3,
    TradingSymbol: "RELIANCE",
    OrderType: "LIMIT",
    OrderSide: "BUY",
    OrderQuantity: 50,
    OrderPrice: 2450.75,
    OrderStatus: "Pending",
    ExchangeSegment: "NSE",
    OrderGeneratedDateTime: "2024-03-10T09:25:00.000Z"
  },
  {
    AppOrderID: 4,
    TradingSymbol: "HDFCBANK",
    OrderType: "MARKET",
    OrderSide: "SELL",
    OrderQuantity: 100,
    OrderPrice: 1580.50,
    OrderStatus: "Rejected",
    ExchangeSegment: "NSE",
    OrderGeneratedDateTime: "2024-03-10T09:30:00.000Z"
  },
  {
    AppOrderID: 5,
    TradingSymbol: "BANKNIFTY25MARFUT",
    OrderType: "LIMIT",
    OrderSide: "BUY",
    OrderQuantity: 5,
    OrderPrice: 46750.25,
    OrderStatus: "Completed",
    ExchangeSegment: "NFO",
    OrderGeneratedDateTime: "2024-03-10T09:35:00.000Z"
  },
  {
    AppOrderID: 6,
    TradingSymbol: "NIFTY25MAR22000CE",
    OrderType: "MARKET",
    OrderSide: "SELL",
    OrderQuantity: 75,
    OrderPrice: 125.40,
    OrderStatus: "Completed",
    ExchangeSegment: "NFO",
    OrderGeneratedDateTime: "2024-03-10T09:40:00.000Z"
  },
  {
    AppOrderID: 7,
    TradingSymbol: "TCS",
    OrderType: "LIMIT",
    OrderSide: "BUY",
    OrderQuantity: 25,
    OrderPrice: 3750.25,
    OrderStatus: "Pending",
    ExchangeSegment: "NSE",
    OrderGeneratedDateTime: "2024-03-10T09:45:00.000Z"
  },
  {
    AppOrderID: 8,
    TradingSymbol: "INFY",
    OrderType: "MARKET",
    OrderSide: "SELL",
    OrderQuantity: 75,
    OrderPrice: 1450.80,
    OrderStatus: "Rejected",
    ExchangeSegment: "NSE",
    OrderGeneratedDateTime: "2024-03-10T09:50:00.000Z"
  },
  {
    AppOrderID: 9,
    TradingSymbol: "BANKNIFTY25MAR48000CE",
    OrderType: "LIMIT",
    OrderSide: "BUY",
    OrderQuantity: 15,
    OrderPrice: 125.40,
    OrderStatus: "Completed",
    ExchangeSegment: "NFO",
    OrderGeneratedDateTime: "2024-03-10T09:55:00.000Z"
  },
  {
    AppOrderID: 10,
    TradingSymbol: "BANKNIFTY25MAR46000PE",
    OrderType: "MARKET",
    OrderSide: "SELL",
    OrderQuantity: 20,
    OrderPrice: 275.80,
    OrderStatus: "Completed",
    ExchangeSegment: "NFO",
    OrderGeneratedDateTime: "2024-03-10T10:00:00.000Z"
  }
];

export default function Orderbook() {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Completed': return 'default';
      case 'Rejected': return 'destructive';
      case 'Pending': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <BrokerAuthWrapper>
        <div className="container mx-auto p-6 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Orderbook</CardTitle>
            </CardHeader>
            <CardContent>
              {dummyOrders.length === 0 ? (
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
                    {dummyOrders.map((order) => (
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
                        <TableCell>{new Date(order.OrderGeneratedDateTime).toLocaleString()}</TableCell>
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