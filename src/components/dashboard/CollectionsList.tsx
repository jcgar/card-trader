"use client"
import { Plus } from "lucide-react"
import { t } from "@/use/i18n"
import type { Collection } from "@/app/types"
import CollectionCard from "@/components/cards/CollectionCard"
import { GridLayout } from "@/components/shared/GridLayout"
import { generatePath, Link, useNavigate, useSearchParams } from "react-router-dom"
import { routes } from "@/use/routes"
import { SectionHeaderWithButton } from "../shared/SectionHeaderWithButton"

export default function CollectionsList({ collections }: { collections: Collection[] }) {
  const [searchParams, setSearchParams] = useSearchParams()
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
            onClick={() => setSearchParams({ tab: "collections", collectionId: collection.id })}
          >
            <CollectionCard collection={collection} />
          </Link>
        )}
      />
    </div>
  )
}

