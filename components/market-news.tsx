"use client"

import { ScrollArea } from "@/components/ui/scroll-area"

const newsData = [
  {
    newsHeading: "Fed signals potential rate cuts in 2024, markets rally",
    newsLink: "#",
    timestamp: "2 hours ago",
    source: "Reuters",
  },
  {
    newsHeading: "NIFTY hits new all-time high crossing 22,500",
    newsLink: "#",
    timestamp: "3 hours ago",
    source: "Economic Times",
  },
  {
    newsHeading: "RBI maintains repo rate at 6.5%, stance unchanged",
    newsLink: "#",
    timestamp: "4 hours ago",
    source: "Livemint",
  },
  {
    newsHeading: "IT sector leads market gains on strong US tech performance",
    newsLink: "#",
    timestamp: "5 hours ago",
    source: "Financial Express",
  },
  {
    newsHeading: "Oil prices stabilize as Middle East tensions ease",
    newsLink: "#",
    timestamp: "6 hours ago",
    source: "Bloomberg",
  },
]

export function MarketNews({ newsCount = 5 }: { newsCount?: number }) {
  return (
    <ScrollArea className="h-[300px] pr-4">
      <div className="space-y-4">
        {newsData.slice(0, newsCount).map((item, index) => (
          <div key={index} className="border-b border-border/40 pb-3 last:border-0">
            <a href={item.newsLink} className="text-sm font-medium hover:text-primary block transition-colors">
              {item.newsHeading}
            </a>
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-muted-foreground">{item.source}</span>
              <span className="text-xs text-muted-foreground">{item.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

