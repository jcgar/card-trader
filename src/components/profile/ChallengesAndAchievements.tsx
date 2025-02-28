import { Switch } from "@/components/ui/switch"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { t } from "@/use/i18n"
import type { CollectorSettings } from "@/app/types"

interface ChallengesAndAchievementsProps {
  preferences: CollectorSettings
  isEditing: boolean
}

export function ChallengesAndAchievements({ preferences, isEditing }: ChallengesAndAchievementsProps) {
  // Mock data for demonstration
  const completedChallenges = [
    { id: 1, name: "First Collection", description: "Complete your first collection", date: "2023-05-15" },
    { id: 2, name: "Trading Pro", description: "Complete 100 successful trades", date: "2023-06-22" },
    { id: 3, name: "Rare Find", description: "Acquire a legendary card", date: "2023-07-10" },
  ]

  const ongoingChallenges = [
    { id: 4, name: "Collector's Milestone", description: "Collect 1000 unique cards", progress: 75 },
    { id: 5, name: "Community Leader", description: "Help 50 new collectors", progress: 40 },
  ]

  return (
    <Card className="p-6 space-y-6">
      <div>
        <h3 className="font-medium mb-2">{t("profile.challengeNotificationPreferences")}</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span>{t("profile.newChallengeNotifications")}</span>
            <Switch checked={preferences.newChallengeNotifications} onCheckedChange={() => {}} disabled={!isEditing} />
          </div>
        </div>
      </div>
      <div>
        <h3 className="font-medium mb-2">{t("profile.achievementVisibility")}</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span>{t("profile.showAchievements")}</span>
            <Switch checked={preferences.showAchievements} onCheckedChange={() => {}} disabled={!isEditing} />
          </div>
        </div>
      </div>
      <div>
        <h3 className="font-medium mb-2">{t("profile.completedChallenges")}</h3>
        <div className="space-y-4">
          {completedChallenges.map((challenge) => (
            <div key={challenge.id} className="border-b pb-2">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">{challenge.name}</h4>
                <Badge variant="secondary">{t("profile.completed")}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{challenge.description}</p>
              <p className="text-xs text-muted-foreground mt-1">{t("profile.completedOn", { date: challenge.date })}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-medium mb-2">{t("profile.ongoingChallenges")}</h3>
        <div className="space-y-4">
          {ongoingChallenges.map((challenge) => (
            <div key={challenge.id} className="border-b pb-2">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">{challenge.name}</h4>
                <Badge variant="outline">{t("profile.inProgress")}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{challenge.description}</p>
              <div className="mt-2">
                <Progress value={challenge.progress} className="w-full" />
                <p className="text-xs text-muted-foreground mt-1">
                  {challenge.progress}% {t("profile.complete")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}

