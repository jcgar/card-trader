"use client"

import { Trophy } from "lucide-react"
import { useState } from "react"
import { showToast } from "@/use/ui"
import RewardCard from "../cards/RewardCard"
import { Reward } from "@/app/types"


export const GamificationRewards = ({ rewards }: { rewards: Reward[] }) => {
  const [openChest, setOpenChest] = useState<number | null>(null)
  const [playingSound, setPlayingSound] = useState(false)

  const playRewardSound = () => {
    if (playingSound) return
    setPlayingSound(true)
    const audio = new Audio(
      "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdH2Dem6Cb3UCeH+gopwEIAQzBU8FZwZ/CpcKsgvBC8ULyAvJC8wLz8lhwkZwc3UoJN8jwRwEQrVCvUK/QsNCxkLCLxsoGwgAAAAAAAAAAAAAAA==",
    )
    audio.play().finally(() => setPlayingSound(false))
  }

  const handleOpenChest = (rewardId: number) => {
    setOpenChest(rewardId)
    playRewardSound()
    showToast({
      title: "¡Recompensa desbloqueada!",
      description: "Has obtenido un nuevo premio para tu colección.",
    })
    setTimeout(() => setOpenChest(null), 2000)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-playfair font-bold mb-4 text-green-800 flex items-center justify-center gap-2">
            <Trophy className="w-8 h-8 text-yellow-500 animate-bounce" />
            Recompensas
          </h2>
          <p className="text-green-600">Desbloquea premios especiales y mejora tu colección</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {rewards.map((reward) => (
            <RewardCard reward={reward} openChest={openChest} handleOpenChest={handleOpenChest} />
          ))}
        </div>
      </div>
    </section>
  )
}

