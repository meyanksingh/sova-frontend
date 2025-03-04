import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
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
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider defaultTheme="system" storageKey="sova-theme">
            {children}
          </ThemeProvider>
        </AuthProvider>

      </body>
    </html>
  )
}



import './globals.css'