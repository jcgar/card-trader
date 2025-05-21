"use client"

import { useEffect, useState } from "react"
import { AppLayout } from "@/shared/components/layout/AppLayout"
import { FeaturedCategories } from "@/shared/components/FeaturedCategories"
import { FeaturedCollections } from "@/shared/components/collections/FeaturedCollections"
import { Category } from "@/shared/components/collections/Category"
import { TradeMarket } from "@/shared/components/dashboard/TradeMarket"
import { SearchBar } from "@/shared/components/collections/SearchBar"
import { AdvancedSearch } from "@/shared/components/collections/AdvancedSearch"
import { useApi } from "@/shared/use/api"
import type { Collection } from "@/shared/app/types"
import { t } from "@/shared/use/i18n"
import { FinalCTA } from "@/shared/components/FinalCTA"
import { useNavigate } from "@/shared/use/navigate"
import { routes } from "@/shared/use/routes"
import { Card } from "@/components/ui/card"
import { CategorySlider } from "@/shared/components/collections/CategorySlider"
import { useAuth } from "@/shared/use/auth"
import { VisualView } from "../components/collections/visualizations/VisualView"
import { UserIntentView } from "../components/collections/visualizations/UserIntentView"
import { ProgressiveView } from "../components/collections/visualizations/ProgressiveView"
import { useList } from "@refinedev/core"
import { graphqlRoutes } from "../graphql/graphqlRoutes"
import { SEARCH_COLLECTIONS_PAGE_QUERY } from "../graphql/searchCollections"
import { Input } from "@/components/ui/input"
import { Search, Award, Gift, Repeat } from 'lucide-react'

const PublicCollections = () => {
  const navigate = useNavigate()
  const { isLoggedIn } = useAuth()

  // const { data: collections } = useApi<Collection>("collections", { page: 1, pageSize: 100, fullQuery: false })
  // const { data: featuredCollections } = useApi<Collection>("featuredCollections", {
  //   page: 1, pageSize: 100, fullQuery: false,
  //   useGraphQL: true
  // })

  // const topCollectionsPageFilter = {
  //   direction: 'ASC',
  //   page: 1,
  //   per_page: 10,
  // }

  // const lastCollectionsPageFilter = {
  //   direction: 'DESC',
  //   sort: 'LAST',
  //   page: 1,
  //   per_page: 10,
  // }

  // const { data: featuredCollections } = useList<Collection>({
  //   resource: 'allSearchCollections',
  // });
  // const { data: newestCollections } = useApi<Collection>("collections", { page: 1, pageSize: 100, fullQuery: false })

  const handleCollectionClick = (collectionId: string) => {
    sessionStorage.setItem("publicCollectionsScrollPosition", window.scrollY.toString())
    navigate(routes.collection.replace(":id", collectionId))
  }

  // console.log({ featuredCollections })

  const tabs = [
    {
      value: "catalog",
      label: t("collections.catalog"),
      content: (
        <>
          {!isLoggedIn && <Card>
            <FinalCTA onStartCollecting={() => navigate(routes.dashboard)} />
          </Card>}
          <FeaturedCollections collections={[]} onCollectionClick={handleCollectionClick} />
        </>
      ),
    },
    {
      value: "categories",
      label: t("collections.categories"),
      // content: <Category collections={collections} onClick={handleCollectionClick} />,
      content: <VisualView
        collections={[]} onCollectionClick={handleCollectionClick}
      />
    },
    // {
    //   value: "newest",
    //   label: t("collections.newest"),
    //   // content: <Slider category="newest" collections={newestCollections} onClick={handleCollectionClick} />,
    //   content: <VisualView
    //     collections={collections} featuredCollections={featuredCollections?.data || []} newestCollections={collections} onCollectionClick={handleCollectionClick}
    //   />
    // },
    // {
    //   value: "tradeMarket",
    //   label: t("collections.tradeMarket"),
    //   // content: <TradeMarket preview />,
    //   content: <UserIntentView
    //     collections={collections} featuredCollections={featuredCollections?.data || []} newestCollections={collections} onCollectionClick={handleCollectionClick}
    //   />
    // },
  ]



  return <AppLayout tabs={tabs} />
}

export default PublicCollections

// const Slider = ({ category, onClick, collections }) => (
//   <CategorySlider
//     key={category}
//     itemsPerPage={4}
//     onCollectionClick={onClick}
//     title={t(`categories.${category}`)}
//     collections={collections}
//   />
// )