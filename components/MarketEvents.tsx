import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, TrendingUp, BarChart, AlertCircle, FileText } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const marketEventsData = [
  {
    title: "Q1 Results: Infosys beats estimates, revenue up 7.2%",
    category: "Earnings",
    date: "2023-07-15",
    impact: "Positive",
    details:
      "Infosys reported Q1 revenue of ₹38,256 crore, up 7.2% YoY, beating analyst estimates. The company raised its FY24 revenue growth guidance to 5-7%.",
    icon: FileText,
  },
  {
    title: "RBI Monetary Policy: Repo rate unchanged at 6.5%",
    category: "Policy",
    date: "2023-07-08",
    impact: "Neutral",
    details:
      "The Reserve Bank of India maintained the repo rate at 6.5% for the third consecutive meeting, in line with market expectations. Inflation forecast revised to 5.1% for FY24.",
    icon: BarChart,
  },
  {
    title: "Adani Group stocks rally after SEBI investigation update",
    category: "Market Movement",
    date: "2023-07-05",
    impact: "Positive",
    details:
      "Adani Group stocks rallied up to 15% after SEBI provided an update on its ongoing investigation, easing investor concerns about regulatory actions.",
    icon: TrendingUp,
  },
  {
    title: "GST Council Meeting: Tax rates revised for multiple items",
    category: "Tax",
    date: "2023-06-30",
    impact: "Mixed",
    details:
      "The GST Council revised tax rates for several items including mobile phones, insurance premiums, and packaged food products. Implementation expected from August 1.",
    icon: AlertCircle,
  },
  {
    title: "IPO Alert: LIC Housing Finance to launch ₹5,000 crore issue",
    category: "IPO",
    date: "2023-06-25",
    impact: "Neutral",
    details:
      "LIC Housing Finance announced plans to raise ₹5,000 crore through an initial public offering. The issue will open on July 10 and close on July 14.",
    icon: Calendar,
  },
]

const stockResultsData = [
  { company: "TCS", date: "Jul 12", expectedEPS: "₹25.8", prevEPS: "₹23.5", yoyGrowth: "+9.8%" },
  { company: "HDFC Bank", date: "Jul 15", expectedEPS: "₹18.2", prevEPS: "₹16.9", yoyGrowth: "+7.7%" },
  { company: "Reliance", date: "Jul 21", expectedEPS: "₹15.5", prevEPS: "₹14.2", yoyGrowth: "+9.2%" },
  { company: "ITC", date: "Jul 25", expectedEPS: "₹4.8", prevEPS: "₹4.3", yoyGrowth: "+11.6%" },
  { company: "Axis Bank", date: "Jul 28", expectedEPS: "₹12.3", prevEPS: "₹10.9", yoyGrowth: "+12.8%" },
]

export function MarketEvents() {
  return (
    <Tabs defaultValue="events" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="events">Market Events</TabsTrigger>
        <TabsTrigger value="results">Upcoming Results</TabsTrigger>
      </TabsList>

      <TabsContent value="events" className="mt-4 space-y-6">
        {marketEventsData.map((event, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center">
                <div
                  className={`
                  mr-3 rounded-full p-2
                  ${
                    event.impact === "Positive"
                      ? "bg-green-500/10"
                      : event.impact === "Negative"
                        ? "bg-red-500/10"
                        : event.impact === "Mixed"
                          ? "bg-yellow-500/10"
                          : "bg-blue-500/10"
                  }
                `}
                >
                  <event.icon
                    className={`
                    h-5 w-5
                    ${
                      event.impact === "Positive"
                        ? "text-green-500"
                        : event.impact === "Negative"
                          ? "text-red-500"
                          : event.impact === "Mixed"
                            ? "text-yellow-500"
                            : "text-blue-500"
                    }
                  `}
                  />
                </div>
                <CardTitle className="text-lg">{event.title}</CardTitle>
              </div>
              <Badge variant="outline">{event.category}</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">{event.details}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">{event.date}</span>
                <Badge
                  className={
                    event.impact === "Positive"
                      ? "bg-green-500/10 text-green-500 border-green-500/20"
                      : event.impact === "Negative"
                        ? "bg-red-500/10 text-red-500 border-red-500/20"
                        : event.impact === "Mixed"
                          ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                          : "bg-blue-500/10 text-blue-500 border-blue-500/20"
                  }
                >
                  {event.impact} Impact
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </TabsContent>

      <TabsContent value="results" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Quarterly Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Company</th>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Expected EPS</th>
                    <th className="text-left py-3 px-4">Previous EPS</th>
                    <th className="text-left py-3 px-4">YoY Growth</th>
                  </tr>
                </thead>
                <tbody>
                  {stockResultsData.map((result, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">{result.company}</td>
                      <td className="py-3 px-4">{result.date}</td>
                      <td className="py-3 px-4">{result.expectedEPS}</td>
                      <td className="py-3 px-4">{result.prevEPS}</td>
                      <td className="py-3 px-4 text-green-500">{result.yoyGrowth}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

