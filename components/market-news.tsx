"use client"

import { ScrollArea } from "@/components/ui/scroll-area"

const dummyNews = [
  {
    newsID: 1,
    newsHeading: "Sensex surges 500 points as IT stocks lead rally",
    newsLink: "#",
    source: "Economic Times",
    time: "2 hours ago"
  },
  {
    newsID: 2, 
    newsHeading: "RBI keeps repo rate unchanged at 6.5% in latest monetary policy",
    newsLink: "#",
    source: "Livemint",
    time: "3 hours ago"
  },
  {
    newsID: 3,
    newsHeading: "TCS Q3 profit rises 8.2% YoY, beats market estimates",
    newsLink: "#",
    source: "Business Standard",
    time: "4 hours ago"
  },
  {
    newsID: 4,
    newsHeading: "HDFC Bank reports strong credit growth in Q3FY24",
    newsLink: "#",
    source: "Moneycontrol",
    time: "5 hours ago"
  },
  {
    newsID: 5,
    newsHeading: "Adani Group stocks rally after Supreme Court verdict",
    newsLink: "#",
    source: "Livemint",
    time: "6 hours ago"
  },
  {
    newsID: 6,
    newsHeading: "Reliance Industries to demerge financial services arm",
    newsLink: "#",
    source: "Economic Times",
    time: "7 hours ago"
  },
  {
    newsID: 7,
    newsHeading: "Nifty Auto index hits new all-time high led by Tata Motors",
    newsLink: "#",
    source: "Business Standard",
    time: "8 hours ago"
  },
  {
    newsID: 8,
    newsHeading: "FIIs turn net buyers in Indian equities after three months",
    newsLink: "#",
    source: "Moneycontrol",
    time: "9 hours ago"
  },
  {
    newsID: 9,
    newsHeading: "Government approves PLI scheme for IT hardware manufacturing",
    newsLink: "#",
    source: "Livemint",
    time: "10 hours ago"
  },
  {
    newsID: 10,
    newsHeading: "Infosys revises FY24 revenue guidance upward",
    newsLink: "#",
    source: "Economic Times",
    time: "11 hours ago"
  },
  {
    newsID: 11,
    newsHeading: "SEBI introduces new regulations for mutual fund investments",
    newsLink: "#",
    source: "Business Standard",
    time: "12 hours ago"
  },
  {
    newsID: 12,
    newsHeading: "ITC shares hit record high on demerger speculation",
    newsLink: "#",
    source: "Moneycontrol",
    time: "13 hours ago"
  },
  {
    newsID: 13,
    newsHeading: "Coal India reports highest-ever production in December",
    newsLink: "#",
    source: "Livemint",
    time: "14 hours ago"
  },
  {
    newsID: 14,
    newsHeading: "Bharti Airtel launches 5G services in 125 new cities",
    newsLink: "#",
    source: "Economic Times",
    time: "15 hours ago"
  },
  {
    newsID: 15,
    newsHeading: "LIC increases stake in multiple Nifty50 companies",
    newsLink: "#",
    source: "Business Standard",
    time: "16 hours ago"
  }
]

export function MarketNews({ newsCount = 5 }: { newsCount?: number }) {
  return (
    <ScrollArea className="h-[300px] pr-4">
      <div className="space-y-4">
        {dummyNews.slice(0, newsCount).map((item) => (
          <div key={item.newsID} className="border-b border-border/40 pb-3 last:border-0">
            <a href={item.newsLink} className="text-sm font-medium hover:text-primary block transition-colors">
              {item.newsHeading.trim()}
            </a>
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-muted-foreground">{item.source}</span>
              <span className="text-xs text-muted-foreground">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
