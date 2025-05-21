import { HeroSection } from "@/shared/components/HeroSection"
import { PopularCollections } from "@/shared/components/PopularCollections"
import { UserRanking } from "@/shared/components/UserRanking"
import { UserRanking2 } from "@/shared/components/UserRanking2"
import { LiveExchange } from "@/shared/components/LiveExchange"
import { FeaturedCategories } from "@/shared/components/FeaturedCategories"
import { FeaturedBlog } from "@/shared/components/FeaturedBlog"
import { FinalCTA } from "@/shared/components/FinalCTA"
import { NavigationBar } from "@/shared/components/NavigationBar"
import type { Collection } from "@/shared/app/types"
import { useApi } from "@/shared/use/api"
import { useNavigate } from "@/shared/use/navigate"
import { routes } from "@/shared/use/routes"

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
      <FinalCTA onStartCollecting={() => navigate(routes.dashboard)} />
    </div>
  )
}

export default Index

