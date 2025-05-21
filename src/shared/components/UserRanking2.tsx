import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Crown, Trophy, Medal, Users, Activity, Star, ThumbsUp } from "lucide-react"
import { api, useApi } from "@/shared/use/api"
import { motion } from "framer-motion"
import { Collector } from "@/shared/app/types"

export const UserRanking2 = () => {
  const { data: collectors } = useApi<Collector>('topCollectors', { page: 1, pageSize: 10, fullQuery: false });

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Crown className="h-6 w-6 text-yellow-500" />
      case 1:
        return <Trophy className="h-6 w-6 text-gray-400" />
      case 2:
        return <Medal className="h-6 w-6 text-amber-600" />
      default:
        return null
    }
  }

  return (
    <section className="py-12 bg-gradient-to-b from-background to-background/80">
      <h2 className="text-4xl font-bold text-center mb-12">Top Collectors</h2>
      <div className="max-w-3xl mx-auto">
        {collectors.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <Card className="mb-4 hover:shadow-lg transition-shadow">
              <CardContent className="flex items-center p-6">
                <div className="mr-4">{getRankIcon(index)}</div>
                <Avatar className="h-16 w-16 mr-6">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{user.name}</h3>
                  <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div className="flex items-center justify-center gap-1 text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>{user.stats.completedCollections} cols</span>
                    </div>
                    <div className="flex items-center justify-center gap-1 text-gray-600">
                      <Activity className="w-4 h-4" />
                      <span>{user.stats.exchanges} trades</span>
                    </div>
                    <div className="flex items-center justify-center gap-1 text-gray-600">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{user.stats.likes} likes</span>
                    </div>
                    <div className="flex items-center justify-center gap-1 text-gray-600">
                      <Star className="w-4 h-4" />
                      <span>{user.stats.followers} followerrs</span>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Badge variant="secondary">{user.achievements.length} achievements</Badge>
                    <Badge variant="outline">{user.stats.exchanges} exchanges</Badge>
                  </div>
                </div>
                <Button variant="outline" className="ml-4">
                  View Profile
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="text-center mt-8">
        <Button size="lg" className="bg-primary">
          View Full Leaderboard
        </Button>
      </div>
    </section>
  )
}

