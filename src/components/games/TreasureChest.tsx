
import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Sparkles, 
  Trophy, 
  Gift, 
  Coins, 
  Award, 
  Star, 
  BadgeCheck
} from "lucide-react"
import { cn } from "@/lib/utils"
import { showToast } from "@/use/ui"
import { fadeIn, popIn, AnimatedContainer, PrizeReveal } from "./TreasureChestAnimations"

export interface Prize {
  id: number
  type: "coin" | "badge" | "reward"
  title: string
  description: string
  value: number
  rarity: "common" | "rare" | "epic" | "legendary"
}

const PRIZE_POOL: Prize[] = [
  // Coins
  { id: 1, type: "coin", title: "Moneda Básica", description: "50 monedas para tu colección", value: 50, rarity: "common" },
  { id: 2, type: "coin", title: "Monedas Premium", description: "150 monedas para tu colección", value: 150, rarity: "rare" },
  { id: 3, type: "coin", title: "Tesoro Dorado", description: "500 monedas para tu colección", value: 500, rarity: "epic" },
  { id: 4, type: "coin", title: "Fortuna Legendaria", description: "1000 monedas para tu colección", value: 1000, rarity: "legendary" },
  
  // Badges
  { id: 5, type: "badge", title: "Coleccionista Novato", description: "Insignia para tu perfil", value: 1, rarity: "common" },
  { id: 6, type: "badge", title: "Intercambiador Experto", description: "Insignia para tu perfil", value: 1, rarity: "rare" },
  { id: 7, type: "badge", title: "Maestro Coleccionista", description: "Insignia exclusiva para tu perfil", value: 1, rarity: "epic" },
  { id: 8, type: "badge", title: "Leyenda del Coleccionismo", description: "Insignia legendaria para tu perfil", value: 1, rarity: "legendary" },
  
  // Rewards
  { id: 9, type: "reward", title: "Álbum Especial", description: "Un nuevo álbum para tu colección", value: 1, rarity: "common" },
  { id: 10, type: "reward", title: "Carta Especial", description: "Una carta exclusiva para tu colección", value: 1, rarity: "rare" },
  { id: 11, type: "reward", title: "Pack Premium", description: "Un pack con 5 cartas exclusivas", value: 5, rarity: "epic" },
  { id: 12, type: "reward", title: "Colección Completa", description: "Una colección completa para tu perfil", value: 1, rarity: "legendary" },
]

const rarityColors = {
  common: "bg-gray-100 text-gray-800 border-gray-300",
  rare: "bg-blue-100 text-blue-800 border-blue-300",
  epic: "bg-purple-100 text-purple-800 border-purple-300",
  legendary: "bg-yellow-100 text-yellow-800 border-yellow-300"
}

const prizeIcons = {
  coin: Coins,
  badge: BadgeCheck,
  reward: Gift
}

const rarityProbability = {
  common: 60,
  rare: 25,
  epic: 10,
  legendary: 5
}

interface TreasureChestProps {
  onPrizeWon?: (prize: Prize) => void
}

