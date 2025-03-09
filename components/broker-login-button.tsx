"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "react-hot-toast"
import { useAuth } from "@/context/AuthContext"
import { useView } from "@/context/ViewContext"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function BrokerLoginButton() {
  const [brokerId, setBrokerId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { brokerLogin, isBrokerAuthenticated, brokerLogout } = useAuth()
  const { setCurrentView } = useView()
  const router = useRouter()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      brokerLogin(brokerId)
      toast.success("Broker logged in successfully")
      
      setIsDialogOpen(false)
      
      setCurrentView("dashboard")
      router.push("/dashboard")
    } catch (error) {
      toast.error("Failed to login as broker")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    brokerLogout()
    setCurrentView("explore")
    router.push("/explore")
  }

  if (isBrokerAuthenticated) {
    return (
      <Button 
        variant="outline" 
        onClick={handleLogout}
        className="text-sm"
      >
        Broker Logout
      </Button>
    )
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-sm" onClick={() => setIsDialogOpen(true)}>
          Broker Login
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Broker Login</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="brokerId">Broker ID</Label>
            <Input
              id="brokerId"
              value={brokerId}
              onChange={(e) => setBrokerId(e.target.value)}
              placeholder="Enter your broker ID"
              required
            />
          </div>
          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login as Broker"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
} 