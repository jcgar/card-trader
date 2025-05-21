import { Switch } from "@/components/ui/switch"
import { Card } from "@/components/ui/card"
import { t } from "@/shared/use/i18n"
import type { CollectorSettings } from "@/shared/app/types"

interface CollectionSettingsProps {
  preferences: CollectorSettings
  isEditing: boolean
}

export function CollectionSettings({ preferences, isEditing }: CollectionSettingsProps) {
  return (
    <Card className="p-6 space-y-6">
      <div>
        <h3 className="font-medium mb-2">{t("profile.notificationPreferences")}</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span>{t("profile.newCollectionNotifications")}</span>
            <Switch checked={preferences.newCollectionNotifications} onCheckedChange={() => { }} disabled={!isEditing} />
          </div>
          <div className="flex items-center justify-between">
            <span>{t("profile.completionNotifications")}</span>
            <Switch checked={preferences.completionNotifications} onCheckedChange={() => { }} disabled={!isEditing} />
          </div>
        </div>
      </div>
      <div>
        <h3 className="font-medium mb-2">{t("profile.autoFollowSettings")}</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span>{t("profile.autoFollowNewCollections")}</span>
            <Switch checked={preferences.autoFollowNewCollections} onCheckedChange={() => { }} disabled={!isEditing} />
          </div>
        </div>
      </div>
      <div>
        <h3 className="font-medium mb-2">{t("profile.favoriteCategories")}</h3>
        {/* Add favorite categories selection here */}
        {/* This could be a multi-select component or a series of checkboxes */}
        <div className="grid grid-cols-2 gap-2">
          {["Sports", "Movies", "Music", "Art"].map((category) => (
            <label key={category} className="flex items-center space-x-2">
              <input type="checkbox" disabled={!isEditing} />
              <span>{category}</span>
            </label>
          ))}
        </div>
      </div>
    </Card>
  )
}

