import { AppLayout } from "@/shared/components/layout/AppLayout"
import { UserSpotlight } from "@/shared/components/community/UserSpotlight"
import { TopCollectors } from "@/shared/components/community/TopCollectors"
import { ChallengesAndAchievements } from "@/shared/components/community/ChallengesAndAchievements"
import { GamificationRewards } from "@/shared/components/community/GamificationRewards"
import { ActivityFeed } from "@/shared/components/community/ActivityFeed"
import type { Activity, Collector, Reward } from "@/shared/app/types"
import { useApi } from "@/shared/use/api"
import { t } from "@/shared/use/i18n"

const Community = () => {
  const { data: featuredCollectors } = useApi<Collector>("collectors", { page: 1, pageSize: 3, fullQuery: false })
  const { data: topCollectors } = useApi<Collector>("collectors", { page: 1, pageSize: 6, fullQuery: false })
  const { data: activities } = useApi<Activity>("activities", { page: 1, pageSize: 10, fullQuery: false })
  const { data: rewards } = useApi<Reward>("rewards", { page: 1, pageSize: 10, fullQuery: false })

  const tabs = [
    {
      value: "spotlight",
      label: t("community.spotlight"),
      content: <UserSpotlight collectors={featuredCollectors} />,
    },
    {
      value: "topCollectors",
      label: t("community.topCollectors"),
      content: <TopCollectors collectors={topCollectors} />,
    },
    {
      value: "challenges",
      label: t("community.challenges"),
      content: <ChallengesAndAchievements />,
    },
    {
      value: "rewards",
      label: t("community.rewards"),
      content: <GamificationRewards rewards={rewards} />,
    },
  ]

  const sidebarContent = <ActivityFeed activities={activities} />

  return <AppLayout tabs={tabs} sidebarContent={sidebarContent} />
}

export default Community

