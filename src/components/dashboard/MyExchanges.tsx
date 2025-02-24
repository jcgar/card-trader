import { Card } from "../ui/card"
import { Badge } from "../ui/badge"
import { generatePath, Link } from "react-router-dom"
import { CheckCircle, Clock, ArrowRight } from "lucide-react"
import type { Exchange } from "@/app/types"
import { cn } from "@/lib/utils"
import { t } from "@/use/i18n"
import { routes } from "@/use/routes"

interface MyExchangesProps {
  exchanges: Exchange[]
}

export const MyExchanges = ({ exchanges }: MyExchangesProps) => {
  return (
    <Card className="p-6">
      <h3 className="font-bold text-lg mb-4">{t("myExchanges.title")}</h3>
      <div className="space-y-4">
        {exchanges.map((exchange) => (
          <Link
            key={exchange.id}
            to={generatePath(routes.myExchangesDetail, { exchangeId: `${exchange.id}` })}
            className="block transition-colors hover:bg-gray-50"
          >
            <div className="flex items-center gap-4 p-4 rounded-lg">
              <img
                src={exchange.user.avatar || "/placeholder.svg"}
                alt={exchange.user.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <p className="font-medium">{exchange.user.name}</p>
                <div className="flex gap-2 text-sm">
                  <span className="text-gray-600">
                    {t("myExchanges.totalStickers", {
                      count: exchange.tradeCollections.reduce((sum, collection) => sum + collection.stickers.length, 0),
                    })}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">
                    {t("myExchanges.collections", { count: exchange.tradeCollections.length })}
                  </span>
                </div>
              </div>
              <Badge
                variant="outline"
                className={cn(
                  exchange.status === "completed"
                    ? "text-green-600 border-green-200"
                    : "text-orange-600 border-orange-200",
                )}
              >
                {exchange.status === "completed" ? (
                  <CheckCircle className="w-4 h-4 mr-1" />
                ) : (
                  <Clock className="w-4 h-4 mr-1" />
                )}
                {t(`myExchanges.status.${exchange.status}`)}
              </Badge>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </div>
          </Link>
        ))}
      </div>
    </Card>
  )
}

