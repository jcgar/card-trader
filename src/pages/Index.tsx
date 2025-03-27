
import { HeroSection } from "@/components/HeroSection"
import { PopularCollections } from "@/components/PopularCollections"
import { UserRanking } from "@/components/UserRanking"
import { UserRanking2 } from "@/components/UserRanking2"
import { LiveExchange } from "@/components/LiveExchange"
import { FeaturedCategories } from "@/components/FeaturedCategories"
import { FeaturedBlog } from "@/components/FeaturedBlog"
import { FinalCTA } from "@/components/FinalCTA"
import { NavigationBar } from "@/components/NavigationBar"
import { TreasureChestSection } from "@/components/games/TreasureChestSection"
import type { Collection } from "@/app/types"
import { useApi } from "@/use/api"
import { useNavigate } from "react-router-dom"
import { routes } from "@/use/routes"

const Index = () => {
  const navigate = useNavigate()
  const { data: collections } = useApi<Collection>("collections", { page: 1, pageSize: 10, fullQuery: false })

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-white pt-16">
      <NavigationBar />
      <HeroSection
        onStartCollecting={() => navigate(routes.dashboard)}
        onExploreCollections={() => navigate(routes.collections)}
      />
      <PopularCollections collections={collections} />
      <UserRanking />
      <UserRanking2 />
      <LiveExchange />
      <FeaturedCategories />
      <FeaturedBlog />
      <TreasureChestSection />
      <FinalCTA onStartCollecting={() => navigate(routes.dashboard)} />
    </div>
  )
}

export default Index
