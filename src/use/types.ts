export interface Collection {
  id: string
  name: string
  image: string
  year: number
  publisher: string
  totalCards: number
  activeUsers: number
  category: string
  popularity: number
  recentActivity: string[]
  lastUpdated: number
  likes: number
  featured: boolean
}

export interface Collector {
  id: number;
  name: string;
  avatar: string; // URL o placeholder
  stats: {
    likes: number;
    collections: number; // Número de colecciones completadas
    exchanges: number; // Número de intercambios exitosos
    achievements: number; // Número de cartas raras encontradas
  };
  rank: number; // Posición en el ranking
  progress: number; // Porcentaje de progreso
  title: string; // Título o rango del coleccionista
  recentActivity?: string; // Texto de la actividad reciente
  icon?: any; // Icono opcional (puedes especificar un tipo más concreto si es necesario)
}
