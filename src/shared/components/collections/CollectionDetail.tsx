"use client"

import { AppLayout } from "@/shared/components/layout/AppLayout"
import { CollectionOverview } from "@/shared/components/collections/CollectionOverview"
import { StickerGrid } from "@/shared/components/collections/StickerGrid"
import { CollectionActions } from "@/shared/components/collections/CollectionActions"
import { CollectionStats } from "@/shared/components/collections/CollectionStats"
import { CollectionSocial } from "@/shared/components/collections/CollectionSocial"
import { CollectionFilters } from "@/shared/components/collections/CollectionFilters"
import { useParams, useNavigate } from "@/shared/use/navigate"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"
import type { Sticker } from "@/shared/app/types"
import { t } from "@/shared/use/i18n"
import { routes } from "@/shared/use/routes"

const allTeams = [
  "Real Madrid",
  "Barcelona",
  "Atlético de Madrid",
  "Sevilla",
  "Valencia",
  "Real Sociedad",
  "Athletic Club",
  "Real Betis",
  "Villarreal",
  "Osasuna",
  "Rayo Vallecano",
  "Celta de Vigo",
]

const generateStickers = () => {
  const allStickers = []
  let currentNumber = 1

  for (const team of allTeams) {
    const teamStickers = Array.from({ length: 24 }, (_, i) => ({
      id: currentNumber + i,
      number: currentNumber + i,
      name: `${team} ${i + 1}`,
      type: i < 20 ? "regular" : "special",
      owned: Math.random() > 0.5,
      repeated: Math.random() > 0.7 ? Math.floor(Math.random() * 3) + 1 : 0,
    }))
    allStickers.push({
      title: team,
      stickers: teamStickers,
    })
    currentNumber += 24
  }
  return allStickers
}


export const CollectionDetail = ({ collection }) => {
  const [groups, setGroups] = useState<Sticker[]>([])
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    setGroups(generateStickers())
  }, [])

  const handleBack = () => {
    navigate(routes.myCollections)
  }

  return (
    <main className="container mx-auto px-4">
      <Button variant="ghost" className="mb-6" onClick={handleBack}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t("common.back")}
      </Button>
      <CollectionOverview collection={collection} />
      <div className="mb-8">
        <CollectionFilters />
      </div>
      <div className="mb-8">
        <StickerGrid stickerGroups={groups} />
      </div>

    </main>

  )
}

