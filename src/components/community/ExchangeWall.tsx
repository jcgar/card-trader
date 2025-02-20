
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { MessageSquare, RefreshCcw, Search } from "lucide-react";
import ExchangeCard from "../cards/ExchangeCard";

// const exchanges = [
//   {
//     id: 1,
//     user: "Alice Smith",
//     avatar: "https://i.pravatar.cc/150?u=alice",
//     offering: "Rare Premier League 2023",
//     looking: "Champions League Legends",
//     posted: "15 minutes ago",
//     comments: 3,
//   },
//   {
//     id: 2,
//     user: "Bob Johnson",
//     avatar: "https://i.pravatar.cc/150?u=bob",
//     offering: "Pokémon First Edition",
//     looking: "Vintage Baseball Cards",
//     posted: "1 hour ago",
//     comments: 5,
//   },
//   {
//     id: 3,
//     user: "Carol Williams",
//     avatar: "https://i.pravatar.cc/150?u=carol",
//     offering: "Movie Classics Collection",
//     looking: "Anime Limited Edition",
//     posted: "2 hours ago",
//     comments: 2,
//   },
// ];

export const ExchangeWall = ({ exchanges }) => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4 text-green-800">
            Exchange Wall
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Connect with other collectors and find your next trade
          </p>
          <Button className="mt-6 bg-green-600 hover:bg-green-700">
            <RefreshCcw className="w-4 h-4 mr-2" />
            Post Exchange
          </Button>
        </div>
        <div className="grid gap-6 max-w-4xl mx-auto">
          {exchanges.map((exchange) => (
            <ExchangeCard exchange={exchange} />
          ))}
        </div>
      </div>
    </section>
  );
};
