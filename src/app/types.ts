
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
