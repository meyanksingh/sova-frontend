"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  LayoutDashboard,
  LineChart,
  Store,
  FileText, 
  DollarSign,
  Briefcase,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
  Compass,
} from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { useView } from "@/context/ViewContext"

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const [isMobile, setIsMobile] = useState(false)
  const router = useRouter()
  const { isBrokerAuthenticated } = useAuth()
  const { currentView, setCurrentView } = useView()

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768)
    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  const commonNavItems = [
    {
      title: "Explore",
      view: "explore",
      icon: Compass,
      path: "/explore",
    },
    {
      title: "Marketplace",
      view: "marketplace",
      icon: Store,
      path: "/marketplace",
    },
    {
      title: "Analytics",
      view: "analytics",
      icon: LineChart,
      path: "/analytics",
    },
    {
      title: "News",
      view: "news",
      icon: FileText,
      path: "/news",
    },
  ]

  const brokerNavItems = [
    {
      title: "Dashboard",
      view: "dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      title: "Positions",
      view: "positions",
      icon: LineChart,
      path: "/positions",
    },
    {
      title: "Holdings",
      view: "holdings",
      icon: Briefcase,
      path: "/holdings",
    },
    {
      title: "Orderbook",
      view: "orderbook",
      icon: FileText,
      path: "/orderbook",
    },
    {
      title: "Margin",
      view: "margin",
      icon: DollarSign,
      path: "/margin",
    },
    {
      title: "Marketplace",
      view: "marketplace",
      icon: Store,
      path: "/marketplace",
    },
    {
      title: "Profile",
      view: "profile",
      icon: Settings,
      path: "/profile",
    },
  ]

  const sidebarNavItems = isBrokerAuthenticated ? brokerNavItems : commonNavItems;

  return (
    <>
      {isMobile && isOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30" onClick={onToggle} aria-hidden="true" />
      )}

      <div
        className={cn(
          "fixed left-0 top-0 z-40 h-screen transform transition-all duration-300 ease-in-out bg-background border-r",
          isOpen ? "w-64 translate-x-0" : isMobile ? "w-64 -translate-x-full" : "w-16 translate-x-0",
        )}
      >
        <div className="flex h-14 items-center border-b px-4 justify-between">
          <button className="flex items-center gap-2 font-semibold" onClick={() => setCurrentView("dashboard")}>
            <Zap className="h-6 w-6 text-primary" />
            {isOpen && <span>Sova</span>}
          </button>

          {!isMobile && (
            <Button variant="ghost" size="icon" onClick={onToggle}>
              {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          )}
        </div>

        <ScrollArea className="flex-1 h-[calc(100vh-3.5rem)]">
          <nav className="flex flex-col gap-2 p-4">
            {sidebarNavItems.map((item) => (
              <Button
                key={item.view}
                variant={currentView === item.view ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  currentView === item.view && "bg-muted font-medium text-primary",
                  !isOpen && "px-2",
                )}
                onClick={() => {
                  router.push(item.path);
                  setCurrentView(item.view);
                  if (isMobile) onToggle();
                }}
              >
                <item.icon className={cn("h-4 w-4", isOpen && "mr-2")} />
                {isOpen && item.title}
              </Button>
            ))}
          </nav>
        </ScrollArea>

        <div className="p-4 border-t">
          <Button
            variant="outline"
            className={cn("w-full", isOpen ? "justify-start" : "justify-center")}
            onClick={() => {
              router.push("/settings");
              setCurrentView("settings");
              if (isMobile) onToggle();
            }}
          >
            <Settings className={cn("h-4 w-4", isOpen && "mr-2")} />
            {isOpen && "Settings"}
          </Button>
        </div>
      </div>
    </>
  )
}