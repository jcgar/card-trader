
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="min-h-[90vh] flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-purple-50 via-white to-white">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158')] bg-cover bg-center opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-transparent" />
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center animate-fade-up">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-600 rounded-full animate-fade-in">
            Join thousands of collectors worldwide
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-playfair font-bold mb-6 tracking-tight bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Your Ultimate Card Collection Journey Begins Here
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover, trade, and complete your collections with fellow enthusiasts in the world's most engaging card trading community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              Start Collecting
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-purple-200 text-purple-600 hover:bg-purple-50">
              Explore Collections
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
