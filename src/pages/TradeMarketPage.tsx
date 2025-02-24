import { NavigationBar } from "@/components/NavigationBar"
import { TradeMarket } from "@/components/dashboard/TradeMarket"

const TradeMarketPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-white pt-16">
      <NavigationBar />
      <TradeMarket />
    </div>
  )
}

export default TradeMarketPage

