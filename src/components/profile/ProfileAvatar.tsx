"use client"

import type React from "react"

import { useState } from "react"
import { Camera } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import type { Collector } from "@/app/types"
import { t } from "@/use/i18n"

interface ProfileAvatarProps {
  collector: Collector
  isEditing: boolean
  onAvatarChange: (success: boolean) => void
}

export const ProfileAvatar = ({ collector, isEditing, onAvatarChange }: ProfileAvatarProps) => {
  const [avatarSrc, setAvatarSrc] = useState(collector.avatar)
  const [coverSrc, setCoverSrc] = useState(collector.coverImage)

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setAvatarSrc(e.target?.result as string)
        onAvatarChange(true)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCoverChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setCoverSrc(e.target?.result as string)
        onAvatarChange(true)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="relative">
      <div className="h-32 overflow-hidden rounded-t-lg">
        <img
          src={coverSrc || "/placeholder.svg"}
          alt={t("profile.coverImage")}
          className="w-full h-full object-cover"
        />
        {isEditing && (
          <label htmlFor="cover-upload" className="absolute top-2 right-2 cursor-pointer">
            <Button variant="secondary" size="icon">
              <Camera className="h-4 w-4" />
            </Button>
            <input id="cover-upload" type="file" accept="image/*" className="hidden" onChange={handleCoverChange} />
          </label>
        )}
      </div>
      <Avatar className="w-24 h-24 absolute left-4 -bottom-12 border-4 border-background">
        <AvatarImage src={avatarSrc} alt={collector.name} />
        <AvatarFallback>{collector.name.charAt(0)}</AvatarFallback>
      </Avatar>
      {isEditing && (
        <label htmlFor="avatar-upload" className="absolute left-20 -bottom-8 cursor-pointer">
          <Button variant="secondary" size="icon">
            <Camera className="h-4 w-4" />
          </Button>
          <input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
        </label>
      )}
    </div>
  )
}

