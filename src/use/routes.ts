export const routes = {
  home: "/",
  search: "/buscar",
  collections: "/colecciones",
  collection: "/colecciones/:id",
  dashboard: "/dashboard",
  newCollection: "/dashboard/colecciones/nueva",
  myCollections: "/dashboard/colecciones",
  myCollectionDetail: "/dashboard/colecciones/:collectionId",
  myExchanges: "/dashboard/cambios",
  myExchangesDetail: "/dashboard/cambios/:exchangeId",
  myProfile: "/dashboard/perfil",

  community: "/comunidad",
  collector: "/coleccionistas/:id",
  collectorPro: "/coleccionistas/:id/pro",
  blog: "/blog",
  help: "/ayuda",
  admin: "/admin",
  tradeMarket: "/mercado",
} as const

export const generateCollectorPath = (id: string) => {
  return `/coleccionistas/${id}`
}

export const generateCollectorProPath = (id: string) => {
  return `/coleccionistas/${id}/pro`
}

export const generateCollectionPath = (id: string) => {
  return `/colecciones/${id}`
}

