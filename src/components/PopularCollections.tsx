
import { Card } from "./ui/card";
import { Star, Users, Activity, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

const collections = [
  {
    id: 1,
    title: "Vintage Sports Cards",
    category: "Sports",
    popularity: 98,
    collectors: 2345,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    recentActivity: [
      "John just joined",
      "New rare card added",
      "Trade completed",
    ],
  },
  {
    id: 2,
    title: "Rare Entertainment",
    category: "Entertainment",
    popularity: 95,
    collectors: 1789,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    recentActivity: [
      "Limited edition found",
      "Group trade completed",
      "New member milestone",
    ],
  },
  {
    id: 3,
    title: "Limited Edition",
    category: "Special",
    popularity: 92,
    collectors: 956,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    recentActivity: [
      "Special event started",
      "Rare trade completed",
      "New collection goal",
    ],
  },
];

export const PopularCollections = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % collections.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-green-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4 text-green-800">
            Popular Collections
          </h2>
          <p className="text-green-600 max-w-2xl mx-auto">
            Explore the most sought-after collections in our community
          </p>
        </div>
        <div className="relative">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {collections.map((collection) => (
              <Card
                key={collection.id}
                className="min-w-full bg-white rounded-xl shadow-lg overflow-hidden mx-4"
                style={{ flex: '0 0 calc(100% - 2rem)' }}
              >
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <div className="relative aspect-[4/3]">
                      <img
                        src={collection.image}
                        alt={collection.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 to-transparent" />
                    </div>
                  </div>
                  <div className="p-6 md:w-1/2">
                    <span className="inline-block px-3 py-1 text-sm font-medium bg-green-100 text-green-600 rounded-full mb-3">
                      {collection.category}
                    </span>
                    <h3 className="text-2xl font-bold mb-4 text-green-800">{collection.title}</h3>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-green-500" />
                        <span className="text-green-700">{collection.popularity}% Popularity</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-green-500" />
                        <span className="text-green-700">{collection.collectors} Collectors</span>
                      </div>
                    </div>
                    
                    <div className="border-t border-green-100 pt-4">
                      <h4 className="font-semibold text-green-700 mb-2 flex items-center gap-2">
                        <Activity className="w-4 h-4" /> Recent Activity
                      </h4>
                      <ul className="space-y-2">
                        {collection.recentActivity.map((activity, index) => (
                          <li key={index} className="text-sm text-green-600">
                            • {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="flex justify-center mt-6 gap-2">
            {collections.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  activeIndex === index ? 'bg-green-500' : 'bg-green-200'
                }`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
