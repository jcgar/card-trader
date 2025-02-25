import { Button } from "../ui/button"
import { Bell, MessageSquare, Trophy, Calendar, PlusCircle } from "lucide-react"

export const ActionsMenu = () => {
  return (
    <section className="py-8 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap gap-4 justify-center items-center">
          <Button
            variant="ghost"
            className="flex-1 md:flex-none min-w-[160px] bg-green-50 hover:bg-green-100 text-green-700 h-auto py-3"
          >
            <PlusCircle className="w-5 h-5 mr-2 animate-pulse" />
            <div className="text-left">
              <div className="font-medium">Publicar Intercambio</div>
              <div className="text-xs text-green-600">Nuevo anuncio</div>
            </div>
          </Button>

          <Button
            variant="ghost"
            className="flex-1 md:flex-none min-w-[160px] bg-purple-50 hover:bg-purple-100 text-purple-700 h-auto py-3"
          >
            <Bell className="w-5 h-5 mr-2" />
            <div className="text-left">
              <div className="font-medium">Notificaciones</div>
              <div className="text-xs text-purple-600">3 sin leer</div>
            </div>
          </Button>

          <Button
            variant="ghost"
            className="flex-1 md:flex-none min-w-[160px] bg-yellow-50 hover:bg-yellow-100 text-yellow-700 h-auto py-3"
          >
            <Trophy className="w-5 h-5 mr-2" />
            <div className="text-left">
              <div className="font-medium">Crear Reto</div>
              <div className="text-xs text-yellow-600">Personalizado</div>
            </div>
          </Button>

          <Button
            variant="ghost"
            className="flex-1 md:flex-none min-w-[160px] bg-blue-50 hover:bg-blue-100 text-blue-700 h-auto py-3"
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            <div className="text-left">
              <div className="font-medium">Foros</div>
              <div className="text-xs text-blue-600">Debates activos</div>
            </div>
          </Button>

          <Button
            variant="ghost"
            className="flex-1 md:flex-none min-w-[160px] bg-orange-50 hover:bg-orange-100 text-orange-700 h-auto py-3"
          >
            <Calendar className="w-5 h-5 mr-2" />
            <div className="text-left">
              <div className="font-medium">Eventos</div>
              <div className="text-xs text-orange-600">2 próximos</div>
            </div>
          </Button>
        </div>
      </div>
    </section>
  )
}

