
import { Card } from "./ui/card";
import { Award, Crown, Trophy, Users, Star, ThumbsUp, Activity, ListOrdered } from "lucide-react";
import { Button } from "./ui/button";
import { api } from "@/use/api";
import { topCollectors } from "@/use/api/topCollectors";
import { Collector } from "@/use/types";
import { useState, useEffect } from "react";



export const UserRanking = () => {

  const [topUsers, setTopUsers] = useState<Collector[]>([])

  useEffect(() => {
    const fetchTopUsers = async () => {
      const data = await api("topCollectors")
      setTopUsers(data.slice(0, 3))
    }
    fetchTopUsers()
  }, [])

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
            Top Collectors
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Meet our most accomplished community members
          </p>
          <div className="flex justify-center gap-4 mb-12">
            <Button className="bg-green-600 hover:bg-green-700">
              <ListOrdered className="w-4 h-4 mr-2" />
              Global Rankings
            </Button>
            <Button variant="outline" className="border-green-200 text-green-600 hover:bg-green-50">
              <Activity className="w-4 h-4 mr-2" />
              Monthly Leaders
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {topUsers.map((collector) => (
            <Card
              key={collector.rank}
              className="p-6 text-center hover:shadow-lg transition-shadow duration-300"
            >
              <collector.icon className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
              <img
                src={collector.avatar}
                alt={collector.name}
                className="w-20 h-20 mx-auto rounded-full border-4 border-white shadow-lg mb-4"
              />
              <span className="inline-block px-4 py-1 bg-gray-100 rounded-full text-sm font-medium mb-4">
                Rank #{collector.rank}
              </span>
              <h3 className="text-xl font-bold mb-4">{collector.name}</h3>

              <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                <div className="flex items-center justify-center gap-1 text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{collector.stats.collections} cols</span>
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
                  <span>{collector.stats.achievements} badges</span>
                </div>
              </div>

              <p className="text-sm text-green-600 bg-green-50 p-2 rounded">
                {collector.recentActivity}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

