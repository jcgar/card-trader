import gql from "graphql-tag";

export const ALL_COLLECTIONS_QUERY = gql`
  query allCollections {
    allCollections {
        code
        name
        description
        subject
        year
        key
    }
  }
`;

export const COLLECTIONS_PAGE_QUERY = gql`
  query collectionsPage(
    $page: PageFilter!,
    $filter: CollectionFilter!) {
        collectionsPage(
            page: $page, filter: $filter) {
                page
                total
                data {
                    code
                    name
                    description
                    subject
                    year
                    key
                    __typename
                }
            __typename
        }
    }

`;