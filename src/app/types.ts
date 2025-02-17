
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
  totalStickers: number;
  category: string;
  year: number;
  description: string;
  image: string;
  completionRate: number;
  activeUsers: number;
  likes: number;
}

export interface Collector {
  id: string;
  name: string;
  username: string;
  avatar: string;
  coverImage: string;
  level: number;
  reputation: number;
  trades: number;
  successRate: number;
  joinedDate: string;
  verified: boolean;
  bio: string;
  location: string;
  socialLinks: {
    twitter?: string;
    instagram?: string;
    website?: string;
  };
  privacySettings: {
    profileVisibility: 'public' | 'friends' | 'private';
    tradeRequests: 'all' | 'friends' | 'none';
    showLocation: boolean;
    showActivity: boolean;
  };
  stats: {
    totalStickers: number;
    completedCollections: number;
    totalCollections: number;
    trades: number;
    successRate: number;
    rank: number;
    reputation: number;
  };
  achievements: {
    id: string;
    name: string;
    description: string;
    icon: string;
    unlockedAt: string;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
  }[];
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
  recentActivity: {
    id: string;
    type: string;
    description: string;
    timestamp: string;
  }[];
  wishlist: Sticker[];
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
}

export interface Trade {
  id: string;
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

export interface Exchange extends Trade {}
