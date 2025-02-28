import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Trophy, TrendingUp, Award } from 'lucide-react'

interface Ranking {
  currentPosition: number
  nextLevelProgress: number
  mainCategory: string
  bestPosition: number
}

const ranking: Ranking = {
  currentPosition: 156,
  nextLevelProgress: 75,
  mainCategory: "Deportes",
  bestPosition: 89,
}

export function PersonalRanking() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-400" />
          Tu Ranking Personal
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold">#{ranking.currentPosition}</span>
          <span className="text-sm text-muted-foreground">Posición actual</span>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Progreso hacia el siguiente nivel</span>
            <span>{ranking.nextLevelProgress}%</span>
          </div>
          <Progress value={ranking.nextLevelProgress} />
        </div>
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4" />
          <span>Categoría principal: {ranking.mainCategory}</span>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          <span>Mejor posición: #{ranking.bestPosition}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Ver Ranking Completo</Button>
        <Button>Mejorar Posición</Button>
      </CardFooter>
    </Card>
  )
}
