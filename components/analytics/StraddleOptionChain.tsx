import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const straddleData = [
  {
    strike: 19300,
    callPrice: 280.5,
    callIV: 12.5,
    putPrice: 130.25,
    putIV: 13.2,
    straddle: 410.75,
    isATM: false,
  },
  {
    strike: 19400,
    callPrice: 220.75,
    callIV: 12.8,
    putPrice: 170.5,
    putIV: 13.5,
    straddle: 391.25,
    isATM: false,
  },
  {
    strike: 19500,
    callPrice: 170.25,
    callIV: 13.1,
    putPrice: 220.0,
    putIV: 13.8,
    straddle: 390.25,
    isATM: true,
  },
  {
    strike: 19600,
    callPrice: 130.5,
    callIV: 13.4,
    putPrice: 280.75,
    putIV: 14.1,
    straddle: 411.25,
    isATM: false,
  },
  {
    strike: 19700,
    callPrice: 95.25,
    callIV: 13.7,
    putPrice: 345.5,
    putIV: 14.4,
    straddle: 440.75,
    isATM: false,
  },
]

export function StraddleOptionChain() {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Strike</TableHead>
            <TableHead>Call Price</TableHead>
            <TableHead>Call IV%</TableHead>
            <TableHead>Put Price</TableHead>
            <TableHead>Put IV%</TableHead>
            <TableHead>Straddle</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {straddleData.map((row) => (
            <TableRow key={row.strike} className={row.isATM ? "bg-primary/10" : ""}>
              <TableCell className="font-medium">
                {row.strike}
                {row.isATM && (
                  <Badge variant="outline" className="ml-2 bg-primary/20 text-primary border-primary/30">
                    ATM
                  </Badge>
                )}
              </TableCell>
              <TableCell>{row.callPrice.toFixed(2)}</TableCell>
              <TableCell>{row.callIV.toFixed(1)}%</TableCell>
              <TableCell>{row.putPrice.toFixed(2)}</TableCell>
              <TableCell>{row.putIV.toFixed(1)}%</TableCell>
              <TableCell className="font-bold">{row.straddle.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

