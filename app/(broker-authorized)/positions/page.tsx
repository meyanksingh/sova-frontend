"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BrokerAuthWrapper } from "../broker-auth-wrapper";

interface Position {
  symbol: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  pnl: number;
}

const dummyPositions: Position[] = [
  {
    symbol: "BANKNIFTY25MAR47000CE",
    quantity: 25,
    averagePrice: 420.50,
    currentPrice: 485.75,
    pnl: (485.75 - 420.50) * 25
  },
  {
    symbol: "BANKNIFTY25MAR46500PE", 
    quantity: -15,
    averagePrice: 380.25,
    currentPrice: 320.80,
    pnl: (380.25 - 320.80) * 15
  },
  {
    symbol: "BANKNIFTY25MARFUT",
    quantity: 5,
    averagePrice: 46750.25,
    currentPrice: 46890.50,
    pnl: (46890.50 - 46750.25) * 5
  },
  {
    symbol: "BANKNIFTY25MAR47500CE",
    quantity: -30,
    averagePrice: 225.50,
    currentPrice: 185.25,
    pnl: (225.50 - 185.25) * 30
  },
  {
    symbol: "BANKNIFTY25MAR46000PE",
    quantity: 20,
    averagePrice: 275.80,
    currentPrice: 245.60,
    pnl: (245.60 - 275.80) * 20
  },
  {
    symbol: "BANKNIFTY25MAR48000CE",
    quantity: 15,
    averagePrice: 125.40,
    currentPrice: 165.75,
    pnl: (165.75 - 125.40) * 15
  }
];

const profitSummary = {
  realizedProfit: 28450.75,
  unrealizedProfit: dummyPositions.reduce((acc, pos) => acc + pos.pnl, 0),
  get mtm() { return this.realizedProfit + this.unrealizedProfit; }
};

export default function Positions() {
  return (
    <div className="min-h-screen bg-background">
      <BrokerAuthWrapper>
        <div className="container mx-auto p-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-primary">Realized P&L</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-2xl font-bold ${profitSummary.realizedProfit >= 0 ? "text-green-600" : "text-red-600"}`}>
                  ₹{profitSummary.realizedProfit.toFixed(2)}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-primary">Unrealized P&L</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-2xl font-bold ${profitSummary.unrealizedProfit >= 0 ? "text-green-600" : "text-red-600"}`}>
                  ₹{profitSummary.unrealizedProfit.toFixed(2)}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-primary">Total MTM</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-2xl font-bold ${profitSummary.mtm >= 0 ? "text-green-600" : "text-red-600"}`}>
                  ₹{profitSummary.mtm.toFixed(2)}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Current Positions</CardTitle>
            </CardHeader>
            <CardContent>
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
                  {dummyPositions.map((position, index) => (
                    <TableRow key={index}>
                      <TableCell>{position.symbol}</TableCell>
                      <TableCell>{position.quantity}</TableCell>
                      <TableCell>₹{position.averagePrice.toFixed(2)}</TableCell>
                      <TableCell>₹{position.currentPrice.toFixed(2)}</TableCell>
                      <TableCell className={position.pnl >= 0 ? "text-green-600" : "text-red-600"}>
                        ₹{position.pnl.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </BrokerAuthWrapper>
    </div>
  );
}
