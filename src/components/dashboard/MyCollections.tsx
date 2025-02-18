
import { Card } from "../ui/card";
import { BookOpen, Search, Star } from "lucide-react";
import { Button } from "../ui/button";
import CollectionCard from "../cards/CollectionCard";
import { Collection } from "@/app/types";
import { generatePath, Link, useSearchParams } from "react-router-dom";
import { routes } from "@/use/routes";

// const collections = [
//   {
//     id: 1,
//     title: "World Cup 2022",
//     progress: "435/500",
//     rarity: "Legendary",
//     image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800",
//   },
//   {
//     id: 2,
//     title: "Pokémon Series X",
//     progress: "89/150",
//     rarity: "Rare",
//     image: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=800",
//   },
//   {
//     id: 3,
//     title: "Classic Movies",
//     progress: "200/250",
//     rarity: "Epic",
//     image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800",
//   },
// ];

export const MyCollections = ({ collections }: { collections: Collection[] }) => {
  const [searchParams, setSearchParams] = useSearchParams();

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
            <Link key={collection.id} to={generatePath(routes.myCollectionDetail, { collectionId: collection.id })}
              onClick={() => setSearchParams({ tab: "collections", collectionId: collection.id })}
            >
              <CollectionCard key={collection.name} collection={collection} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
