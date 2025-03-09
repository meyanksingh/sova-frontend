"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { useView } from '@/context/ViewContext'
import { Sidebar } from '@/components/sidebar' // Ensure to import Sidebar
import { BrokerLoginButton } from '@/components/broker-login-button' // Ensure to import BrokerLoginButton
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu' // Ensure to import DropdownMenu components
import { Button } from '@/components/ui/button' // Ensure to import Button
import { Bell } from 'lucide-react' // Ensure to import Bell
import { ThemeToggle } from '@/components/theme-toggle' // Ensure to import ThemeToggle
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar' // Ensure to import Avatar components
import { MarketTicker } from '@/components/market-ticker' // Ensure to import MarketTicker

interface BrokerAuthWrapperProps {
  children: React.ReactNode
}

export function BrokerAuthWrapper({ children }: BrokerAuthWrapperProps) {
  const { isAuthenticated, isBrokerAuthenticated, isLoading, logout } = useAuth()
  const { currentView } = useView() // Use the shared context
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !isBrokerAuthenticated)) {
      router.push('/marketplace')
    }
  }, [isAuthenticated, isBrokerAuthenticated, isLoading, router])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated || !isBrokerAuthenticated) {
    return null
  }

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <>
      <div className="min-h-screen bg-background">
        <Sidebar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <div className={`transition-all duration-300 ${isSidebarOpen ? "md:ml-64" : "md:ml-16"}`}>
          <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center">
              <div className="mr-4 hidden md:flex">
                <a className="mr-6 flex items-center space-x-2" href="/">
                  <span className="hidden font-bold sm:inline-block">Sova Terminal</span>
                </a>
              </div>
              <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                <nav className="flex items-center space-x-2">
                  <BrokerLoginButton />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="relative">
                        <Bell className="h-4 w-4" />
                        <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-600" />
                        <span className="sr-only">Toggle notifications</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>No new notifications</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <ThemeToggle />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/avatars/01.png" alt="John Doe" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                      <DropdownMenuItem>Settings</DropdownMenuItem>
                      <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </nav>
              </div>
            </div>
            <MarketTicker />
          </header>
          {children}
        </div>
      </div>
    </>
  )
}