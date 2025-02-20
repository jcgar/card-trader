
import { NavigationBar } from "@/components/NavigationBar";
import { ActionsMenu } from "@/components/community/ActionsMenu";
import { UserSpotlight } from "@/components/community/UserSpotlight";
import { TopCollectors } from "@/components/community/TopCollectors";
import { ChallengesAndAchievements } from "@/components/community/ChallengesAndAchievements";
import { GamificationRewards } from "@/components/community/GamificationRewards";
import { ActivityFeed } from "@/components/community/ActivityFeed";
import { RealtimeNotifications } from "@/components/dashboard/RealtimeNotifications";
import { Activity, Collector } from "@/app/types";
import { useApi } from "@/use/api";
import { activities } from "@/use/api/activities";

const Community = () => {
  const { data: featuredCollectors } = useApi<Collector>('collectors', { page: 1, pageSize: 3, fullQuery: false })
  const { data: topCollectors } = useApi<Collector>('collectors', { page: 1, pageSize: 6, fullQuery: false })
  const { data: activities } = useApi<Activity>('activities', { page: 1, pageSize: 10, fullQuery: false })

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-white pt-16">
      <NavigationBar />
      <RealtimeNotifications />
      <ActionsMenu />
      <UserSpotlight collectors={featuredCollectors} />
      <TopCollectors collectors={topCollectors} />
      <ChallengesAndAchievements />
      <GamificationRewards />
      <ActivityFeed activities={activities} />
    </div>
  );
};

export default Community;
