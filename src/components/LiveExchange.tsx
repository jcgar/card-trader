
import { Card } from "./ui/card";
import { ShoppingCart } from "lucide-react";

export const LiveExchange = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
            Live Exchange
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Watch real-time trading activity and join the excitement
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-purple-500" />
              <h3 className="text-xl font-bold mb-2">Recent Trade #{i}</h3>
              <p className="text-gray-600">Rare Sports Card</p>
              <p className="text-sm text-gray-500 mt-2">2 minutes ago</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
