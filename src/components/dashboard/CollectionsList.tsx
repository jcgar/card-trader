import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, ChevronRight, Search } from "lucide-react"
import Link from "next/link"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { t } from "../../use/i18n"

export default function CollectionsList({ collections }) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCollections = collections.filter((collection) =>
    collection.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-white">{t("dashboard.myCollections")}</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder={t("dashboard.searchCollection")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 bg-white/10 text-white placeholder-gray-400"
            />
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> {t("dashboard.newCollection")}
          </Button>
        </div>
      </div>
      <ScrollArea className="w-full whitespace-nowrap rounded-md border border-white/10">
        <div className="flex w-max space-x-4 p-4">
          {filteredCollections.map((collection) => (
            <Card key={collection.id} className="w-[300px] flex-shrink-0 bg-white/10 backdrop-blur-lg text-white">
              <CardHeader>
                <CardTitle>{collection.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={collection.progress} className="mb-2" />
                <p>
                  {collection.completedCards} / {collection.totalCards} cromos
                </p>
                <Link href={`/dashboard/colecciones/${collection.id}`}>
                  <Button variant="link" className="mt-2 p-0 h-auto text-blue-300">
                    {t("collections.editCollection")} <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  )
}

