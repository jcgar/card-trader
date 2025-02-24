"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, SlidersHorizontal } from "lucide-react"

interface SearchBarProps {
  onAdvancedSearch: () => void
}

export const SearchBar: React.FC<SearchBarProps> = ({ onAdvancedSearch }) => {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search logic here
    console.log("Searching for:", searchTerm)
  }

  return (
    <form onSubmit={handleSearch} className="flex items-center space-x-2">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Buscar colecciones..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 w-full"
        />
      </div>
      <Button type="submit">Buscar</Button>
      <Button type="button" variant="outline" onClick={onAdvancedSearch}>
        <SlidersHorizontal className="w-4 h-4 mr-2" />
        Búsqueda avanzada
      </Button>
    </form>
  )
}

