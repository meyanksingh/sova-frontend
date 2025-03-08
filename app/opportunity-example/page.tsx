"use client"

import { OpportunityCard } from "@/components/opportunity-card"

export default function OpportunityExamplePage() {
  return (
    <div className="max-w-md mx-auto p-4">
      <OpportunityCard
        title="New Opportunity"
        status="Available"
        client={{
          name: "Jenifer A.",
          company: "Meta — Facebook",
          location: "California",
          avatar: "https://ui-avatars.com/api/?name=Jenifer+A&background=random"
        }}
        budget="$35,000 - $45,000"
        date="14 Oct - 2024"
        matchPercentage="89.5% Match"
        rating="4.9"
        skills={["Web Design", "Responsive"]}
        description="showcase product Modern and visually appealing design."
        agency={{
          name: "Robert T.",
          company: "Full Cycle Agency",
          location: "Salt Lake",
          avatar: "https://ui-avatars.com/api/?name=Robert+T&background=random"
        }}
        onAccept={() => alert("Project accepted!")}
        onDecline={() => alert("Offer declined")}
      />
    </div>
  )
} 