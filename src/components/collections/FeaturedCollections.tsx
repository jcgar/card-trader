import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { t } from "@/use/i18n"
import { useState, useEffect } from "react"
import { api } from "@/use/api"


export const FeaturedCollections = () => {

  const [collections, setCollections] = useState([])

  useEffect(() => {
    const fetchCollections = async () => {
      const data = await api("collections")
      setCollections(data.slice(0, 4)) // Mostrar solo las 4 primeras colecciones
    }
    fetchCollections()
  }, [])

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{t("catalog.featuredCollections")}</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex w-max space-x-4">
            {collections.map((collection) => (
              <Card key={collection.id} className="w-[250px]">
                <CardContent className="p-4">
                  <img
                    src={collection.image || "/placeholder.svg"}
                    alt={collection.name}
                    className="w-full h-40 object-cover mb-4 rounded"
                  />
                  <h3 className="font-bold mb-2">{collection.name}</h3>
                  <p className="text-sm mb-4">{t("catalog.popularity", { score: collection.popularity })}</p>
                  <Button className="w-full">{t("catalog.explore")}</Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

