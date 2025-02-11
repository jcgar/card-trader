
import { Card } from "./ui/card";
import { Star } from "lucide-react";

const collections = [
  {
    id: 1,
    title: "Vintage Sports Cards",
    items: "2,345",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    category: "Sports",
  },
  {
    id: 2,
    title: "Rare Entertainment",
    items: "1,789",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    category: "Entertainment",
  },
  {
    id: 3,
    title: "Limited Edition",
    items: "956",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    category: "Special",
  },
];

export const PopularCollections = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
            Popular Collections
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore the most sought-after collections in our community
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <Card key={collection.id} className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Star className="w-12 h-12 text-white" />
                </div>
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 text-sm font-medium bg-gray-100 rounded-full mb-3">
                  {collection.category}
                </span>
                <h3 className="text-xl font-bold mb-2">{collection.title}</h3>
                <p className="text-gray-600">{collection.items} items</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
