
export const routes = {
  home: '/',
  search: '/buscar',
  collections: '/colecciones',
  dashboard: '/dashboard',
  newCollection: '/dashboard/colecciones/nueva',
  myCollections: '/dashboard/colecciones',
  community: '/comunidad',
  collector: '/coleccionista/:id',
} as const;

export const generateCollectorPath = (id: string) => {
  return `/coleccionista/${id}`;
};
