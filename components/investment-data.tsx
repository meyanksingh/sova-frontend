"use client"

import { ArrowUpIcon, ArrowDownIcon } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface FiiDataItem {
  BuyValue: string;
  SellValue: string;
  NetValue: string;
  Date: string;
  Category: string;
}

export default function InvestmentData() {
  const fiiData: FiiDataItem[] = [
    {
      Date: "10-Mar-2025",
      Category: "FII/FPI",
      BuyValue: "25678.45",
      SellValue: "23456.78", 
      NetValue: "2221.67"
    },
    {
      Date: "09-Mar-2024",
      Category: "DII",
      BuyValue: "18765.32",
      SellValue: "17654.21",
      NetValue: "1111.11"
    },
    {
      Date: "09-Mar-2024", 
      Category: "Pro",
      BuyValue: "12345.67",
      SellValue: "18234.56",
      NetValue: "-5602.11"
    }
  ]

  return (
    <div className="overflow-auto">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Buy Value</TableHead>
            <TableHead>Sell Value</TableHead>
            <TableHead>Net Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fiiData.map((row, index) => (
            <TableRow key={index} className="hover:bg-muted/50">
              <TableCell className="font-medium">{row.Date}</TableCell>
              <TableCell>{row.Category}</TableCell>
              <TableCell>
                <ValueWithTrend value={parseFloat(row.BuyValue.replace(/,/g, ''))} />
              </TableCell>
              <TableCell>
                <ValueWithTrend value={parseFloat(row.SellValue.replace(/,/g, ''))} />
              </TableCell>
              <TableCell>
                <ValueWithTrend value={parseFloat(row.NetValue.replace(/,/g, ''))} />
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
