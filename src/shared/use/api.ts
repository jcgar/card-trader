/* eslint-disable react-hooks/rules-of-hooks */
"use client"

import { useState, useEffect } from "react"
// import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, concat, gql, useLazyQuery } from "@apollo/client"
import type { Collection } from "@/shared/app/types"
import { graphqlRoutes } from "@/shared/graphql/graphqlRoutes"
import { useList } from "@refinedev/core"

const apiModules: { [key: string]: any } = {}

// Dynamically import all API modules
const importModule = async (key: string) => {
  if (!apiModules[key]) {
    try {
      /* @vite-ignore */
      apiModules[key] = await import(`./api/${key}.ts`)
    } catch (error) {
      console.error(`Failed to load API module: ${key}`, error)
      return null
    }
  }
  return apiModules[key]
}
// const authMiddleware = new ApolloLink((operation, forward) => {
//   // add the authorization to the headers
//   operation.setContext(({ headers = {} }) => ({
//     headers: {
//       ...headers,
//       // authorization: localStorage.getItem('token') || null,
//     }
//   }));

//   return forward(operation);
// })
// const client = new ApolloClient({
//   link: new HttpLink({
//     uri: 'https://dev.acabaramos.com/graphql-local.php',
//     fetchOptions: {
//       mode: "no-cors",
//     },
//     credentials: 'omit',
//   }),
//   cache: new InMemoryCache(),
// })
// const httpLink = new HttpLink({
//   uri: '/api',
// });

// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   link: concat(authMiddleware, httpLink),
// });

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
  id?: string;
  page?: number
  pageSize?: number
  fullQuery?: boolean
  country?: string
  term?: string
  filters?: Record<string, string>
  useGraphQL?: boolean
}

export function useApi<T>(route: string, pageOptions: ApiOptions = {}, filter?: any) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        let result
        if (pageOptions.useGraphQL && graphqlRoutes[route]) {
          result = await fetchGraphQLData(route, pageOptions, filter)
        } else {
          result = await api(route, pageOptions)
        }
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"))
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [route, JSON.stringify(pageOptions), JSON.stringify(filter)])

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

  if (options.id) {
    result = [result.find(o => `${o.id}` === options.id) || result[0]]
  }

  // Handle pagination
  if (options.page && options.pageSize) {
    const startIndex = (options.page - 1) * options.pageSize
    const endIndex = startIndex + options.pageSize
    result = result.slice(startIndex, endIndex)
  }

  // Handle full query option
  if (!options.fullQuery && Array.isArray(result)) {
    const pageSize = options.pageSize || 10
    result = result.slice(0, pageSize) // Default to first 10 items if not requesting full query
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

// New function to fetch data using GraphQL
async function fetchGraphQLData(route: string, { page, pageSize, fullQuery }: ApiOptions = {}, filter: any)
  : Promise<unknown> {

  const { query, typename, mapper } = graphqlRoutes[route]

  console.log('fetchGraphQLData', route, page, pageSize, filter)
  // const { loading, data, error } = await client.query({
  //   query,
  //   variables: {
  //     page: {
  //       page: page - 1,
  //       per_page: pageSize,
  //       direction: 'DESC',
  //       sort: 'LAST'
  //     },
  //     filter: filter || {}
  //   }
  // })

  let data
  try {
    const listResult = useList({
      resource: route,
      meta: { gqlQuery: query },
    });
    console.log('fetchGraphQLData result', listResult)

    data = listResult.data
  } catch (e) {
    debugger
  }

  // const [get, { loading, data, error }] = useLazyQuery(query, {
  //   notifyOnNetworkStatusChange: true,
  //   fetchPolicy: 'cache-and-network'
  // })

  // console.log('fetchGraphQLData result', query, data, error, data?.[route])

  return data?.[typename].data.map(mapper)
}

