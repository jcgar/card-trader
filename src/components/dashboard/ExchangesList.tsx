"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { t } from "@/use/i18n"
import type { Exchange } from "@/app/types"
import ExchangeCard from "../cards/ExchangeCard"
import { GridLayout } from "@/components/shared/GridLayout"
import { generatePath, Link, useSearchParams } from "react-router-dom"
import { routes } from "@/use/routes"

export default function ExchangesList({ exchanges }: { exchanges: Exchange[] }) {
  const [searchParams, setSearchParams] = useSearchParams()

  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-white">{t("exchanges.title")}</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> {t("exchanges.newExchange")}
        </Button>
      </div>
      <GridLayout
        items={exchanges}
        columns={2}
        renderItem={(exchange) => (
          <Link
            key={exchange.id}
            to={generatePath(routes.myExchangesDetail, { exchangeId: `${exchange.id}` })}
            onClick={() => setSearchParams({ tab: "exchanges", exchangeId: `${exchange.id}` })}
          >
            <ExchangeCard exchange={exchange} />
          </Link>
        )}
      />
    </section>
  )
}

