import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, Share2 } from 'lucide-react'

interface Achievement {
  id: string
  icon: string
  name: string
  date: string
  description: string
}

const achievements: Achievement[] = [
  {
    id: "1",
    icon: "🏆",
    name: "Coleccionista Experto",
    date: "2023-07-15",
    description: "Completaste tu primera colección al 100%",
  },
  {
    id: "2",
    icon: "🌟",
    name: "Intercambiador Estrella",
    date: "2023-07-20",
    description: "Realizaste 50 intercambios exitosos",
  },
]

export function LatestAchievements() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Últimos Logros</h2>
      {achievements.map((achievement) => (
        <Card key={achievement.id}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">{achievement.icon}</span>
              <span>{achievement.name}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">
              Desbloqueado el {achievement.date}
            </p>
            <p>{achievement.description}</p>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Compartir
            </Button>
          </CardFooter>
        </Card>
      ))}
      <div className="flex justify-center">
        <Button>
          <Award className="w-4 h-4 mr-2" />
          Ver Todos Mis Logros
        </Button>
      </div>
    </div>
  )
}
