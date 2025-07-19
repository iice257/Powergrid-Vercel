import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { TopNavigation } from "@/components/top-navigation"
import { BottomNavigation } from "@/components/bottom-navigation"
import { CursorFollower } from "@/components/cursor-follower"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PowerGrid - Community Power Tracking",
  description: "Track and report power outages in your community",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <CursorFollower />
          <TopNavigation />
          <main className="min-h-screen">{children}</main>
          <BottomNavigation />
        </ThemeProvider>
      </body>
    </html>
  )
}
