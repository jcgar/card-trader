import { CollectionFilters, ExchangeFilters } from "@/shared/app/filterTypes"
import type { Collection, Collector, Exchange, Sticker } from "@/shared/app/types"

type FilterFunction<T> = (item: T, filters: any) => boolean
type SortFunction<T> = (a: T, b: T) => number

export function filterAndSort<T>(
  items: T[],
  filters: any,
  sortBy: string,
  sortOrder: "asc" | "desc",
  filterFunction: FilterFunction<T>,
  sortFunction: SortFunction<T>,
): T[] {
  const filteredItems = items.filter((item) => filterFunction(item, filters))
  return filteredItems.sort((a, b) => {
    const result = sortFunction(a, b)
    return sortOrder === "asc" ? result : -result
  })
}

export const filterCollection: FilterFunction<Collection> = (collection, filters: CollectionFilters) => {
  return (
    (filters.category.length === 0 || filters.category.includes(collection.category)) &&
    (filters.year === undefined || collection.year === filters.year) &&
    (filters.completionRate === undefined || collection.completionRate >= filters.completionRate)
  )
}

export const sortCollection: SortFunction<Collection> = (a, b) => {
  if (a.name < b.name) return -1
  if (a.name > b.name) return 1
  return 0
}

export const filterExchange: FilterFunction<Exchange> = (exchange, filters: ExchangeFilters) => {
  return (
    (filters.status.length === 0 || filters.status.includes(exchange.status)) &&
    (filters.collection === "" || exchange.tradeCollections.find(c => c.id === filters.collection)) &&
    (filters.collector === "" || exchange.user.id === filters.collector) &&
    (filters.stickerNumber === "" ||
      exchange.tradeCollections.flatMap(c => c.stickers)
        .some((s: Sticker) => s.number.toString().includes(filters.stickerNumber))) &&
    (!filters.inProgress || exchange.status === "pending") &&
    (!filters.cancelled || exchange.status === "rejected") &&
    (!filters.completed || exchange.status === "completed")
  )
}

export const sortExchange: SortFunction<Exchange> = (a, b) => {
  if (a.lastActivity < b.lastActivity) return -1
  if (a.lastActivity > b.lastActivity) return 1
  return 0
}

export const filterCollector: FilterFunction<Collector> = (collector, filters) => {
  // Implement collector filtering logic here
  return true
}

export const sortCollector: SortFunction<Collector> = (a, b) => {
  if (a.name < b.name) return -1
  if (a.name > b.name) return 1
  return 0
}

