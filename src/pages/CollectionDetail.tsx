"use client"

import { NavigationBar } from "@/components/NavigationBar"
import { CollectionOverview } from "@/components/collections/CollectionOverview"
import { StickerGrid } from "@/components/collections/StickerGrid"
import { CollectionActions } from "@/components/collections/CollectionActions"
import { CollectionStats } from "@/components/collections/CollectionStats"
import { CollectionSocial } from "@/components/collections/CollectionSocial"
import { CollectionFilters } from "@/components/collections/CollectionFilters"
import { useParams, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"
import type { Sticker } from "@/app/types"
import { t } from "@/use/i18n"

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

const CollectionDetail = ({ collection }) => {
  const [groups, setGroups] = useState<Sticker[]>([])
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    setGroups(generateStickers())
  }, [])

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-white">
      <NavigationBar />

      <main className="container mx-auto px-4 py-24">
        <Button variant="ghost" className="mb-6" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("common.back")}
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <CollectionOverview collection={collection} />
            <CollectionFilters />
            <StickerGrid stickerGroups={groups} />
          </div>

          <div className="space-y-8">
            <CollectionStats collection={collection} />
            <CollectionActions />
            <CollectionSocial />
          </div>
        </div>
      </main>
    </div>
  )
}

export default CollectionDetail

