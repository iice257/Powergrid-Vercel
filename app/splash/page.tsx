"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export default function SplashPage() {
  const router = useRouter()
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      background: "from-slate-900 to-slate-800",
      textColor: "text-white",
      logoColor: "blue",
    },
    {
      background: "from-slate-100 to-white",
      textColor: "text-slate-900",
      logoColor: "green",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 3000)

    const redirectTimer = setTimeout(() => {
      router.push("/onboarding")
    }, 6000)

    return () => {
      clearInterval(timer)
      clearTimeout(redirectTimer)
    }
  }, [router])

  const currentSlideData = slides[currentSlide]

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center bg-gradient-to-br ${currentSlideData.background} transition-all duration-1000`}
    >
      <motion.div
        key={currentSlide}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center"
      >
        {/* Hexagonal Logo */}
        <div className="relative mb-8">
          <div
            className={`w-24 h-24 ${currentSlideData.logoColor === "blue" ? "bg-blue-500" : "bg-emerald-500"} rounded-2xl flex items-center justify-center transform transition-all duration-1000`}
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* App Name */}
        <motion.h1
          className={`text-4xl font-bold ${currentSlideData.textColor} mb-4 tracking-wide`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          POWERGRID
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className={`text-lg ${currentSlideData.textColor} opacity-80`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Let's track the power.
        </motion.p>
      </motion.div>

      {/* Pagination Dots */}
      <motion.div
        className="flex space-x-2 mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? currentSlideData.textColor.replace("text-", "bg-")
                : `${currentSlideData.textColor.replace("text-", "bg-")} opacity-30`
            }`}
          />
        ))}
      </motion.div>
    </div>
  )
}
