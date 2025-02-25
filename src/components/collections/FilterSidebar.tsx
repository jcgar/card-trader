import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Search, Filter, X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const FilterSidebar = () => {
  return (
    <Card className="p-6 space-y-6">
      <div>
        <Label htmlFor="search">Buscar</Label>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input id="search" placeholder="Buscar colección..." className="pl-9" />
        </div>
      </div>

      <div>
        <Label>Categoría</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Todas las categorías" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="deportes">Deportes</SelectItem>
            <SelectItem value="anime">Anime</SelectItem>
            <SelectItem value="pokemon">Pokémon</SelectItem>
            <SelectItem value="otros">Otros</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Estado</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Cualquier estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Activas</SelectItem>
            <SelectItem value="completed">Completadas</SelectItem>
            <SelectItem value="dormant">Dormidas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Ordenar por</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Más populares" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popular">Más populares</SelectItem>
            <SelectItem value="recent">Más recientes</SelectItem>
            <SelectItem value="name">Nombre</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="pt-4 flex gap-2">
        <Button className="flex-1">
          <Filter className="mr-2 h-4 w-4" />
          Aplicar filtros
        </Button>
        <Button variant="outline" size="icon">
          <X className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  )
}

