"use client"

import type React from "react"

import { Button } from "../../components/ui/button"
import { ArrowRight } from "lucide-react"
import { useState } from "react"
import { t } from "@/shared/use/i18n"

interface FinalCTAProps {
  onStartCollecting: () => void
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onStartCollecting }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6 animate-fade-in">{t("cta.title")}</h2>
          <p
            className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in"
            style={{ animationDelay: "200ms" }}
          >
            {t("cta.description")}
          </p>
          <Button
            onClick={onStartCollecting}
            size="lg"
            className={`
              text-lg px-8 py-6 bg-gradient-to-r from-green-600 to-green-500
              hover:from-green-700 hover:to-green-600
              transform transition-all duration-300
              ${isHovered ? "scale-105 shadow-lg" : ""}
            `}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span className="relative z-10">{t("cta.createAccount")}</span>
            <ArrowRight
              className={`
              ml-2 h-5 w-5 transition-transform duration-300
              ${isHovered ? "translate-x-1" : ""}
            `}
            />
          </Button>
        </div>
      </div>
    </section>
  )
}

