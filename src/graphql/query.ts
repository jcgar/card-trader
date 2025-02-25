import { gql } from '@apollo/client'

export const INDEX_TOP_COLLECTIONS_QUERY = gql`
  query IndexTopCollectionsQuery($page: PageFilter!, $filter: CollectionFilter!) {
    searchCollectionsPage(page: $page, filter: $filter) {
      page
      total
      data {
        collection {
          code
          colName: name
        }
        collectors {
          total
          recent
        }
      }
    }
  }
`

export const DASHBOARD_HOME_COLLECTIONS_QUERY = gql`
  query DashboardHomeCollectionsQuery($page: PageFilter!, $filter: UserCollectionFilter!) {
    userCollectionExPage(page: $page, filter: $filter) {
      page
      total
      data {
        userCollection {
          collection {
            code
            colName: name
          }
          priority
          lastUpdated
          settings
        }
        countFaults
        countRepeated
      }
    }
  }
`