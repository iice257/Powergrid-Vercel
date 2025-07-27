"use client"

import { motion } from "framer-motion"

interface LogoProps {
  variant?: "pin" | "hexagon"
  size?: "sm" | "md" | "lg" | "xl"
  showText?: boolean
  className?: string
}

export function Logo({ variant = "pin", size = "md", showText = true, className = "" }: LogoProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-24 h-24",
  }

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl",
    xl: "text-4xl",
  }

  if (variant === "pin") {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }} className="relative">
          {/* Location Pin Shape */}
          <svg className={`${sizeClasses[size]} text-emerald-500`} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
          {/* Lightning Bolt Inside */}
          <svg className="absolute inset-0 w-full h-full text-white scale-50" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        </motion.div>
        {showText && (
          <div>
            <h1 className={`${textSizeClasses[size]} font-bold text-white tracking-wide`}>POWERGRID</h1>
            {size === "xl" && <p className="text-sm text-gray-400 mt-1">Let's track your power</p>}
          </div>
        )}
      </div>
    )
  }

  // Hexagon variant
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }} className="relative">
        {/* Hexagon Background */}
        <div className={`${sizeClasses[size]} bg-emerald-500 rounded-2xl flex items-center justify-center`}>
          {/* Lightning Bolt */}
          <svg className="w-1/2 h-1/2 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        </div>
      </motion.div>
      {showText && (
        <div>
          <h1 className={`${textSizeClasses[size]} font-bold tracking-wide`}>POWERGRID</h1>
          {size === "xl" && <p className="text-sm opacity-80 mt-1">Let's track the power.</p>}
        </div>
      )}
    </div>
  )
}
