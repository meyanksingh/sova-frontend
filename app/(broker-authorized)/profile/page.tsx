"use client"

import { useEffect, useState } from "react"
// import { UserProfile } from "@/types/api"
// import { api } from "@/services/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Building, CreditCard, User, Shield } from "lucide-react"
import { BrokerAuthWrapper } from "../broker-auth-wrapper"

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    // Hardcoded profile data
    const hardcodedProfile: UserProfile = {
      ClientName: "John Doe",
      ClientId: "123456",
      EmailId: "john.doe@example.com",
      MobileNo: "+1234567890",
      PAN: "ABCDE1234F",
      ResidentialAddress: "123 Main St, City, Country",
      OfficeAddress: "456 Office Rd, City, Country",
      ClientExchangeDetailsList: {
        NSE: { Enabled: true, ClientId: "NSE123", ParticipantCode: "NSE456" },
        BSE: { Enabled: false, ClientId: "BSE123", ParticipantCode: "BSE456" },
      },
      IsInvestorClient: true,
      IsProClient: false,
      IsPOAEnabled: true,
    };

    setProfile(hardcodedProfile);
    setLoading(false);
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading profile...</div>
  }

  if (!profile) {
    return <div className="flex items-center justify-center min-h-screen">Profile not found</div>
  }

  return (
    <BrokerAuthWrapper>
      <div className="container mx-auto p-6 space-y-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 opacity-70" />
                <span className="text-muted-foreground">Name:</span>
                <span>{profile.ClientName}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CreditCard className="h-4 w-4 opacity-70" />
                <span className="text-muted-foreground">Client ID:</span>
                <span>{profile.ClientId}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 opacity-70" />
                <span className="text-muted-foreground">Email:</span>
                <span>{profile.EmailId}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 opacity-70" />
                <span className="text-muted-foreground">Mobile:</span>
                <span>{profile.MobileNo}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 opacity-70" />
                <span className="text-muted-foreground">PAN:</span>
                <span>{profile.PAN}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Address Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">Address Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 opacity-70 mt-1" />
                <div>
                  <span className="text-muted-foreground">Residential Address:</span>
                  <p>{profile.ResidentialAddress}</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Building className="h-4 w-4 opacity-70 mt-1" />
                <div>
                  <span className="text-muted-foreground">Office Address:</span>
                  <p>{profile.OfficeAddress}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Exchange Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">Exchange Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(profile.ClientExchangeDetailsList).map(([exchange, details]) => (
                <Card key={exchange}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{exchange}</CardTitle>
                      <Badge variant={details.Enabled ? "default" : "secondary"}>
                        {details.Enabled ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Client ID: </span>
                      {details.ClientId}
                    </div>
                    {details.ParticipantCode && (
                      <div className="text-sm">
                        <span className="text-muted-foreground">Participant Code: </span>
                        {details.ParticipantCode}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Account Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">Account Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Badge variant={profile.IsInvestorClient ? "default" : "secondary"}>
                  {profile.IsInvestorClient ? "Investor" : "Non-Investor"}
                </Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant={profile.IsProClient ? "default" : "secondary"}>
                  {profile.IsProClient ? "Pro" : "Non-Pro"}
                </Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant={profile.IsPOAEnabled ? "default" : "secondary"}>
                  {profile.IsPOAEnabled ? "POA Enabled" : "POA Disabled"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </BrokerAuthWrapper>
  )
}
