import { Card } from "@/components/ui/card"
import { Activity } from "lucide-react"
import type { Collector } from "@/shared/app/types"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"

interface CollectorActivityProps {
  profile: Collector
}

export const CollectorActivity = ({ profile }: CollectorActivityProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Activity className="w-5 h-5 text-blue-500" />
        <h2 className="text-xl font-semibold">Actividad Reciente</h2>
      </div>

      <div className="space-y-4">
        {profile.recentActivity.map((activity) => (
          <div key={activity.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <p className="text-gray-800">{activity.content}</p>
              <p className="text-sm text-gray-500">
                {isNaN(Number(activity.timestamp)) ? activity.timestamp : formatDistanceToNow(new Date(activity.timestamp), {
                  addSuffix: true,
                  locale: es,
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

