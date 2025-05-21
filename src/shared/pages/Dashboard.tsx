"use client"

import { useState, useEffect } from "react"
import { AppLayout } from "@/shared/components/layout/AppLayout"
import { RealtimeNotifications } from "@/shared/components/dashboard/RealtimeNotifications"
import { ProgressPanel } from "@/shared/components/dashboard/ProgressPanel"
import { MyCollections } from "@/shared/components/dashboard/MyCollections"
import { UserStats } from "@/shared/components/dashboard/UserStats"
import { MyExchanges } from "@/shared/components/dashboard/MyExchanges"
import { RecommendedUsers } from "@/shared/components/dashboard/RecommendedUsers"
import { RecentExchanges } from "@/shared/components/dashboard/RecentExchanges"
import { ActiveChallenges } from "@/shared/components/dashboard/ActiveChallenges"
import { LatestAchievements } from "@/shared/components/dashboard/LatestAchievements"
import { SpecialEvents } from "@/shared/components/dashboard/SpecialEvents"
import { PersonalRanking } from "@/shared/components/dashboard/PersonalRanking"
import { FeaturedEvents } from "@/shared/components/dashboard/FeaturedEvents"
import CollectionsList from "@/shared/components/dashboard/CollectionsList"
import { RecommendedCollections } from "@/shared/components/dashboard/RecommendedCollections"
import ExchangesList from "@/shared/components/dashboard/ExchangesList"
import { TopExchangePartners } from "@/shared/components/dashboard/TopExchangePartners"
import { useApi } from "@/shared/use/api"
import type { Activity, Collection, Collector, Exchange } from "@/shared/app/types"
import { useLocation, useNavigate, useParams, matchPath } from "@/shared/use/navigate"
import { t } from "@/shared/use/i18n"
import { ExchangeDetail } from "@/shared/components/dashboard/ExchangeDetail"
import { routes } from "@/shared/use/routes"
import { CollectionFilters } from "@/shared/components/filter/CollectionFilters"
import { ExchangeFilters } from "@/shared/components/filter/ExchangeFilters"
import { LiveActivity } from "@/shared/components/community/LiveActivity"
import { UserSummary } from "@/shared/components/dashboard/UserSummary"
import type { CollectionFilters as ICollectionFilters, ExchangeFilters as IExchangeFilters } from "@/shared/app/filterTypes"
import { filterAndSort, filterCollection, sortCollection, filterExchange, sortExchange } from "@/shared/use/filter/filterAndSort"
import { CollectionActions } from "@/shared/components/collections/CollectionActions"
import { CollectionStats } from "@/shared/components/collections/CollectionStats"
import { CollectionSocial } from "@/shared/components/collections/CollectionSocial"
import { CollectionDetail } from "@/shared/components/collections/CollectionDetail"
import { storage } from "@/shared/use/storage"

