"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { t } from "@/shared/use/i18n"
import type { Exchange } from "@/shared/app/types"
import { ExchangeDetailCard } from "@/shared/components/exchanges/ExchangeDetailCard"
import { useApi } from "@/shared/use/api"
import { SectionHeaderWithButton } from "../shared/SectionHeaderWithButton"

export default function ExchangesList({ exchanges }) {
  const handleSearchExchanges = () => {
    console.log('search')
  }
  const handleStatusChange = (exchangeId: number, newStatus: Exchange["status"]) => {
    // Implement status change logic here
    console.log(`Changing status of exchange ${exchangeId} to ${newStatus}`)
  }

  const handlePriorityChange = (exchangeId: number, isPriority: boolean) => {
    // Implement priority change logic here
    console.log(`Changing priority of exchange ${exchangeId} to ${isPriority}`)
  }

  const handleSendMessage = (exchangeId: number, message: string) => {
    // Implement send message logic here
    console.log(`Sending message for exchange ${exchangeId}: ${message}`)
  }

  return (
    <div className="container mx-auto px-4 mb-16">
      <SectionHeaderWithButton
        title={t("exchanges.title")}
        buttonText={t("exchanges.newExchange")}
        buttonIcon={Plus}
        onButtonClick={handleSearchExchanges}
      />
      {exchanges.map((exchange) => (
        <ExchangeDetailCard
          key={exchange.id}
          exchange={exchange}
          onStatusChange={handleStatusChange}
          onPriorityChange={handlePriorityChange}
          onSendMessage={handleSendMessage}
        />
      ))}
    </div>
  )
}

