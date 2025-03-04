"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "react-hot-toast"
import { useAuth } from "@/context/AuthContext"
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      brokerLogin(brokerId)
      toast.success("Broker logged in successfully")
    } catch (error) {
      toast.error("Failed to login as broker")
    } finally {
      setIsLoading(false)
    }
  }

  if (isBrokerAuthenticated) {
    return (
      <Button 
        variant="outline" 
        onClick={brokerLogout}
        className="text-sm"
      >
        Broker Logout
      </Button>
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-sm">
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