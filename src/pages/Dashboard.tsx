"use client"

import { NavigationBar } from "@/components/NavigationBar"
import { RealtimeNotifications } from "@/components/dashboard/RealtimeNotifications"
import { ProgressPanel } from "@/components/dashboard/ProgressPanel"
import { MyCollections } from "@/components/dashboard/MyCollections"
import { QuickActions } from "@/components/dashboard/QuickActions"
import { UserStats } from "@/components/dashboard/UserStats"
import { MyExchanges } from "@/components/dashboard/MyExchanges"
import { RecommendedUsers } from "@/components/dashboard/RecommendedUsers"
import { RecentExchanges } from "@/components/dashboard/RecentExchanges"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs"
import CollectionsList from "@/components/dashboard/CollectionsList"
import { useApi } from "@/use/api"
import type { Collection, Exchange } from "@/app/types"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import CollectionDetail from "./CollectionDetail"
import { ExchangeDetail } from "@/components/dashboard/ExchangeDetail"
import ExchangesList from "@/components/dashboard/ExchangesList"
import Profile from "./Profile"
import { t } from "@/use/i18n"

const Dashboard = () => {
  const navigate = useNavigate()
  const { collectionId, exchangeId } = useParams()
  const location = useLocation()

  const tabMapping = [
    { path: "colecciones", tab: "collections" },
    { path: "cambios", tab: "exchanges" },
    { path: "perfil", tab: "settings" },
  ]

  const activeTab = tabMapping.find((item) => location.pathname.includes(item.path))?.tab || "dashboard"

  const { data: collections } = useApi<Collection>("collections", { page: 1, pageSize: 10, fullQuery: false })
  const { data: exchanges } = useApi<Exchange>("exchanges", { page: 1, pageSize: 10, fullQuery: false })

  const handleTabChange = (tab: string) => {
    const selectedTab = tabMapping.find((item) => item.tab === tab)
    if (selectedTab) {
      navigate(`/dashboard/${selectedTab.path}`)
    } else navigate("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-white pt-16">
      <NavigationBar />
      <RealtimeNotifications />
      <QuickActions />
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">{t("dashboard.home")}</TabsTrigger>
          <TabsTrigger value="collections">{t("dashboard.collections")}</TabsTrigger>
          <TabsTrigger value="exchanges">{t("dashboard.exchanges")}</TabsTrigger>
          <TabsTrigger value="settings">{t("dashboard.settings")}</TabsTrigger>
        </TabsList>

        <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <TabsContent value="dashboard">
              <MyCollections collections={collections} />
              <MyExchanges exchanges={exchanges} />
            </TabsContent>

            <TabsContent value="collections">
              {collectionId ? (
                <CollectionDetail collection={collections[collectionId]} />
              ) : (
                <CollectionsList collections={collections} />
              )}
            </TabsContent>

            <TabsContent value="exchanges">
              {exchanges[exchangeId] ? (
                <ExchangeDetail exchange={exchanges[exchangeId]} onStatusChange={(status) => console.log({ status })} />
              ) : (
                <ExchangesList exchanges={exchanges} />
              )}
            </TabsContent>

            <TabsContent value="settings">
              <Profile />
            </TabsContent>
          </div>
          <div className="space-y-8">
            <UserStats />
            <ProgressPanel />
            <RecommendedUsers />
            <RecentExchanges />
          </div>
        </div>
      </Tabs>
    </div>
  )
}

export default Dashboard

