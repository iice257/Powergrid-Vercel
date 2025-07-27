"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Zap, Users, BarChart3, ChevronRight, ChevronLeft } from "lucide-react"

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)

  const onboardingSteps = [
    {
      icon: MapPin,
      title: "Track Power in Your Area",
      description: "Get real-time updates about power availability in Lagos and surrounding areas.",
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      icon: Users,
      title: "Community Powered",
      description: "Join thousands of users reporting power status to help the community stay informed.",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: BarChart3,
      title: "Analytics & Insights",
      description: "View detailed analytics about power patterns, outages, and restoration times.",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      icon: Zap,
      title: "Stay Connected",
      description: "Never be caught off guard by power outages. Get instant notifications and updates.",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
  ]

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

  const currentStepData = onboardingSteps[currentStep]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2">
            {onboardingSteps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentStep ? "bg-emerald-500" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Main Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-8 text-center">
              {/* Icon */}
              <div
                className={`w-20 h-20 ${currentStepData.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6`}
              >
                <currentStepData.icon className={`w-10 h-10 ${currentStepData.color}`} />
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-white mb-4">{currentStepData.title}</h2>

              {/* Description */}
              <p className="text-white/80 text-lg leading-relaxed mb-8">{currentStepData.description}</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button
            variant="ghost"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="text-white/60 hover:text-white disabled:opacity-30"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <Button onClick={handleNext} className="bg-emerald-500 hover:bg-emerald-600 text-white px-8">
            {currentStep === onboardingSteps.length - 1 ? "Get Started" : "Next"}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Skip Option */}
        <div className="text-center mt-6">
          <Button variant="ghost" onClick={() => router.push("/")} className="text-white/60 hover:text-white text-sm">
            Skip for now
          </Button>
        </div>
      </div>
    </div>
  )
}
