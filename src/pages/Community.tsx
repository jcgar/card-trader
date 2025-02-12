
import { NavigationBar } from "@/components/NavigationBar";
import { ActionsMenu } from "@/components/community/ActionsMenu";
import { UserSpotlight } from "@/components/community/UserSpotlight";
import { TopCollectors } from "@/components/community/TopCollectors";
import { ChallengesAndAchievements } from "@/components/community/ChallengesAndAchievements";
import { GamificationRewards } from "@/components/community/GamificationRewards";
import { ActivityFeed } from "@/components/community/ActivityFeed";
import { RealtimeNotifications } from "@/components/dashboard/RealtimeNotifications";

const Community = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-white pt-16">
      <NavigationBar />
      <RealtimeNotifications />
      <ActionsMenu />
      <UserSpotlight />
      <TopCollectors />
      <ChallengesAndAchievements />
      <GamificationRewards />
      <ActivityFeed />
    </div>
  );
};

export default Community;
