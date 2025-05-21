import { useTable } from "@refinedev/core";
import { useMemo } from "react";

interface UseFilteredTableOptions {
  resource: string;
  initialPageSize?: number;
}

export const useFilteredTable = ({ resource, initialPageSize = 10 }: UseFilteredTableOptions) => {
  const { tableQuery, ...tableProps } = useTable({
    resource,
    pagination: {
      pageSize: initialPageSize,
      mode: "server"
    },
    // sorters: {
    //   mode: "server",
    // },
    // filters: {
    //   mode: "server",
    // },
  });

  console.log('useFilteredTable', resource, tableProps.current)
  const items = useMemo(() => tableQuery.data?.data ?? [], [tableQuery.data]);

  return {
    items,
    total: tableQuery.data?.total,
    loading: tableQuery.isLoading,
    sorter: tableProps.sorter,
    current: tableProps.current,
    setCurrent: tableProps.setCurrent,
    pageSize: tableProps.pageSize,
    pageCount: tableProps.pageCount,
    setPageSize: tableProps.setPageSize,
    setSorters: tableProps.setSorters,
    setFilters: tableProps.setFilters,
  };
};
