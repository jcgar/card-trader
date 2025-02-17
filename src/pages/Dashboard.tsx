
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import CollectionsList from "@/components/dashboard/CollectionsList";
import { useApi } from "@/use/api";
import { Collection, Exchange } from "@/app/types";

const Dashboard = () => {

  const { data: collections } = useApi<Collection>('collections', { page: 1, pageSize: 10, fullQuery: false })
  const { data: exchanges } = useApi<Exchange>('exchanges', { page: 1, pageSize: 10, fullQuery: false })

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-white pt-16">
      <NavigationBar />
      <RealtimeNotifications />
      <QuickActions />
      <Tabs defaultValue="dashboard">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Inicio</TabsTrigger>
          <TabsTrigger value="collections">Colecciones</TabsTrigger>
          <TabsTrigger value="stats">Cambios</TabsTrigger>
          <TabsTrigger value="settings">Configuración</TabsTrigger>
        </TabsList>



        <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">

            <TabsContent value="dashboard">
              <MyCollections collections={collections} />
              <MyExchanges exchanges={exchanges} />
            </TabsContent>

            <TabsContent value="collections">
              <CollectionsList collections={collections} />
            </TabsContent>


          </div>
          <div className="space-y-8">
            <ThemeSelector />
            <UserStats />
            <ProgressPanel />
            <RecommendedUsers />
            <RecentExchanges />
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default Dashboard;
