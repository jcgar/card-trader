"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { NavigationBar } from "@/components/NavigationBar"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, ImageIcon, Repeat, BookOpen, Shield, Star, ArrowLeft } from "lucide-react"
import type { Collection } from "@/app/types"
import { t } from "@/use/i18n"

const CollectionPublicView = () => {
  const { id } = useParams()
  const [collection, setCollection] = useState<Collection | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Mock data - replace with actual API call
    setCollection({
      id: "1",
      name: t("collection.name"),
      publisher: t("collection.publisher"),
      year: 2019,
      totalCards: 410,
      image: "https://picsum.photos/800/400",
      category: "fantasy",
      activeUsers: 319,
      popularity: 85,
      recentActivity: [],
      lastUpdated: 3,
      likes: 245,
      featured: true,
    })
  }, [t])

  if (!collection) return <div>{t("common.loading")}</div>

  const groups = [
    { name: t("collection.groups.darkElves"), cards: 37 },
    { name: t("collection.groups.hoplites"), cards: 37 },
    { name: t("collection.groups.gnomes"), cards: 37 },
    // ... add other groups
  ]

  const editions = [
    { name: t("collection.editions.bronze"), cards: 33 },
    { name: t("collection.editions.silver"), cards: 33 },
    { name: t("collection.editions.gold"), cards: 33 },
    // ... add other editions
  ]

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-white pt-16">
      <NavigationBar />
      <main className="container mx-auto px-4 py-24">
        <Button variant="ghost" className="mb-6" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("common.back")}
        </Button>

        <Card className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <img
                src={collection.image || "/placeholder.svg"}
                alt={collection.name}
                className="rounded-lg w-full object-cover"
              />
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-green-800">{collection.name}</h1>

              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-green-50">
                  <BookOpen className="w-4 h-4 mr-1" />
                  {collection.publisher}
                </Badge>
                <Badge variant="secondary" className="bg-green-50">
                  {collection.year}
                </Badge>
                <Badge variant="secondary" className="bg-green-50">
                  {t("collection.totalCards", { count: collection.totalCards })}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Users className="w-6 h-6 mx-auto mb-2 text-green-600" />
                  <div className="font-semibold">{collection.activeUsers}</div>
                  <div className="text-sm text-gray-600">{t("collection.collectors")}</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <ImageIcon className="w-6 h-6 mx-auto mb-2 text-green-600" />
                  <div className="font-semibold">110</div>
                  <div className="text-sm text-gray-600">{t("collection.images")}</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Repeat className="w-6 h-6 mx-auto mb-2 text-green-600" />
                  <div className="font-semibold">150</div>
                  <div className="text-sm text-gray-600">{t("collection.exchanges")}</div>
                </div>
              </div>

              <p className="text-gray-600 mt-4">{t("collection.description")}</p>
            </div>
          </div>

          <Tabs defaultValue="groups" className="mt-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="groups">{t("collection.groups.title")}</TabsTrigger>
              <TabsTrigger value="editions">{t("collection.editions.title")}</TabsTrigger>
              <TabsTrigger value="materials">{t("collection.materials.title")}</TabsTrigger>
            </TabsList>

            <TabsContent value="groups" className="mt-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {groups.map((group, index) => (
                  <div key={index} className="p-4 bg-green-50 rounded-lg">
                    <h3 className="font-semibold">{group.name}</h3>
                    <p className="text-sm text-gray-600">{t("collection.cardCount", { count: group.cards })}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="editions" className="mt-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {editions.map((edition, index) => (
                  <div key={index} className="p-4 bg-green-50 rounded-lg">
                    <h3 className="font-semibold">{edition.name}</h3>
                    <p className="text-sm text-gray-600">{t("collection.cardCount", { count: edition.cards })}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="materials" className="mt-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold mb-2">{t("collection.materials.availableMaterials")}</h3>
                <ul className="list-disc list-inside text-gray-600">
                  <li>{t("collection.materials.collectorAlbum")}</li>
                  <li>{t("collection.materials.standardAlbum")}</li>
                  <li>{t("collection.materials.packs")}</li>
                  <li>{t("collection.materials.premiumBox")}</li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-8 flex justify-center gap-4">
            <Button className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              {t("collection.addToMyCollection")}
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              {t("collection.follow")}
            </Button>
          </div>
        </Card>
      </main>
    </div>
  )
}

export default CollectionPublicView

