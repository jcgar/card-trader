
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowRight, BookOpen, Calendar, Clock } from "lucide-react";

export const FeaturedBlog = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4 text-green-800">
            Featured Articles
          </h2>
          <p className="text-green-600 max-w-2xl mx-auto">
            Stay updated with the latest collecting tips and community news
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="lg:col-span-2 group hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <div className="md:flex h-full">
              <div className="md:w-1/2 relative">
                <img
                  src="https://images.unsplash.com/photo-1590845947670-c009801ffa74?w=800"
                  alt="Featured article"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 to-transparent" />
              </div>
              <div className="p-6 md:w-1/2 flex flex-col justify-between">
                <div>
                  <span className="inline-block px-3 py-1 text-sm font-medium bg-green-100 text-green-600 rounded-full mb-4">
                    Featured
                  </span>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-green-600 transition-colors">
                    The Art of Card Collection: A Beginner's Guide
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Discover essential tips and strategies to start your collection journey with confidence...
                  </p>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>Mar 15, 2024</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>5 min read</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          <div className="space-y-8">
            {[1, 2].map((i) => (
              <Card key={i} className="group hover:shadow-xl transition-shadow duration-300">
                <div className="p-6">
                  <span className="inline-block px-3 py-1 text-sm font-medium bg-green-100 text-green-600 rounded-full mb-4">
                    Trading Tips
                  </span>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-green-600 transition-colors">
                    {i === 1 ? "Top 10 Most Valuable Cards of 2024" : "Community Spotlight: Rare Finds"}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    {i === 1
                      ? "Explore the most sought-after cards in the current market..."
                      : "Amazing stories from our community members and their unique discoveries..."}
                  </p>
                  <Button variant="ghost" className="group-hover:translate-x-2 transition-transform p-0">
                    Read More <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

