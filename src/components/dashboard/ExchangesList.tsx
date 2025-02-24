"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter, ArrowUpDown } from "lucide-react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { t } from "@/use/i18n"
import type { Exchange } from "@/app/types"
import ExchangeCard from "../cards/ExchangeCard"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"

export default function ExchangesList({ exchanges }: { exchanges: Exchange[] }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("date")
  const [sortOrder, setSortOrder] = useState("desc")
  const [advancedFilters, setAdvancedFilters] = useState({
    status: [],
    collectionType: "",
    totalStickers: "",
  })

  const filteredExchanges = exchanges
    .filter(
      (exchange) =>
        exchange.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exchange.tradeCollections.some((collection) =>
          collection.name.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
    )
    .sort((a, b) => {
      let comparison = 0
      switch (sortBy) {
        case "collector":
          comparison = a.user.name.localeCompare(b.user.name)
          break
        case "status":
          comparison = a.status.localeCompare(b.status)
          break
        case "date":
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          break
        case "lastActivity":
          comparison = new Date(a.lastActivity).getTime() - new Date(b.lastActivity).getTime()
          break
        case "totalStickers": {
          const totalA = a.tradeCollections.reduce((sum, collection) => sum + collection.stickers.length, 0)
          const totalB = b.tradeCollections.reduce((sum, collection) => sum + collection.stickers.length, 0)
          comparison = totalA - totalB
          break
        }
      }
      return sortOrder === "asc" ? comparison : -comparison
    })

  const handleAdvancedFilterApply = (filters) => {
    setAdvancedFilters(filters)
    console.log(JSON.stringify(filters, null, 2))
  }

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h2 className="text-2xl font-semibold text-white">{t("exchanges.title")}</h2>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-grow max-w-sm">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder={t("exchanges.searchExchange")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 bg-white/10 text-white placeholder-gray-400"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t("exchanges.sortBy")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="collector">{t("exchanges.sortByCollector")}</SelectItem>
              <SelectItem value="status">{t("exchanges.sortByStatus")}</SelectItem>
              <SelectItem value="date">{t("exchanges.sortByDate")}</SelectItem>
              <SelectItem value="lastActivity">{t("exchanges.sortByLastActivity")}</SelectItem>
              <SelectItem value="totalStickers">{t("exchanges.sortByTotalStickers")}</SelectItem>
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
                {t("exchanges.advancedFilters")}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>{t("exchanges.advancedFilters")}</SheetTitle>
                <SheetDescription>{t("exchanges.advancedFiltersDescription")}</SheetDescription>
              </SheetHeader>
              <div className="py-4 space-y-4">
                <div>
                  <h3 className="mb-2 text-sm font-medium">{t("exchanges.status")}</h3>
                  <div className="space-y-2">
                    {["pending", "accepted", "completed", "rejected"].map((status) => (
                      <div key={status} className="flex items-center">
                        <Checkbox
                          id={status}
                          checked={advancedFilters.status.includes(status)}
                          onCheckedChange={(checked) => {
                            setAdvancedFilters((prev) => ({
                              ...prev,
                              status: checked ? [...prev.status, status] : prev.status.filter((s) => s !== status),
                            }))
                          }}
                        />
                        <label
                          htmlFor={status}
                          className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {t(`exchanges.status${status.charAt(0).toUpperCase() + status.slice(1)}`)}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">{t("exchanges.collectionType")}</label>
                  <Select
                    value={advancedFilters.collectionType}
                    onValueChange={(value) => setAdvancedFilters((prev) => ({ ...prev, collectionType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t("exchanges.selectCollectionType")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sports">{t("exchanges.collectionTypeSports")}</SelectItem>
                      <SelectItem value="movies">{t("exchanges.collectionTypeMovies")}</SelectItem>
                      <SelectItem value="anime">{t("exchanges.collectionTypeAnime")}</SelectItem>
                      <SelectItem value="videogames">{t("exchanges.collectionTypeVideogames")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">{t("exchanges.totalStickers")}</label>
                  <Input
                    type="number"
                    placeholder={t("exchanges.enterMinimumStickers")}
                    value={advancedFilters.totalStickers}
                    onChange={(e) => setAdvancedFilters((prev) => ({ ...prev, totalStickers: e.target.value }))}
                  />
                </div>
              </div>
              <Button onClick={() => handleAdvancedFilterApply(advancedFilters)}>{t("exchanges.applyFilters")}</Button>
            </SheetContent>
          </Sheet>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> {t("exchanges.newExchange")}
          </Button>
        </div>
      </div>
      <ScrollArea className="w-full rounded-md border border-white/10">
        <div className="flex flex-wrap gap-4 p-4">
          {filteredExchanges.map((exchange) => (
            <ExchangeCard key={exchange.id} exchange={exchange} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  )
}

