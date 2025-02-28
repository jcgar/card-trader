import type React from "react"
import { CategorySlider } from "@/components/collections/CategorySlider"
import { t } from "@/use/i18n"
import type { Collection } from "@/app/types"
import { useState, useEffect } from "react"

interface CategoryProps {
  collections: Collection[]
  onClick: (collectionId: string) => void
}

export const Category: React.FC<CategoryProps> = ({ collections, onClick }) => {
  const [categories, setCategories] = useState<Record<string, Collection[]>>({})

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

    setCategories(collectionsByCategory)
  }, [collections])

  return (
    <>
      {
        Object.entries(categories).map(([category, cols]) => (
          <CategorySlider
            key={category}
            itemsPerPage={4}
            onCollectionClick={onClick}
            title={t(`categories.${category}`)}
            collections={cols}
          />
        ))
      }</>
  )
}

