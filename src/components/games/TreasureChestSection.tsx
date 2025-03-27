
import React, { useState } from "react"
import { Trophy, Gift, ChevronDown, Coins, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TreasureChest, type Prize } from "./TreasureChest"
import { showToast } from "@/use/ui"

export const TreasureChestSection = () => {
  const [showChest, setShowChest] = useState(false)
  const [lastPrize, setLastPrize] = useState<Prize | null>(null)
  const [todayPrizes, setTodayPrizes] = useState<Prize[]>([])

  const handlePrizeWon = (prize: Prize) => {
    setLastPrize(prize)
    setTodayPrizes([...todayPrizes, prize])
    
    // Simulate game progression
    if (prize.rarity === "legendary") {
      showToast({
        title: "¡Legendario!",
        description: "¡Has ganado un premio legendario! Compártelo con tus amigos.",
      })
    }
  }

  const handleToggleChest = () => {
    setShowChest(!showChest)
    
    if (!showChest) {
      // Scroll to the chest when revealing
      setTimeout(() => {
        const chestElement = document.getElementById("treasure-chest")
        if (chestElement) {
          chestElement.scrollIntoView({ behavior: "smooth" })
        }
      }, 100)
    }
  }

  return (
    <section className="py-16 bg-gradient-to-b from-white to-amber-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-playfair font-bold mb-4 text-amber-800 flex items-center justify-center gap-2">
            <Trophy className="w-8 h-8 text-yellow-500" />
            Cofre del Tesoro
          </h2>
          <p className="text-amber-700 max-w-2xl mx-auto">
            ¡Abre el cofre diario y consigue monedas, insignias y recompensas exclusivas para tu colección!
          </p>
          
          <div className="mt-6 flex justify-center">
            <Button 
              onClick={handleToggleChest}
              className="bg-amber-600 hover:bg-amber-700 group relative overflow-hidden"
              size="lg"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative flex items-center">
                <Gift className="mr-2 h-5 w-5" />
                {showChest ? "Ocultar Cofre" : "Abrir Cofre del Día"}
                <ChevronDown className={`ml-2 h-4 w-4 transition-transform duration-300 ${showChest ? 'rotate-180' : ''}`} />
              </div>
            </Button>
          </div>
          
          {/* Prize summary */}
          {todayPrizes.length > 0 && (
            <div className="mt-4 flex justify-center gap-4">
              <div className="flex items-center gap-1 text-sm text-amber-700">
                <Coins className="w-4 h-4 text-yellow-500" />
                {todayPrizes.filter(p => p.type === "coin").reduce((sum, p) => sum + p.value, 0)}
              </div>
              <div className="flex items-center gap-1 text-sm text-amber-700">
                <Star className="w-4 h-4 text-blue-500" />
                {todayPrizes.filter(p => p.type === "badge").length}
              </div>
              <div className="flex items-center gap-1 text-sm text-amber-700">
                <Gift className="w-4 h-4 text-green-500" />
                {todayPrizes.filter(p => p.type === "reward").length}
              </div>
            </div>
          )}
        </div>
        
        {showChest && (
          <div 
            id="treasure-chest"
            className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 border border-amber-200"
          >
            <TreasureChest onPrizeWon={handlePrizeWon} />
          </div>
        )}
      </div>
    </section>
  )
}
