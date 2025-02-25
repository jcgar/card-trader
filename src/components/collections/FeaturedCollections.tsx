import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { t } from "@/use/i18n"
import { Collection } from "@/app/types"
import { useState } from "react"
import { ScrollableCards } from "../cards/ScrollableCards"
import { generateCollectionPath } from "@/use/routes"
import { Link } from "react-router-dom"

export const FeaturedCollections = ({ collections, onCollectionClick }) => {
  const pageSize = 10
  const [collectionsPage, setCollectionsPage] = useState<number>(0)
  const handleLoadMore = () => {
    if (collections.length / pageSize < collections.length) {
      setCollectionsPage(collectionsPage + 1)
    }
  }

  const CollectionCard = (collection: Collection) => {
    return (
      <Link to={generateCollectionPath(collection.id)} className="cursor-pointer hover:shadow-xl transition-shadow duration-300" onClick={onCollectionClick(collection.id)}>
        <Card className="w-[250px]">
          <CardContent className="group p-4 relative">
            <img
              src={collection.image || "/placeholder.svg"}
              alt={collection.name}
              className="group-hover:scale-105 transition-all duration-300
            w-full h-40 object-cover mb-4 rounded"
            />
            <h3 className="font-bold mb-2">{collection.name}</h3>
            <p className="text-sm mb-4">{t("collections.popularity", { score: collection.popularity })}</p>
            <p className="text-sm mb-4">{t("collections.popularity", { score: collection.popularity })}</p>
            <p className="text-sm mb-4">{t("collections.popularity", { score: collection.popularity })}</p>
            <Button
              className={`opacity-0 absolute bottom-4
          w-[215px] text-lg bg-gradient-to-r from-green-600 to-green-500
          group-hover:opacity-100 group-hover:scale-105
          transform transition-all duration-300`}
            >{t("collections.explore")}</Button>
          </CardContent>
        </Card>
      </Link>
    )
  }


  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{t("collections.featured")}</CardTitle>
      </CardHeader>
      <CardContent>
        {collections && <ScrollableCards
          items={collections.slice(0, pageSize * (collectionsPage + 1))}
          renderItem={CollectionCard}
          title={t("collections.featured")}
          itemsPerPage={10}
          onLoadMore={handleLoadMore}
          className="py-4"
        />}

        {/* <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex w-max space-x-4">
            {collections.map((collection) => (
              
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea> */}
      </CardContent>
    </Card>
  )
}

