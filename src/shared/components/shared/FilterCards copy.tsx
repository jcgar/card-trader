"use client"

import type React from "react"
import { useState, useEffect, useMemo } from "react"
import { ScrollableCards } from "../cards/ScrollableCards"
import { SectionHeader } from "./SectionHeader"
import { Badge } from "@/components/ui/badge"
import { X, Grid, List, LayoutGrid, GridIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AdvancedSearch } from "../collections/AdvancedSearch"
import { motion, AnimatePresence } from "framer-motion"

export type ViewMode = "scroll" | "list" | "grid" | "grid-mini"

export interface FilterOption {
  id: string
  label: string
  value: string
  type: "category" | "tag" | "search" | "sort" | "advanced" | "predictive"
}

export interface SortOption {
  id: string
  label: string
  value: string
}

export interface FilterCardsProps<T> {
  items: T[]
  renderItem: (variant: string) => (item: T) => React.ReactNode
  title: string
  placeholder?: string
  sortOptions?: SortOption[]
  categories?: { id: string; name: string }[]
  filterFn?: (item: T, filters: FilterOption[]) => boolean
  onLoadMore?: () => void
  className?: string
  variant?: ViewMode
  itemsPerRow?: number
  itemsPerPage?: number
  predictiveSearchFn?: (query: string) => Promise<string[]>
  predictiveSearchStart?: number

}

