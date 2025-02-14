
export const routes = {
  home: '/',
  search: '/buscar',
  collections: '/colecciones',
  dashboard: '/dashboard',
  newCollection: '/dashboard/colecciones/nueva',
  myCollections: '/dashboard/colecciones',
  community: '/comunidad',
  collector: '/coleccionista/:id',
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
