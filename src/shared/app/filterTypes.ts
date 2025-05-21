export interface CollectionFilters {
  category: string[]
  year?: number
  completionRate?: number
}

export interface ExchangeFilters {
  status: string[]
  collection: string
  collector: string
  stickerNumber: string
  inProgress: boolean
  cancelled: boolean
  completed: boolean
}

export interface SortOption {
  id: string
  label: string
}

export interface FilterOption {
  id: string
  label: string
}

