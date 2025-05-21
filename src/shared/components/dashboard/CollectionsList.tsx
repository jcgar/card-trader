"use client"
import { Plus } from "lucide-react"
import { t } from "@/shared/use/i18n"
import type { Collection } from "@/shared/app/types"
import CollectionCard from "@/shared/components/cards/CollectionCard"
import { GridLayout } from "@/shared/components/shared/GridLayout"
import { generatePath, Link, useNavigate } from "@/shared/use/navigate"
import { routes } from "@/shared/use/routes"
import { SectionHeaderWithButton } from "../shared/SectionHeaderWithButton"

export default function CollectionsList({ collections }: { collections: Collection[] }) {
  const navigate = useNavigate()
  const handleNewCollection = () => {
    navigate(routes.newCollection)
  }
  return (
    <div className="container mx-auto px-4 mb-16">
      <SectionHeaderWithButton
        title={t("collections.title")}
        buttonText={t("collections.newCollection")}
        buttonIcon={Plus}
        onButtonClick={handleNewCollection}
      />
      <GridLayout
        items={collections}
        columns={3}
        renderItem={(collection) => (
          <Link
            key={collection.id}
            to={generatePath(routes.myCollectionDetail, { collectionId: collection.id })}
          >
            <CollectionCard collection={collection} />
          </Link>
        )}
      />
    </div>
  )
}

