
import { Card } from "./ui/card";
import { Users, TrendingUp, Sparkles, Tag } from "lucide-react";

const categories = [
  {
    name: "Soccer",
    collectors: "12.5K",
    trending: "World Cup Legends",
    newCollection: "Premier League 23/24",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800",
  },
  {
    name: "Cinema & TV",
    collectors: "10.2K",
    trending: "Classic Movies",
    newCollection: "Netflix Hits",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800",
  },
  {
    name: "Classic Leagues",
    collectors: "8.7K",
    trending: "NBA All-Stars",
    newCollection: "MLB Vintage",
    image: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=800",
  },
  {
    name: "Pokémon",
    collectors: "15.3K",
    trending: "First Edition",
    newCollection: "Scarlet & Violet",
    image: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=800",
  },
  {
    name: "World Leagues",
    collectors: "9.1K",
    trending: "European Champions",
    newCollection: "Asian Cup Stars",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800",
  },
];

export const FeaturedCategories = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4 text-green-800">
            Featured Categories
          </h2>
          <p className="text-green-600 max-w-2xl mx-auto">
            Explore our most popular collection categories
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {categories.map((category) => (
            <Card
              key={category.name}
              className="group overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-32 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">
                  {category.name}
                </h3>
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  <span>{category.collectors} collectors</span>
                </div>
                <div className="flex items-center text-sm text-green-600">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  <span>Trending: {category.trending}</span>
                </div>
                <div className="flex items-center text-sm text-purple-600">
                  <Sparkles className="w-4 h-4 mr-2" />
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

