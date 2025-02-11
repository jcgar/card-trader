
import { HeroSection } from "@/components/HeroSection";
import { PopularCollections } from "@/components/PopularCollections";
import { UserRanking } from "@/components/UserRanking";
import { LiveExchange } from "@/components/LiveExchange";
import { FeaturedBlog } from "@/components/FeaturedBlog";
import { FinalCTA } from "@/components/FinalCTA";
import { NavigationBar } from "@/components/NavigationBar";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-white pt-16">
      <NavigationBar />
      <HeroSection />
      <PopularCollections />
      <UserRanking />
      <LiveExchange />
      <FeaturedBlog />
      <FinalCTA />
    </div>
  );
};

export default Index;
