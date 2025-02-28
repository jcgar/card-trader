"use client"

import { useState } from "react"
import { Edit, Trophy, Save, Share2, Medal, Crown, Bell, Gift, Lock, UserX } from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import type { Collector, CollectorSettings } from "@/app/types"
import { useApi } from "@/use/api"
import { showToast } from "@/use/ui"
import { t } from "@/use/i18n"
import { ChallengesAndAchievements } from "@/components/community/ChallengesAndAchievements"
import { CollectionSettings } from "@/components/profile/CollectionSettings"
import { CommunityConnections } from "@/components/profile/CommunityConnections"
import { PersonalInfo } from "@/components/profile/PersonalInfo"
import { ProfileAvatar } from "@/components/profile/ProfileAvatar"

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState<CollectorSettings["preferences"]["theme"]>("light")

  const { data: collectors } = useApi<Collector>("collectors", { id: "1" })
  const { data: allPreferences } = useApi<CollectorSettings>("preferences", { id: "1" })

  const collector = collectors[0]
  const preferences = allPreferences[0]

  if (!collector || !preferences) {
    return <div>{t("common.loading")}</div>
  }

  const onAvatarChange = (success: boolean) => {
    if (success) {
      // TODO: Implement avatar upload logic
      showToast({
        title: t("profile.photoUpdated"),
        description: t("profile.photoUpdatedDescription"),
      })
    } else {
      showToast({
        title: t("profile.photoNotUpdated"),
        description: t("profile.photoUpdateError"),
      })
    }
  }

  const handleSaveChanges = () => {
    setIsEditing(false)
    // TODO: Implement save changes logic
    showToast({
      title: t("profile.changesSaved"),
      description: t("profile.changesSavedDescription"),
    })
  }

  const tabs = [
    {
      value: "personal",
      label: t("profile.personalData"),
      content: <PersonalInfo collector={collector} preferences={preferences} isEditing={isEditing} />,
    },
    {
      value: "collections",
      label: t("profile.collectionsSettings"),
      content: <CollectionSettings preferences={preferences} isEditing={isEditing} />,
    },
    {
      value: "community",
      label: t("profile.connectionsAndCommunity"),
      content: <CommunityConnections />,
    },
    {
      value: "challenges",
      label: t("profile.challengesAndAchievements"),
      content: <ChallengesAndAchievements preferences={preferences} isEditing={isEditing} />,
    },
  ]

  const sidebarContent = (
    <div className="space-y-4">
      <ProfileAvatar collector={collector} isEditing={isEditing} onAvatarChange={onAvatarChange} />
      <SettingsButton icon={Edit} variant="default" onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? t("profile.finishEditing") : t("profile.editProfile")}
      </SettingsButton>
      <SettingsButton icon={Share2}>{t("profile.shareProfile")}</SettingsButton>
      <SettingsButton icon={Medal}>{t("profile.viewAchievements")}</SettingsButton>
      <SettingsButton icon={Crown}>{t("profile.viewPersonalRanking")}</SettingsButton>
      <SettingsButton icon={Bell}>{t("profile.pendingChallenges")}</SettingsButton>
      <SettingsButton icon={Gift}>{t("profile.redeemRewards")}</SettingsButton>
      <SettingsButton icon={Lock}>{t("profile.privacySettings")}</SettingsButton>
      <SettingsButton icon={UserX}>{t("profile.manageBlocks")}</SettingsButton>
    </div>
  )

  return (
    <AppLayout tabs={tabs}
      sidebarContent={sidebarContent}
      sidebarVariant="raw"
      bgVariant="darkwood"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">{collector.name}</h1>
            <p className="text-muted-foreground">@{collector.username}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-yellow-600">
              <Trophy className="w-3 h-3 mr-1" />
              {t("profile.level", { level: collector.level })}
            </Badge>
            {collector.verified && (
              <Badge variant="outline" className="text-blue-600">
                {t("profile.verified")}
              </Badge>
            )}
          </div>
        </div>

        {isEditing && (
          <div className="mb-8 flex gap-4">
            <Button onClick={handleSaveChanges} className="bg-green-600 hover:bg-green-700">
              <Save className="w-4 h-4 mr-2" />
              {t("profile.saveChanges")}
            </Button>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              {t("common.cancel")}
            </Button>
          </div>
        )}

        <Card className="container mx-auto px-4 py-6 mb-8">
          <h2 className="text-xl font-bold mb-4">{t("profile.statistics")}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-blue-50">
              <div className="text-2xl font-bold text-blue-600">{collector.stats.totalCards}</div>
              <div className="text-sm text-blue-600">{t("profile.totalCards")}</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-green-50">
              <div className="text-2xl font-bold text-green-600">{collector.stats.completedCollections}</div>
              <div className="text-sm text-green-600">{t("profile.completedCollections")}</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-purple-50">
              <div className="text-2xl font-bold text-purple-600">{collector.stats.exchanges}</div>
              <div className="text-sm text-purple-600">{t("profile.exchanges")}</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-yellow-50">
              <div className="text-2xl font-bold text-yellow-600">{collector.stats.reputation}</div>
              <div className="text-sm text-yellow-600">{t("profile.reputation")}</div>
            </div>
          </div>
        </Card>
      </div>
    </AppLayout>
  )
}

const SettingsButton = ({ children, onClick = () => { }, icon: Icon, variant: variantProp = "outline" }) => (
  <Button variant={variantProp} className="w-full" onClick={onClick}>
    <Icon className="w-4 h-4 mr-2" />
    {children}
  </Button>
)

