
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export const FeaturedBlog = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
            Featured Articles
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest collecting tips and community news
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden group">
              <div className="relative aspect-[16/9]">
                <img
                  src={`https://images.unsplash.com/photo-${i + 1}`}
                  alt={`Blog post ${i}`}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Collecting Guide #{i}</h3>
                <p className="text-gray-600 mb-4">Essential tips for new collectors...</p>
                <Button variant="ghost" className="group-hover:translate-x-2 transition-transform">
                  Read More <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
