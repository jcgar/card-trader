"use client"

import { useEffect, useState } from "react"
import { NavigationBar } from "@/components/NavigationBar"
import { FeaturedCategories } from "@/components/FeaturedCategories"
import { FeaturedCollections } from "@/components/collections/FeaturedCollections"
import { CategorySlider } from "@/components/collections/CategorySlider"
import { TradeMarket } from "@/components/dashboard/TradeMarket"
import { SearchBar } from "@/components/collections/SearchBar"
import { AdvancedSearch } from "@/components/collections/AdvancedSearch"
import { useApi } from "@/use/api"
import type { Collection } from "@/app/types"
import { t } from "@/use/i18n"
import { FinalCTA } from "@/components/FinalCTA"
import { useNavigate } from "react-router-dom"
import { routes } from "@/use/routes"


const PublicCollections = () => {
  const navigate = useNavigate()
  const { data: collections } = useApi<Collection>("featuredCollections", { useGraphQL: true, page: 1, pageSize: 100, fullQuery: false })
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false)

  const [categories, setCategories] = useState({ first: null, middle: null, last: null })

  useEffect(() => {
    const collectionsByCategory = collections.reduce(
      (acc, collection) => {
        if (!acc[collection.category]) {
          acc[collection.category] = []
        }
        acc[collection.category].push(collection)
        return acc
      },
      {} as Record<string, Collection[]>,
    )

    setCategories({
      first: Object.entries(collectionsByCategory).slice(0, 2),
      middle: Object.entries(collectionsByCategory).slice(2, 4),
      last: Object.entries(collectionsByCategory).slice(4),
    })
  }, [collections])

  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem("publicCollectionsScrollPosition")
    if (savedScrollPosition) {
      window.scrollTo(0, Number.parseInt(savedScrollPosition))
      sessionStorage.removeItem("publicCollectionsScrollPosition")
    }
  }, [])

  const handleCollectionClick = () => {
    sessionStorage.setItem("publicCollectionsScrollPosition", window.scrollY.toString())
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-white pt-16">
      <NavigationBar />

      <div className="container mx-auto px-4 pt-16">
        <FeaturedCollections collections={collections} onCollectionClick={handleCollectionClick} />

        <h2 className="text-2xl font-bold mb-4 mt-8">{t("collections.catalog")}</h2>

        <SearchBar onAdvancedSearch={() => setIsAdvancedSearchOpen(true)} />
        <AdvancedSearch isOpen={isAdvancedSearchOpen} onClose={() => setIsAdvancedSearchOpen(false)} />

        <Category categories={categories.first} onClick={handleCollectionClick} />
        <FeaturedCategories />
        <Category categories={categories.middle} onClick={handleCollectionClick} />
        <Category categories={categories.last} onClick={handleCollectionClick} />

        <div className="my-16">
          <TradeMarket preview />
        </div>

        <FinalCTA onStartCollecting={() => navigate(routes.dashboard)} />
      </div>
    </div>
  )
}

export default PublicCollections

const Category = ({ categories, onClick }) => (
  <div className="space-y-4">
    {(categories || []).map(([category, collections]) => (
      <CategorySlider
        key={category}
        itemsPerPage={4}
        onCollectionClick={onClick}
        title={category}
        collections={collections}
      />
    ))}
  </div>
)

