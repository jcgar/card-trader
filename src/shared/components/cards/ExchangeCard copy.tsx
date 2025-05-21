"use client"

import { motion } from "framer-motion"
import { Card } from "@/shared/components/shared/Card"

import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"
import type { Exchange } from "@/shared/app/types"
import { t } from "@/shared/use/i18n"

const statusColors = {
  pending: "bg-yellow-500 text-black",
  accepted: "bg-blue-500 text-white",
  completed: "bg-green-500 text-white",
  rejected: "bg-red-500 text-white",
}

export default function ExchangeCard({ exchange }: { exchange: Exchange }) {
  const totalStickers = exchange.tradeCollections.reduce((sum, collection) => sum + collection.stickers.length, 0)

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Card hoverable className="w-full bg-background text-text hover:bg-accent hover:text-text transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{t("exchange.with", { name: exchange.user.name })}</CardTitle>
          <Avatar className="h-8 w-8">
            <AvatarImage src={exchange.user.avatar} alt={exchange.user.name} />
            <AvatarFallback>{exchange.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-2">
            <Badge className={`${statusColors[exchange.status]}`}>{t(`exchange.status.${exchange.status}`)}</Badge>
            <span className="text-xs text-secondary">
              {formatDistanceToNow(new Date(exchange.createdAt), { addSuffix: true, locale: es })}
            </span>
          </div>
          <p className="text-sm mb-2 line-clamp-1">{exchange.messages[exchange.messages.length - 1]?.content}</p>
          <div className="space-y-1">
            {exchange.tradeCollections.map((collection) => (
              <div key={collection.id} className="flex items-center space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={collection.image} alt={collection.name} />
                  <AvatarFallback>{collection.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-xs">
                  {collection.name}: {collection.stickers.length} {t("exchange.stickers")}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-2 text-xs text-secondary">
            {t("exchange.lastActivity", {
              time: formatDistanceToNow(new Date(exchange.lastActivity), { addSuffix: true, locale: es }),
            })}
          </div>
          <div className="mt-2 text-sm text-text font-semibold">
            {t("exchange.totalStickers", { count: totalStickers })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

