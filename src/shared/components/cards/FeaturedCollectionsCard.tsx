"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Book, Crown, Star, Sparkles, Users, TrendingUp, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Collection, Rarity } from "@/shared/app/types"

const collectionColors = {
  common: "from-yellow-400 to-amber-600",
  rare: "from-purple-400 to-pink-600",
  epic: "from-blue-400 to-indigo-600",
  legendary: "from-red-400 to-orange-600",
}

const collectionIcons = {
  common: Book,
  rare: TrendingUp,
  epic: Sparkles,
  legendary: Crown,
}

interface FeaturedCollectionsCardProps {
  collection: Collection
  type: Rarity
  idx?: number
}

export default function FeaturedCollectionsCard({ collection, type, idx }: FeaturedCollectionsCardProps) {
  const Icon = collectionIcons[type]
  const color = collectionColors[type]

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Card className="overflow-hidden transition-all duration-500">
        <div className="p-6 relative">
          <p className="absolute">{idx}</p>
          <img
            className={`
              w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center
              bg-gradient-to-r ${color} animate-pulse
            `}
            src={collection.image}
            alt={collection.name}
          />

          <h3 className="text-xl font-bold text-center mb-2 h-16">{collection.name}</h3>
          <p className="text-gray-600 text-sm text-center mb-4 line-clamp-2" dangerouslySetInnerHTML={{ __html: collection.description }}></p>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Completion Rate:</span>
              <span className="font-bold text-green-600">{collection.completionRate}%</span>
            </div>

            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${color} transition-all duration-1000`}
                style={{ width: `${collection.completionRate}%` }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2 text-blue-500" />
                <span>{collection.activeUsers} active users</span>
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-2 text-yellow-500" />
                <span>{collection.popularity} popularity</span>
              </div>
              <div className="flex items-center">
                <Award className="w-4 h-4 mr-2 text-purple-500" />
                <span>{collection.totalCards} total cards</span>
              </div>
              <div className="flex items-center">
                <Sparkles className="w-4 h-4 mr-2 text-pink-500" />
                <span>{collection.likes} likes</span>
              </div>
            </div>

            <Button
              className={`
                w-full bg-gradient-to-r ${color} text-white
                transform transition-all duration-300
                hover:scale-105 hover:shadow-lg
              `}
            >
              View Collection
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

