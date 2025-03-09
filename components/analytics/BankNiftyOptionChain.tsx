
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const optionChainData = [
  {
    strike: 46000,
    callOI: "12.5K",
    callChange: "+2.3K",
    callLTP: 350.25,
    callVolume: "8.7K",
    putOI: "8.2K",
    putChange: "-1.5K",
    putLTP: 120.75,
    putVolume: "5.3K",
  },
  {
    strike: 46500,
    callOI: "15.7K",
    callChange: "+3.1K",
    callLTP: 210.5,
    callVolume: "10.2K",
    putOI: "10.5K",
    putChange: "-0.8K",
    putLTP: 180.25,
    putVolume: "7.1K",
  },
  {
    strike: 47000,
    callOI: "18.2K",
    callChange: "+4.5K",
    callLTP: 125.75,
    callVolume: "12.8K",
    putOI: "14.3K",
    putChange: "+1.2K",
    putLTP: 290.5,
    putVolume: "9.5K",
  },
  {
    strike: 47500,
    callOI: "10.8K",
    callChange: "-1.2K",
    callLTP: 75.25,
    callVolume: "6.3K",
    putOI: "16.7K",
    putChange: "+2.8K",
    putLTP: 450.75,
    putVolume: "11.2K",
  },
  {
    strike: 48000,
    callOI: "8.3K",
    callChange: "-2.5K",
    callLTP: 40.5,
    callVolume: "4.7K",
    putOI: "19.5K",
    putChange: "+3.5K",
    putLTP: 620.25,
    putVolume: "14.8K",
  },
]

export function BankNiftyOptionChain() {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead colSpan={4} className="text-center border-r">
              Call Options
            </TableHead>
            <TableHead className="text-center">Strike</TableHead>
            <TableHead colSpan={4} className="text-center border-l">
              Put Options
            </TableHead>
          </TableRow>
          <TableRow>
            <TableHead>OI</TableHead>
            <TableHead>Chng</TableHead>
            <TableHead>LTP</TableHead>
            <TableHead className="border-r">Volume</TableHead>
            <TableHead className="text-center font-bold">Price</TableHead>
            <TableHead className="border-l">OI</TableHead>
            <TableHead>Chng</TableHead>
            <TableHead>LTP</TableHead>
            <TableHead>Volume</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {optionChainData.map((row) => (
            <TableRow key={row.strike} className={row.strike === 47000 ? "bg-primary/10" : ""}>
              <TableCell>{row.callOI}</TableCell>
              <TableCell className={row.callChange.startsWith("+") ? "text-green-500" : "text-red-500"}>
                {row.callChange}
              </TableCell>
              <TableCell>{row.callLTP}</TableCell>
              <TableCell className="border-r">{row.callVolume}</TableCell>
              <TableCell className="text-center font-bold">{row.strike}</TableCell>
              <TableCell className="border-l">{row.putOI}</TableCell>
              <TableCell className={row.putChange.startsWith("+") ? "text-green-500" : "text-red-500"}>
                {row.putChange}
              </TableCell>
              <TableCell>{row.putLTP}</TableCell>
              <TableCell>{row.putVolume}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

