
export type ActivityType = 'achievement' | 'exchange' | 'collection' | 'social';
export type AchievementRarity = 'common' | 'rare' | 'epic' | 'legendary';
export interface Activity {
  id: number;
  type: ActivityType;
  user: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string;
  rarity: AchievementRarity;
}
export interface Sticker {
  id: number;
  number: number;
  name: string;
  type: 'normal' | 'special';
  owned: boolean;
  repeated: number;
}

export interface Collection {
  id: string;
  name: string;
  publisher: string;
  totalCards: number;
  category: string;
  year: number;
  description: string;
  image: string;
  completionRate: number;
  popularity: number;
  activeUsers: number;
  likes: number;
  recentActivity: string[];
}

export interface Collector {
  id: string;
  name: string;
  username: string;
  avatar: string;
  coverImage: string;
  level: number;
  joinedDate: string;
  verified: boolean;
  bio: string;
  location: string;
  socialLinks: {
    twitter?: string;
    instagram?: string;
    website?: string;
  };
  stats: CollectorStats;
  achievements: Achievement[];
  badges: {
    id: string;
    name: string;
    icon: string;
  }[];
  rank: {
    global: number;
    category: string;
    categoryRank: number;
  };
  title: string;
  motto: string;
  recentActivity: Activity[];
  wishlist: Sticker[];

}

export interface CollectorSettings {
  blockedUsers: string[];
  preferences: {
    theme: 'light' | 'dark' | 'retro';
    cardStyle: 'classic' | 'modern' | 'minimal';
    albumMode: boolean;
    notificationSettings: {
      email: boolean;
      push: boolean;
      inApp: boolean;
      doNotDisturb: {
        enabled: boolean;
        startTime: string;
        endTime: string;
      };
    };
  };
  privacySettings: {
    profileVisibility: 'public' | 'friends' | 'private';
    tradeRequests: 'all' | 'friends' | 'none';
    showLocation: boolean;
    showActivity: boolean;
  };
}

export interface CollectorStats {
  totalCards: number;
  completedCollections: number;
  totalCollections: number;
  exchanges: number;
  successRate: number;
  rank: number;
  likes: number;
  followers: number;
  following: number;
  completionRate: number;
  reputation: number;
}


export interface Exchange {
  id: number;
  status: 'pending' | 'accepted' | 'completed' | 'rejected';
  createdAt: string;
  urgentUntil?: string;
  sender: Collector;
  receiver: Collector;
  senderStickers: Sticker[];
  receiverStickers: Sticker[];
  messages: TradeMessage[];
  lastActivity: string;
}

export interface TradeMessage {
  id: string;
  senderId: string;
  content: string;
  type: 'text' | 'sticker-added' | 'sticker-removed' | 'status-change';
  timestamp: string;
}

