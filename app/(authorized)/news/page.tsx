import { MarketEvents } from "@/components/MarketEvents"
import AuthorizedLayout from "../AuthorizedLayout"

export default function NewsPage() {
  return (
    <AuthorizedLayout>
    <div className="container mx-auto p-6 space-y-6">
     
      <MarketEvents />
    </div>
    </AuthorizedLayout>
  )
}

