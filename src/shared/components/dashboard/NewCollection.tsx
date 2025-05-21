"use client"

import { useState, useEffect } from "react"
import { useApi } from "@/shared/use/api"
import type { Collection } from "@/shared/app/types"
import { Category } from "@/shared/components/collections/Category"
import { SectionHeaderWithButton } from "@/shared/components/shared/SectionHeaderWithButton"
import { t } from "@/shared/use/i18n"
import { Book } from "lucide-react"
import { useNavigate } from "@/shared/use/navigate"
import { routes } from "@/shared/use/routes"

export const NewCollection = () => {
  const navigate = useNavigate()
  const { data: collections } = useApi<Collection>("collections", { page: 1, pageSize: 100, fullQuery: false })

  const handleCollectionClick = (collectionId: string) => {
    navigate(routes.myCollectionDetail.replace(":collectionId", collectionId))
  }

  return (
    <div className="space-y-6">
      <SectionHeaderWithButton
        title={t("collections.newCollection")}
        buttonText={t("common.create")}
        onButtonClick={() => console.log("Create new collection")}
        buttonIcon={Book} />
      <p className="text-muted-foreground">{t("collections.newCollectionDescription")}</p>
      <Category collections={collections} onClick={handleCollectionClick} />
    </div>
  )
}

