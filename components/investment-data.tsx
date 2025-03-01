"use client"

import { ArrowUpIcon, ArrowDownIcon } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const investmentData = [
  {
    date: "Jul 25, 2023",
    equity: 2345.67,
    debt: -567.89,
    total: 1777.78,
  },
  {
    date: "Jul 24, 2023",
    equity: 1876.54,
    debt: 234.56,
    total: 2111.1,
  },
  {
    date: "Jul 21, 2023",
    equity: -987.65,
    debt: -123.45,
    total: -1111.1,
  },
  {
    date: "Jul 20, 2023",
    equity: 1234.56,
    debt: 345.67,
    total: 1580.23,
  },
  {
    date: "Jul 19, 2023",
    equity: -567.89,
    debt: 789.12,
    total: 221.23,
  },
]

export default function InvestmentData() {
  return (
    <div className="overflow-auto">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead>Equity</TableHead>
            <TableHead>Debt</TableHead>
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {investmentData.map((row, index) => (
            <TableRow key={index} className="hover:bg-muted/50">
              <TableCell className="font-medium">{row.date}</TableCell>
              <TableCell>
                <ValueWithTrend value={row.equity} />
              </TableCell>
              <TableCell>
                <ValueWithTrend value={row.debt} />
              </TableCell>
              <TableCell>
                <ValueWithTrend value={row.total} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function ValueWithTrend({ value }: { value: number }) {
  const isPositive = value >= 0
  return (
    <div className={`flex items-center ${isPositive ? "text-green-500" : "text-red-500"}`}>
      {isPositive ? <ArrowUpIcon className="h-4 w-4 mr-1" /> : <ArrowDownIcon className="h-4 w-4 mr-1" />}
      <span className="tabular-nums">{value.toFixed(2)}</span>
    </div>
  )
}

