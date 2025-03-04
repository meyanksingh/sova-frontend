import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface MarginDetailsProps {
  label: string;
  value: string | number;
}

function MarginDetail({ label, value }: MarginDetailsProps) {
  // Format the value to a readable number
  const formattedValue = typeof value === 'string' ? 
    (value === 'NaN' ? '0' : parseFloat(value).toLocaleString('en-IN', { 
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    })) : 
    value.toLocaleString('en-IN', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    });

  return (
    <div className="flex justify-between items-center py-1">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">₹ {formattedValue}</span>
    </div>
  );
}

export function MarginCard({ marginData }: { marginData: any }) {
  const { RMSSubLimits, marginAvailable, marginUtilized } = marginData.limitObject;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Margin Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* RMS Limits Section */}
        <div>
          <h3 className="font-semibold mb-2">RMS Limits</h3>
          <div className="space-y-1">
            <MarginDetail label="Net Margin Available" value={RMSSubLimits.netMarginAvailable} />
            <MarginDetail label="Cash Available" value={RMSSubLimits.cashAvailable} />
            <MarginDetail label="Margin Utilized" value={RMSSubLimits.marginUtilized} />
            <MarginDetail label="Collateral" value={RMSSubLimits.collateral} />
            <MarginDetail label="MTM" value={RMSSubLimits.MTM} />
            <MarginDetail label="Realized MTM" value={RMSSubLimits.RealizedMTM} />
            <MarginDetail label="Unrealized MTM" value={RMSSubLimits.UnrealizedMTM} />
          </div>
        </div>

        <Separator />

        {/* Available Margin Section */}
        <div>
          <h3 className="font-semibold mb-2">Available Margin</h3>
          <div className="space-y-1">
            <MarginDetail label="Cash Margin" value={marginAvailable.CashMarginAvailable} />
            <MarginDetail label="Direct Collateral" value={marginAvailable.DirectCollateral} />
            <MarginDetail label="Holding Collateral" value={marginAvailable.HoldingCollateral} />
            <MarginDetail label="Pay-In Amount" value={marginAvailable.PayInAmount} />
            <MarginDetail label="Pay-Out Amount" value={marginAvailable.PayOutAmount} />
          </div>
        </div>

        <Separator />

        {/* Utilized Margin Section */}
        <div>
          <h3 className="font-semibold mb-2">Utilized Margin</h3>
          <div className="space-y-1">
            <MarginDetail label="Margin Used" value={marginUtilized.MarginUsed} />
            <MarginDetail label="CNC Amount Used" value={marginUtilized.CNCAmountUsed} />
            <MarginDetail label="Exposure Margin" value={marginUtilized.ExposureMarginPresent} />
            <MarginDetail label="Span Margin" value={marginUtilized.TotalSpanMargin} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 