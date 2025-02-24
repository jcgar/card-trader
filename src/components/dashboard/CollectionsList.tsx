"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, ChevronRight, Search, Filter, ArrowUpDown } from "lucide-react"
import { Link } from "react-router-dom"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { t } from "@/use/i18n"
import type { Collection } from "@/app/types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"

export default function CollectionsList({ collections }: { collections: Collection[] }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState("asc")
  const [advancedFilters, setAdvancedFilters] = useState({
    category: [],
    publisher: "",
    year: "",
    completionRate: "",
  })

  const filteredCollections = collections
    .filter((collection) => collection.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      let comparison = 0
      switch (sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name)
          break
        case "year":
          comparison = a.year - b.year
          break
        case "completionRate":
          comparison = a.completionRate - b.completionRate
          break
      }
      return sortOrder === "asc" ? comparison : -comparison
    })

  const handleAdvancedFilterApply = (filters) => {
    setAdvancedFilters(filters)
    console.log(JSON.stringify(filters, null, 2))
  }

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-white">{t("collections.title")}</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder={t("collections.searchCollection")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 bg-white/10 text-white placeholder-gray-400"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t("collections.sortBy")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">{t("collections.sortByName")}</SelectItem>
              <SelectItem value="year">{t("collections.sortByYear")}</SelectItem>
              <SelectItem value="completionRate">{t("collections.sortByCompletionRate")}</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
            <ArrowUpDown className="h-4 w-4 mr-2" />
            {sortOrder === "asc" ? t("common.ascending") : t("common.descending")}
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                {t("collections.advancedFilters")}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>{t("collections.advancedFilters")}</SheetTitle>
                <SheetDescription>{t("collections.advancedFiltersDescription")}</SheetDescription>
              </SheetHeader>
              <div className="py-4 space-y-4">
                <div>
                  <h3 className="mb-2 text-sm font-medium">{t("collections.category")}</h3>
                  <div className="space-y-2">
                    {["sports", "movies", "anime", "videogames"].map((category) => (
                      <div key={category} className="flex items-center">
                        <Checkbox
                          id={category}
                          checked={advancedFilters.category.includes(category)}
                          onCheckedChange={(checked) => {
                            setAdvancedFilters((prev) => ({
                              ...prev,
                              category: checked
                                ? [...prev.category, category]
                                : prev.category.filter((c) => c !== category),
                            }))
                          }}
                        />
                        <label
                          htmlFor={category}
                          className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {t(`collections.category${category.charAt(0).toUpperCase() + category.slice(1)}`)}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">{t("collections.publisher")}</label>
                  <Select
                    value={advancedFilters.publisher}
                    onValueChange={(value) => setAdvancedFilters((prev) => ({ ...prev, publisher: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t("collections.selectPublisher")} />
                    </SelectTrigger>
                    <SelectContent>{/* Add publisher options here */}</SelectContent>
                  </Select>
                </div>
                {/* Add more filter options here */}
              </div>
              <Button onClick={() => handleAdvancedFilterApply(advancedFilters)}>
                {t("collections.applyFilters")}
              </Button>
            </SheetContent>
          </Sheet>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> {t("collections.newCollection")}
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
                <Progress value={collection.completionRate} className="mb-2" />
                <p>{t("collections.completionRate", { rate: collection.completionRate.toFixed(2) })}%</p>
                <Link to={`/dashboard/colecciones/${collection.id}`}>
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

