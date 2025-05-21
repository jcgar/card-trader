"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { useSwipeable } from "react-swipeable"
import { Check, X, Clock, Star, Award, Send, ChevronRight, Edit, Wand2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { useIsMobile } from "@/hooks/use-mobile"
import type { Exchange, Sticker, TradeCollection } from "@/shared/app/types"
import { t } from "@/shared/use/i18n"
import { useAuth } from "@/shared/use/auth"

interface ExchangeDetailProps {
  exchange: Exchange
  onStatusChange: (status: Exchange["status"]) => void
}

export const ExchangeDetail = ({ exchange, onStatusChange }: ExchangeDetailProps) => {
  const { user } = useAuth()
  const isMobile = useIsMobile()
  const [message, setMessage] = useState("")
  const [selectedCollection, setSelectedCollection] = useState<TradeCollection | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const chatRef = useRef<HTMLDivElement>(null)
  const [localExchange, setLocalExchange] = useState(exchange)
  const [isEditing, setIsEditing] = useState(false)

  const isReadOnly = localExchange?.status === "completed" || localExchange?.status === "rejected"

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (isMobile && selectedCollection) {
        const nextIndex = localExchange.tradeCollections.findIndex((c) => c.id === selectedCollection.id) + 1
        if (nextIndex < localExchange.tradeCollections.length) {
          setSelectedCollection(localExchange.tradeCollections[nextIndex])
        }
      }
    },
    onSwipedRight: () => {
      if (isMobile && selectedCollection) {
        const prevIndex = localExchange.tradeCollections.findIndex((c) => c.id === selectedCollection.id) - 1
        if (prevIndex >= 0) {
          setSelectedCollection(localExchange.tradeCollections[prevIndex])
        }
      }
    },
  })

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [localExchange?.messages])

  const handleSendMessage = () => {
    if (message.trim() && !isReadOnly) {
      const newMessage = {
        id: Date.now().toString(),
        senderId: user.id,
        content: message,
        type: "text",
        timestamp: new Date().toISOString(),
      }
      setLocalExchange((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          {
            id: newMessage.id,
            senderId: newMessage.senderId,
            content: newMessage.content,
            type: "text" as "text" | "sticker-added" | "sticker-removed" | "status-change",
            timestamp: newMessage.timestamp,
          },
        ],
      }))
      setMessage("")
      playSound("message")
    }
  }

  const toggleStickerSelection = (collectionId: string, sticker: Sticker) => {
    if (!isReadOnly && isEditing) {
      setLocalExchange((prev) => ({
        ...prev,
        tradeCollections: prev.tradeCollections.map((collection) =>
          collection.id === collectionId
            ? {
              ...collection,
              stickers: collection.stickers.map((s) => (s.id === sticker.id ? { ...s, selected: !s.selected } : s)),
            }
            : collection,
        ),
      }))
      playSound(sticker.selected ? "remove" : "add")
      vibrate()
    }
  }

  const playSound = (type: "add" | "remove" | "message") => {
    const sounds = {
      add: "/assets/add.mp3",
      remove: "/assets/remove.mp3",
      message: "/assets/message.mp3",
    }
    const audio = new Audio(sounds[type])
    audio.play()
  }

  const vibrate = () => {
    if ("vibrate" in navigator) {
      navigator.vibrate(50)
    }
  }

  const renderStickers = (collection: TradeCollection) => {
    return (
      <div className={`grid ${viewMode === "grid" ? "grid-cols-8 gap-1" : "grid-cols-1 gap-2"}`}>
        {collection.stickers.map((sticker) => (
          <motion.div
            key={sticker.id}
            className={`
              ${viewMode === "grid" ? "w-16 h-16" : "w-full h-24"}
              ${sticker.selected ? "bg-green-200" : "bg-gray-100"}
              rounded-lg flex items-center justify-center cursor-pointer
              transition-colors duration-200 ease-in-out
              ${isEditing ? "hover:bg-blue-100" : ""}
            `}
            onClick={() => toggleStickerSelection(collection.id, sticker)}
            whileHover={{ scale: isEditing ? 1.05 : 1 }}
            whileTap={{ scale: isEditing ? 0.95 : 1 }}
          >
            {viewMode === "grid" ? (
              <span className="text-sm font-bold">{sticker.number}</span>
            ) : (
              <div className="flex items-center justify-between w-full p-2">
                <span className="text-lg font-bold">#{sticker.number}</span>
                <div className="text-right">
                  <p className="font-medium">{sticker.name}</p>
                  <p className="text-sm text-gray-500">{sticker.type}</p>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    )
  }

  const renderStatusFlow = () => {
    const statuses = ["accepted", "received", "completed"]
    const currentIndex = statuses.indexOf(localExchange.status)

    return (
      <div className="flex justify-between items-center mb-4">
        {statuses.map((status, index) => (
          <div key={status} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${index <= currentIndex ? "bg-green-500 text-white" : "bg-gray-300"
                }`}
            >
              {index + 1}
            </div>
            <span className="ml-2 text-sm">{t(`exchange.status.${status}`)}</span>
            {index < statuses.length - 1 && (
              <ChevronRight className={`mx-2 ${index < currentIndex ? "text-green-500" : "text-gray-300"}`} />
            )}
          </div>
        ))}
      </div>
    )
  }

  const autoSelectStickers = () => {
    const userStickers = localExchange.tradeCollections.find((c) => c.id === "user")?.stickers || []
    const otherUserStickers = localExchange.tradeCollections.find((c) => c.id === "otherUser")?.stickers || []

    const maxSelectable = Math.min(userStickers.length, otherUserStickers.length)

    setLocalExchange((prev) => ({
      ...prev,
      tradeCollections: prev.tradeCollections.map((collection) => ({
        ...collection,
        stickers: collection.stickers.map((sticker, index) => ({
          ...sticker,
          selected: index < maxSelectable,
        })),
      })),
    }))
  }

  return (
    <div className="flex flex-col space-y-6 p-4 md:p-6" {...handlers}>
      <h2 className="text-2xl font-bold">{t("exchange.header")}</h2>
      {renderStatusFlow()}

      <div className="relative">
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center gap-4"
          >
            <img
              src={localExchange.user.avatar || "/placeholder.svg"}
              alt={localExchange.user.name}
              className="w-16 h-16 rounded-full border-4 border-blue-500"
            />
            <div>
              <h3 className="font-bold">{localExchange.user.name}</h3>
              <div className="flex items-center gap-2 text-sm">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>{localExchange.user.stats.reputation} rep.</span>
              </div>
            </div>
          </motion.div>

          <div className="text-center">
            <Award className="w-8 h-8 text-purple-500 mx-auto" />
            <span className="text-sm font-medium">{t("exchange.vs")}</span>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>{t("exchange.progress")}</span>
            <span className="capitalize">{t(`exchange.status.${localExchange.status}`)}</span>
          </div>
          <Progress
            value={
              localExchange.status === "completed"
                ? 100
                : localExchange.status === "accepted"
                  ? 66
                  : localExchange.status === "pending"
                    ? 33
                    : 0
            }
          />
        </div>

        {localExchange.urgentUntil && (
          <div className="mt-4 flex items-center gap-2 text-orange-600">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{t("exchange.urgent", { time: localExchange.urgentUntil })}</span>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">{t("exchange.yourRepeats")}</h3>
        {!isReadOnly && (
          <div className="flex gap-2">
            <Button onClick={() => setIsEditing(!isEditing)} variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-2" />
              {isEditing ? t("exchange.finishEditing") : t("exchange.editExchange")}
            </Button>
            {isEditing && (
              <Button onClick={autoSelectStickers} variant="outline" size="sm">
                <Wand2 className="w-4 h-4 mr-2" />
                {t("exchange.autoSelect")}
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Collections section */}
      <Card className="p-4">
        <h4 className="font-bold mb-4">{t("exchange.collections")}</h4>
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex space-x-4">
            {localExchange.tradeCollections.map((collection) => (
              <Card
                key={collection.id}
                className={`p-4 cursor-pointer transition-all duration-200 ${selectedCollection?.id === collection.id ? "ring-2 ring-blue-500" : ""
                  }`}
                onClick={() => setSelectedCollection(collection)}
              >
                <h5 className="font-semibold mb-2">{collection.name}</h5>
                <p className="text-sm text-gray-600">
                  {t("exchange.stickerCount", { count: collection.stickers.length })}
                </p>
                <p className="text-sm text-gray-600">
                  {t("exchange.selectedCount", {
                    count: collection.stickers.filter((s) => s.selected).length,
                  })}
                </p>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </Card>

      {/* Selected collection stickers */}
      {selectedCollection && (
        <Card className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-bold">{selectedCollection.name}</h4>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}>
                {viewMode === "grid" ? t("exchange.listView") : t("exchange.gridView")}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const currentIndex = localExchange.tradeCollections.findIndex((c) => c.id === selectedCollection.id)
                  const nextIndex = (currentIndex + 1) % localExchange.tradeCollections.length
                  setSelectedCollection(localExchange.tradeCollections[nextIndex])
                }}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
          {renderStickers(selectedCollection)}
        </Card>
      )}

      {/* Chat and actions */}
      <Card className="p-4">
        <ScrollArea className="h-[300px] mb-4" ref={chatRef}>
          <div className="space-y-4">
            {localExchange.messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.senderId === user.id ? "justify-end" : "justify-start"}`}>
                <div
                  className={`rounded-lg px-4 py-2 max-w-[80%] ${msg.senderId === user.id ? "bg-blue-500 text-white" : "bg-gray-100"
                    }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <span className="text-xs opacity-75">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t("exchange.messagePlaceholder")}
            className="flex-1"
            disabled={isReadOnly}
          />
          <Button onClick={handleSendMessage} disabled={isReadOnly}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </Card>

      {/* Action buttons */}
      {!isReadOnly && (
        <div className="flex gap-4 justify-end">
          <Button variant="outline" className="text-red-600 border-red-200" onClick={() => onStatusChange("rejected")}>
            <X className="w-4 h-4 mr-2" />
            {t("exchange.reject")}
          </Button>

          <Button
            className="bg-green-600 hover:bg-green-700"
            onClick={() => onStatusChange(localExchange.status === "accepted" ? "received" : "completed")}
          >
            <Check className="w-4 h-4 mr-2" />
            {localExchange.status === "accepted"
              ? t("exchange.markAsReceived")
              : localExchange.status === "received"
                ? t("exchange.complete")
                : t("exchange.accept")}
          </Button>
        </div>
      )}
    </div>
  )
}

