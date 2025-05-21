import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Flame, Calendar } from "lucide-react"
import { mockUsers, mockDebates } from "@/shared/use/data"

export const Sidebar = () => {
  const topUsers = mockUsers.slice(0, 5)
  const popularDebates = mockDebates.slice(0, 3)
  const upcomingEvents = [
    { id: 1, name: "Concurso de Colecciones Vintage", date: "2023-06-15" },
    { id: 2, name: "Reto: Completa tu álbum en 30 días", date: "2023-07-01" },
  ]

  return (
    <div className="space-y-6">
      <Card className="p-4">
        <h3 className="font-semibold mb-4 flex items-center">
          <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
          Usuarios más activos
        </h3>
        <div className="space-y-2">
          {topUsers.map((user, index) => (
            <div key={user.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="w-8 h-8 mr-2">
                  <AvatarImage src={`https://i.pravatar.cc/150?u=${user.id}`} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <span>{user.name}</span>
              </div>
              <span className="text-sm text-gray-500">{user.points} pts</span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold mb-4 flex items-center">
          <Flame className="w-5 h-5 mr-2 text-orange-500" />
          Debates populares
        </h3>
        <div className="space-y-2">
          {popularDebates.map((debate) => (
            <div key={debate.id} className="text-sm">
              <a href="#" className="hover:underline">
                {debate.title}
              </a>
              <p className="text-xs text-gray-500">{debate.replies} respuestas</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-blue-500" />
          Próximos eventos
        </h3>
        <div className="space-y-2">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="text-sm">
              <p className="font-medium">{event.name}</p>
              <p className="text-xs text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

