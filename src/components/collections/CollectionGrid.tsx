
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Users, Star } from "lucide-react";

const collections = [
  {
    id: 1,
    name: "Liga 2023-24",
    category: "Deportes",
    image: "https://picsum.photos/200/300?9",
    likes: 1234,
    users: 567,
    rating: 4.5,
  },
  // ... más colecciones
];

export const CollectionGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {collections.map((collection) => (
        <Card key={collection.id} className="overflow-hidden group">
          <div className="relative aspect-video">
            <img
              src={collection.image}
              alt={collection.name}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="bg-white/90">
                {collection.category}
              </Badge>
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-2">{collection.name}</h3>
            <div className="flex justify-between items-center">
              <div className="flex gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  {collection.likes}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {collection.users}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  {collection.rating}
                </span>
              </div>
              <Button size="sm">Ver más</Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
