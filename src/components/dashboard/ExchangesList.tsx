import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, ChevronRight, Search } from "lucide-react"
import { Link } from "react-router-dom";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { t } from "../../use/i18n"
import { Exchange } from "@/app/types"
import ExchangeCard from "../cards/ExchangeCard"

export default function ExchangesList({ exchanges }: { exchanges: Exchange[] }) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredExchanges = exchanges.filter((exchange) =>
    [
      exchange.receiver.name.toLowerCase(),
      exchange.sender.name.toLowerCase()
    ].includes(searchTerm.toLowerCase())
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
          {filteredExchanges.map((exchange) => (
            <ExchangeCard exchange={exchange} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  )
}

