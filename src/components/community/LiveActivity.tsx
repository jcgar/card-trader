"use client"

import { Activity } from "@/app/types"
import { Card } from "@/components/ui/card"
import { Activity as ActivityIcon, Book, Command, RefreshCcw, Sparkles, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"

// const initialActivities = [
//   {
//     id: 1,
//     type: "achievement",
//     user: "John Doe",
//     action: "earned the Master Collector badge",
//     time: "2 minutes ago",
//     icon: Award,
//   },
//   {
//     id: 2,
//     type: "trade",
//     user: "Emma Wilson",
//     action: "completed a trade with Sarah Chen",
//     time: "5 minutes ago",
//     icon: RefreshCcw,
//   },
//   {
//     id: 3,
//     type: "newUser",
//     user: "Michael Brown",
//     action: "joined the community",
//     time: "10 minutes ago",
//     icon: Users,
//   },
// ];
/*

  id: number
  type: ActivityType
  user: string
  avatar: string
  content: string
  timestamp: string
  likes: number

  */

const activityIcons = {
  collection: Book,
  exchange: TrendingUp,
  achievement: Sparkles,
  social: Command,
}

export const LiveActivity = ({ activities }: { activities: Activity[] }) => {
  const [liveActivities, setActivities] = useState<Activity[]>([])


  useEffect(() => {
    setActivities(activities)
    const interval = setInterval(() => {
      const newActivity: Activity = {
        id: Date.now(),
        type: "exchange",
        user: "Random User" + Math.random().toFixed(2),
        content: "made a new trade",
        timestamp: "just now",
        avatar: "",
        likes: 0
      }
      setActivities(prev => [newActivity, ...prev.slice(0, -1)])
    }, 5000)

    return () => clearInterval(interval)
  }, [activities])


  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-playfair font-bold text-green-800">Live Activity</h2>
          <ActivityIcon className="w-6 h-6 text-green-600 animate-pulse" />
        </div>
        <div className="grid gap-4 max-w-3xl mx-auto">
          {liveActivities.map((activity) => {
            const Icon = activityIcons[activity.type]
            return (
              <Card
                key={activity.id}
                className="p-4 flex items-center gap-4 animate-fade-in hover:shadow-md transition-shadow"
              >
                <div className="bg-green-100 p-2 rounded-full">
                  {Icon && <Icon className="w-5 h-5 text-green-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-gray-800">
                    <span className="font-medium">{activity.user}</span> {activity.content}
                  </p>
                  <p className="text-sm text-gray-500">{activity.timestamp}</p>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

