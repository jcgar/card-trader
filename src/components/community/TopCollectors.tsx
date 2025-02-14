import { Card } from "../ui/card";
import { Award, Medal, Trophy, Star } from "lucide-react";
import { Progress } from "../ui/progress";
import { Link } from "react-router-dom";
import { generateCollectorPath } from "@/use/routes";

const collectors = [
  {
    id: 1,
    name: "Sarah Chen",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    points: 12500,
    level: 75,
    badges: ["Legendary", "Master Trader", "Pioneer"],
    rank: 1,
  },
  {
    id: 2,
    name: "Alex Thompson",
    avatar: "https://i.pravatar.cc/150?u=alex",
    points: 11200,
    level: 68,
    badges: ["Elite", "Collection Master"],
    rank: 2,
  },
  {
    id: 3,
    name: "Maria Garcia",
    avatar: "https://i.pravatar.cc/150?u=maria",
    points: 10800,
    level: 65,
    badges: ["Expert", "Trading Pro"],
    rank: 3,
  },
];

export const TopCollectors = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-12 text-center text-green-800">
          Top Collectors
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {collectors.map((collector) => (
            <Link 
              to={generateCollectorPath(collector.id.toString())} 
              key={collector.id}
            >
              <Card className="relative overflow-hidden group hover:shadow-xl transition-shadow duration-200">
                <div className="absolute top-4 right-4">
                  {collector.rank === 1 && <Trophy className="w-8 h-8 text-yellow-500 animate-bounce" />}
                  {collector.rank === 2 && <Medal className="w-8 h-8 text-gray-400" />}
                  {collector.rank === 3 && <Award className="w-8 h-8 text-orange-500" />}
                </div>
                <div className="p-6 text-center">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <img
                      src={collector.avatar}
                      alt={collector.name}
                      className="rounded-full border-4 border-green-200 group-hover:border-green-400 transition-colors"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      {collector.level}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{collector.name}</h3>
                  <div className="mb-4">
                    <Progress value={collector.points / 150} className="h-2" />
                    <p className="text-sm text-gray-600 mt-1">{collector.points} points</p>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {collector.badges.map((badge, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                      >
                        <Star className="w-3 h-3 mr-1" />
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
