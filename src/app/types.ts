
export interface Sticker {
  id: number;
  number: number;
  name: string;
  type: 'normal' | 'special';
  owned: boolean;
  repeated: number;
}

export interface Collector {
  id: string;
  name: string;
  avatar: string;
  level: number;
  reputation: number;
  trades: number;
  successRate: number;
  joinedDate: string;
  verified: boolean;
}

export interface CollectorProfile extends Collector {
  stats: {
    trades: number;
    successRate: number;
    collections: number;
    achievements: number;
  };
  badges: {
    id: string;
    name: string;
    icon: string;
  }[];
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
