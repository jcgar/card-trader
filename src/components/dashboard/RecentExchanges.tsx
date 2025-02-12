
import { Card } from "../ui/card";
import { ArrowRight } from "lucide-react";

const exchanges = [
  {
    id: 1,
    date: "2024-03-15",
    user1: {
      name: "You",
      card: "World Cup #45",
      avatar: "https://i.pravatar.cc/150?u=you",
    },
    user2: {
      name: "Alex Kim",
      card: "Premier League #89",
      avatar: "https://i.pravatar.cc/150?u=alex",
    },
  },
  {
    id: 2,
    date: "2024-03-14",
    user1: {
      name: "You",
      card: "Pokemon #123",
      avatar: "https://i.pravatar.cc/150?u=you",
    },
    user2: {
      name: "Emma Chen",
      card: "Yu-Gi-Oh #67",
      avatar: "https://i.pravatar.cc/150?u=emma",
    },
  },
];

export const RecentExchanges = () => {
  return (
    <Card className="p-6">
      <h3 className="font-bold text-lg mb-4">Intercambios Recientes</h3>
      <div className="space-y-4">
        {exchanges.map((exchange) => (
          <div key={exchange.id} className="relative">
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <img
                  src={exchange.user1.avatar}
                  alt={exchange.user1.name}
                  className="w-10 h-10 rounded-full"
                />
                <p className="text-xs mt-1">{exchange.user1.card}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-green-600" />
              <div className="flex flex-col items-center">
                <img
                  src={exchange.user2.avatar}
                  alt={exchange.user2.name}
                  className="w-10 h-10 rounded-full"
                />
                <p className="text-xs mt-1">{exchange.user2.card}</p>
              </div>
              <div className="flex-1 text-right">
                <p className="text-sm text-gray-500">
                  {new Date(exchange.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
