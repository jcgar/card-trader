"use client"
import { motion } from "framer-motion"
import { Card } from "@/shared/components/shared/Card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"
import { MessageSquare, Star, Users, Book } from "lucide-react"
import type { Exchange } from "@/shared/app/types"
import { t } from "@/shared/use/i18n"

const statusColors = {
  pending: "bg-amber-500 text-white",
  accepted: "bg-blue-500 text-white",
  completed: "bg-green-500 text-white",
  rejected: "bg-red-500 text-white",
}

export default function ExchangeCard({ exchange }: { exchange: Exchange }) {
  const totalStickers = exchange.tradeCollections.reduce((sum, collection) => sum + collection.stickers.length, 0)

  return (
    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
      <Card className="relative overflow-hidden bg-gradient-to-br from-violet-50 to-indigo-100 border-2 border-indigo-200">
        <div className="p-4">

          <div className="flex justify-between items-start mb-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" className="p-0 hover:bg-transparent">
                  <Avatar className="h-12 w-12 border-2 border-indigo-300">
                    <AvatarImage src={exchange.user.avatar} />
                    <AvatarFallback>{exchange.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{exchange.user.name}</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                  <img
                    src={exchange.user.coverImage || "/placeholder.svg?height=100&width=374"}
                    alt="Cover"
                    className="w-full h-32 object-cover rounded-t-lg"
                  />
                  <div className="p-4 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-b-lg">
                    <div className="flex items-center mb-4">
                      <Avatar className="h-16 w-16 border-4 border-white">
                        <AvatarImage src={exchange.user.avatar} />
                        <AvatarFallback>{exchange.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="ml-4">
                        <h3 className="text-xl font-bold">{exchange.user.name}</h3>
                        <p className="text-sm text-gray-600">{exchange.user.username}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-4">{exchange.user.bio}</p>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="bg-white p-2 rounded-lg shadow">
                        <Star className="w-6 h-6 text-yellow-500 mx-auto mb-1" />
                        <div className="font-semibold">{exchange.user.stats.reputation}</div>
                        <div className="text-xs text-gray-500">{t("collector.reputation")}</div>
                      </div>
                      <div className="bg-white p-2 rounded-lg shadow">
                        <Users className="w-6 h-6 text-blue-500 mx-auto mb-1" />
                        <div className="font-semibold">{exchange.user.stats.exchanges}</div>
                        <div className="text-xs text-gray-500">{t("collector.exchanges")}</div>
                      </div>
                      <div className="bg-white p-2 rounded-lg shadow">
                        <Book className="w-6 h-6 text-green-500 mx-auto mb-1" />
                        <div className="font-semibold">{exchange.user.stats.completedCollections}</div>
                        <div className="text-xs text-gray-500">{t("collector.completedCollections")}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <div className="text-right">
              <Badge className={`${statusColors[exchange.status]} text-xs font-semibold px-3 py-1 rounded-full`}>
                {t(`exchange.status.${exchange.status}`)}
              </Badge>
              <p className="text-xs text-gray-500 mt-1">
                {formatDistanceToNow(new Date(exchange.createdAt), { addSuffix: true, locale: es })}
              </p>
            </div>
          </div>

          <h3 className="text-lg font-semibold mb-2 text-indigo-800">
            {t("exchange.with", { name: exchange.user.name })}
          </h3>

          <div className="space-y-2 mb-4">
            {exchange.tradeCollections.map((collection) => (
              <div key={collection.id} className="flex items-center bg-white rounded-lg p-2 shadow-sm">
                <img
                  src={collection.image || "/placeholder.svg"}
                  alt={collection.name}
                  className="w-8 h-8 rounded mr-2"
                />
                <span className="text-sm font-medium text-gray-700">{collection.name}</span>
                <span className="ml-auto text-xs font-semibold text-indigo-600">
                  {collection.stickers.length} {t("exchange.stickers")}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center text-sm text-gray-600">
            <div className="flex items-center">
              <MessageSquare className="w-4 h-4 mr-1 text-indigo-500" />
              <span>
                {exchange.messages.length} {t("exchange.messages")}
              </span>
            </div>
            <div>
              <span className="font-semibold text-indigo-700">{totalStickers}</span> {t("exchange.totalStickers")}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

