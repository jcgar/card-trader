
export const routes = {
  home: '/',
  search: '/buscar',
  collections: '/colecciones',
  collection: '/coleccion/:id',
  dashboard: '/dashboard',
  newCollection: '/dashboard/colecciones/nueva',
  myCollections: '/dashboard/colecciones',
  community: '/comunidad',
  collector: '/coleccionista/:id',
  collectorPro: '/coleccionista/:id/pro',
  blog: '/blog',
  help: '/ayuda',
  admin: {
    users: '/admin/usuarios',
    collections: '/admin/colecciones',
    stats: '/admin/estadisticas',
    settings: '/admin/app',
  },
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
