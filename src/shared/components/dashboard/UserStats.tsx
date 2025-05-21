import { Card } from "../../../components/ui/card"
import { RefreshCw, Book, Award } from "lucide-react"

const stats = [
  {
    label: "Intercambios",
    value: 156,
    icon: RefreshCw,
    change: "+12% vs. mes anterior",
  },
  {
    label: "Colecciones",
    value: 23,
    icon: Book,
    change: "+3 este mes",
  },
  {
    label: "Logros",
    value: 45,
    icon: Award,
    change: "2 nuevos",
  },
]

export const UserStats = () => {
  return (
    <Card className="p-6">
      <h3 className="font-bold text-lg mb-4">Estadísticas</h3>
      <div className="space-y-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center gap-4">
            <div className="p-3 bg-green-50 rounded-full">
              <stat.icon className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="font-bold text-2xl">{stat.value}</p>
              <p className="text-xs text-green-600">{stat.change}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

