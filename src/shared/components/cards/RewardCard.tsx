"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Crown, Gift, Heart, Search, Sheet, Sparkles, Star, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Collection, Reward } from "@/shared/app/types"

const rewardColors = {
  legendary: "from-yellow-400 to-amber-600",
  epic: "from-purple-400 to-pink-600",
  rare: "from-blue-400 to-indigo-600",
  common: "from-red-400 to-orange-600",
}

const rewardIcons = {
  legendary: Crown,
  epic: Gift,
  rare: Star,
  common: Sheet,
}

interface RewardCardProps {
  reward: Reward;
  openChest: number;
  handleOpenChest: (rewardId: number) => void;
}

export default function RewardCard({ reward, openChest, handleOpenChest }: RewardCardProps) {
  const Icon = rewardIcons[reward.rarity]
  const color = rewardColors[reward.rarity]

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Card
        key={reward.id}
        className={`
                overflow-hidden transition-all duration-500
                ${openChest === reward.id ? "transform scale-105" : ""}
              `}
      >
        <div className="p-6">
          <div
            className={`
                  w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center
                  bg-gradient-to-r ${color}
                  ${openChest === reward.id ? "animate-spin" : "animate-pulse"}
                `}
          >
            <Icon className="w-8 h-8 text-white" />
          </div>

          <h3 className="text-xl font-bold text-center mb-2">{reward.title}</h3>
          <p className="text-gray-600 text-sm text-center mb-4">{reward.description}</p>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Puntos necesarios:</span>
              <span className="font-bold text-green-600">{reward.points}</span>
            </div>

            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${color} transition-all duration-1000`}
                style={{ width: `${reward.progress}%` }}
              />
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="flex items-center text-purple-600">
                <Sparkles className="w-4 h-4 mr-1" />
                {reward.rarity}
              </span>
              <span className="text-gray-600">{reward.progress}% completado</span>
            </div>

            <Button
              className={`
                      w-full bg-gradient-to-r ${color} text-white
                      transform transition-all duration-300
                      hover:scale-105 hover:shadow-lg
                      ${reward.progress < 100 ? "opacity-50 cursor-not-allowed" : ""}
                    `}
              onClick={() => handleOpenChest(reward.id)}
              disabled={reward.progress < 100}
            >
              {reward.progress >= 100 ? "Reclamar Recompensa" : "Bloqueado"}
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

