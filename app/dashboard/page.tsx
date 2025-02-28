"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { logout } from "@/lib/api"

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
    }
  }, [router])

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Sova Dashboard</h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        </div>
      </header>
      <main className="container mx-auto py-8">
        <h2 className="text-xl font-semibold mb-4">Welcome to your dashboard</h2>
        <p>This is a placeholder for your dashboard content.</p>
      </main>
    </div>
  )
}

