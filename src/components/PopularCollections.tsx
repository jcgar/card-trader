import { Card } from "./ui/card";
import { Star, Users, Activity, TrendingUp, Clock, Heart } from "lucide-react";
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
    <section className="py-12 bg-gradient-to-b from-green-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-3 text-green-800">
            Popular Collections
          </h2>
          <p className="text-green-600 max-w-2xl mx-auto text-sm md:text-base">
            Explore the most sought-after collections in our community
          </p>
        </div>
        <div className="relative max-w-4xl mx-auto">
          <div
            className="flex gap-4 transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {collections.map((collection) => (
              <Card
                key={collection.id}
                className={`min-w-full bg-white rounded-lg shadow-md overflow-hidden mx-2 transition-all duration-300 ${
                  hoveredId === collection.id ? 'scale-[1.02] shadow-lg' : ''
                }`}
                style={{ flex: '0 0 calc(100% - 1rem)' }}
                onMouseEnter={() => setHoveredId(collection.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="md:flex h-full">
                  <div className="md:w-2/5">
                    <div className="relative aspect-[4/3] md:h-full">
                      <img
                        src={collection.image}
                        alt={collection.title}
                        className="w-full h-full object-cover"
                      />
                      {collection.featured && (
                        <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full text-xs font-medium">
                          Featured
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="p-4 md:w-3/5">
                    <span className="inline-block px-2 py-0.5 text-xs font-medium bg-green-100 text-green-600 rounded-full mb-2">
                      {collection.category}
                    </span>
                    <h3 className="text-lg font-bold mb-2 text-green-800">{collection.title}</h3>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-green-700">{collection.popularity}%</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-green-500" />
                        <span className="text-green-700">{collection.collectors}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4 text-rose-500" />
                        <span className="text-green-700">{collection.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-blue-500" />
                        <span className="text-green-700">{collection.lastUpdated}</span>
                      </div>
                    </div>
                    
                    <div className="text-xs text-green-600 space-y-1">
                      {collection.recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500" />
                          {activity}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="flex justify-center mt-4 gap-1">
            {collections.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
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
