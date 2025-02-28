"use client"

import { AppLayout } from "@/components/layout/AppLayout"
import { RealtimeNotifications } from "@/components/dashboard/RealtimeNotifications"
import { ProgressPanel } from "@/components/dashboard/ProgressPanel"
import { MyCollections } from "@/components/dashboard/MyCollections"
import { UserStats } from "@/components/dashboard/UserStats"
import { MyExchanges } from "@/components/dashboard/MyExchanges"
import { RecommendedUsers } from "@/components/dashboard/RecommendedUsers"
import { RecentExchanges } from "@/components/dashboard/RecentExchanges"
import { ActiveChallenges } from "@/components/dashboard/ActiveChallenges"
import { LatestAchievements } from "@/components/dashboard/LatestAchievements"
import { SpecialEvents } from "@/components/dashboard/SpecialEvents"
import { PersonalRanking } from "@/components/dashboard/PersonalRanking"
import { FeaturedEvents } from "@/components/dashboard/FeaturedEvents"
import CollectionsList from "@/components/dashboard/CollectionsList"
import { RecommendedCollections } from "@/components/dashboard/RecommendedCollections"
import ExchangesList from "@/components/dashboard/ExchangesList"
import { TopExchangePartners } from "@/components/dashboard/TopExchangePartners"
import { useApi } from "@/use/api"
import type { Activity, Collection, Exchange } from "@/app/types"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { t } from "@/use/i18n"
import CollectionDetail from "./CollectionDetail"
import { ExchangeDetail } from "@/components/dashboard/ExchangeDetail"
import { routes } from "@/use/routes"
import { CollectionFilters } from "@/components/filter/CollectionFilters"
import { ExchangeFilters } from "@/components/filter/ExchangeFilters"
import { LiveActivity } from "@/components/community/LiveActivity"
import { UserSummary } from "@/components/dashboard/UserSummary"

const Dashboard = () => {
  const navigate = useNavigate()
  const { collectionId, exchangeId } = useParams()
  const location = useLocation()

  const tabMapping = [
    { index: 1, path: collectionId ? routes.myCollectionDetail : routes.myCollections, tab: "collections" },
    { index: 2, path: exchangeId ? routes.myExchangesDetail : routes.myExchanges, tab: "exchanges" },
    { index: 3, path: routes.myActivity, tab: "activity" },
    { index: 0, path: routes.dashboard, tab: "home" },
  ]

  const activeTab = tabMapping.find((item, i) => i > 0 && location.pathname.includes(item.path)).index
  const { data: collections } = useApi<Collection>("collections", { page: 1, pageSize: 10 })
  const { data: exchanges } = useApi<Exchange>("exchanges", { page: 1, pageSize: 10 })
  const { data: activities } = useApi<Activity>("activities", { page: 1, pageSize: 4 })

  const selectedCollection = collections.find((o) => o.id === collectionId)
  const selectedExchange = exchanges.find((o) => o.id === Number(exchangeId))

  const handleTabChange = (tab: string) => {
    const selectedTab = tabMapping.find((item) => item.tab === tab)
    if (selectedTab) {
      navigate(selectedTab.path)
    } else navigate(routes.dashboard)
  }

  const handleCollectionFilterChange = (filters: any) => {
    // Implement filter logic here
    console.log("Collection filters applied:", filters)
  }

  const handleCollectionSortChange = (sortBy: string, sortOrder: "asc" | "desc") => {
    // Implement sort logic here
    console.log("Collection sort changed:", sortBy, sortOrder)
  }

  const handleExchangeFilterChange = (filters: any) => {
    // Implement filter logic here
    console.log("Exchange filters applied:", filters)
  }

  const handleExchangeSortChange = (sortBy: string, sortOrder: "asc" | "desc") => {
    // Implement sort logic here
    console.log("Exchange sort changed:", sortBy, sortOrder)
  }

  const tabs = [
    {
      value: "home",
      label: t("dashboard.home"),
      content: (
        <>
          <MyCollections collections={collections.slice(0, 6)} />
          <MyExchanges exchanges={exchanges.slice(0, 6)} />
          <ActiveChallenges />
          <LatestAchievements />
          <FeaturedEvents />
        </>
      ),
      sidebar: (
        <>
          <UserSummary />
          <UserStats />
          <RecommendedUsers />
          <RecentExchanges />
        </>
      ),
    },
    {
      value: "collections",
      label: t("dashboard.collections"),
      content: (
        <>
          {selectedCollection ? (
            <CollectionDetail collection={selectedCollection} />
          ) : (
            <CollectionsList collections={collections} />
          )}
          <RecommendedCollections />
        </>
      ),
      sidebar: (
        <>
          <UserSummary />
          <CollectionFilters onFilterChange={handleCollectionFilterChange} onSortChange={handleCollectionSortChange} />
        </>
      ),
    },
    {
      value: "exchanges",
      label: t("dashboard.exchanges"),
      content: (
        <>
          {selectedExchange ? (
            <ExchangeDetail exchange={selectedExchange} onStatusChange={(status) => console.log({ status })} />
          ) : (
            <ExchangesList exchanges={exchanges} />
          )}
          <TopExchangePartners />
        </>
      ),
      sidebar: (
        <>
          <UserSummary />
          <ExchangeFilters onFilterChange={handleExchangeFilterChange} onSortChange={handleExchangeSortChange} />
        </>
      ),
    },
    {
      value: "activity",
      label: t("dashboard.activityCenter"),
      content: (
        <>
          <ProgressPanel />
          <LatestAchievements />
          <ActiveChallenges />
          <PersonalRanking />
          <SpecialEvents />
        </>
      ),
      sidebar: (
        <>
          <UserSummary />
          <UserStats />
          <LiveActivity activities={activities} />
        </>
      ),
    },
  ]

  return (
    <AppLayout
      tabs={tabs}
      selectedTab={activeTab}
      onTabChange={handleTabChange}
      sidebarContent={tabs[activeTab].sidebar}
      actionMenuVariant="full"
      bgVariant="wood"
    >
      <RealtimeNotifications />
    </AppLayout>
  )
}

export default Dashboard

