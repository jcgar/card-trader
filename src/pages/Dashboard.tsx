
import { NavigationBar } from "@/components/NavigationBar";
import { RealtimeNotifications } from "@/components/dashboard/RealtimeNotifications";
import { ProgressPanel } from "@/components/dashboard/ProgressPanel";
import { MyCollections } from "@/components/dashboard/MyCollections";
import { ThemeSelector } from "@/components/dashboard/ThemeSelector";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { UserStats } from "@/components/dashboard/UserStats";
import { MyExchanges } from "@/components/dashboard/MyExchanges";
import { RecommendedUsers } from "@/components/dashboard/RecommendedUsers";
import { RecentExchanges } from "@/components/dashboard/RecentExchanges";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-white pt-16">
      <NavigationBar />
      <RealtimeNotifications />
      <QuickActions />
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <ProgressPanel />
          <MyCollections />
          <MyExchanges />
        </div>
        <div className="space-y-8">
          <ThemeSelector />
          <UserStats />
          <RecommendedUsers />
          <RecentExchanges />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
