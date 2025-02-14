export interface Collection {
  id: string;
  name: string;
  image: string;
  year: number;
  publisher: string;
  totalCards: number;
  activeUsers: number;
  category: string;
  popularity: number;
  recentActivity: string[];
  lastUpdated: number;
  likes: number;
  featured: boolean;
}

export interface CollectorProfile {
  id: string;
  username: string;
  name: string;
  avatar: string;
  coverImage: string;
  title: string;
  level: number;
  motto: string;
  rank: {
    global: number;
    category: string;
    categoryRank: number;
  };
  stats: {
    totalCards: number;
    completedCards: number;
    collections: number;
    completedCollections: number;
    trades: number;
    successRate: number;
  };
  achievements: Achievement[];
  badges: Badge[];
  recentActivity: Activity[];
  testimonials: Testimonial[];
  socialStats: {
    followers: number;
    following: number;
    completionRate: number;
    reputation: number;
  };
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  category: string;
}

export interface Activity {
  id: string;
  type: 'trade' | 'collection' | 'achievement' | 'social';
  description: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface Testimonial {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  rating: number;
  date: string;
}
