"use client"

import { Card } from "./ui/card"
import { Star, Users, TrendingUp, Clock, Heart } from "lucide-react"
import { useEffect, useState } from "react"

export const PopularCollections = ({ collections }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % collections.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-12 bg-gradient-to-b from-green-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-3 text-green-800">Popular Collections</h2>
          <p className="text-green-600 max-w-2xl mx-auto text-sm md:text-base">
            Explore the most sought-after collections in our community
          </p>
        </div>
        <div className="relative max-w-4xl mx-auto">
          <div
            className="flex gap-4 transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {collections.map((collection) => (
              <Card
                key={collection.id}
                className={`min-w-full bg-white rounded-lg shadow-md overflow-hidden mx-2 transition-all duration-300 ${hoveredId === collection.id ? "scale-[1.02] shadow-lg" : ""
                  }`}
                style={{ flex: "0 0 calc(100% - 1rem)" }}
                onMouseEnter={() => setHoveredId(collection.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="md:flex h-full">
                  <div className="md:w-2/5">
                    <div className="relative aspect-[4/3] md:h-full">
                      <img src={collection.image} alt={collection.title} className="w-full h-full object-cover" />
                      {collection.featured && (
                        <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full text-xs font-medium">
                          Featured
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="p-4 md:w-3/5">
                    <span className="inline-block px-2 py-0.5 text-xs font-medium bg-green-100 text-green-600 rounded-full mb-2">
                      {collection.category}
                    </span>
                    <h3 className="text-lg font-bold mb-2 text-green-800">{collection.title}</h3>

                    <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-green-700">{collection.popularity}%</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-green-500" />
                        <span className="text-green-700">{collection.collectors}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4 text-rose-500" />
                        <span className="text-green-700">{collection.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-blue-500" />
                        <span className="text-green-700">{collection.lastUpdated}</span>
                      </div>
                    </div>

                    <div className="text-xs text-green-600 space-y-1">
                      {collection.recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500" />
                          {activity}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="flex justify-center mt-4 gap-1">
            {collections.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${activeIndex === index ? "bg-green-500 scale-125" : "bg-green-200 hover:bg-green-300"
                  }`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

