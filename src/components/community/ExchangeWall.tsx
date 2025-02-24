import { Button } from "../ui/button"
import { RefreshCcw } from "lucide-react"
import ExchangeCard from "../cards/ExchangeCard"
import { t } from "@/use/i18n"
import type { Exchange } from "@/app/types"

export const ExchangeWall = ({ exchanges }: { exchanges: Exchange[] }) => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4 text-green-800">
            {t("exchangeWall.title")}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t("exchangeWall.description")}</p>
          <Button className="mt-6 bg-green-600 hover:bg-green-700">
            <RefreshCcw className="w-4 h-4 mr-2" />
            {t("exchangeWall.postExchange")}
          </Button>
        </div>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {exchanges.map((exchange) => (
            <ExchangeCard key={exchange.id} exchange={exchange} />
          ))}
        </div>
      </div>
    </section>
  )
}

