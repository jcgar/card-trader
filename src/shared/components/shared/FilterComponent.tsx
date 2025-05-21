"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowUpDown, Filter } from "lucide-react"

interface FilterOption {
  id: string
  label: string
}

interface FilterComponentProps {
  sortOptions: FilterOption[]
  filterOptions: FilterOption[]
  onFilterChange: (filters: any) => void
  onSortChange: (sortBy: string, sortOrder: "asc" | "desc") => void
  translations: {
    sortBy: string
    advancedFilters: string
    advancedFiltersDescription: string
    applyFilters: string
    ascending: string
    descending: string
  }
  initialSort: { sortBy: string; sortOrder: "asc" | "desc" }
}

export const FilterComponent = ({
  sortOptions,
  filterOptions,
  onFilterChange,
  onSortChange,
  translations,
  initialSort,
}: FilterComponentProps) => {
  const [sortBy, setSortBy] = useState(initialSort.sortBy)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(initialSort.sortOrder)
  const [advancedFilters, setAdvancedFilters] = useState<Record<string, boolean>>({})

  useEffect(() => {
    onSortChange(sortBy, sortOrder)
  }, [sortBy, sortOrder, onSortChange])

  const handleAdvancedFilterApply = () => {
    onFilterChange(advancedFilters)
  }

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy)
  }

  const handleSortOrderToggle = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium">{translations.sortBy}</label>
        <Select value={sortBy} onValueChange={handleSortChange}>
          <SelectTrigger>
            <SelectValue placeholder={translations.sortBy} />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button variant="outline" onClick={handleSortOrderToggle} className="w-full">
        <ArrowUpDown className="h-4 w-4 mr-2" />
        {sortOrder === "asc" ? translations.ascending : translations.descending}
      </Button>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="w-full">
            <Filter className="h-4 w-4 mr-2" />
            {translations.advancedFilters}
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{translations.advancedFilters}</SheetTitle>
            <SheetDescription>{translations.advancedFiltersDescription}</SheetDescription>
          </SheetHeader>
          <div className="py-4 space-y-4">
            {filterOptions.map((option) => (
              <div key={option.id} className="flex items-center">
                <Checkbox
                  id={option.id}
                  checked={advancedFilters[option.id] || false}
                  onCheckedChange={(checked) => {
                    setAdvancedFilters((prev) => ({ ...prev, [option.id]: checked }))
                  }}
                />
                <label
                  htmlFor={option.id}
                  className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
          <Button onClick={handleAdvancedFilterApply} className="mt-4 w-full">
            {translations.applyFilters}
          </Button>
        </SheetContent>
      </Sheet>
    </div>
  )
}

