
import { Card } from "./ui/card";
import { Users, TrendingUp, Sparkles, Tag } from "lucide-react";
import { useState } from "react";

const categories = [
  {
    name: "Soccer",
    collectors: "12.5K",
    trending: "World Cup Legends",
    newCollection: "Premier League 23/24",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800",
    gradient: "from-blue-500 to-green-500",
  },
  {
    name: "Cinema & TV",
    collectors: "10.2K",
    trending: "Classic Movies",
    newCollection: "Netflix Hits",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    name: "Classic Leagues",
    collectors: "8.7K",
    trending: "NBA All-Stars",
    newCollection: "MLB Vintage",
    image: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=800",
    gradient: "from-yellow-500 to-red-500",
  },
  {
    name: "Pokémon",
    collectors: "15.3K",
    trending: "First Edition",
    newCollection: "Scarlet & Violet",
    image: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=800",
    gradient: "from-green-500 to-yellow-500",
  },
  {
    name: "World Leagues",
    collectors: "9.1K",
    trending: "European Champions",
    newCollection: "Asian Cup Stars",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800",
    gradient: "from-red-500 to-blue-500",
  },
];

export const FeaturedCategories = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4 text-green-800">
            Featured Categories
          </h2>
          <p className="text-green-600 max-w-2xl mx-auto">
            Explore our most popular collection categories
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {categories.map((category, index) => (
            <Card
              key={category.name}
              className={`
                group overflow-hidden hover:shadow-lg transition-all duration-500
                transform hover:-translate-y-2
                ${hoveredCard === category.name ? 'ring-2 ring-green-400 ring-offset-2' : ''}
              `}
              onMouseEnter={() => setHoveredCard(category.name)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-32 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`
                  absolute inset-0 bg-gradient-to-t opacity-80
                  ${category.gradient}
                  transition-opacity duration-300
                  group-hover:opacity-90
                `} />
                <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white transform transition-all duration-300 group-hover:scale-110">
                  {category.name}
                </h3>
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-center text-sm text-gray-600 group-hover:text-green-600 transition-colors duration-300">
                  <Users className="w-4 h-4 mr-2" />
                  <span>{category.collectors} collectors</span>
                </div>
                <div className="flex items-center text-sm text-green-600">
                  <TrendingUp className="w-4 h-4 mr-2 animate-bounce" />
                  <span>Trending: {category.trending}</span>
                </div>
                <div className="flex items-center text-sm text-purple-600">
                  <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                  <span>New: {category.newCollection}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
