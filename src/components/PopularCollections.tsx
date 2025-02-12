
import { Card } from "./ui/card";
import { Star, Users, Activity, TrendingUp, Clock, Heart, Sparkles } from "lucide-react";
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
    lastUpdated: "2 hours ago",
    likes: 1234,
    featured: true,
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
    lastUpdated: "5 hours ago",
    likes: 987,
    featured: false,
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
    lastUpdated: "1 day ago",
    likes: 756,
    featured: true,
  },
  {
    id: 4,
    title: "Digital Art Collection",
    category: "Art",
    popularity: 89,
    collectors: 1234,
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    recentActivity: [
      "New digital artwork added",
      "Collaboration announced",
      "Community event planned",
    ],
    lastUpdated: "3 hours ago",
    likes: 543,
    featured: false,
  },
  {
    id: 5,
    title: "Tech Memorabilia",
    category: "Technology",
    popularity: 87,
    collectors: 890,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    recentActivity: [
      "Vintage computer added",
      "Tech meetup scheduled",
      "Historic piece traded",
    ],
    lastUpdated: "6 hours ago",
    likes: 432,
    featured: true,
  },
];

export const PopularCollections = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % collections.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-green-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4 text-green-800">
            Popular Collections
          </h2>
          <p className="text-green-600 max-w-2xl mx-auto">
            Explore the most sought-after collections in our community
          </p>
        </div>
        <div className="relative">
          <div
            className="flex gap-6 transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {collections.map((collection) => (
              <Card
                key={collection.id}
                className={`min-w-full bg-white rounded-xl shadow-lg overflow-hidden mx-4 transition-all duration-300 ${
                  hoveredId === collection.id ? 'scale-[1.02] shadow-xl' : ''
                }`}
                style={{ flex: '0 0 calc(100% - 2rem)' }}
                onMouseEnter={() => setHoveredId(collection.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <div className="relative aspect-[4/3]">
                      <img
                        src={collection.image}
                        alt={collection.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 to-transparent" />
                      {collection.featured && (
                        <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full flex items-center gap-1 animate-bounce">
                          <Sparkles className="w-4 h-4" />
                          <span className="text-sm font-medium">Featured</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="p-6 md:w-1/2">
                    <span className="inline-block px-3 py-1 text-sm font-medium bg-green-100 text-green-600 rounded-full mb-3">
                      {collection.category}
                    </span>
                    <h3 className="text-2xl font-bold mb-4 text-green-800">{collection.title}</h3>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-2 group">
                        <TrendingUp className="w-5 h-5 text-green-500 group-hover:scale-110 transition-transform" />
                        <span className="text-green-700">{collection.popularity}% Popularity</span>
                      </div>
                      <div className="flex items-center gap-2 group">
                        <Users className="w-5 h-5 text-green-500 group-hover:scale-110 transition-transform" />
                        <span className="text-green-700">{collection.collectors} Collectors</span>
                      </div>
                      <div className="flex items-center gap-2 group">
                        <Heart className="w-5 h-5 text-rose-500 group-hover:scale-110 transition-transform" />
                        <span className="text-green-700">{collection.likes} Likes</span>
                      </div>
                      <div className="flex items-center gap-2 group">
                        <Clock className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
                        <span className="text-green-700">{collection.lastUpdated}</span>
                      </div>
                    </div>
                    
                    <div className="border-t border-green-100 pt-4">
                      <h4 className="font-semibold text-green-700 mb-2 flex items-center gap-2">
                        <Activity className="w-4 h-4" /> Recent Activity
                      </h4>
                      <ul className="space-y-2">
                        {collection.recentActivity.map((activity, index) => (
                          <li
                            key={index}
                            className="text-sm text-green-600 flex items-center gap-2 group"
                          >
                            <Star className="w-3 h-3 text-yellow-500 group-hover:rotate-45 transition-transform" />
                            {activity}
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
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? 'bg-green-500 scale-125'
                    : 'bg-green-200 hover:bg-green-300'
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
