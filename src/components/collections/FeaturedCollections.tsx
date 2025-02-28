import { t } from "@/use/i18n"
import { useState } from "react"
import { ScrollableCards } from "../cards/ScrollableCards"
import FeaturedCollectionsCard from "../cards/FeaturedCollectionsCard"
import { Collection, Rarity } from "@/app/types"
import { generateCollectionPath } from "@/use/routes"
import { Link } from "react-router-dom"


function getTypeByPopularity(value) {
  const thresholds = [
    { max: 25, type: Rarity.Common },
    { max: 50, type: Rarity.Rare },
    { max: 75, type: Rarity.Epic },
    { max: 100, type: Rarity.Legendary }
  ];

  const level = thresholds.find(t => value <= t.max);
  return level ? level.type : Rarity.Common;
}

export const FeaturedCollections = ({ collections, onCollectionClick }) => {
  const pageSize = 10
  const [collectionsPage, setCollectionsPage] = useState<number>(0)
  const handleLoadMore = () => {
    if (collections.length / pageSize < collections.length) {
      setCollectionsPage(collectionsPage + 1)
    }
  }

  const renderItem = (collection: Collection) => {
    const type = getTypeByPopularity(collection.popularity)
    return (
      <Link to={generateCollectionPath(collection.id)} onClick={onCollectionClick}>
        <FeaturedCollectionsCard collection={collection} type={type} />
      </Link>
    )
  }

  return (<div className="relative space-y-4 my-8">

    {collections && <ScrollableCards
      items={collections.slice(0, pageSize * (collectionsPage + 1))}
      renderItem={renderItem}
      title={t("collections.featured")}
      itemsPerPage={10}
      onLoadMore={handleLoadMore}
      className="py-4"
    />}
  </div>
  )
}

