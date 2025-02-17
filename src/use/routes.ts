
export const routes = {
  home: '/',
  search: '/buscar',
  collections: '/colecciones',
  collection: '/colecciones/:id',
  dashboard: '/dashboard',
  newCollection: '/dashboard/colecciones/nueva',
  myCollections: '/dashboard/colecciones',
  myCollectionDetail: '/dashboard/colecciones/:id',
  community: '/comunidad',
  collector: '/coleccionistas/:id',
  collectorPro: '/coleccionistas/:id/pro',
  blog: '/blog',
  help: '/ayuda',
  admin: '/admin',
} as const;

export const generateCollectorPath = (id: string) => {
  return `/coleccionista/${id}`;
};

export const generateCollectorProPath = (id: string) => {
  return `/coleccionista/${id}/pro`;
};

export const generateCollectionPath = (id: string) => {
  return `/coleccion/${id}`;
};
