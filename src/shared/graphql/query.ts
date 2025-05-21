// import { gql } from '@apollo/client'
import gql from "graphql-tag";

export const INDEX_TOP_COLLECTIONS_QUERY = gql`
  query IndexTopCollectionsQuery($page: PageFilter!, $filter: CollectionFilter!) {
    searchCollectionsPage(page: $page, filter: $filter) {
      page
      total
      data {
        collection {
          code
          colName: name
          description
          year
          key
          subject
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
            description
            year
            key
            subject
          }
          priority
          lastUpdated
          settings
          countElements
        }
        countFaults
        countRepeated
      }
    }
  }
`