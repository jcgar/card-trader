import { Exchange, TradeMessage } from "@/app/types"
import { collectors } from "./api/collectors"
import { categories } from "./api/collections"
import { faker } from "@faker-js/faker"

// Usuarios
export const users = Array(50)
  .fill(null)
  .map((_, i) => ({
    id: `user-${i + 1}`,
    name: `Usuario ${i + 1}`,
    avatar: `/placeholder.svg?height=40&width=40&text=U${i + 1}`,
    email: `usuario${i + 1}@example.com`,
    country: ["España", "México", "Argentina", "Colombia", "Chile"][Math.floor(Math.random() * 5)],
    completedCollections: Math.floor(Math.random() * 10),
    exchanges: Math.floor(Math.random() * 50),
    joinDate: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
  }))

// Colecciones
export const collections = Array(100)
  .fill(null)
  .map((_, i) => ({
    id: `collection-${i + 1}`,
    name: `Colección ${i + 1}`,
    cover: `/placeholder.svg?height=100&width=100&text=C${i + 1}`,
    publisher: ["Panini", "Topps", "Upper Deck", "Wizards of the Coast"][Math.floor(Math.random() * 4)],
    year: 2020 + Math.floor(Math.random() * 4),
    category: ["Fútbol", "Pokémon", "Marvel", "Anime"][Math.floor(Math.random() * 4)],
    progress: Math.floor(Math.random() * 100),
    totalCards: 100 + Math.floor(Math.random() * 200),
    completedCards: Math.floor(Math.random() * 100),
  }))

// Cromos
export const cards = Array(500)
  .fill(null)
  .map((_, i) => ({
    id: `card-${i + 1}`,
    name: `Cromo ${i + 1}`,
    image: `/placeholder.svg?height=150&width=100&text=Card ${i + 1}`,
    rarity: ["common", "rare", "legendary"][Math.floor(Math.random() * 3)],
    collection: collections[Math.floor(Math.random() * collections.length)].name,
    number: Math.floor(Math.random() * 100) + 1,
  }))

// Logros
export const achievements = Array(30)
  .fill(null)
  .map((_, i) => ({
    id: `achievement-${i + 1}`,
    name: `Logro ${i + 1}`,
    icon: `🏆`,
    description: `Descripción del logro ${i + 1}`,
    date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
  }))

// Intercambios
export const exchanges: Exchange[] = Array(100)
  .fill(null)
  .map((_, i) => ({
    id: i + 1,
    status: ["pending", "accepted", "completed", "rejected"][
      Math.floor(Math.random() * 4)
    ] as Exchange["status"],
    createdAt: new Date(
      Date.now() - Math.floor(Math.random() * 10000000000)
    ).toISOString(),
    urgentUntil: Math.random() > 0.7 ? new Date(Date.now() + 86400000).toISOString() : undefined,
    user: collectors[Math.floor(Math.random() * collectors.length)], // Collector completo
    tradeCollections: collections
      .slice(0, Math.floor(Math.random() * 4))
      .map((collection) => ({
        id: collection.id,
        name: collection.name,
        image: `https://picsum.photos/800/600?random=${Math.floor(Math.random() * categories.length)}`,
        stickers: Array(Math.floor(Math.random() * 5) + 1).fill(null).map(() => ({
          id: Math.floor(Math.random() * 1000),
          number: Math.floor(Math.random() * 500),
          name: `Sticker ${Math.floor(Math.random() * 500)}`,
          type: Math.random() > 0.8 ? "special" : "normal",
          owned: Math.random() > 0.5,
          repeated: Math.floor(Math.random() * 5)
        }))
      })),
    messages: Array(Math.floor(Math.random() * 5)).fill(null).map(() => ({
      id: crypto.randomUUID(),
      senderId: collectors[Math.floor(Math.random() * collectors.length)].id,
      content: "Mensaje de intercambio",
      type: ["text", "sticker-added", "sticker-removed", "status-change"][
        Math.floor(Math.random() * 4)
      ] as TradeMessage["type"],
      timestamp: new Date(
        Date.now() - Math.floor(Math.random() * 10000000000)
      ).toISOString()
    })),
    lastActivity: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString()
  }));


// Contenido
export const content = Array(20)
  .fill(null)
  .map((_, i) => ({
    id: `content-${i + 1}`,
    title: `Título del contenido ${i + 1}`,
    type: ["blog", "tutorial", "guide"][Math.floor(Math.random() * 3)],
    excerpt: `Extracto del contenido ${i + 1}...`,
    date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
  }))

