import { Collection } from "@/shared/app/types";
import { SearchCollection as GQLSearchCollection } from "../types";

const MEDIA_URL = 'https://acabaramos.com/img/'
const getCollectionImage = (code: number) => `${MEDIA_URL}col${code}.jpg`

export const mapSearchCollection = (item: GQLSearchCollection): Collection => {
  const { collection, collectors } = item;

  return {
    id: '' + collection.code,
    name: collection.colName ?? '',
    publisher: collection.key ?? '',
    description: collection.description ?? '',
    year: collection.year ?? 0,
    category: collection.subject ?? '',
    image: getCollectionImage(collection.code),
    totalCards: 12,
    completionRate: 13,
    popularity: collectors.recent ?? 0,
    activeUsers: collectors.total ?? 0,
    likes: 16,
    recentActivity: [],
  };
};
