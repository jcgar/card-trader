"use client"
import { useParams, Link } from "react-router-dom"
import { AppLayout } from "@/components/layout/AppLayout"
import { CollectorHeader } from "@/components/collector/CollectorHeader"
import { CollectorStats } from "@/components/collector/CollectorStats"
import { CollectorAchievements } from "@/components/collector/CollectorAchievements"
import { CollectorCollections } from "@/components/collector/CollectorCollections"
import { CollectorActivity } from "@/components/collector/CollectorActivity"
import { CollectorSocial } from "@/components/collector/CollectorSocial"
import { CollectorTrades } from "@/components/collector/CollectorTrades"
import type { Collection, Collector } from "@/app/types"
import { useApi } from "@/use/api"
import { Button } from "@/components/ui/button"
import { Crown } from "lucide-react"
import { generateCollectorProPath } from "@/use/routes"
import { t } from "@/use/i18n"

const CollectorProfile = () => {
  const { id } = useParams()

  const { data: collections } = useApi<Collection>("collections", { page: 1, pageSize: 10, fullQuery: false })
  const { data: collectors, loading } = useApi<Collector>("collectors", { page: 1, pageSize: 10, fullQuery: false })
  const profile = collectors[0]

  if (loading || !profile) {
    return <div>{t("common.loading")}</div>
  }

  const tabs = [
    {
      value: "collections",
      label: t("collector.collections"),
      content: <CollectorCollections collections={collections} />,
    },
    {
      value: "activity",
      label: t("collector.activity"),
      content: <CollectorActivity profile={profile} />,
    },
    {
      value: "trades",
      label: t("collector.trades"),
      content: <CollectorTrades profile={profile} />,
    },
  ]

  const sidebarContent = (
    <>
      <CollectorStats profile={profile} />
      <CollectorAchievements profile={profile} />
      <CollectorSocial profile={profile} />
    </>
  )

  return (
    <AppLayout tabs={tabs} sidebarContent={sidebarContent}>
      <CollectorHeader profile={profile} />
      <div className="text-center mb-8">
        <Link to={generateCollectorProPath(profile.id)}>
          <Button
            variant="outline"
            className="bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100 hover:text-yellow-800"
          >
            <Crown className="w-5 h-5 mr-2 text-yellow-500" />
            {t("collector.viewInHallOfFame")}
          </Button>
        </Link>
      </div>
    </AppLayout>
  )
}

export default CollectorProfile

