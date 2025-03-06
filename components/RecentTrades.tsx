import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const recentTrades = [
  { date: "2023-06-01", asset: "AAPL", type: "Buy", quantity: 100, price: 150.25 },
  { date: "2023-06-02", asset: "GOOGL", type: "Sell", quantity: 50, price: 2500.75 },
  { date: "2023-06-03", asset: "MSFT", type: "Buy", quantity: 75, price: 300.5 },
  { date: "2023-06-04", asset: "AMZN", type: "Sell", quantity: 25, price: 3200.0 },
  { date: "2023-06-05", asset: "TSLA", type: "Buy", quantity: 30, price: 650.75 },
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
            <TableCell>${trade.price.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

