
import { HeroSection } from "@/components/HeroSection";
import { PopularCollections } from "@/components/PopularCollections";
import { UserRanking } from "@/components/UserRanking";
import { FinalCTA } from "@/components/FinalCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <PopularCollections />
      <UserRanking />
      <FinalCTA />
    </div>
  );
};

export default Index;
