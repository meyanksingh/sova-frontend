"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MarginCard } from "@/components/margin-card";
import { BrokerAuthWrapper } from "../broker-auth-wrapper";

const dummyMarginData = {
  cashBalance: 500000.00,
  payInAmount: 25000.00,
  payOutAmount: 15000.00,
  availableMargin: 450000.00,
  usedMargin: 150000.00,
  blockedMargin: 100000.00,
  branchId: "MAIN",
  exchange: "NSE",
  product: "ALL",
  openingBalance: 525000.00,
  collateralAmount: 75000.00,
  span: 85000.00,
  exposure: 65000.00,
  limitObject: {
    RMSSubLimits: {
      netMarginAvailable: 50000,
      cashAvailable: 20000,
      marginUtilized: 15000,
      collateral: 10000,
      MTM: 5000,
      RealizedMTM: 3000,
      UnrealizedMTM: 2000,
    },
    marginAvailable: {
      CashMarginAvailable: 100000,
      DirectCollateral: 50000,
      HoldingCollateral: 20000,
      PayInAmount: 10000,
      PayOutAmount: 5000,
    },
    marginUtilized: {
      MarginUsed: 30000,
      CNCAmountUsed: 10000,
      ExposureMarginPresent: 5000,
      TotalSpanMargin: 7000,
    },
  },
  adhocMargin: 50000.00,
  grossExposureValue: 250000.00,
  netExposureValue: 200000.00,
  category: "Individual",
  status: "Active",
};

export default function MarginPage() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <BrokerAuthWrapper>
      <div className="container mx-auto p-6 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-primary">Available to Trade</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-600">
                ₹{formatCurrency(dummyMarginData.availableMargin)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-primary">Utilized Margin</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-blue-600">
                ₹{formatCurrency(dummyMarginData.usedMargin)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-primary">Blocked Margin</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-orange-600">
                ₹{formatCurrency(dummyMarginData.blockedMargin)}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Pass the full margin data object to MarginCard */}
        <MarginCard marginData={dummyMarginData} />
      </div>
    </BrokerAuthWrapper>
  );
}
