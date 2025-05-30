"use client"
import { BookOpen } from "lucide-react"
import CollectionCard from "../cards/CollectionCard"
import type { Collection } from "@/shared/app/types"
import { generatePath, Link, useNavigate, useSearchParams } from "@/shared/use/navigate"
import { routes } from "@/shared/use/routes"
import { SectionHeaderWithButton } from "@/shared/components/shared/SectionHeaderWithButton"
import { GridLayout } from "@/shared/components/shared/GridLayout"

export const MyCollections = ({ collections }: { collections: Collection[] }) => {
  // const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const handleViewAllAlbums = () => {
    navigate(routes.myCollections)
  }

  return (
    <div className="container mx-auto px-4 mb-16">
      <SectionHeaderWithButton
        title="My Collections::"
        buttonText="View All Albums"
        buttonIcon={BookOpen}
        onButtonClick={handleViewAllAlbums}
      />
      <GridLayout
        items={collections}
        columns={3}
        renderItem={(collection) => (
          <Link
            key={collection.id}
            to={generatePath(routes.myCollectionDetail, { collectionId: collection.id })}
          // onClick={() => setSearchParams({ tab: "collections", collectionId: collection.id })}
          >
            <CollectionCard collection={collection} />
          </Link>
        )}
      />
    </div>
  )
}

