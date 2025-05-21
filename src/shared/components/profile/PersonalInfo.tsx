import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card } from "@/components/ui/card"
import { t } from "@/shared/use/i18n"
import type { Collector, CollectorSettings } from "@/shared/app/types"

interface PersonalInfoProps {
  collector: Collector
  preferences: CollectorSettings
  isEditing: boolean
}

export function PersonalInfo({ collector, preferences, isEditing }: PersonalInfoProps) {
  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">{t("profile.name")}</label>
          <Input defaultValue={collector.name} disabled={!isEditing} />
        </div>
        <div>
          <label className="text-sm font-medium">{t("profile.bio")}</label>
          <Textarea defaultValue={collector.bio} disabled={!isEditing} />
        </div>
        <div>
          <label className="text-sm font-medium">{t("profile.location")}</label>
          <Input defaultValue={collector.location} disabled={!isEditing} />
        </div>
        <div>
          <label className="text-sm font-medium">{t("profile.socialNetworks")}</label>
          {/* Add social network inputs here */}
          <Input placeholder="Twitter" disabled={!isEditing} />
          <Input placeholder="Instagram" disabled={!isEditing} />
          <Input placeholder="Facebook" disabled={!isEditing} />
        </div>
      </div>
      <div>
        <h3 className="font-medium mb-2">{t("profile.visibilityPreferences")}</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span>{t("profile.publicProfile")}</span>
            <Switch checked={preferences.publicProfile} onCheckedChange={() => { }} disabled={!isEditing} />
          </div>
          <div className="flex items-center justify-between">
            <span>{t("profile.showLocation")}</span>
            <Switch checked={preferences.showLocation} onCheckedChange={() => { }} disabled={!isEditing} />
          </div>
        </div>
      </div>
    </Card>
  )
}

