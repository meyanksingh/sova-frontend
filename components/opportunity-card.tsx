import { Mail, Calendar, BarChart } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface OpportunityCardProps {
  title: string
  status: string
  client: {
    name: string
    company: string
    location: string
    avatar: string
  }
  budget: string
  date: string
  matchPercentage: string
  rating: string
  skills: string[]
  description: string
  agency: {
    name: string
    company: string
    location: string
    avatar: string
  }
  onAccept: () => void
  onDecline: () => void
}

export function OpportunityCard({
  title,
  status,
  client,
  budget,
  date,
  matchPercentage,
  rating,
  skills,
  description,
  agency,
  onAccept,
  onDecline
}: OpportunityCardProps) {
  return (
    <Card className="overflow-hidden border rounded-xl shadow-sm">
      <CardContent className="p-6 space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Mail className="w-5 h-5 mr-2" />
            <h3 className="font-medium text-lg">{title}</h3>
          </div>
          <Badge variant="outline" className="bg-slate-50 text-slate-800 font-normal">
            {status}
          </Badge>
        </div>

        {/* Client info */}
        <div className="flex items-center space-x-3 pt-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src={client.avatar} alt={client.name} />
            <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{client.name}</p>
            <p className="text-sm text-muted-foreground">
              {client.company} • {client.location}
            </p>
          </div>
        </div>

        {/* Budget */}
        <div className="border-t border-b py-3 border-border/40">
          <h3 className="text-2xl font-semibold">{budget}</h3>
          <div className="flex flex-wrap gap-3 mt-3">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="w-4 h-4 mr-2" />
              {date}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <BarChart className="w-4 h-4 mr-2" />
              {matchPercentage}
            </div>
          </div>
        </div>

        {/* Skills and Description */}
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-3">
              ★ {rating}
            </Badge>
            {skills.map((skill, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className={`rounded-full px-3 ${
                  index === 0 ? "bg-indigo-100 text-indigo-700" : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {skill}
              </Badge>
            ))}
          </div>
          <div>
            <p className="font-medium">Need {skills[1]} Website</p>
            <p className="text-muted-foreground">{description}</p>
          </div>
        </div>

        {/* Agency info */}
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={agency.avatar} alt={agency.name} />
            <AvatarFallback>{agency.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{agency.name}</p>
            <p className="text-sm text-muted-foreground">
              {agency.company} • {agency.location}
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-1 gap-3 pt-2">
          <Button 
            className="w-full rounded-full bg-black hover:bg-black/90 text-white" 
            onClick={onAccept}
          >
            Accept Project
          </Button>
          <Button 
            variant="outline" 
            className="w-full rounded-full" 
            onClick={onDecline}
          >
            Decline Offer
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 