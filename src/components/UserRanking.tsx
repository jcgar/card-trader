
import { Card } from "./ui/card";
import { Award, Crown, Trophy } from "lucide-react";

const topCollectors = [
  {
    rank: 1,
    name: "Alex Thompson",
    points: "12,456",
    trades: "534",
    icon: Crown,
  },
  {
    rank: 2,
    name: "Sarah Chen",
    points: "11,892",
    trades: "487",
    icon: Trophy,
  },
  {
    rank: 3,
    name: "Michael Park",
    points: "10,234",
    trades: "423",
    icon: Award,
  },
];

export const UserRanking = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
            Top Collectors
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Meet our most accomplished community members
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {topCollectors.map((collector) => (
            <Card
              key={collector.rank}
              className="p-6 text-center hover:shadow-lg transition-shadow duration-300"
            >
              <collector.icon className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
              <span className="inline-block px-4 py-1 bg-gray-100 rounded-full text-sm font-medium mb-4">
                Rank #{collector.rank}
              </span>
              <h3 className="text-xl font-bold mb-2">{collector.name}</h3>
              <p className="text-gray-600 mb-4">{collector.points} points</p>
              <p className="text-sm text-gray-500">{collector.trades} successful trades</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
