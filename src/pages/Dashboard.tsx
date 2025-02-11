
import { NavigationBar } from "@/components/NavigationBar";
import { RealtimeNotifications } from "@/components/dashboard/RealtimeNotifications";
import { ProgressPanel } from "@/components/dashboard/ProgressPanel";
import { MyCollections } from "@/components/dashboard/MyCollections";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-white pt-16">
      <NavigationBar />
      <RealtimeNotifications />
      <ProgressPanel />
      <MyCollections />
    </div>
  );
};

export default Dashboard;
