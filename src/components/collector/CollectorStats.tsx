import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Trophy, Star, Repeat, Book } from "lucide-react"

interface CollectorStatsProps {
  profile: CollectorProfile
}

export const CollectorStats = ({ profile }: CollectorStatsProps) => {
  const completionRate = (profile.stats.completedCards / profile.stats.totalCards) * 100
  const collectionRate = (profile.stats.completedCollections / profile.stats.collections) * 100

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">Estadísticas</h2>
      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <span className="flex items-center gap-2">
              <Book className="w-4 h-4 text-blue-500" />
              Cromos completados
            </span>
            <span className="font-medium">
              {profile.stats.completedCards}/{profile.stats.totalCards}
            </span>
          </div>
          <Progress value={completionRate} className="h-2" />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-500" />
              Colecciones completadas
            </span>
            <span className="font-medium">
              {profile.stats.completedCollections}/{profile.stats.collections}
            </span>
          </div>
          <Progress value={collectionRate} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <Repeat className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">{profile.stats.trades}</div>
            <div className="text-sm text-green-600">Intercambios</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <Star className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-yellow-600">{profile.stats.successRate}%</div>
            <div className="text-sm text-yellow-600">Éxito en intercambios</div>
          </div>
        </div>
      </div>
    </Card>
  )
}

