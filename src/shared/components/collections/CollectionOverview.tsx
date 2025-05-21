import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, Book, Award } from "lucide-react"

export const CollectionOverview = ({ collection }) => {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-green-800 mb-2">Liga Santander 2023/24</h1>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline" className="bg-green-50">
              <Calendar className="w-4 h-4 mr-1" />
              2023
            </Badge>
            <Badge variant="outline" className="bg-green-50">
              <Book className="w-4 h-4 mr-1" />
              Panini
            </Badge>
            <Badge variant="outline" className="bg-green-50">
              <Users className="w-4 h-4 mr-1" />
              1,234 coleccionistas
            </Badge>
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
              <Award className="w-4 h-4 mr-1" />
              Colección Destacada
            </Badge>
          </div>
        </div>
      </div>

      <p className="text-gray-600 mb-4">
        Colección oficial de cromos de LaLiga Santander temporada 2023/24. Incluye todos los equipos de primera división
        con jugadores, escudos, estadios y cromos especiales.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="bg-green-50 rounded-lg p-3">
          <div className="text-2xl font-bold text-green-700">450</div>
          <div className="text-sm text-green-600">Total Cromos</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-3">
          <div className="text-2xl font-bold text-blue-700">65%</div>
          <div className="text-sm text-blue-600">Completado</div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-3">
          <div className="text-2xl font-bold text-yellow-700">89</div>
          <div className="text-sm text-yellow-600">Repetidos</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-3">
          <div className="text-2xl font-bold text-purple-700">158</div>
          <div className="text-sm text-purple-600">Faltan</div>
        </div>
      </div>
    </Card>
  )
}

