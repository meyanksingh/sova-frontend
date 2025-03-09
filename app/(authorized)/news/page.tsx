import { MarketEvents } from "@/components/MarketEvents"
import AuthorizedLayout from "../AuthorizedLayout"

export default function NewsPage() {
  return (
    <AuthorizedLayout>
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Market Events</h1>
      <p className="text-muted-foreground">
        Stay updated with the latest market events, earnings announcements, and policy changes
      </p>
      <MarketEvents />
    </div>
    </AuthorizedLayout>
  )
}

