import { Crown, Trophy, Award } from "lucide-react";
import { Activity, Collector } from "../../app/types";
import { userTestimonials } from "./userTestimonials";
import { formatDistanceToNow } from "date-fns";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min, max, decimals = 1) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}

export function generateMockProfile(id): Collector {
  const icons = [Crown, Trophy, Award];
  const usernames = ["cardmaster", "traderking", "collectorlord", "swapgenius", "packhunter"];
  const names = ["Alex Thompson", "Maria Gonzalez", "John Carter", "Sophia Lee", "David Martins"];
  const mottos = [
    "Coleccionando momentos, un cromo a la vez",
    "Cada carta cuenta una historia",
    "Intercambiar es un arte",
    "El juego nunca termina",
    "Siempre en busca de la carta perfecta"
  ];
  const categories = ["Anime", "Deportes", "Cine", "Videojuegos", "Historia"];
  const stats: Collector["stats"] = {
    totalCards: getRandomInt(100, 1000),
    totalCollections: getRandomInt(5, 50),
    completedCollections: getRandomInt(2, 30),
    exchanges: getRandomInt(10, 300),
    successRate: getRandomFloat(70, 100),
    rank: getRandomFloat(5, 100),
    reputation: getRandomFloat(3.5, 5, 2),
    followers: getRandomInt(50, 500),
    following: getRandomInt(20, 300),
    completionRate: getRandomFloat(50, 100),
    likes: getRandomFloat(3.5, 5, 2),
  }
  const avatar = `https://i.pravatar.cc/300?u=user${id}`;
  const testimonials = userTestimonials
  const collector: Collector = {
    id: id.toString(),
    username: usernames[id % usernames.length],
    name: names[id % names.length],
    avatar,
    coverImage: 'https://images.unsplash.com/photo-1615715616181-6ba22b04bec9',
    title: `Maestro de ${categories[id % categories.length]}`,
    level: getRandomInt(5, 50),
    motto: mottos[id % mottos.length],
    rank: {
      global: getRandomInt(1, 100),
      category: categories[id % categories.length],
      categoryRank: getRandomInt(1, 10),
    },
    stats,
    achievements: [],
    badges: [],
    recentActivity: [generateRecentActivity(stats, name, avatar)],
    joinedDate: "",
    verified: false,
    bio: "",
    location: "",
    socialLinks: {
      twitter: "",
      instagram: "",
      website: ""
    },
    wishlist: []
  };

  return collector;
}

function generateRecentActivity(stats: Collector["stats"], user, avatar): Activity {
  const activities = [
    `Completed a collection with ${stats.totalCollections} sets`,
    `Successfully traded ${stats.exchanges} cards`,
    `Found 3 rare cards`,
    `Achieved a new milestone in card trading`,
    `Unlocked a Legendary Card`,
  ];
  const types = ['trade', 'collection', 'achievement', 'social'] as Activity["type"][];
  const id = getRandomInt(1, 4)
  const activity: Activity = {
    id,
    type: types[id % types.length],
    content: activities[Math.floor(Math.random() * activities.length)],
    timestamp: formatDistanceToNow(new Date().getTime()),
    user,
    avatar,
    likes: 0
  }
  return activity;
}

export const collectors: Collector[] = Array
  .from({ length: 10 }, (_, i) => generateMockProfile(i))