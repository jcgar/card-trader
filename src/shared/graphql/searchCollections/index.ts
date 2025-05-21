import gql from "graphql-tag";

export const SEARCH_COLLECTIONS_PAGE_QUERY = gql`
  query searchCollectionsPageQuery($page: PageFilter!, $filter: CollectionFilter!) {
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
`;


export const ALL_SEARCH_COLLECTIONS_QUERY = gql`
  query allSearchCollections {
    allSearchCollections {
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
  
`;
