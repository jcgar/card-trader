import { Collection } from "@/shared/app/types";
import { Collection as GQLCollection } from "../types";

const MEDIA_URL = 'https://acabaramos.com/img/'
const getCollectionImage = (code: number) => `${MEDIA_URL}col${code}.jpg`

export const mapCollection = (collection: GQLCollection): Collection => {

  return {
    id: '' + collection.code,
    name: collection.colName ?? '',
    publisher: collection.key ?? '',
    description: collection.description ?? '',
    year: collection.year ?? 0,
    category: collection.subject ?? '',
    image: getCollectionImage(collection.code),
    popularity: 0,
    activeUsers: 0,
    totalCards: 12,
    completionRate: 13,
    likes: 16,
    recentActivity: [],
  };
};
