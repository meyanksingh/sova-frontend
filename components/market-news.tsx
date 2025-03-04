"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { useEffect, useState } from "react"
import { getNews } from "@/lib/api"
import { toast } from "sonner"

interface NewsItem {
  newsHeading: string;
  newsLink: string;
  newsID: number;
}

export function MarketNews({ newsCount = 5 }: { newsCount?: number }) {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await getNews()
        // Handle the nested response structure
        if (response?.data && Array.isArray(response.data)) {
          setNews(response.data)
        } else {
          setNews([])
        }
      } catch (err) {
        console.error("Error fetching news:", err)
        toast.error("Failed to load news")
        setNews([])
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  if (loading) {
    return (
      <ScrollArea className="h-[300px] pr-4">
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">Loading news...</div>
        </div>
      </ScrollArea>
    )
  }

  if (!Array.isArray(news) || news.length === 0) {
    return (
      <ScrollArea className="h-[300px] pr-4">
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">No news available</div>
        </div>
      </ScrollArea>
    )
  }

  return (
    <ScrollArea className="h-[300px] pr-4">
      <div className="space-y-4">
        {news.slice(0, newsCount).map((item) => (
          <div key={item.newsID} className="border-b border-border/40 pb-3 last:border-0">
            <a href={item.newsLink} className="text-sm font-medium hover:text-primary block transition-colors">
              {item.newsHeading.trim()}
            </a>
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-muted-foreground">Livemint</span>
              <span className="text-xs text-muted-foreground">Just now</span>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

