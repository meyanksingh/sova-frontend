"use client"

import { useEffect, useState } from "react"
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getFiiData } from "@/lib/api"
import { toast } from "sonner"

interface FiiDataItem {
  BuyValue: string;
  SellValue: string;
  NetValue: string;
  Date: string;
  Category: string;
}

export default function InvestmentData() {
  const [fiiData, setFiiData] = useState<FiiDataItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFiiData = async () => {
      try {
        const response = await getFiiData()
        if (response?.data && Array.isArray(response.data)) {
          setFiiData(response.data)
        } else {
          setFiiData([])
        }
      } catch (error) {
        console.error("Error fetching FII data:", error)
        toast.error("Failed to load FII data")
        setFiiData([])
      } finally {
        setLoading(false)
      }
    }

    fetchFiiData()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (fiiData.length === 0) {
    return <div>No FII data available</div>
  }

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

