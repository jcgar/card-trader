"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollBar } from "@/components/ui/scroll-area"
import { Collection } from "@/shared/app/types"
import { t } from "@/shared/use/i18n"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { Search, Award, Gift, Repeat } from 'lucide-react'
import CollectionCard from "../../cards/CollectionCard"
import { GamificationRewards } from "../../community/GamificationRewards"
import { RecentExchanges } from "../../dashboard/RecentExchanges"
import { Category } from "../Category"


interface VisualViewProps {
  collections: Collection[]
  onCollectionClick: (id: string) => void
}

export const VisualView: React.FC<VisualViewProps> = ({
  collections,
  onCollectionClick,
}) => {
  // Group collections by category
  const categorizedCollections = collections.reduce((acc, collection) => {
    const category = collection.category || "Other"
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(collection)
    return acc
  }, {} as Record<string, Collection[]>)

  const categories = Object.keys(categorizedCollections)

  return (
    <div className="space-y-8">

      {/* Input search */}
      <div className="relative mb-6">
        <Input
          type="text"
          placeholder={t("collections.searchPlaceholder")}
          className="pl-10 h-12 text-lg"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>


      {/* Visual Categories */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Vertical Tabs */}
        <div className="md:col-span-1 space-y-2">
          {categories.map(category => (
            <Button
              key={category}
              variant="ghost"
              className="w-full justify-start text-left"
            >
              {getCategoryIcon(category)}
              <span className="ml-2">{category}</span>
            </Button>
          ))}
        </div>

        {/* Main Content */}
        <div className="md:col-span-4">
          {/*categories.map(category => (
            <div key={category} className="mb-8">
              <h2 className="text-xl font-bold mb-4">{category}</h2>
              <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex space-x-4 pb-4">
                  {categorizedCollections[category].map(collection => (
                    <Card key={collection.id} className="w-[250px] flex-shrink-0">
                      <CardContent className="p-0">
                        <CollectionCard
                          collection={collection}
                          onClick={() => onCollectionClick(collection.id)}
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          ))*/}
          <Category collections={collections}
            onClick={onCollectionClick}
          />
        </div>
      </div>

    </div>
  )
}

// Helper function to get category icons
function getCategoryIcon(category: string) {
  const icons = {
    "Soccer": "⚽",
    "Classic": "🃏",
    "Cinema & TV": "🎬",
    "World Leagues": "🌍",
    "Pokémon": "🐉",
    "Other": "📚"
  }

  return icons[category] || "📚"
}
