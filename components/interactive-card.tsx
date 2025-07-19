"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface InteractiveCardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export function InteractiveCard({ children, className, onClick }: InteractiveCardProps) {
  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <Card
        className={cn(
          "relative overflow-hidden transition-all duration-300",
          "hover:shadow-xl hover:shadow-primary/10",
          "before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary/5 before:to-transparent before:opacity-0 before:transition-opacity before:duration-300",
          "hover:before:opacity-100",
          "border-border/50 hover:border-primary/20",
          className,
        )}
      >
        <div className="relative z-10">{children}</div>

        {/* Animated border glow */}
        <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 via-transparent to-primary/20 blur-sm" />
        </div>

        {/* Corner highlights */}
        <div className="absolute top-0 left-0 w-8 h-8 bg-gradient-to-br from-primary/10 to-transparent rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-primary/10 to-transparent rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Card>
    </motion.div>
  )
}
