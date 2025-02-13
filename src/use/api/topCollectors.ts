import { Crown, Trophy, Award } from "lucide-react";
import { Collector } from "../types";

export const topCollectors: Collector[] = [
  {
    id: 1,
    name: "Alex Thompson",
    avatar: "https://i.pravatar.cc/150?u=alex",
    stats: {
      collections: 156,
      exchanges: 534,
      achievements: 42,
      likes: 343,
    },
    rank: 1,
    progress: 95,
    title: "Coleccionista Legendario",
    icon: Crown,
  },
  {
    id: 2,
    name: "Sarah Chen",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    stats: {
      collections: 134,
      exchanges: 487,
      achievements: 38,
      likes: 343,
    },
    rank: 2,
    progress: 90,
    title: "Maestra del Intercambio",
    icon: Trophy,
  },
  {
    id: 3,
    name: "Michael Park",
    avatar: "https://i.pravatar.cc/150?u=michael",
    stats: {
      collections: 128,
      exchanges: 423,
      achievements: 35,
      likes: 343,
    },
    rank: 3,
    progress: 85,
    title: "Cazador de Rarezas",
    icon: Award,
  },
  {
    id: 4,
    name: "Luis Fernández",
    avatar: "/placeholder.svg?height=40&width=40&text=LF",
    stats: {
      collections: 8,
      exchanges: 90,
      achievements: 12,
      likes: 343,
    },
    rank: 4,
    progress: 80,
    title: "Coleccionista Dedicado",
    icon: null,
  },
  {
    id: 5,
    name: "Elena Sánchez",
    avatar: "/placeholder.svg?height=40&width=40&text=ES",
    stats: {
      collections: 7,
      exchanges: 80,
      achievements: 10,
      likes: 343,
    },
    rank: 5,
    progress: 75,
    title: "Estrella en Ascenso",
    icon: null,
  },
].map(c => ({ ...c, recentActivity: generateRecentActivity(c) }));

function generateRecentActivity(user: Collector): string {
  const activities = [
    `Completed a collection with ${user.stats.collections} sets`,
    `Successfully traded ${user.stats.exchanges} cards`,
    `Found ${user.stats.achievements} rare cards`,
    `Achieved a new milestone in card trading`,
    `Unlocked a Legendary Card`,
  ];
  return activities[Math.floor(Math.random() * activities.length)];
}