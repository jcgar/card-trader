import { FilterComponent as SharedFilterComponent } from "@/components/shared/FilterComponent"
import { t } from "@/use/i18n"

interface FilterComponentProps {
  onFilterChange: (filters: any) => void
  onSortChange: (sortBy: string, sortOrder: "asc" | "desc") => void
}

export const ExchangeFilters = ({ onFilterChange, onSortChange }: FilterComponentProps) => {
  const sortOptions = [
    { id: "collector", label: t("exchanges.sortByCollector") },
    { id: "status", label: t("exchanges.sortByStatus") },
    { id: "date", label: t("exchanges.sortByDate") },
    { id: "lastActivity", label: t("exchanges.sortByLastActivity") },
    { id: "totalStickers", label: t("exchanges.sortByTotalStickers") },
  ]

  const filterOptions = [
    { id: "pending", label: t("exchanges.statusPending") },
    { id: "accepted", label: t("exchanges.statusAccepted") },
    { id: "completed", label: t("exchanges.statusCompleted") },
    { id: "rejected", label: t("exchanges.statusRejected") },
  ]

  const translations = {
    sortBy: t("exchanges.sortBy"),
    advancedFilters: t("exchanges.advancedFilters"),
    advancedFiltersDescription: t("exchanges.advancedFiltersDescription"),
    applyFilters: t("exchanges.applyFilters"),
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