export const TreasureChest: React.FC<TreasureChestProps> = ({ onPrizeWon }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [prize, setPrize] = useState<Prize | null>(null)
  const [isRevealing, setIsRevealing] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)
  const [sparklesVisible, setSparklesVisible] = useState(false)

  const playChestOpenSound = () => {
    const audio = new Audio(
      "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdH2Dem6Cb3UCeH+gopwEIAQzBU8FZwZ/CpcKsgvBC8ULyAvJC8wLz8lhwkZwc3UoJN8jwRwEQrVCvUK/QsNCxkLCLxsoGwgAAAAAAAAAAAAAAA=="
    )
    audio.play()
  }

  const playRewardSound = () => {
    const audio = new Audio(
      "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACkqJxKXEBUVWlka2t0f3iDcFpybIF+hIaJkZKVmI+SetDOx72jjZKRmKCgoKWpqKWakH1nWF1fZ2psb4XpuDv4YlxNSkpQVlhdY2lvcXR3eXt9f4GCg4SFhYaG"
    )
    audio.play()
  }

  const generateRandomPrize = (): Prize => {
    // First determine rarity
    const rand = Math.random() * 100
    let rarity: "common" | "rare" | "epic" | "legendary" = "common"
    
    if (rand < rarityProbability.legendary) {
      rarity = "legendary"
    } else if (rand < rarityProbability.legendary + rarityProbability.epic) {
      rarity = "epic"
    } else if (rand < rarityProbability.legendary + rarityProbability.epic + rarityProbability.rare) {
      rarity = "rare"
    }
    
    // Filter by rarity
    const possiblePrizes = PRIZE_POOL.filter(p => p.rarity === rarity)
    
    // Pick a random prize from the filtered list
    return possiblePrizes[Math.floor(Math.random() * possiblePrizes.length)]
  }

  const handleOpenChest = () => {
    if (isOpen || isRevealing) return
    
    setIsRevealing(true)
    playChestOpenSound()
    
    // Animate the chest opening
    setTimeout(() => {
      setIsOpen(true)
      setSparklesVisible(true)
      
      // Generate and reveal prize
      setTimeout(() => {
        const wonPrize = generateRandomPrize()
        setPrize(wonPrize)
        playRewardSound()
        
        if (onPrizeWon) {
          onPrizeWon(wonPrize)
        }
        
        showToast({
          title: "¡Premio Obtenido!",
          description: `Has ganado: ${wonPrize.title}`,
        })
        
        setHasOpened(true)
        setIsRevealing(false)
      }, 1000)
    }, 500)
  }

  const resetChest = () => {
    setIsOpen(false)
    setPrize(null)
    setSparklesVisible(false)
    setHasOpened(false)
  }

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div 
        className={cn(
          "relative w-48 h-48 cursor-pointer transition-all duration-500 transform hover:scale-105",
          isRevealing && "animate-pulse"
        )}
        onClick={!hasOpened ? handleOpenChest : undefined}
      >
        {/* Chest container */}
        <div className={cn(
          "absolute inset-0 bg-amber-800 rounded-lg border-4 border-amber-700 shadow-lg transition-all duration-500 overflow-hidden",
          isOpen && "bg-amber-600"
        )}>
          {/* Chest lid */}
          <div className={cn(
            "absolute top-0 left-0 right-0 h-1/3 bg-amber-700 border-b-4 border-amber-900 transition-all duration-500 origin-bottom z-10",
            isOpen && "-translate-y-6 rotate-[-20deg]"
          )}>
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-3 bg-yellow-500 rounded-sm border border-yellow-700"></div>
          </div>
          
          {/* Chest contents */}
          <div className={cn(
            "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center opacity-0 transition-all duration-500 scale-0",
            isOpen && "opacity-100 scale-100"
          )}>
            {sparklesVisible && (
              <Sparkles 
                className="absolute w-full h-full text-yellow-400 animate-pulse"
                strokeWidth={1}
              />
            )}
            
            {prize && (
              <motion.div 
                className="flex flex-col items-center justify-center z-20"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <div className={cn(
                  "p-4 rounded-full w-20 h-20 flex items-center justify-center mb-2",
                  rarityColors[prize.rarity]
                )}>
                  {React.createElement(prizeIcons[prize.type], {
                    className: cn(
                      "w-12 h-12",
                      prize.type === "coin" && "text-yellow-500",
                      prize.type === "badge" && "text-blue-500",
                      prize.type === "reward" && "text-green-500",
                      prize.rarity === "legendary" && "animate-pulse"
                    ),
                    strokeWidth: 1.5
                  })}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Lock */}
        <div className={cn(
          "absolute left-1/2 top-1/3 transform -translate-x-1/2 -translate-y-1/2 w-6 h-8 bg-yellow-600 rounded-sm border border-yellow-800 transition-all duration-500 z-20",
          isOpen && "opacity-0"
        )}>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-3 bg-yellow-900 rounded-sm"></div>
        </div>
      </div>
      
      {/* Prize info card */}
      <AnimatePresence>
        {prize && (
          <motion.div 
            className="mt-6 max-w-xs w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.3 }}
          >
            <Card className={cn(
              "p-4 border-2",
              rarityColors[prize.rarity],
              prize.rarity === "legendary" && "animate-pulse"
            )}>
              <div className="flex items-center gap-3 mb-2">
                {React.createElement(prizeIcons[prize.type], {
                  className: cn(
                    "w-5 h-5",
                    prize.type === "coin" && "text-yellow-500",
                    prize.type === "badge" && "text-blue-500",
                    prize.type === "reward" && "text-green-500"
                  )
                })}
                <h3 className="font-bold">{prize.title}</h3>
                <Badge className={cn(
                  prize.rarity === "common" && "bg-gray-400",
                  prize.rarity === "rare" && "bg-blue-500",
                  prize.rarity === "epic" && "bg-purple-500",
                  prize.rarity === "legendary" && "bg-yellow-500 animate-pulse"
                )}>
                  {prize.rarity.charAt(0).toUpperCase() + prize.rarity.slice(1)}
                </Badge>
              </div>
              <p className="text-sm">{prize.description}</p>
              <div className="mt-3 flex items-center gap-2">
                {prize.type === "coin" && (
                  <span className="flex items-center gap-1 text-sm">
                    <Coins className="w-4 h-4 text-yellow-500" />
                    +{prize.value}
                  </span>
                )}
                {prize.type === "badge" && (
                  <span className="flex items-center gap-1 text-sm">
                    <BadgeCheck className="w-4 h-4 text-blue-500" />
                    Nueva insignia
                  </span>
                )}
                {prize.type === "reward" && (
                  <span className="flex items-center gap-1 text-sm">
                    <Gift className="w-4 h-4 text-green-500" />
                    {prize.value > 1 ? `×${prize.value}` : 'Nuevo objeto'}
                  </span>
                )}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Buttons */}
      <div className="mt-6">
        {!hasOpened ? (
          <Button 
            onClick={handleOpenChest}
            className="bg-amber-600 hover:bg-amber-700"
            disabled={isRevealing}
          >
            <Gift className="mr-2 h-4 w-4" />
            Abrir Cofre
          </Button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <Button onClick={resetChest}>
              <Trophy className="mr-2 h-4 w-4" /> 
              Reclamar y Cerrar
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
