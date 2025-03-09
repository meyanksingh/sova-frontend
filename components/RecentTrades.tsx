import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const recentTrades = [
  { date: "2024-01-15", asset: "BANKNIFTY 47500 CE", type: "Buy", quantity: 25, price: 150.25 },
  { date: "2024-01-15", asset: "BANKNIFTY 47000 PE", type: "Sell", quantity: 25, price: 85.50 },
  { date: "2024-01-16", asset: "BANKNIFTY 47200 CE", type: "Buy", quantity: 50, price: 125.75 },
  { date: "2024-01-16", asset: "BANKNIFTY 46800 PE", type: "Sell", quantity: 25, price: 95.25 },
  { date: "2024-01-17", asset: "BANKNIFTY 47300 CE", type: "Buy", quantity: 75, price: 110.50 },
]

export default function RecentTrades() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Asset</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentTrades.map((trade, index) => (
          <TableRow key={index}>
            <TableCell>{trade.date}</TableCell>
            <TableCell>{trade.asset}</TableCell>
            <TableCell className={trade.type === "Buy" ? "text-green-500" : "text-red-500"}>{trade.type}</TableCell>
            <TableCell>{trade.quantity}</TableCell>
            <TableCell>₹{trade.price.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
