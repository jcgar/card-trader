"use client"

import { useEffect, useState } from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { FeaturedCategories } from "@/components/FeaturedCategories"
import { FeaturedCollections } from "@/components/collections/FeaturedCollections"
import { Category } from "@/components/collections/Category"
import { TradeMarket } from "@/components/dashboard/TradeMarket"
import { SearchBar } from "@/components/collections/SearchBar"
import { AdvancedSearch } from "@/components/collections/AdvancedSearch"
import { useApi } from "@/use/api"
import type { Collection } from "@/app/types"
import { t } from "@/use/i18n"
import { FinalCTA } from "@/components/FinalCTA"
import { useNavigate } from "react-router-dom"
import { routes } from "@/use/routes"
import { Card } from "@/components/ui/card"
import { CategorySlider } from "@/components/collections/CategorySlider"

const PublicCollections = () => {
  const navigate = useNavigate()
  const { data: collections } = useApi<Collection>("collections", { page: 1, pageSize: 100, fullQuery: false })
  const { data: featuredCollections } = useApi<Collection>("collections", { page: 1, pageSize: 100, fullQuery: false })
  const { data: newestCollections } = useApi<Collection>("collections", { page: 1, pageSize: 100, fullQuery: false })

  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false)


  const handleCollectionClick = (collectionId: string) => {
    sessionStorage.setItem("publicCollectionsScrollPosition", window.scrollY.toString())
    navigate(routes.collection.replace(":id", collectionId))
  }

  const tabs = [
    {
      value: "categories",
      label: t("collections.categories"),
      content: (
        <>
          <FeaturedCategories />
          <FeaturedCollections collections={featuredCollections} onCollectionClick={handleCollectionClick} />
        </>
      ),
    },
    {
      value: "catalog",
      label: t("collections.catalog"),
      content: <Category collections={collections} onClick={handleCollectionClick} />,
    },
    {
      value: "newest",
      label: t("collections.newest"),
      content: <Slider category="newest" collections={newestCollections} onClick={handleCollectionClick} />,
    },
    {
      value: "tradeMarket",
      label: t("collections.tradeMarket"),
      content: <TradeMarket preview />,
    },
  ]

  const sidebarContent = (
    <>
      <SearchBar onAdvancedSearch={() => setIsAdvancedSearchOpen(true)} />
      <AdvancedSearch isOpen={isAdvancedSearchOpen} onClose={() => setIsAdvancedSearchOpen(false)} />
      <Card className="m-8">
        <FinalCTA onStartCollecting={() => navigate(routes.dashboard)} />
      </Card>
    </>
  )

  return <AppLayout tabs={tabs} sidebarContent={sidebarContent} />
}

export default PublicCollections

const Slider = ({ category, onClick, collections }) => (
  <CategorySlider
    key={category}
    itemsPerPage={4}
    onCollectionClick={onClick}
    title={t(`categories.${category}`)}
    collections={collections}
  />
)