export function FilterCards<T>({
  items,
  renderItem,
  title,
  placeholder = "Buscar...",
  sortOptions = [],
  categories = [],
  filterFn,
  onLoadMore,
  className,
  variant = "scroll",
  itemsPerRow = 4,
  itemsPerPage = 8,
  predictiveSearchFn,
  predictiveSearchStart = 2,
}: FilterCardsProps<T>) {
  const [viewMode, setViewMode] = useState<ViewMode>(variant)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<FilterOption[]>([])
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  // Filtrar los items basados en los filtros activos
  const filteredItems = useMemo(() => {
    if (!filterFn || activeFilters.length === 0) return items

    return items.filter((item) => filterFn(item, activeFilters))
  }, [items, activeFilters, filterFn])

  // Manejar la búsqueda predictiva
  useEffect(() => {
    console.log('Manejar la búsqueda predictiva', searchQuery)

    const fetchSuggestions = async () => {
      if (searchQuery.length > predictiveSearchStart && predictiveSearchFn) {
        const results = await predictiveSearchFn(searchQuery)
        setSuggestions(results)
        setShowSuggestions(results.length > 0)
      } else {
        setSuggestions([])
        setShowSuggestions(false)
      }
    }

    const timer = setTimeout(() => {
      fetchSuggestions()
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery, predictiveSearchFn])

  // Añadir un filtro
  const addFilter = (filter: FilterOption) => {
    console.log('addFilter', { filter })
    // Evitar duplicados
    if (!activeFilters.some((f) => f.id === filter.id)) {
      setActiveFilters([...activeFilters, filter])
    }
  }

  // Eliminar un filtro
  const removeFilter = (filterId: string) => {
    setActiveFilters(activeFilters.filter((filter) => filter.id !== filterId))
  }

  // Manejar la búsqueda
  const handleSearch = () => {
    console.log('handleSearch searchQuery', searchQuery)
    if (searchQuery.trim()) {
      addFilter({
        id: `search-${Date.now()}`,
        label: searchQuery,
        value: searchQuery,
        type: "search",
      })
      setSearchQuery("")
    }
  }

  // Manejar la selección de categoría
  const handleCategorySelect = (categoryId: string, categoryName: string) => {
    addFilter({
      id: `category-${categoryId}`,
      label: categoryName,
      value: categoryId,
      type: "category",
    })
  }

  // Manejar la búsqueda avanzada
  const handleAdvancedSearch = (filters: Record<string, string>) => {
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        addFilter({
          id: `advanced-${key}-${Date.now()}`,
          label: `${key}: ${value}`,
          value,
          type: "advanced",
        })
      }
    })
    setShowAdvancedSearch(false)
  }

  // Renderizar diferentes vistas según el modo seleccionado
  const renderView = () => {
    switch (viewMode) {
      case "scroll":
        return (
          <ScrollableCards
            items={filteredItems}
            renderItem={renderItem(viewMode)}
            title={title}
            placeholder={placeholder}
            categories={[]}
            onLoadMore={onLoadMore}
            className={className}
            itemsPerPage={itemsPerPage}
          >
            {null}
          </ScrollableCards>
        )
      // case "list":
      //   return (
      //     <div className="space-y-4">
      //       {filteredItems.map((item, index) => (
      //         <motion.div
      //           key={index}
      //           initial={{ opacity: 0, y: 20 }}
      //           animate={{ opacity: 1, y: 0 }}
      //           transition={{ delay: index * 0.05 }}
      //           className="w-full"
      //         >
      //           {renderItem(viewMode)(item)}
      //         </motion.div>
      //       ))}
      //       {onLoadMore && (
      //         <Button onClick={onLoadMore} variant="outline" className="w-full mt-4">
      //           Cargar más
      //         </Button>
      //       )}
      //     </div>
      //   )
      case "grid":
        return (
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${itemsPerRow} gap-4`}>
            {filteredItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                {renderItem(viewMode)(item)}
              </motion.div>
            ))}
            {onLoadMore && (
              <Button onClick={onLoadMore} variant="outline" className="col-span-full mt-4">
                Cargar más
              </Button>
            )}
          </div>
        )
      case "grid-mini":
        return (
          <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-${itemsPerRow * 2} gap-2`}>
            {filteredItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.03 }}
                className="transform transition-transform hover:scale-105"
              >
                {renderItem(viewMode)(item)}
              </motion.div>
            ))}
            {onLoadMore && (
              <Button onClick={onLoadMore} variant="outline" className="col-span-full mt-4">
                Cargar más
              </Button>
            )}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <SectionHeader
        title={title}
        placeholder={placeholder}
        categories={categories}
        onSearch={setSearchQuery}
        onSearchSubmit={handleSearch}
        searchValue={searchQuery}
        sortOptions={sortOptions}
        onAdvancedSearchClick={() => setShowAdvancedSearch(true)}
        onCategorySelect={handleCategorySelect}
        suggestions={suggestions}
        showSuggestions={showSuggestions}
        onSuggestionSelect={(suggestion) => {
          setShowSuggestions(false)
          addFilter({
            id: `predictive-${Date.now()}`,
            label: suggestion,
            value: suggestion,
            type: "predictive",
          })
          setSearchQuery("")
        }}
      >
        <div className="flex space-x-2">
          <Button
            variant={viewMode === "scroll" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("scroll")}
            title="Vista de lista"
          >
            <List className="h-4 w-4" />
          </Button>
          {/* <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("list")}
            title="Vista de lista"
          >
            <List className="h-4 w-4" />
          </Button> */}
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("grid")}
            title="Vista de cuadrícula"
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "grid-mini" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("grid-mini")}
            title="Vista de cuadrícula compacta"
          >
            <GridIcon className="h-4 w-4" />
          </Button>
        </div>
      </SectionHeader>

      {/* Filtros activos */}
      <AnimatePresence>
        {activeFilters.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap gap-2 pb-4"
          >
            {activeFilters.map((filter) => (
              <Badge
                key={filter.id}
                variant="secondary"
                className="flex items-center gap-1 px-3 py-1.5 text-sm bg-primary/10 hover:bg-primary/20 transition-colors"
              >
                {filter.label}
                <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter(filter.id)} />
              </Badge>
            ))}
            {activeFilters.length > 1 && (
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-destructive/10 transition-colors"
                onClick={() => setActiveFilters([])}
              >
                Limpiar todos
              </Badge>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contenido principal */}
      {renderView()}

      {/* Búsqueda avanzada */}
      <AdvancedSearch
        isOpen={showAdvancedSearch}
        onClose={() => setShowAdvancedSearch(false)}
        onSearch={handleAdvancedSearch}
      />
    </div>
  )
}
