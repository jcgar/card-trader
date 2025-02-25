import type { Activity } from "@/app/types"

export const activities: Activity[] = [
  {
    id: 1,
    user: "Ana",
    avatar: "https://i.pravatar.cc/150?u=ana",
    type: "exchange",
    content: "Ana acaba de intercambiar 3 cromos de Pokémon",
    timestamp: "Hace 5 minutos",
    likes: 3,
  },
  {
    id: 2,
    user: "María G.",
    avatar: "https://i.pravatar.cc/150?u=maria",
    type: "achievement",
    content: "María ha completado su colección de Marvel Cinematic Universe",
    timestamp: "Hace 15 minutos",
    likes: 7,
  },
  {
    id: 3,
    user: "Acabáramos",
    avatar: "https://i.pravatar.cc/150?u=logo",
    type: "collection",
    content: "Nueva colección disponible: UEFA Euro 2024",
    timestamp: "Hace 30 minutos",
    likes: 12,
  },
  {
    id: 4,
    user: "Luis",
    avatar: "https://i.pravatar.cc/150?u=luis",
    type: "exchange",
    content: "Luis está buscando el cromo #25 de la colección Anime Legends",
    timestamp: "Hace 1 hora",
    likes: 2,
  },
  {
    id: 5,
    user: "Elena",
    avatar: "https://i.pravatar.cc/150?u=elena",
    type: "achievement",
    content: "Elena ha desbloqueado el logro 'Coleccionista Experto'",
    timestamp: "Hace 2 horas",
    likes: 9,
  },
  {
    id: 6,
    type: "social",
    user: "Nuevo Usuario",
    avatar: `https://i.pravatar.cc/150?u=${Date.now()}`,
    content: "Nuevo Usuario se unió a la comunidad",
    timestamp: "Ahora mismo",
    likes: 0,
  },
]

