import { Card } from "../ui/card"
import { Badge } from "../ui/badge"
import { generatePath, Link, useNavigate, useSearchParams } from "react-router-dom"
import { CheckCircle, Clock, ArrowRight, CheckCircleIcon } from "lucide-react"
import type { Exchange } from "@/app/types"
import { cn } from "@/lib/utils"
import { t } from "@/use/i18n"
import { routes } from "@/use/routes"
import { SectionHeaderWithButton } from "../shared/SectionHeaderWithButton"
import ExchangeCard from "../cards/ExchangeCard"
import { GridLayout } from "../shared/GridLayout"

interface MyExchangesProps {
  exchanges: Exchange[]
}

export const MyExchanges = ({ exchanges }: MyExchangesProps) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const handleViewAllExchanges = () => {
    navigate(routes.myExchanges)
  }

  return (
    <div className="container mx-auto px-4  mb-16">

      <SectionHeaderWithButton
        title={t("myExchanges.title")}
        buttonText="View All Exchanges"
        buttonIcon={CheckCircleIcon}
        onButtonClick={handleViewAllExchanges}
      />
      <GridLayout
        items={exchanges}
        columns={2}
        renderItem={(exchange) => (
          <Link
            key={exchange.id}
            to={generatePath(routes.myExchangesDetail, { exchangeId: `${exchange.id}` })}
            className="block transition-colors hover:bg-gray-50"
          >
            <ExchangeCard exchange={exchange} />
          </Link>
        )}>

      </GridLayout>
    </div>
  )
}

