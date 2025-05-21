import { ResourceProps } from "@refinedev/core";
import { ALL_COLLECTIONS_QUERY, COLLECTIONS_PAGE_QUERY } from "./collections";
import { mapCollection } from "./collections/mappers";
import { ALL_SEARCH_COLLECTIONS_QUERY, SEARCH_COLLECTIONS_PAGE_QUERY } from "./searchCollections";
import { mapSearchCollection } from "./searchCollections/mappers";

// import { COLLECTORS_LIST_QUERY } from "../graphql/collectors";
// import { USER_COLLECTIONS_LIST_QUERY } from "../graphql/userCollections";
// import { mapCollector } from "../graphql/collectors/mappers";
// import { mapUserCollection } from "../graphql/userCollections/mappers";

export const graphqlRoutes = {
  searchCollectionsPage: {
    query: SEARCH_COLLECTIONS_PAGE_QUERY,
    typename: "searchCollectionsPage",
    mapper: mapSearchCollection,
  },
  allSearchCollections: {
    query: ALL_SEARCH_COLLECTIONS_QUERY,
    typename: "allSearchCollections",
    mapper: mapSearchCollection,
  },
  collectionsPage: {
    query: COLLECTIONS_PAGE_QUERY,
    typename: "collectionsPage",
    mapper: mapCollection,
  },
  allCollections: {
    query: ALL_COLLECTIONS_QUERY,
    typename: "allCollections",
    mapper: mapCollection,
  },
  // collectors: {
  //   query: COLLECTORS_LIST_QUERY,
  //   typename: "searchCollectorsPage",
  //   mapper: mapCollector,
  // },
  // userCollections: {
  //   query: USER_COLLECTIONS_LIST_QUERY,
  //   typename: "userCollectionsPage",
  //   mapper: mapUserCollection,
  // },
};

// import { Collection } from "@/shared/app/types";
// import { INDEX_TOP_COLLECTIONS_QUERY } from "../graphql/query";
// import { SearchCollection } from "@/shared/graphql/types";
// import { ResourceProps } from "@refinedev/core";

// const MEDIA_URL = 'https://acabaramos.com/img/'
// const getCollectionImage = (code: number) => `${MEDIA_URL}col${code}.jpg`

// export const graphqlRoutes = {
//   featuredCollections: {
//     query: INDEX_TOP_COLLECTIONS_QUERY,
//     typename: 'searchCollectionsPage',
//     mapper: (searchCollection: SearchCollection): Collection => {
//       const { collection, collectors } = searchCollection

//       return {
//         id: '' + collection.code,
//         name: collection.colName ?? '',
//         publisher: collection.key ?? '',
//         totalCards: 12,
//         category: collection.subject ?? '',
//         year: collection.year ?? 0,
//         description: collection.description ?? '',
//         image: getCollectionImage(collection.code),
//         completionRate: 13,
//         popularity: collectors.recent ?? 0,
//         activeUsers: collectors.total ?? 0,
//         likes: 16,
//         recentActivity: []
//       }
//     }
//   }
// }

export const mockRoutes: ResourceProps[] = [
  // {
  //   name: "collections",
  //   list: "/colecciones",
  //   show: "/colecciones/:id",
  // },
  {
    name: "collectors",
    list: "/colleccionistas",
    show: "/colleccionistas/:id",
  }
]


export const gqlResources: ResourceProps[] = (Object.keys(graphqlRoutes).map(r => ({
  name: r,
  meta: { dataProviderName: "default" },
})))
  .concat(mockRoutes.map(r => ({ ...r, meta: { dataProviderName: "mock" }, })))
