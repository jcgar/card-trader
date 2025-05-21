"use client"

import { useState, useEffect } from "react"
import { FilterComponent as SharedFilterComponent } from "@/shared/components/shared/FilterComponent"
import { t } from "@/shared/use/i18n"
import type { CollectionFilters as ICollectionFilters } from "@/shared/app/filterTypes"

interface FilterComponentProps {
  onFilterChange: (filters: ICollectionFilters) => void
  onSortChange: (sortBy: string, sortOrder: "asc" | "desc") => void
  initialFilters: ICollectionFilters
  initialSort: { sortBy: string; sortOrder: "asc" | "desc" }
}

export const CollectionFilters = ({
  onFilterChange,
  onSortChange,
  initialFilters,
  initialSort,
}: FilterComponentProps) => {
  const [filters, setFilters] = useState<ICollectionFilters>(initialFilters)

  useEffect(() => {
    onFilterChange(filters)
  }, [filters, onFilterChange])

  const sortOptions = [
    { id: "name", label: t("collections.sortByName") },
    { id: "year", label: t("collections.sortByYear") },
    { id: "completionRate", label: t("collections.sortByCompletionRate") },
  ]

  const filterOptions = [
    { id: "sports", label: t("collections.categorySports") },
    { id: "movies", label: t("collections.categoryMovies") },
    { id: "anime", label: t("collections.categoryAnime") },
    { id: "videogames", label: t("collections.categoryVideogames") },
  ]

  const translations = {
    sortBy: t("collections.sortBy"),
    advancedFilters: t("collections.advancedFilters"),
    advancedFiltersDescription: t("collections.advancedFiltersDescription"),
    applyFilters: t("collections.applyFilters"),
    ascending: t("common.ascending"),
    descending: t("common.descending"),
  }

  const handleFilterChange = (newFilters: Partial<ICollectionFilters>) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }))
  }

  return (
    <SharedFilterComponent
      sortOptions={sortOptions}
      filterOptions={filterOptions}
      onFilterChange={(categoryFilters) => handleFilterChange({ category: categoryFilters })}
      onSortChange={onSortChange}
      translations={translations}
      initialSort={initialSort}
    />
  )
}

