import type React from "react"
import { Button } from "../../components/ui/button"
import { ArrowRight } from "lucide-react"
import { t } from "@/shared/use/i18n"

interface HeroSectionProps {
  onStartCollecting: () => void
  onExploreCollections: () => void
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartCollecting, onExploreCollections }) => {
  return (
    <section className="min-h-[90vh] flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-green-50 via-white to-white">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158')] bg-cover bg-center opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-emerald-500/5 to-transparent" />
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center animate-fade-up">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-600 rounded-full animate-fade-in">
            {t("hero.subtitle")}
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-playfair font-bold mb-6 tracking-tight bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            {t("hero.title")}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">{t("hero.description")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              onClick={onStartCollecting}
            >
              {t("hero.startCollecting")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-green-200 text-green-600 hover:bg-green-50"
              onClick={onExploreCollections}
            >
              {t("hero.exploreCollections")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

