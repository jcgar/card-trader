import { Card } from "../../../components/ui/card"
import { Trophy, Star, MessageSquare, Crown, type LucideIcon, Sticker } from "lucide-react"
import { useState } from "react"
import { Link } from "@/shared/use/navigate"
import { generateCollectorPath } from "@/shared/use/routes"
import type { Activity } from "@/shared/app/types"

interface ActivityDisplay {
  icon: LucideIcon
  color: string
}

const defaultDisplay = {
  icon: Sticker,
  color: "gray-600",
}
const displays = {
  achievement: {
    icon: Trophy,
    color: "from-yellow-500 to-amber-600",
  },
  exchange: {
    icon: Star,
    color: "from-blue-500 to-indigo-600",
  },
  social: {
    icon: Crown,
    color: "from-purple-500 to-pink-600",
  },
}

export const ActivityFeed = ({ activities }: { activities: Activity[] }) => {
  const [highlightedActivity, setHighlightedActivity] = useState<number | null>(null)

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-playfair font-bold mb-4 text-green-800">Actividad de la Comunidad</h2>
          <p className="text-green-600">Mantente al día con lo que sucede en la comunidad</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {activities.map((activity) => {
            const display: ActivityDisplay = displays[activity.type] || defaultDisplay
            return (
              <Card key={activity.id}>
                <Link to={generateCollectorPath(activity.user)}>
                  <div className="p-4 flex items-center gap-4">
                    <div className="relative">
                      <img src={activity.avatar} alt={activity.user} className="w-12 h-12 rounded-full" />
                      <div
                        className={`
                      absolute -bottom-1 -right-1 p-1 rounded-full bg-white
                      ${highlightedActivity === activity.id ? "animate-bounce" : ""}
                    `}
                      >
                        <div className={`w-4 h-4 ${display.color}`} />
                        <display.icon />
                      </div>
                    </div>

                    <div className="flex-1">
                      <p className="text-gray-800">
                        <span className="font-medium">{activity.user}</span> {activity.content}
                      </p>
                      <p className="text-sm text-gray-500">{activity.timestamp}</p>
                    </div>

                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                      <MessageSquare className="w-5 h-5" />
                    </button>
                  </div>
                </Link>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

