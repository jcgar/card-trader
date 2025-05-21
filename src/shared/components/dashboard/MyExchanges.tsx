import { Card } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { generatePath, Link, useNavigate } from "@/shared/use/navigate"
import { CheckCircle, Clock, ArrowRight, CheckCircleIcon } from "lucide-react"
import type { Exchange } from "@/shared/app/types"
import { cn } from "@/lib/utils"
import { t } from "@/shared/use/i18n"
import { routes } from "@/shared/use/routes"
import { SectionHeaderWithButton } from "../shared/SectionHeaderWithButton"
import ExchangeCard from "../cards/ExchangeCard"
import { GridLayout } from "../shared/GridLayout"

interface MyExchangesProps {
  exchanges: Exchange[]
}

export const MyExchanges = ({ exchanges }: MyExchangesProps) => {
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

