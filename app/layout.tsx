import type React from "react"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { BottomNavigation } from "@/components/bottom-navigation"
import { TopNavigation } from "@/components/top-navigation"
import "./globals.css"

export const metadata: Metadata = {
  title: "PowerGrid - Track Your Power",
  description: "Community-powered electricity tracking worldwide",
  manifest: "/manifest.json",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {/* Desktop Top Navigation */}
          <div className="hidden lg:block">
            <TopNavigation />
          </div>

          {/* Main Content */}
          <main className="pb-20 lg:pb-0 lg:pt-20">{children}</main>

          {/* Mobile Bottom Navigation */}
          <div className="lg:hidden">
            <BottomNavigation />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
