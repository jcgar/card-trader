"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion, AnimatePresence } from "framer-motion"

interface Category {
  id: string
  name: string
}

interface SortOption {
  id: string
  label: string
  value: string
}

interface SectionHeaderProps {
  children?: React.ReactNode
  title: string
  placeholder: string
  categories: Category[]
  onSearch?: (query: string) => void
  onSearchSubmit?: () => void
  searchValue?: string
  sortOptions?: SortOption[]
  onSortChange?: (value: string) => void
  onAdvancedSearchClick?: () => void
  onCategorySelect?: (id: string, name: string) => void
  suggestions?: string[]
  showSuggestions?: boolean
  onSuggestionSelect?: (suggestion: string) => void
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  children,
  title,
  placeholder,
  categories,
  onSearch,
  onSearchSubmit,
  searchValue = "",
  sortOptions = [],
  onSortChange,
  onAdvancedSearchClick,
  onCategorySelect,
  suggestions = [],
  showSuggestions = false,
  onSuggestionSelect,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  const toggleCategory = (categoryId: string, categoryName: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories((prev) => prev.filter((id) => id !== categoryId))
    } else {
      setSelectedCategories((prev) => [...prev, categoryId])
      if (onCategorySelect) {
        onCategorySelect(categoryId, categoryName)
      }
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(e.target.value)
    }
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearchSubmit) {
      onSearchSubmit()
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    if (onSuggestionSelect) {
      onSuggestionSelect(suggestion)
    }
  }

  // Cerrar sugerencias al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        if (showSuggestions && onSuggestionSelect) {
          onSuggestionSelect("")
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showSuggestions, onSuggestionSelect])

  return (
    <div className="mb-8 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 transition-all duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 dark:from-primary dark:to-primary/50">
          {title}
        </h1>
        <div className="flex items-center gap-2">
          {sortOptions.length > 0 && (
            <Select onValueChange={onSortChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.id} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          {children}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-4">
        <div className="relative flex-grow">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              ref={inputRef}
              type="text"
              placeholder={placeholder}
              className={`pl-10 pr-10 transition-all duration-200 ${isFocused ? "ring-2 ring-primary/30" : ""}`}
              value={searchValue}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            {searchValue && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
                onClick={() => onSearch && onSearch("")}
              >
                <span className="sr-only">Limpiar</span>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Sugerencias predictivas */}
          <AnimatePresence>
            {showSuggestions && suggestions.length > 0 && (
              <motion.div
                ref={suggestionsRef}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-10 w-full mt-1 bg-background border border-input rounded-md shadow-lg"
              >
                <ul className="py-1">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-accent cursor-pointer text-sm"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex gap-2">
          <Button onClick={onSearchSubmit} className="shrink-0">
            Buscar
          </Button>

          <Button variant="outline" className="shrink-0" onClick={onAdvancedSearchClick}>
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Avanzada
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategories.includes(category.id) ? "default" : "outline"}
            size="sm"
            onClick={() => toggleCategory(category.id, category.name)}
            className="transition-all duration-200 hover:scale-105"
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  )
}
