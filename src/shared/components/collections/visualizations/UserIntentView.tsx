"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Collection } from "@/shared/app/types"
import { t } from "@/shared/use/i18n"
import { routes } from "@/shared/use/routes"
import { Search, Users, Repeat, Calendar } from 'lucide-react'
import { TradeMarket } from "../../dashboard/TradeMarket"
import { Category } from "../Category"
import { FeaturedCollections } from "../FeaturedCollections"
import { useNavigate } from "@/shared/use/navigate"


interface UserIntentViewProps {
  collections: Collection[]
  featuredCollections: Collection[]
  newestCollections: Collection[]
  onCollectionClick: (id: string) => void
}

export const UserIntentView: React.FC<UserIntentViewProps> = ({
  collections,
  featuredCollections,
  newestCollections,
  onCollectionClick,
}) => {
  const navigate = useNavigate()

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="relative">
        <Input
          type="text"
          placeholder={t("collections.searchPlaceholder")}
          className="pl-10 h-12 text-lg"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      {/* Featured Collections */}
      <div>
        <h2 className="text-2xl font-bold mb-4">{t("collections.featured")}</h2>
        <FeaturedCollections
          collections={featuredCollections}
          onCollectionClick={onCollectionClick}
        />
      </div>

      {/* Categories */}
      <div>
        <h2 className="text-2xl font-bold mb-4">{t("collections.categories")}</h2>
        <Category
          collections={collections}
          onClick={onCollectionClick}
        />
      </div>

      {/* Trade Market Preview */}
      <div>
        <h2 className="text-2xl font-bold mb-4">{t("collections.tradeMarket")}</h2>
        <TradeMarket preview />
      </div>
    </div>
  )
}
