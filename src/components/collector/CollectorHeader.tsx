"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Trophy, MessageSquare, UserPlus, Star } from "lucide-react"
import type { Collector } from "@/app/types"
import { motion } from "framer-motion"

interface CollectorHeaderProps {
  profile: Collector
}

export const CollectorHeader = ({ profile }: CollectorHeaderProps) => {
  return (
    <div className="relative">
      {/* Cover Image */}
      <div className="h-64 md:h-80 w-full relative overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          src={profile.coverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
      </div>

      {/* Profile Info */}
      <div className="container mx-auto px-4">
        <div className="relative -mt-32">
          <Card className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-yellow-900 rounded-full px-2 py-1 text-sm font-medium flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  Lvl {profile.level}
                </div>
              </motion.div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold">{profile.name}</h1>
                    <p className="text-muted-foreground">@{profile.username}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary" className="text-yellow-600">
                        <Trophy className="w-3 h-3 mr-1" />
                        {profile.title}
                      </Badge>
                      <Badge variant="outline">Top {profile.rank.global} Global</Badge>
                      <Badge variant="outline" className="text-purple-600">
                        #{profile.rank.categoryRank} en {profile.rank.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button>
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Mensaje
                    </Button>
                    <Button variant="outline">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Seguir
                    </Button>
                  </div>
                </div>

                {/* Stats Summary */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{profile.stats.followers}</div>
                    <div className="text-sm text-muted-foreground">Seguidores</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{profile.stats.totalCollections}</div>
                    <div className="text-sm text-muted-foreground">Colecciones</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{profile.stats.exchanges}</div>
                    <div className="text-sm text-muted-foreground">Intercambios</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">{profile.stats.reputation}</div>
                    <div className="text-sm text-muted-foreground">Reputación</div>
                  </div>
                </div>

                {/* Motto */}
                <blockquote className="mt-4 text-muted-foreground italic border-l-4 border-green-200 pl-4">
                  "{profile.motto}"
                </blockquote>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

