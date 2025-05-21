"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"
import type { Exchange } from "@/shared/app/types"
import { t } from "@/shared/use/i18n"
import { cn } from "@/lib/utils"
import { CheckCircle, Clock, ArrowRight } from "lucide-react"

const statusColors = {
  pending: "bg-yellow-500 text-black",
  accepted: "bg-blue-500 text-white",
  completed: "bg-green-500 text-white",
  rejected: "bg-red-500 text-white",
}

export default function ExchangeHCard({ exchange }: { exchange: Exchange }) {
  const totalStickers = exchange.tradeCollections.reduce((sum, collection) => sum + collection.stickers.length, 0)

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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
    </motion.div>
  )
}

