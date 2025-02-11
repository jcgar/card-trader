
import { NavigationBar } from "@/components/NavigationBar";
import { TopCollectors } from "@/components/community/TopCollectors";
import { LiveActivity } from "@/components/community/LiveActivity";
import { ExchangeWall } from "@/components/community/ExchangeWall";

const Community = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-white pt-16">
      <NavigationBar />
      <TopCollectors />
      <LiveActivity />
      <ExchangeWall />
    </div>
  );
};

export default Community;
