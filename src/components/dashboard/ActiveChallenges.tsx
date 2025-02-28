import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Clock, Flag, Trophy } from 'lucide-react'

interface Challenge {
  id: string
  name: string
  type: "personal" | "global" | "community"
  progress: number
  total: number
  reward: string
  deadline: string
}

const challenges: Challenge[] = [
  {
    id: "1",
    name: "Completar Colección Verano 2023",
    type: "personal",
    progress: 7,
    total: 10,
    reward: "500 puntos + Insignia Exclusiva",
    deadline: "2023-08-31",
  },
  {
    id: "2",
    name: "Reto Comunitario: 1 Millón de Intercambios",
    type: "community",
    progress: 750000,
    total: 1000000,
    reward: "Sobre Especial para Todos",
    deadline: "2023-09-15",
  },
]

export function ActiveChallenges() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Retos Activos</h2>
      {challenges.map((challenge) => (
        <Card key={challenge.id}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{challenge.name}</span>
              <span className="text-sm font-normal text-muted-foreground">
                {challenge.type === "personal" && "Personal"}
                {challenge.type === "global" && "Global"}
                {challenge.type === "community" && "Comunitario"}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Progreso</span>
              <span className="text-sm font-medium">
                {challenge.progress}/{challenge.total}
              </span>
            </div>
            <Progress value={(challenge.progress / challenge.total) * 100} className="mb-4" />
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Trophy className="w-4 h-4" />
                <span>{challenge.reward}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>Hasta: {challenge.deadline}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Ver Detalle</Button>
            {challenge.type === "personal" && <Button variant="ghost">Abandonar Reto</Button>}
            <Button>
              {challenge.type === "personal" ? "Progresar" : "Contribuir"}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
