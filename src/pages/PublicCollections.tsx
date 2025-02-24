"use client"

import { useState } from "react"
import { NavigationBar } from "@/components/NavigationBar"
import { FilterSidebar } from "@/components/collections/FilterSidebar"
import { FeaturedCategories } from "@/components/FeaturedCategories"
import { CollectionGrid } from "@/components/collections/CollectionGrid"
import { Pagination } from "@/components/ui/pagination"
import { FeaturedCollections } from "@/components/collections/FeaturedCollections"
import { CategorySlider } from "@/components/collections/CategorySlider"
import { TradeMarket } from "@/components/dashboard/TradeMarket"
import { SearchBar } from "@/components/collections/SearchBar"
import { AdvancedSearch } from "@/components/collections/AdvancedSearch"
import { useApi } from "@/use/api"
import type { Collection } from "@/app/types"

const PublicCollections = () => {
  const { data: collections } = useApi<Collection>("collections", { page: 1, pageSize: 100, fullQuery: false })
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false)

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-white pt-16">
      <NavigationBar />
      <div className="container mx-auto px-4 py-8">
        <SearchBar onAdvancedSearch={() => setIsAdvancedSearchOpen(true)} />
        <AdvancedSearch isOpen={isAdvancedSearchOpen} onClose={() => setIsAdvancedSearchOpen(false)} />
      </div>
      <TradeMarket preview />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 p-8">
        <div className="lg:col-span-1">
          <FilterSidebar />
        </div>

        <div className="lg:col-span-3 space-y-12">
          <FeaturedCollections collections={collections} />
          <FeaturedCategories compact />

          <div className="space-y-4">
            {Object.entries(collectionsByCategory).map(([category, collections]) => (
              <CategorySlider key={category} itemsPerPage={4} title={category} collections={collections} />
            ))}
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Todas las colecciones</h2>
            <CollectionGrid />
            <div className="mt-8 flex justify-center">
              <Pagination />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PublicCollections

