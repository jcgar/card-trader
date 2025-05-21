import { t } from "@/shared/use/i18n"
import { useState } from "react"
import { ScrollableCards } from "@/shared/components/cards/ScrollableCards"
import FeaturedCollectionsCard from "@/shared/components/cards/FeaturedCollectionsCard"
import { Category, Collection, Rarity } from "@/shared/app/types"
import { generateCollectionPath } from "@/shared/use/routes"
import { Link } from "@/shared/use/navigate"
import { FilterCards } from "@/shared/components/shared/filter/FilterCards"
import CollectionCard from "../cards/CollectionCard"

const collectionCategories: Category[] = [
  {
    id: "Soccer",
    name: "Soccer"
  },
  {
    id: "cinema",
    name: "Cinema & TV"
  },
  {
    id: "classic",
    name: "Classic Leagues"
  },
  {
    id: "pokemon",
    name: "Pokémon"
  },
  {
    id: "world",
    name: "World Leagues"
  }
]

// Opciones de ordenación
const sortOptions = [
  { id: "1", label: "Más populares", value: "popularity" },
  { id: "2", label: "Más recientes", value: "year" },
  { id: "3", label: "Más completadas", value: "completionRate" },
  { id: "4", label: "Más likes", value: "likes" },
]

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

interface FeaturedCollectionsProps {
  collections: Collection[]
  onCollectionClick: (id: string) => void
}

export const FeaturedCollections: React.FC<FeaturedCollectionsProps> = ({
  collections,
  onCollectionClick,
}) => {
  const pageSize = 10
  // const [collectionsPage, setCollectionsPage] = useState<number>(0)
  const handleLoadMore = () => {
    if (collections.length / pageSize < collections.length) {
      // setCollectionsPage(collectionsPage + 1)
    }
  }

  const renderItem = (viewMode) => (collection: Collection, idx: number) => {
    const type = getTypeByPopularity(collection.popularity)
    let children

    switch (viewMode) {
      case "grid-mini":
        children = <CollectionCard collection={collection} idx={idx} />
        break;
      default:
        children = <FeaturedCollectionsCard collection={collection} idx={idx} type={type} />
    }
    return (
      <Link to={generateCollectionPath(collection.id)} onClick={onCollectionClick}>
        {children}
      </Link>
    )
  }

  const normalize = (str: string) =>
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()

  // const predictiveSearch = async <T extends keyof Collection>(
  //   query: string,
  //   key: T
  // ): Promise<string[]> => {
  //   const normalizedQuery = normalize(query)

  //   const results = collections
  //     .map((c) => c[key])
  //     .filter((value): value is string => !!value)
  //     .map((val) => val.toString())
  //     .filter((val) => normalize(val).includes(normalizedQuery))

  //   results.sort((a: any, b: any) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

  //   const uniqueResults = Array.from(new Set(results)).filter((result: unknown) => typeof result === 'string');

  //   return uniqueResults;
  // }

  const filterCollections = (collection: Collection, filters: any[]) => {
    return filters.every((filter) => {
      switch (filter.type) {
        case "predictive":
          return collection.category === filter.value
        case "category":
          return collection.category === filter.value
        case "search":
          return (
            collection.name.toLowerCase().includes(filter.value.toLowerCase()) ||
            collection.description.toLowerCase().includes(filter.value.toLowerCase())
          )
        case "advanced":
          if (filter.label.startsWith("name:")) {
            return collection.name.toLowerCase().includes(filter.value.toLowerCase())
          }
          if (filter.label.startsWith("year:")) {
            return collection.year.toString() === filter.value
          }
          if (filter.label.startsWith("publisher:")) {
            return collection.publisher.toLowerCase().includes(filter.value.toLowerCase())
          }
          return true
        default:
          return true
      }
    })
  }

  return (<div className="relative space-y-4 my-8">
    {/* <FilterCards
      // items={collections.slice(0, pageSize * (collectionsPage + 1))}
      resource='allSearchCollections'
      renderItem={renderItem}
      title={t("collections.featured")}
      placeholder="Buscar colecciones..."
      sortOptions={sortOptions}
      categories={collectionCategories}
      filterFn={filterCollections}
      // onLoadMore={handleLoadMore}
      predictiveSearchFn={query => predictiveSearch(query, "category")}
      // predictiveSearchStart={0}
      // variant="grid"
      itemsPerRow={3}
    /> */}
    <FilterCards
      resource="searchCollectionsPage"
      title="Mis Colecciones"
      itemsPerPage={16}
      itemsPerRow={4}
      renderItem={renderItem}
    />
  </div>
  )
}

