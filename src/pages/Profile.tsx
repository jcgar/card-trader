"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Camera, Edit, MapPin, Trophy, Eye, Save } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import type { Collector, CollectorSettings } from "@/app/types"
import { useApi } from "@/use/api"
import { showToast } from "@/use/ui"
import { t } from "@/use/i18n"

export default function Profile() {
  const isMobile = useIsMobile()
  const [isEditing, setIsEditing] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState<CollectorSettings["preferences"]["theme"]>("light")

  const { data: collectors, loading: isLoadingCollectors } = useApi<Collector>("collectors", {
    page: 1,
    pageSize: 10,
    fullQuery: false,
  })
  const { data: preferences, loading: isLoadingPreferences } = useApi<CollectorSettings>("preferences", {
    page: 1,
    pageSize: 10,
    fullQuery: false,
  })

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isLoadingCollectors && !isLoadingPreferences) {
      setIsLoading(false)
    }
  }, [isLoadingCollectors, isLoadingPreferences])

  if (isLoading) {
    return <div>{t("common.loading")}</div>
  }

  if (!collectors || !preferences) {
    return <div>{t("common.errorLoadingData")}</div>
  }

  const profile = collectors[0]
  const profilePreferences = preferences[0]

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      showToast({
        title: t("profile.photoUpdated"),
        description: t("profile.photoUpdatedDescription"),
      })
    }
  }

  const handleSaveChanges = () => {
    setIsEditing(false)
    showToast({
      title: t("profile.changesSaved"),
      description: t("profile.changesSavedDescription"),
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-white pt-16">
      <div className="relative h-[300px]">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0">
          <img
            src={profile.coverImage || "/placeholder.svg"}
            alt={t("profile.coverImageAlt")}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>

        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative">
            <div className="relative w-32 h-32">
              <img
                src={profile.avatar || "/placeholder.svg"}
                alt={profile.name}
                className="w-full h-full rounded-full border-4 border-white shadow-lg"
              />
              {isEditing && (
                <label className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full cursor-pointer hover:bg-primary/90 transition-colors">
                  <Camera className="w-4 h-4" />
                  <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                </label>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-24">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">{profile.name}</h1>
          <p className="text-muted-foreground">@{profile.username}</p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Badge variant="secondary" className="text-yellow-600">
              <Trophy className="w-3 h-3 mr-1" />
              {t("profile.level", { level: profile.level })}
            </Badge>
            {profile.verified && (
              <Badge variant="outline" className="text-blue-600">
                {t("profile.verified")}
              </Badge>
            )}
          </div>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          {!isEditing ? (
            <>
              <Button onClick={() => setIsEditing(true)}>
                <Edit className="w-4 h-4 mr-2" />
                {t("profile.editProfile")}
              </Button>
              <Button variant="outline" onClick={() => setPreviewMode(!previewMode)}>
                <Eye className="w-4 h-4 mr-2" />
                {previewMode ? t("profile.normalView") : t("profile.publicView")}
              </Button>
            </>
          ) : (
            <>
              <Button onClick={handleSaveChanges} className="bg-green-600 hover:bg-green-700">
                <Save className="w-4 h-4 mr-2" />
                {t("profile.saveChanges")}
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                {t("common.cancel")}
              </Button>
            </>
          )}
        </div>

        <Tabs defaultValue="profile" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="profile">{t("profile.profile")}</TabsTrigger>
            <TabsTrigger value="collections">{t("profile.collections")}</TabsTrigger>
            <TabsTrigger value="achievements">{t("profile.achievements")}</TabsTrigger>
            <TabsTrigger value="settings">{t("profile.settings")}</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">{t("profile.personalInfo")}</h2>
              <div className="space-y-4">
                {isEditing ? (
                  <>
                    <div>
                      <label className="text-sm font-medium">{t("profile.name")}</label>
                      <Input defaultValue={profile.name} />
                    </div>
                    <div>
                      <label className="text-sm font-medium">{t("profile.bio")}</label>
                      <Input defaultValue={profile.bio} />
                    </div>
                    <div>
                      <label className="text-sm font-medium">{t("profile.location")}</label>
                      <Input defaultValue={profile.location} />
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-muted-foreground">{profile.bio}</p>
                    {profile.location && (
                      <p className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {profile.location}
                      </p>
                    )}
                  </>
                )}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">{t("profile.statistics")}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 rounded-lg bg-blue-50">
                  <div className="text-2xl font-bold text-blue-600">{profile.stats.totalCards}</div>
                  <div className="text-sm text-blue-600">{t("profile.totalCards")}</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-green-50">
                  <div className="text-2xl font-bold text-green-600">{profile.stats.completedCollections}</div>
                  <div className="text-sm text-green-600">{t("profile.completedCollections")}</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-purple-50">
                  <div className="text-2xl font-bold text-purple-600">{profile.stats.exchanges}</div>
                  <div className="text-sm text-purple-600">{t("profile.exchanges")}</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-yellow-50">
                  <div className="text-2xl font-bold text-yellow-600">{profile.stats.reputation}</div>
                  <div className="text-sm text-yellow-600">{t("profile.reputation")}</div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="collections">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">{t("profile.myCollections")}</h2>
              {/* Content for collections */}
            </Card>
          </TabsContent>

          <TabsContent value="achievements">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">{t("profile.achievementsAndMedals")}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {profile.achievements.map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-4 rounded-lg border bg-gradient-to-br from-yellow-50 to-orange-50"
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">{achievement.icon}</div>
                      <div>
                        <h3 className="font-bold">{achievement.name}</h3>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        <div className="mt-2">
                          <Badge
                            variant="outline"
                            className={cn(
                              achievement.rarity === "legendary" && "text-yellow-600 border-yellow-200",
                              achievement.rarity === "epic" && "text-purple-600 border-purple-200",
                              achievement.rarity === "rare" && "text-blue-600 border-blue-200",
                              achievement.rarity === "common" && "text-gray-600 border-gray-200",
                            )}
                          >
                            {t(`profile.rarity.${achievement.rarity}`)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">{t("profile.preferences")}</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{t("profile.theme")}</h3>
                      <p className="text-sm text-muted-foreground">{t("profile.themeDescription")}</p>
                    </div>
                    <select
                      value={selectedTheme}
                      onChange={(e) => setSelectedTheme(e.target.value as CollectorSettings["preferences"]["theme"])}
                      className="rounded-md border p-2"
                    >
                      <option value="light">{t("profile.lightTheme")}</option>
                      <option value="dark">{t("profile.darkTheme")}</option>
                      <option value="retro">{t("profile.retroTheme")}</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{t("profile.albumMode")}</h3>
                      <p className="text-sm text-muted-foreground">{t("profile.albumModeDescription")}</p>
                    </div>
                    <Switch checked={profilePreferences.preferences.albumMode} onCheckedChange={() => { }} />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">{t("profile.notifications")}</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{t("profile.emailNotifications")}</h3>
                      <p className="text-sm text-muted-foreground">{t("profile.emailNotificationsDescription")}</p>
                    </div>
                    <Switch
                      checked={profilePreferences.preferences.notificationSettings.email}
                      onCheckedChange={() => { }}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{t("profile.doNotDisturb")}</h3>
                      <p className="text-sm text-muted-foreground">{t("profile.doNotDisturbDescription")}</p>
                    </div>
                    <Switch
                      checked={profilePreferences.preferences.notificationSettings.doNotDisturb.enabled}
                      onCheckedChange={() => { }}
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">{t("profile.privacy")}</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{t("profile.publicProfile")}</h3>
                      <p className="text-sm text-muted-foreground">{t("profile.publicProfileDescription")}</p>
                    </div>
                    <Switch checked={true} onCheckedChange={() => { }} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{t("profile.showLocation")}</h3>
                      <p className="text-sm text-muted-foreground">{t("profile.showLocationDescription")}</p>
                    </div>
                    <Switch checked={true} onCheckedChange={() => { }} />
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

