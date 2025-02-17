"use client"

import type { Collection } from "./types"
import { useState, useEffect } from "react"

const apiModules: { [key: string]: any } = {}

// Dynamically import all API modules
const importModule = async (key: string) => {
  if (!apiModules[key]) {
    try {
      /* @vite-ignore */
      apiModules[key] = await import(`./api/${key}`)
    } catch (error) {
      console.error(`Failed to load API module: ${key}`, error)
      return null
    }
  }
  return apiModules[key]
}

export async function getCollections(): Promise<Collection[]> {
  const collectionsModule = await importModule("collections")
  return collectionsModule ? collectionsModule.default : []
}

export async function searchCollections(term: string): Promise<Collection[]> {
  const collections = await getCollections()
  return collections.filter(
    (collection) =>
      collection.name.toLowerCase().includes(term.toLowerCase()) ||
      collection.publisher.toLowerCase().includes(term.toLowerCase()),
  )
}

export async function filterCollections(filters: Record<string, string>): Promise<Collection[]> {
  const collections = await getCollections()
  return collections.filter((collection) => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true // Skip empty filters
      switch (key) {
        case "category":
          return collection.category === value
        case "publisher":
          return collection.publisher === value
        case "year":
          return collection.year === Number.parseInt(value)
        // Add more filter cases as needed
        default:
          return true
      }
    })
  })
}

type ApiOptions = {
  page?: number
  pageSize?: number
  fullQuery?: boolean
  country?: string
  term?: string
  filters?: Record<string, string>
}

export function useApi<T>(route: string, options: ApiOptions = {}) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const result = await api(route, options)
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"))
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [route, options]) //Corrected dependencies

  return { data, loading, error }
}

// Updated API function
export async function api(route: string, options: ApiOptions = {}): Promise<any> {
  // Simulate a network delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const module = await importModule(route)
  if (!module) {
    throw new Error(`API route not found: ${route}`)
  }

  let result = module[route]

  // Handle pagination
  if (options.page && options.pageSize) {
    const startIndex = (options.page - 1) * options.pageSize
    const endIndex = startIndex + options.pageSize
    result = result.slice(startIndex, endIndex)
  }

  // Handle full query option
  if (!options.fullQuery && Array.isArray(result)) {
    result = result.slice(0, 10) // Default to first 10 items if not requesting full query
  }

  // Handle specific params for certain routes
  if (route === "countryData" && options.country) {
    result = result[options.country] || null
  }

  if (route === "searchCollections" && options.term) {
    result = await searchCollections(options.term)
  }

  if (route === "filterCollections" && options.filters) {
    result = await filterCollections(options.filters)
  }

  return result
}

