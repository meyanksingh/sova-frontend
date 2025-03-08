import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "react-hot-toast"
import { AuthProvider } from "@/context/AuthContext"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sova - Advanced Trading Execution Engine",
  description: "Deploy and execute sophisticated trading strategies with our high-performance engine.",
  metadataBase: new URL("https://getsova.com"),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className='pop' >
      <Toaster 
            position="top-center"
            toastOptions={{
              style: {
                background: 'rgba(0, 0, 0, 0.8)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
              },
            }}
          />
        <AuthProvider>
          <MarketDataProvider>
            
            <ThemeProvider defaultTheme="system" storageKey="sova-theme">
              {children}
            </ThemeProvider>
          </MarketDataProvider>
        </AuthProvider>

      </body>
    </html>
  )
}



import './globals.css'
import { MarketDataProvider } from "@/context/MarketDataContext"

