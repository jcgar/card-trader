"use client"

import { Card } from "./ui/card"
import { generateCollectorPath } from "@/use/routes"
import { Users, Activity, Star, ThumbsUp } from "lucide-react"
import { Link } from "react-router-dom"
import { useApi } from "@/use/api"
import type { Collector } from "@/app/types"

export const UserRanking = () => {
  const { data: collectors } = useApi<Collector>("topCollectors", { page: 1, pageSize: 10, fullQuery: false })

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">Top Collectors</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">Meet our most accomplished community members</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {collectors.map((collector, index) => (
            <Link key={`${collector.id}-${index}`} to={generateCollectorPath(collector.id)} className="block">
              <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
                <img
                  src={collector.avatar}
                  alt={collector.name}
                  className="w-20 h-20 mx-auto rounded-full border-4 border-white shadow-lg mb-4"
                />
                <span className="inline-block px-4 py-1 bg-gray-100 rounded-full text-sm font-medium mb-4">
                  Rank #{collector.rank.category}
                </span>
                <h3 className="text-xl font-bold mb-4">{collector.name}</h3>

                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div className="flex items-center justify-center gap-1 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{collector.stats.completedCollections} cols</span>
                  </div>
                  <div className="flex items-center justify-center gap-1 text-gray-600">
                    <Activity className="w-4 h-4" />
                    <span>{collector.stats.exchanges} trades</span>
                  </div>
                  <div className="flex items-center justify-center gap-1 text-gray-600">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{collector.stats.likes} likes</span>
                  </div>
                  <div className="flex items-center justify-center gap-1 text-gray-600">
                    <Star className="w-4 h-4" />
                    <span>{collector.stats.rank} rank</span>
                  </div>
                </div>

                <p className="text-sm text-green-600 bg-green-50 p-2 rounded">{collector.recentActivity[0].content}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