const Dashboard = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { collectionId, exchangeId } = useParams()

  const [collectionFilters, setCollectionFilters] = useState<ICollectionFilters>(() => {
    const savedFilters = storage.getItem("collectionFilters")
    return savedFilters || { category: [] }
  })
  const [collectionSort, setCollectionSort] = useState(() => {
    const savedSort = storage.getItem("collectionSort")
    return savedSort || { sortBy: "name", sortOrder: "asc" as "asc" | "desc" }
  })

  const [exchangeFilters, setExchangeFilters] = useState<IExchangeFilters>(() => {
    const savedFilters = storage.getItem("exchangeFilters")
    return savedFilters || {
      status: [],
      collection: "",
      collector: "",
      stickerNumber: "",
      inProgress: false,
      cancelled: false,
      completed: false,
    }
  })
  const [exchangeSort, setExchangeSort] = useState(() => {
    const savedSort = storage.getItem("exchangeSort")
    return savedSort || { sortBy: "lastActivityDate", sortOrder: "desc" as "asc" | "desc" }
  })

  const tabMapping = [
    { index: 1, path: collectionId ? routes.myCollectionDetail : routes.myCollections, tab: "collections" },
    { index: 2, path: exchangeId ? routes.myExchangesDetail : routes.myExchanges, tab: "exchanges" },
    { index: 3, path: routes.myActivity, tab: "activity" },
    { index: 0, path: routes.dashboard, tab: "home" },
  ]

  const activeTab = tabMapping.find((item) => (matchPath(item.path, location.pathname)))?.index || 0
  const { data: collections } = useApi<Collection>("collections", { page: 1, pageSize: 10 })
  const { data: exchanges } = useApi<Exchange>("exchanges", { page: 1, pageSize: 10 })
  const { data: activities } = useApi<Activity>("activities", { page: 1, pageSize: 4 })
  const { data: collectors } = useApi<Collector>("collectors", { page: 1, pageSize: 4 })

  console.log('activeTab', activeTab)
  const filteredCollections = filterAndSort(
    collections,
    collectionFilters,
    collectionSort.sortBy,
    collectionSort.sortOrder,
    filterCollection,
    sortCollection,
  )

  const filteredExchanges = filterAndSort(
    exchanges,
    exchangeFilters,
    exchangeSort.sortBy,
    exchangeSort.sortOrder,
    filterExchange,
    sortExchange,
  )

  const selectedCollection = filteredCollections.find((o) => o.id === collectionId)
  const selectedExchange = filteredExchanges.find((o) => o.id === Number(exchangeId))

  useEffect(() => {
    storage.setItem("collectionFilters", JSON.stringify(collectionFilters))
    storage.setItem("collectionSort", JSON.stringify(collectionSort))
    storage.setItem("exchangeFilters", JSON.stringify(exchangeFilters))
    storage.setItem("exchangeSort", JSON.stringify(exchangeSort))
  }, [collectionFilters, collectionSort, exchangeFilters, exchangeSort])

  const handleTabChange = (tab: string) => {
    console.log('handleTabChange', tab)
    const selectedTab = tabMapping.find((item) => item.tab === tab)
    if (selectedTab) {
      navigate(selectedTab.path)
    } else navigate(routes.dashboard)
  }

  const handleCollectionFilterChange = (filters: ICollectionFilters) => {
    // setCollectionFilters(filters)

  }

  const handleCollectionSortChange = (sortBy: string, sortOrder: "asc" | "desc") => {
    // setCollectionSort({ sortBy, sortOrder })
  }

  const handleExchangeFilterChange = (filters: IExchangeFilters) => {
    console.log('handleExchangeFilterChange', filters)

    setExchangeFilters(filters)
  }

  const handleExchangeSortChange = (sortBy: string, sortOrder: "asc" | "desc") => {
    console.log('handleExchangeSortChange', sortBy, sortOrder)
    // setExchangeSort({ sortBy, sortOrder })
  }

  const tabs = [
    {
      value: "home",
      label: t("dashboard.home"),
      content: (
        <>
          <MyCollections collections={filteredCollections.slice(0, 6)} />
          <MyExchanges exchanges={filteredExchanges.slice(0, 6)} />
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
            <CollectionsList collections={filteredCollections} />
          )}
          <RecommendedCollections />
        </>
      ),
      sidebar: (
        <>
          {selectedCollection ? (
            <>
              <CollectionActions />
              <CollectionStats collection={selectedCollection} />
              <CollectionSocial />
            </>
          ) : (
            <>
              <UserSummary />
              <CollectionFilters
                onFilterChange={handleCollectionFilterChange}
                onSortChange={handleCollectionSortChange}
                initialFilters={collectionFilters}
                initialSort={collectionSort}
              />
            </>)}</>
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
            <ExchangesList exchanges={filteredExchanges} />
          )}
          <TopExchangePartners />
        </>
      ),
      sidebar: (
        <>
          <UserSummary />
          <ExchangeFilters
            onFilterChange={handleExchangeFilterChange}
            onSortChange={handleExchangeSortChange}
            collections={collections}
            collectors={collectors}
            initialFilters={exchangeFilters}
            initialSort={exchangeSort}
          />
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

