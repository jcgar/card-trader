
export const routes = {
  home: '/',
  search: '/buscar',
  collections: '/colecciones',
  dashboard: '/dashboard',
  newCollection: '/dashboard/colecciones/nueva',
  myCollections: '/dashboard/colecciones',
  community: '/comunidad',
  collector: '/coleccionista/:id',
  collectorPro: '/coleccionista/:id/pro',
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
