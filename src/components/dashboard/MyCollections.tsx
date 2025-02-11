
import { Card } from "../ui/card";
import { BookOpen, Search, Star } from "lucide-react";
import { Button } from "../ui/button";

const collections = [
  {
    id: 1,
    title: "World Cup 2022",
    progress: "435/500",
    rarity: "Legendary",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800",
  },
  {
    id: 2,
    title: "Pokémon Series X",
    progress: "89/150",
    rarity: "Rare",
    image: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=800",
  },
  {
    id: 3,
    title: "Classic Movies",
    progress: "200/250",
    rarity: "Epic",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800",
  },
];

export const MyCollections = () => {
  return (
    <section className="py-20 bg-green-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-playfair font-bold text-green-800">
            My Collections
          </h2>
          <Button className="bg-green-600 hover:bg-green-700">
            <BookOpen className="w-4 h-4 mr-2" />
            View All Albums
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <Card
              key={collection.id}
              className="group overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="relative aspect-[4/3]">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 via-green-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4 right-4">
                    <Button className="w-full bg-white/90 hover:bg-white text-green-800">
                      <Search className="w-4 h-4 mr-2" />
                      View Album
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold">{collection.title}</h3>
                  <span className="flex items-center text-yellow-500">
                    <Star className="w-4 h-4 mr-1" />
                    {collection.rarity}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Progress: {collection.progress}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
