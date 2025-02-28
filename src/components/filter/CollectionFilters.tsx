import { FilterComponent as SharedFilterComponent } from "@/components/shared/FilterComponent"
import { t } from "@/use/i18n"

interface FilterComponentProps {
  onFilterChange: (filters: any) => void
  onSortChange: (sortBy: string, sortOrder: "asc" | "desc") => void
}

export const CollectionFilters = ({ onFilterChange, onSortChange }: FilterComponentProps) => {
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

  return (
    <SharedFilterComponent
      sortOptions={sortOptions}
      filterOptions={filterOptions}
      onFilterChange={onFilterChange}
      onSortChange={onSortChange}
      translations={translations}
    />
  )
}

