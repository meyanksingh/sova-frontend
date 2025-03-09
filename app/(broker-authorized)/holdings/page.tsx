"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BrokerAuthWrapper } from "../broker-auth-wrapper"

interface Holding {
  symbol: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  value: number;
}

const dummyHoldings: Holding[] = [
  {
    symbol: "RELIANCE",
    quantity: 50,
    averagePrice: 2450.75,
    currentPrice: 2580.25,
    value: 129012.50
  },
  {
    symbol: "HDFCBANK",
    quantity: 100,
    averagePrice: 1580.50,
    currentPrice: 1620.75,
    value: 162075.00
  },
  {
    symbol: "TCS",
    quantity: 25,
    averagePrice: 3750.25,
    currentPrice: 3890.50,
    value: 97262.50
  },
  {
    symbol: "INFY",
    quantity: 75,
    averagePrice: 1450.80,
    currentPrice: 1520.25,
    value: 114018.75
  },
  {
    symbol: "ICICIBANK",
    quantity: 150,
    averagePrice: 920.50,
    currentPrice: 975.80,
    value: 146370.00
  },
  {
    symbol: "BHARTIARTL",
    quantity: 80,
    averagePrice: 850.25,
    currentPrice: 890.50,
    value: 71240.00
  },
  {
    symbol: "TATAMOTORS",
    quantity: 200,
    averagePrice: 650.75,
    currentPrice: 720.25,
    value: 144050.00
  }
];

const portfolioSummary = {
  totalInvestedValue: dummyHoldings.reduce((acc, holding) => acc + (holding.averagePrice * holding.quantity), 0),
  currentValue: dummyHoldings.reduce((acc, holding) => acc + holding.value, 0),
  realizedProfit: 45680.50
};

export default function Holdings() {
  return (
    <div className="min-h-screen bg-background">
      <BrokerAuthWrapper>
        <div className="container mx-auto p-6 space-y-8">
          {/* Portfolio Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-primary">Total Invested Value</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  ₹{portfolioSummary.totalInvestedValue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-primary">Current Value</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-2xl font-bold ${portfolioSummary.currentValue >= portfolioSummary.totalInvestedValue ? "text-green-600" : "text-red-600"}`}>
                  ₹{portfolioSummary.currentValue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-primary">Realized Profit</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-2xl font-bold ${portfolioSummary.realizedProfit >= 0 ? "text-green-600" : "text-red-600"}`}>
                  ₹{portfolioSummary.realizedProfit.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Holdings Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Current Holdings</CardTitle>
            </CardHeader>
            <CardContent>
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
                  {dummyHoldings.map((holding) => (
                    <TableRow key={holding.symbol}>
                      <TableCell className="font-medium">{holding.symbol}</TableCell>
                      <TableCell>{holding.quantity}</TableCell>
                      <TableCell>₹{holding.averagePrice.toFixed(2)}</TableCell>
                      <TableCell>₹{holding.currentPrice.toFixed(2)}</TableCell>
                      <TableCell>₹{holding.value.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </BrokerAuthWrapper>
    </div>
  )
}
