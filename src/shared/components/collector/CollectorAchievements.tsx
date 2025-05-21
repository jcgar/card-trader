"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Star } from "lucide-react"
import type { Collector } from "@/shared/app/types"
import { motion } from "framer-motion"

interface CollectorAchievementsProps {
  profile: Collector
}

export const CollectorAchievements = ({ profile }: CollectorAchievementsProps) => {
  const rarityColors = {
    common: "bg-gray-100 text-gray-600",
    rare: "bg-blue-100 text-blue-600",
    epic: "bg-purple-100 text-purple-600",
    legendary: "bg-yellow-100 text-yellow-600",
  }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="w-5 h-5 text-yellow-500" />
        <h2 className="text-xl font-semibold">Logros</h2>
      </div>

      <div className="space-y-4">
        {profile.achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-lg ${rarityColors[achievement.rarity]}`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-full">
                <img src={achievement.icon} alt="" className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-medium">{achievement.name}</h3>
                <p className="text-sm opacity-80">{achievement.description}</p>
              </div>
              <Badge className="ml-auto" variant="secondary">
                <Star className="w-3 h-3 mr-1" />
                {achievement.rarity}
              </Badge>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  )
}

