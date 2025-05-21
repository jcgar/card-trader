import { BaseRecord, CreateParams, DataProvider, UpdateParams, DeleteOneParams } from "@refinedev/core";
import { api } from "../use/api";

export const mockGraphQLProvider: DataProvider = {
  getList: async ({ resource, pagination }) => {
    debugger
    const page = pagination?.current || 1;
    const pageSize = pagination?.pageSize || 10;

    const data = await api(resource, {
      page,
      pageSize,
    });

    return {
      data,
      total: data.length,
    };
  },

  getOne: async ({ resource, id }) => {
    const [item] = await api(resource, { id: String(id) });
    return { data: item };
  },

  create: async <TData extends BaseRecord, TVariables>({ resource }: CreateParams<TVariables>) => {
    const [item] = await api(resource, { page: 1, pageSize: 1 });
    return { data: { id: Date.now(), ...(item as unknown as TData) } as TData };
  },

  update: async <TData extends BaseRecord, TVariables>({ resource, id }: UpdateParams<TVariables>) => {
    const [item] = await api(resource, { page: 1, pageSize: 1 });
    return { data: { id, ...(item as unknown as TData) } as TData };
  },

  deleteOne: async <TData extends BaseRecord, TVariables>({ resource, id }: DeleteOneParams<TVariables>) => {
    return { data: { id } as TData };
  },
  getApiUrl: function (): string {
    return '/api'
  }
};
