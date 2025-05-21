"use client"

import { useState, useEffect } from "react"
import { FilterComponent as SharedFilterComponent } from "@/shared/components/shared/FilterComponent"
import { t } from "@/shared/use/i18n"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import type { Collection, Collector } from "@/shared/app/types"
import type { ExchangeFilters as IExchangeFilters } from "@/shared/app/filterTypes"

interface FilterComponentProps {
  onFilterChange: (filters: IExchangeFilters) => void
  onSortChange: (sortBy: string, sortOrder: "asc" | "desc") => void
  collections: Collection[]
  collectors: Collector[]
  initialFilters: IExchangeFilters
  initialSort: { sortBy: string; sortOrder: "asc" | "desc" }
}

export const ExchangeFilters = ({
  onFilterChange,
  onSortChange,
  collections,
  collectors,
  initialFilters,
  initialSort,
}: FilterComponentProps) => {
  const [filters, setFilters] = useState<IExchangeFilters>(initialFilters)

  useEffect(() => {
    onFilterChange(filters)
  }, [filters, onFilterChange])

  const sortOptions = [
    { id: "date", label: t("exchanges.sortByDate") },
    { id: "status", label: t("exchanges.sortByStatus") },
    { id: "lastActivity", label: t("exchanges.sortByLastActivity") },
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

  const handleFilterChange = (newFilters: Partial<IExchangeFilters>) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }))
  }

  return (
    <div className="space-y-4">
      <SharedFilterComponent
        sortOptions={sortOptions}
        filterOptions={filterOptions}
        onFilterChange={(statusFilters) => handleFilterChange({ status: statusFilters })}
        onSortChange={onSortChange}
        translations={translations}
        initialSort={initialSort}
      />
      <div>
        <label className="text-sm font-medium">{t("exchanges.filterByCollection")}</label>
        <Select value={filters.collection} onValueChange={(value) => handleFilterChange({ collection: value })}>
          <SelectTrigger>
            <SelectValue placeholder={t("exchanges.selectCollection")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("exchanges.allCollections")}</SelectItem>
            {collections.map((collection) => (
              <SelectItem key={collection.id} value={collection.id}>
                {collection.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="text-sm font-medium">{t("exchanges.filterByCollector")}</label>
        <Select value={filters.collector} onValueChange={(value) => handleFilterChange({ collector: value })}>
          <SelectTrigger>
            <SelectValue placeholder={t("exchanges.selectCollector")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("exchanges.allCollectors")}</SelectItem>
            {collectors.map((collector) => (
              <SelectItem key={collector.id} value={collector.id}>
                {collector.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="text-sm font-medium">{t("exchanges.filterByStickerNumber")}</label>
        <Input
          type="text"
          placeholder={t("exchanges.enterStickerNumber")}
          value={filters.stickerNumber}
          onChange={(e) => handleFilterChange({ stickerNumber: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label>{t("exchanges.filterByProgress")}</Label>
        <div className="flex items-center space-x-2">
          <Switch
            checked={filters.inProgress}
            onCheckedChange={(checked) => handleFilterChange({ inProgress: checked })}
          />
          <Label>{t("exchanges.inProgress")}</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            checked={filters.cancelled}
            onCheckedChange={(checked) => handleFilterChange({ cancelled: checked })}
          />
          <Label>{t("exchanges.cancelled")}</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            checked={filters.completed}
            onCheckedChange={(checked) => handleFilterChange({ completed: checked })}
          />
          <Label>{t("exchanges.completed")}</Label>
        </div>
      </div>
    </div>
  )
}

