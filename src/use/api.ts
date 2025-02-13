import type { Collection } from "./types"

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

// Updated API function
export async function api(route: string, params: any = {}): Promise<any> {
  // Simulate a network delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const module = await importModule(route)
  if (!module) {
    throw new Error(`API route not found: ${route}`)
  }

  let result = module[route]

  // Handle pagination for specific routes
  if (["collectorStories", "exchangeWall"].includes(route)) {
    const page = params.page || 1
    const pageSize = 5
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    result = result.slice(startIndex, endIndex)
  }

  // Handle specific params for certain routes
  if (route === "countryData" && params.country) {
    result = result[params.country] || null
  }

  if (route === "searchCollections" && params.term) {
    result = await searchCollections(params.term)
  }

  if (route === "filterCollections" && params.filters) {
    result = await filterCollections(params.filters)
  }

  return result
}

