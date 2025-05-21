"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useFilteredTable } from "../hooks/useFilteredTable";
import { AnimatedGrid } from "./AnimatedGrid";
import { ScrollSlider } from "./ScrollSlider";
import { BaseRecord } from "@refinedev/core";
import { debounce } from "@/shared/use/ui";

export type ViewMode = "scroll" | "grid";

interface FilterCardsProps<T> {
  resource: string;
  renderItem: (viewMode: string) => (item: T, idx: number) => React.ReactNode;
  title: string;
  itemsPerPage?: number;
  itemsPerRow?: number;
}

export function FilterCards<T extends BaseRecord[]>({
  resource,
  renderItem,
  title,
  itemsPerPage = 16,
  itemsPerRow = 4,
}: FilterCardsProps<T>) {
  const { items, loading, setCurrent, current, pageCount } = useFilteredTable({
    resource,
    initialPageSize: itemsPerPage,
  });

  // const [cache, setCache] = useState<Record<number, T[]>>({});
  // const [currentPage, setCurrentPage] = useState(0);
  // const [currentIndex, setCurrentIndex] = useState(0);
  // const blocksPerPage = itemsPerPage / itemsPerRow;
  // const totalPages = Math.ceil(items.length / itemsPerRow);
  const hasMorePages = current < pageCount;
  // const pageItems = items.slice(
  //   currentPage * itemsPerPage,
  //   (currentPage + 1) * itemsPerPage
  // );


  const loadMore = () => {
    console.log('loadMore')
  }
  const goToBlock = (blockIndex: number) => {
    console.log('goToBlock', blockIndex)
    //   if (blockIndex >= blocksPerPage) {
    //     setCurrentPage((prev) => prev + 1);
    //     setCurrentIndex(0);
    //     // cargar si aún no se cargó esa página
    //     if (!cache[currentPage + 1]) {
    //       setCurrent(currentPage + 1);
    //     }
    //   } else if (blockIndex < 0) {
    //     if (currentPage > 0) {
    //       setCurrentPage((prev) => prev - 1);
    //       setCurrentIndex(blocksPerPage - 1);
    //     }
    //   } else {
    //     setCurrentIndex(blockIndex);
    //   }
  };

  // const setCurrent = (idx) => {
  //   console.log('setCurrent', idx)
  //   changeCurrentPage(idx)
  // }
  // const changePage = (idx) => {
  //   setCurrentPage(idx);
  //   // setCurrentIndex(0);
  //   if (!cache[idx]) {
  //     setCurrent(idx);
  //   }
  // }

  const changePage = (idx) => {
    setCurrent(idx)
  }
  const handleArrows = (direction: "prev" | "next") => {
    // console.log('handleArrows', { currentPage })
    switch (direction) {
      case 'prev':
        // setCurrentIndex(currentIndex - 1);
        if (current > 1) {
          setCurrent(current - 1);
        }
        // goToBlock(-1)
        break;
      case 'next':
        // setCurrentIndex(currentIndex + 1);
        console.log('next', hasMorePages)
        // goToBlock(5)
        if (hasMorePages) {
          setCurrent(current + 1);
        }
        break;
    }
  }

  // useEffect(() => {
  //   console.log('set cache', current, cache)
  //   setCache((prev) => ({ ...prev, [current]: items as T[] }));
  //   changePage(current)
  // }, [items, current]);


  // calculate blocks
  // const loadedPages = Object.keys(cache).map(Number).sort((a, b) => a - b);
  // const visibleItems = loadedPages.flatMap((page) => cache[page] || []);
  // const totalBlocks = Math.ceil((loadedPages.length * itemsPerPage) / itemsPerPage); // igual a loadedPages.length si 1 página = 1 bloque
  // const visibleItems = cache[currentPage]

  // const hasNext = current < pageCount;
  // // Checks if there is a previous page available
  // const hasPrev = current > 1;

  // const [currentPage, setCurrentPage] = useState(0);

  const [viewMode, setViewMode] = useState<ViewMode>("scroll");
  // const [accumulatedItems, setAccumulatedItems] = useState<T[]>([]);
  // const paginatedItems = items.slice(current * itemsPerPage, (current + 1) * itemsPerPage);

  // const loadMore = debounce(() => {
  //   setCurrent((prev) => prev + 1);
  // }, 50);

  // useEffect(() => {
  // setCurrent(1)
  // if (items.length > 0) {
  // setAccumulatedItems((prev) => [...prev, ...(items as T[])]);
  // }
  // }, [items]);

  // console.log({ paginatedItems, current, pageCount, items })

  // console.log('visibleItems', visibleItems, 'cache', cache, 'items', items)

  // console.log('visibleItems', visibleItems)
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="space-x-2">
          <Button variant={viewMode === "scroll" ? "default" : "outline"} onClick={() => setViewMode("scroll")}>
            Slider
          </Button>
          <Button variant={viewMode === "grid" ? "default" : "outline"} onClick={() => setViewMode("grid")}>
            Grid
          </Button>
        </div>
      </div>

      {loading && <p>Cargando...</p>}

      {!loading && viewMode === "scroll" && (
        <ScrollSlider<BaseRecord>
          items={items}
          itemsPerRow={itemsPerRow}
          // activeIndex={currentIndex}
          offsetIndex={current * itemsPerPage}
          // onBlockChange={(blockIndex) => {
          //   setCurrentIndex(blockIndex);

          //   // Si el bloque apunta a una página aún no cargada
          //   const targetPage = blockIndex;
          //   if (!cache[targetPage] && targetPage < pageCount) {
          //     setCurrent(targetPage); // Refine carga la nueva página
          //   }
          // }}
          onBlockChange={goToBlock}
          renderItem={renderItem(viewMode) as (item: BaseRecord) => React.ReactNode}
          onLoadMore={loadMore}
          handleArrows={handleArrows}
          hasPrevPage={current > 0}
          hasNextPage={current < pageCount}
        />)}

      {!loading && viewMode === "grid" && (
        <AnimatedGrid<BaseRecord> items={items} itemsPerRow={itemsPerRow} renderItem={renderItem(viewMode) as (item: BaseRecord) => React.ReactNode} />)}

      {/* Botón de cargar más */}
      {/* {!loading && pageCount > items.length && (
        <Button onClick={loadMore} className="w-full mt-4">
          Cargar más
        </Button>
      )} */}

      {/* dots */}
      {/* <div className="flex justify-center gap-1 mt-4">
        {Array.from({ length: pageCount }, (_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCurrentIndex(idx);
              if (!cache[idx]) setCurrent(idx);
            }}
            className={`w-2 h-2 rounded-full ${idx === currentIndex ? "bg-primary" : "bg-gray-300"
              }`}
          />
        ))}
      </div> */}


      <div className="overflow-x-auto mt-4">
        <div className="flex gap-2 w-max px-2 py-1">
          {Array.from({ length: pageCount }, (_, idx) => (
            <button
              key={idx}
              className={`px-3 py-1 rounded transition-colors whitespace-nowrap ${idx === current ? "bg-primary text-white" : "bg-gray-200 hover:bg-gray-300"
                }`}
              onClick={() => changePage(idx)}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