// Historias de coleccionistas
export const collectorStories = Array(30)
  .fill(null)
  .map((_, i) => ({
    id: i + 1,
    userId: users[Math.floor(Math.random() * users.length)].id,
    userName: users[Math.floor(Math.random() * users.length)].name,
    userAvatar: users[Math.floor(Math.random() * users.length)].avatar,
    content: `Historia del coleccionista ${i + 1}...`,
    image: Math.random() > 0.5 ? `/placeholder.svg?height=200&width=300&text=Story ${i + 1}` : null,
    likes: Math.floor(Math.random() * 100),
    comments: Math.floor(Math.random() * 20),
    liked: Math.random() > 0.5,
  }))

// Muro de intercambios
export const exchangeWall = Array(50)
  .fill(null)
  .map((_, i) => ({
    id: i + 1,
    userId: users[Math.floor(Math.random() * users.length)].id,
    userName: users[Math.floor(Math.random() * users.length)].name,
    userAvatar: users[Math.floor(Math.random() * users.length)].avatar,
    type: Math.random() > 0.5 ? "offer" : "request",
    cardName: cards[Math.floor(Math.random() * cards.length)].name,
    collection: collections[Math.floor(Math.random() * collections.length)].name,
    country: users[Math.floor(Math.random() * users.length)].country,
  }))

// Desafíos de la comunidad
export const communityChallenges = Array(5)
  .fill(null)
  .map((_, i) => ({
    id: i + 1,
    title: `Desafío de la comunidad ${i + 1}`,
    description: `Descripción del desafío ${i + 1}...`,
    progress: Math.floor(Math.random() * 100),
    reward: `Recompensa del desafío ${i + 1}`,
  }))

// Datos de países
export const countryData = {
  España: {
    collectors: 10000 + Math.floor(Math.random() * 5000),
    collections: 500 + Math.floor(Math.random() * 100),
    exchanges: 50000 + Math.floor(Math.random() * 10000),
  },
  México: {
    collectors: 8000 + Math.floor(Math.random() * 4000),
    collections: 450 + Math.floor(Math.random() * 90),
    exchanges: 40000 + Math.floor(Math.random() * 8000),
  },
  Argentina: {
    collectors: 7500 + Math.floor(Math.random() * 3750),
    collections: 400 + Math.floor(Math.random() * 80),
    exchanges: 35000 + Math.floor(Math.random() * 7000),
  },
  Colombia: {
    collectors: 6000 + Math.floor(Math.random() * 3000),
    collections: 350 + Math.floor(Math.random() * 70),
    exchanges: 30000 + Math.floor(Math.random() * 6000),
  },
  Chile: {
    collectors: 5000 + Math.floor(Math.random() * 2500),
    collections: 300 + Math.floor(Math.random() * 60),
    exchanges: 25000 + Math.floor(Math.random() * 5000),
  },
}

// Función para simular paginación
export function paginateData<T>(data: T[], page: number, pageSize: number): T[] {
  const startIndex = (page - 1) * pageSize
  return data.slice(startIndex, startIndex + pageSize)
}

// Función para simular una llamada a la API con paginación
export async function mockFetch<T>(
  dataSource: T[],
  page = 1,
  pageSize = 10,
  delay = 500,
): Promise<{ data: T[]; totalPages: number }> {
  await new Promise((resolve) => setTimeout(resolve, delay))
  const paginatedData = paginateData(dataSource, page, pageSize)
  return {
    data: paginatedData,
    totalPages: Math.ceil(dataSource.length / pageSize),
  }
}



export const mockUsers = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: faker.person.fullName(),
  points: faker.number.int({ min: 100, max: 10000 }),
  achievements: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => faker.lorem.word()),
}))

export const mockDebates = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: faker.lorem.sentence(),
  category: faker.helpers.arrayElement([
    "General",
    "Intercambios",
    "Retos y Concursos",
    "Consejos y Guías",
    "Colecciones Históricas",
    "Preguntas y Respuestas",
  ]),
  author: faker.person.fullName(),
  author_id: faker.number.int({ min: 1, max: 20 }),
  content: faker.lorem.paragraphs(),
  created_at: faker.date.recent(),
  last_reply_at: faker.date.recent(),
  replies: faker.number.int({ min: 0, max: 100 }),
  views: faker.number.int({ min: 10, max: 1000 }),
  is_hot: faker.datatype.boolean(),
  posts: Array.from({ length: faker.number.int({ min: 1, max: 20 }) }, (_, j) => ({
    id: j + 1,
    content: faker.lorem.paragraph(),
    author: faker.person.fullName(),
    created_at: faker.date.recent(),
    votes_up: faker.number.int({ min: 0, max: 50 }),
    votes_down: faker.number.int({ min: 0, max: 10 }),
    is_best_answer: j === 0 ? false : faker.datatype.boolean(),
  })),
}))

