"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ChevronDown, ChevronUp } from 'lucide-react'

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collection } from "@/shared/app/types"
import { t } from "@/shared/use/i18n"
import { RecentExchanges } from "../../dashboard/RecentExchanges"
import { CategorySlider } from "../CategorySlider"
import { FeaturedCollections } from "../FeaturedCollections"

interface ProgressiveViewProps {
  collections: Collection[]
  featuredCollections: Collection[]
  newestCollections: Collection[]
  onCollectionClick: (id: string) => void
}

export const ProgressiveView: React.FC<ProgressiveViewProps> = ({
  collections,
  featuredCollections,
  newestCollections,
  onCollectionClick,
}) => {
  const [expandedSections, setExpandedSections] = useState({
    featured: true,
    recent: true,
    exchanges: true,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Input
          type="text"
          placeholder={t("collections.searchPlaceholder")}
          className="pl-10 h-12"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Button variant="outline" className="absolute right-2 top-1/2 transform -translate-y-1/2">
          {t("collections.exploreFilters")}
        </Button>
      </div>

      {/* Category Slider */}
      <div className="py-4">
        <h2 className="text-xl font-semibold mb-4">{t("collections.popularCategories")}</h2>
        <CategorySlider
          itemsPerPage={4}
          onCollectionClick={onCollectionClick}
          title=""
          collections={collections.slice(0, 8)}
        />
      </div>

      {/* Featured Collections (Collapsible) */}
      <Card>
        <CardHeader className="cursor-pointer" onClick={() => toggleSection('featured')}>
          <CardTitle className="flex justify-between items-center">
            <span>⭐ {t("collections.featured")}</span>
            {expandedSections.featured ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </CardTitle>
        </CardHeader>
        {expandedSections.featured && (
          <CardContent>
            <FeaturedCollections
              collections={featuredCollections}
              onCollectionClick={onCollectionClick}
            />
          </CardContent>
        )}
      </Card>

      {/* Recent Collections (Collapsible) */}
      <Card>
        <CardHeader className="cursor-pointer" onClick={() => toggleSection('recent')}>
          <CardTitle className="flex justify-between items-center">
            <span>🆕 {t("collections.newest")}</span>
            {expandedSections.recent ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </CardTitle>
        </CardHeader>
        {expandedSections.recent && (
          <CardContent>
            <CategorySlider
              itemsPerPage={4}
              onCollectionClick={onCollectionClick}
              title=""
              collections={newestCollections}
            />
          </CardContent>
        )}
      </Card>

      {/* Recent Exchanges (Collapsible) */}
      <Card>
        <CardHeader className="cursor-pointer" onClick={() => toggleSection('exchanges')}>
          <CardTitle className="flex justify-between items-center">
            <span>🔄 {t("collections.recentExchanges")}</span>
            {expandedSections.exchanges ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </CardTitle>
        </CardHeader>
        {expandedSections.exchanges && (
          <CardContent>
            <RecentExchanges />
          </CardContent>
        )}
      </Card>
    </div>
  )
}
