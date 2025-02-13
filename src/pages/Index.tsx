
import { HeroSection } from "@/components/HeroSection";
import { PopularCollections } from "@/components/PopularCollections";
import { UserRanking } from "@/components/UserRanking";
import { UserRanking2 } from "@/components/UserRanking2";
import { LiveExchange } from "@/components/LiveExchange";
import { FeaturedCategories } from "@/components/FeaturedCategories";
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
      <UserRanking2 />
      <LiveExchange />
      <FeaturedCategories />
      <FeaturedBlog />
      <FinalCTA />
    </div>
  );
};

export default Index;

