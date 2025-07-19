import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { TopNavigation } from "@/components/top-navigation"
import { BottomNavigation } from "@/components/bottom-navigation"
import { DesktopSidebar } from "@/components/desktop-sidebar"
import { CursorFollower } from "@/components/cursor-follower"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PowerGrid - Track Electricity Availability",
  description: "Community-driven power outage tracking and reporting for your area",
  keywords: ["power", "electricity", "outage", "tracking", "community", "Nigeria", "Lagos"],
  authors: [{ name: "PowerGrid Team" }],
  creator: "PowerGrid",
  publisher: "PowerGrid",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://powergrid-app.vercel.app"),
  openGraph: {
    title: "PowerGrid - Track Electricity Availability",
    description: "Community-driven power outage tracking and reporting for your area",
    url: "https://powergrid-app.vercel.app",
    siteName: "PowerGrid",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PowerGrid - Track Electricity Availability",
    description: "Community-driven power outage tracking and reporting for your area",
    creator: "@powergrid",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="relative min-h-screen bg-background">
            <CursorFollower />
            <TopNavigation />
            <DesktopSidebar />
            <main className="lg:ml-64">{children}</main>
            <BottomNavigation />
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
