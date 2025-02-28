import { Rarity, Reward } from "@/app/types"

export const rewards: Reward[] = [
  {
    id: 1,
    title: "Cromo Legendario",
    description: "Un cromo exclusivo para tu colección",
    points: 1000,
    rarity: Rarity.Legendary,
    progress: 80,
  },
  {
    id: 2,
    title: "Pack Premium",
    description: "5 cromos raros garantizados",
    points: 500,
    rarity: Rarity.Epic,
    progress: 60,
  },
  {
    id: 3,
    title: "Gran Coleccionista",
    description: "Distintivo único para tu perfil",
    points: 250,
    rarity: Rarity.Rare,
    progress: 45,
  },
  {
    id: 4,
    title: "Badge Coleccionista",
    description: "Distintivo único para tu perfil",
    points: 100,
    rarity: Rarity.Common,
    progress: 45,
  },
]