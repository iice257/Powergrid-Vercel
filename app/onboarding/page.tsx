"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { MapPin, Zap, BarChart3, Bell, ChevronRight, ChevronLeft } from "lucide-react"

const onboardingSteps = [
  {
    icon: MapPin,
    title: "Track Power in Your Area",
    description: "Get real-time updates on power availability in Lagos and surrounding areas.",
    color: "text-emerald-500",
  },
  {
    icon: Zap,
    title: "Report Power Status",
    description: "Help your community by reporting power outages and restorations instantly.",
    color: "text-yellow-500",
  },
  {
    icon: BarChart3,
    title: "View Analytics",
    description: "Access detailed statistics and trends about power availability in your region.",
    color: "text-blue-500",
  },
  {
    icon: Bell,
    title: "Get Notifications",
    description: "Receive alerts about power changes and outages in areas you care about.",
    color: "text-purple-500",
  },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      router.push("/")
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    router.push("/")
  }

  const currentStepData = onboardingSteps[currentStep]

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <Logo variant="hexagon" size="md" showText={false} />
        <Button variant="ghost" onClick={handleSkip} className="text-slate-400 hover:text-white">
          Skip
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
                className="mb-8"
              >
                <div
                  className={`w-24 h-24 mx-auto rounded-3xl bg-slate-800 flex items-center justify-center ${currentStepData.color}`}
                >
                  <currentStepData.icon className="w-12 h-12" />
                </div>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-3xl font-bold mb-4"
              >
                {currentStepData.title}
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-lg text-slate-400 leading-relaxed"
              >
                {currentStepData.description}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="p-6">
        {/* Progress Indicators */}
        <div className="flex justify-center space-x-2 mb-8">
          {onboardingSteps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentStep ? "bg-emerald-500 w-8" : "bg-slate-600"
              }`}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="text-slate-400 hover:text-white disabled:opacity-30"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>

          <Button onClick={handleNext} className="bg-emerald-600 hover:bg-emerald-700 text-white px-8">
            {currentStep === onboardingSteps.length - 1 ? "Get Started" : "Next"}
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  )
}
