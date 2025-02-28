import { AppLayout } from "@/components/layout/AppLayout"
import { UserSpotlight } from "@/components/community/UserSpotlight"
import { TopCollectors } from "@/components/community/TopCollectors"
import { ChallengesAndAchievements } from "@/components/community/ChallengesAndAchievements"
import { GamificationRewards } from "@/components/community/GamificationRewards"
import { ActivityFeed } from "@/components/community/ActivityFeed"
import type { Activity, Collector, Reward } from "@/app/types"
import { useApi } from "@/use/api"
import { t } from "@/use/i18n"

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

