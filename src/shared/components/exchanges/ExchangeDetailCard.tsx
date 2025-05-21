"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { MessageCircle, Star, Send } from "lucide-react"
import type { Exchange } from "@/shared/app/types"
import { t } from "@/shared/use/i18n"
import { useAuth } from "@/shared/use/auth"

interface ExchangeDetailCardProps {
  exchange: Exchange
  onStatusChange: (exchangeId: number, newStatus: Exchange["status"]) => void
  onPriorityChange: (exchangeId: number, isPriority: boolean) => void
  onSendMessage: (exchangeId: number, message: string) => void
}

export const ExchangeDetailCard: React.FC<ExchangeDetailCardProps> = ({
  exchange,
  onStatusChange,
  onPriorityChange,
  onSendMessage,
}) => {
  const [message, setMessage] = useState("")
  const { user } = useAuth()
  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(exchange.id, message)
      setMessage("")
    }
  }

  if (!user) return (<></>)

  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{t("exchanges.exchangeWith", { collector: exchange.user.name })}</CardTitle>
        <div className="flex items-center space-x-2">
          <Badge variant={exchange.status === "completed" ? "success" : "secondary"}>
            {t(`exchanges.status${exchange.status.charAt(0).toUpperCase() + exchange.status.slice(1)}`)}
          </Badge>
          <Button variant="ghost" size="icon" onClick={() => onPriorityChange(exchange.id, !exchange.isPriority)}>
            <Star className={exchange.isPriority ? "text-yellow-400" : "text-gray-400"} />
          </Button>
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon">
                <MessageCircle />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>{t("exchanges.chatWith", { collector: exchange.user.name })}</DrawerTitle>
              </DrawerHeader>
              <div className="p-4 space-y-4">
                {exchange.messages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.senderId === user.id ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[70%] p-2 rounded-lg ${msg.senderId === user.id ? "bg-primary text-primary-foreground" : "bg-secondary"}`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                <div className="flex items-center space-x-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t("exchanges.typeMessage")}
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 mb-4">
          <Avatar>
            <AvatarImage src={exchange.user.avatar} />
            <AvatarFallback>{exchange.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{exchange.user.name}</p>
            <p className="text-sm text-muted-foreground">
              {t("exchanges.lastActivity", { date: new Date(exchange.lastActivity).toLocaleDateString() })}
            </p>
          </div>
        </div>
        <div className="space-y-2">
          {exchange.tradeCollections.map((collection) => (
            <div key={collection.id} className="border p-2 rounded-md">
              <h4 className="font-semibold">{collection.name}</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {collection.stickers.map((sticker) => (
                  <Badge key={sticker.id} variant="outline">
                    #{sticker.number} {sticker.name}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

