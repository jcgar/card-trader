import { Collection } from "@/app/types";
import { activities } from "./activities";

export const categories = ["videogames", "sports", "movies", "anime", "music", "art"]

const publishers = [
  "Nintendo",
  "Panini",
  "Topps",
  "Upper Deck",
  "Wizards of the Coast",
  "Konami",
  "Fuji TV",
  "Marvel",
  "DC Comics",
  "Universal Music",
]

// const generateRandomActivity = () => {
//   const activities = [
//     "New card added",
//     "Rare card found",
//     "Trade completed",
//     "Community event planned",
//     "Limited edition released",
//     "Auction started",
//     "Collection milestone reached",
//   ]
//   return activities[Math.floor(Math.random() * activities.length)]
// }

export const collections: Collection[] = Array.from({ length: 100 }, (_, i) => ({
  id: (i + 1).toString(),
  name: `Collection ${i + 1}`,
  // image: `https://source.unsplash.com/random/800x600?${categories[Math.floor(Math.random() * categories.length)]}`,
  image: `https://picsum.photos/800/600?random=${Math.floor(Math.random() * categories.length)}`,
  year: 2020 + Math.floor(Math.random() * 4),
  description: 'LOrem ipsum',
  completionRate: 18.5,
  publisher: publishers[Math.floor(Math.random() * publishers.length)],
  totalCards: 100 + Math.floor(Math.random() * 200),
  activeUsers: 500 + Math.floor(Math.random() * 1500),
  category: categories[Math.floor(Math.random() * categories.length)],
  popularity: 70 + Math.floor(Math.random() * 30),
  recentActivity: activities.map(a => a.content).slice(0, 2),
  lastUpdated: Math.floor(Math.random() * 7) + 1,
  likes: Math.floor(Math.random() * 2000),
  featured: Math.random() < 0.2,
}))



export const collections2: Collection[] = [
  {
    id: "1",
    name: "Pokémon 2023",
    image: "https://images.unsplash.com/photo-1613771404721-1f92d799e49f",
    year: 2023,
    publisher: "Nintendo",
    totalCards: 150,
    activeUsers: 1000,
    category: "videogames",
    popularity: 95,
    recentActivity: [
      "Ash completed a trade",
      "Rare Pikachu card found",
      "New booster pack released",
    ],
    likes: 1234,
    description: "",
    completionRate: 0
  },
  {
    id: "2",
    name: "FIFA World Cup 2022",
    image: "https://images.unsplash.com/photo-1553778263-73a83bab9b0c",
    year: 2022,
    publisher: "Panini",
    totalCards: 300,
    activeUsers: 1500,
    category: "sports",
    popularity: 90,
    recentActivity: [
      "Cristiano Ronaldo card added",
      "Trade completed for Messi",
      "New stadium cards released",
    ],
    likes: 987,
    description: "",
    completionRate: 0
  },
  {
    id: "3",
    name: "Marvel Cinematic Universe",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90",
    year: 2023,
    publisher: "Topps",
    totalCards: 200,
    activeUsers: 1200,
    category: "movies",
    popularity: 88,
    recentActivity: [
      "Avengers Endgame card signed",
      "Iron Man rare card auctioned",
      "New Spider-Man collection released",
    ],
    likes: 756,
    description: "",
    completionRate: 0
  },
  {
    id: "4",
    name: "Anime Legends",
    image: "https://images.unsplash.com/photo-1562014760-196f9998e2a5",
    year: 2023,
    publisher: "Upper Deck",
    totalCards: 180,
    activeUsers: 800,
    category: "anime",
    popularity: 85,
    recentActivity: [
      "Naruto rare card found",
      "Limited edition Goku card released",
      "Community event planned",
    ],
    likes: 543,
    description: "",
    completionRate: 0
  },
  {
    id: "5",
    name: "Vintage Sports Cards",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    year: 1995,
    publisher: "Topps",
    totalCards: 100,
    activeUsers: 600,
    category: "sports",
    popularity: 82,
    recentActivity: [
      "Michael Jordan rookie card sold",
      "Rare baseball card trade",
      "Historic auction planned",
    ],
    likes: 432,
    description: "",
    completionRate: 0
  },
]
