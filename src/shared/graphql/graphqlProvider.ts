import { DataProvider } from "@refinedev/core";
// import { GraphQLClient, gql } from "graphql-request";
import { graphqlRoutes } from "./graphqlRoutes";
import { GraphQLClient } from "@refinedev/graphql";
import gql from "graphql-tag";

const API_URL = '/api'
const client = new GraphQLClient(API_URL);

export const customGraphQLProvider: DataProvider = {
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    console.log('GET LIST ', resource, pagination, filters, sorters)

    if (graphqlRoutes[resource]) {
      const { query, typename, mapper } = graphqlRoutes[resource];
      const fullQuery = meta?.fullQuery ?? false;
      const page = pagination?.current || 1
      const per_page = fullQuery ? 0 : pagination?.pageSize || 10

      // const variables = {
      //   filter: buildFilter(filters),
      //   sort: buildSort(sorters),
      // };

      const pageFilter = {
        direction: 'DESC',
        // sort: 'LAST',
        page: page - 1,
        per_page,
      }

      const variables = {
        page: pageFilter,
        filter: {}
      }
      const response = await client.request(query, variables);
      const result = response[typename];

      if (typename.startsWith('all')) {
        return {
          data: result.map(mapper),
          total: result.length,
        };
      } else {
        return {
          data: (result.data || []).map(mapper),
          total: result.total,
        };
      }
    }

    throw new Error(`No GraphQL route config for resource "${resource}"`);
  },

  getOne: async ({ resource, id }) => {
    const query = gql`
            query ($id: ID!) {
                ${resource}(id: $id) {
                    id
                    name
                }
            }
        `;
    const res = await client.request(query, { id });
    return { data: res[resource] };
  },

  getMany: async ({ resource, ids }) => {
    const query = gql`
            query ($ids: [ID!]!) {
                ${resource}Many(ids: $ids) {
                    id
                    name
                }
            }
        `;
    const res = await client.request(query, { ids });
    return { data: res[`${resource}Many`] };
  },

  create: async ({ resource, variables }) => {
    const query = gql`
            mutation ($input: Create${capitalize(resource)}Input!) {
                create${capitalize(resource)}(input: $input) {
                    id
                }
            }
        `;
    const res = await client.request(query, { input: variables });
    return { data: res[`create${capitalize(resource)}`] };
  },

  update: async ({ resource, id, variables }) => {
    const query = gql`
            mutation ($id: ID!, $input: Update${capitalize(resource)}Input!) {
                update${capitalize(resource)}(id: $id, input: $input) {
                    id
                }
            }
        `;
    const res = await client.request(query, { id, input: variables });
    return { data: res[`update${capitalize(resource)}`] };
  },

  deleteOne: async ({ resource, id }) => {
    const query = gql`
            mutation ($id: ID!) {
                delete${capitalize(resource)}(id: $id) {
                    id
                }
            }
        `;
    const res = await client.request(query, { id });
    return { data: res[`delete${capitalize(resource)}`] };
  },

  custom: async ({ url, method, filters, sorters, payload, query, headers }) => {
    const res = await client.rawRequest(query as string, payload);
    return { data: res.data };
  }
};


// 

function buildFilter(filters: any = []) {
  return filters.reduce((acc: any, filter: any) => {
    const { field, operator, value } = filter;
    acc[field] = mapOperator(operator, value);
    return acc;
  }, {});
}

function mapOperator(op: string, value: any) {
  switch (op) {
    case "eq": return { eq: value };
    case "ne": return { ne: value };
    case "gt": return { gt: value };
    case "lt": return { lt: value };
    case "contains": return { contains: value };
    default: return { eq: value };
  }
}

function buildSort(sorters: any = []) {
  return sorters.map(({ field, order }: any) => ({
    field,
    order: order === "asc" ? "ASC" : "DESC",
  }));
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
