import { Card } from "../ui/card"
import { Plus, RefreshCw, Trophy, MessageSquare } from "lucide-react"

const actions = [
  {
    icon: Plus,
    label: "Añadir Cromos",
    description: "Registra nuevas cartas",
  },
  {
    icon: RefreshCw,
    label: "Intercambios",
    description: "Ver solicitudes",
  },
  {
    icon: Trophy,
    label: "Retos",
    description: "Crear o unirse",
  },
  {
    icon: MessageSquare,
    label: "Mensajes",
    description: "3 sin leer",
  },
]

export const QuickActions = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {actions.map((action) => (
            <Card key={action.label} className="p-4 hover:shadow-md transition-shadow cursor-pointer group">
              <div className="flex flex-col items-center text-center">
                <div className="mb-3 p-3 bg-green-50 rounded-full group-hover:bg-green-100 transition-colors">
                  <action.icon className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-medium mb-1">{action.label}</h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

