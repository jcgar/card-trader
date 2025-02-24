"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"

interface AdvancedSearchProps {
  isOpen: boolean
  onClose: () => void
}

export const AdvancedSearch: React.FC<AdvancedSearchProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [year, setYear] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement advanced search logic here
    console.log("Advanced search:", { name, category, year })
    onClose()
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Búsqueda avanzada</SheetTitle>
          <SheetDescription>Utiliza los filtros para encontrar colecciones específicas.</SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSearch} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="name">Nombre de la colección</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="category">Categoría</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sports">Deportes</SelectItem>
                <SelectItem value="movies">Películas</SelectItem>
                <SelectItem value="anime">Anime</SelectItem>
                <SelectItem value="videogames">Videojuegos</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="year">Año</Label>
            <Input id="year" type="number" value={year} onChange={(e) => setYear(e.target.value)} />
          </div>
          <Button type="submit" className="w-full">
            Buscar
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}

