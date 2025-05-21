"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AdvancedSearchProps {
  isOpen: boolean
  onClose: () => void
  onSearch?: (filters: Record<string, string>) => void
}

export const AdvancedSearch: React.FC<AdvancedSearchProps> = ({ isOpen, onClose, onSearch }) => {
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [year, setYear] = useState("")
  const [publisher, setPublisher] = useState("")
  const [completionRate, setCompletionRate] = useState([0, 100])
  const [onlyAvailable, setOnlyAvailable] = useState(false)
  const [activeTab, setActiveTab] = useState("general")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    const filters: Record<string, string> = {}

    if (name) filters.name = name
    if (category) filters.category = category
    if (year) filters.year = year
    if (publisher) filters.publisher = publisher
    if (completionRate[0] > 0 || completionRate[1] < 100) {
      filters.completionMin = completionRate[0].toString()
      filters.completionMax = completionRate[1].toString()
    }
    if (onlyAvailable) filters.available = "true"

    if (onSearch) {
      onSearch(filters)
    }

    onClose()
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-md md:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Búsqueda avanzada</SheetTitle>
          <SheetDescription>Utiliza los filtros para encontrar colecciones específicas.</SheetDescription>
        </SheetHeader>

        <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="details">Detalles</TabsTrigger>
            <TabsTrigger value="advanced">Avanzado</TabsTrigger>
          </TabsList>

          <form onSubmit={handleSearch}>
            <TabsContent value="general" className="space-y-4">
              <div>
                <Label htmlFor="name">Nombre de la colección</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej: Mundial 2022"
                />
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
                <Input
                  id="year"
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="Ej: 2023"
                />
              </div>
            </TabsContent>

            <TabsContent value="details" className="space-y-4">
              <div>
                <Label htmlFor="publisher">Editorial</Label>
                <Input
                  id="publisher"
                  value={publisher}
                  onChange={(e) => setPublisher(e.target.value)}
                  placeholder="Ej: Panini"
                />
              </div>
              <div className="space-y-2">
                <Label>Porcentaje de completado</Label>
                <div className="pt-4 px-2">
                  <Slider
                    defaultValue={[0, 100]}
                    max={100}
                    step={1}
                    value={completionRate}
                    onValueChange={setCompletionRate}
                  />
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{completionRate[0]}%</span>
                  <span>{completionRate[1]}%</span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="available" className="cursor-pointer">
                  Solo mostrar disponibles
                </Label>
                <Switch id="available" checked={onlyAvailable} onCheckedChange={setOnlyAvailable} />
              </div>
            </TabsContent>

            <SheetFooter className="mt-6">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit">Aplicar filtros</Button>
            </SheetFooter>
          </form>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}
