import type React from "react"
import { Card } from "../ui/card"
import { Button } from "../ui/button"
import { RefreshCcw, Search, MessageSquare, Filter, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { routes } from "@/use/routes"

const trades = [
  {
    id: 1,
    user: "David Kim",
    card: "Lionel Messi - World Cup 2022",
    condition: "Mint",
    price: "Trade Only",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800",
  },
  {
    id: 2,
    user: "Emily Chen",
    card: "Charizard - First Edition",
    condition: "Near Mint",
    price: "Trade Only",
    image: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=800",
  },
  {
    id: 3,
    user: "James Wilson",
    card: "Classic Star Wars - Limited",
    condition: "Excellent",
    price: "Trade Only",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800",
  },
]

interface TradeMarketProps {
  preview?: boolean
}

export const TradeMarket: React.FC<TradeMarketProps> = ({ preview = false }) => {
  const displayedTrades = preview ? trades.slice(0, 4) : trades

  return (
    <section className={`py-${preview ? "10" : "20"}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-playfair font-bold text-green-800 mb-2">Trade Market</h2>
            <p className="text-gray-600">Discover and trade cards with fellow collectors</p>
          </div>
          {!preview && (
            <div className="flex gap-4">
              <Button variant="outline" className="border-green-200">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                <RefreshCcw className="w-4 h-4 mr-2" />
                Post Trade
              </Button>
            </div>
          )}
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {displayedTrades.map((trade) => (
            <Card key={trade.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="relative aspect-square">
                <img src={trade.image || "/placeholder.svg"} alt={trade.card} className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4">
                  <span className="bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-green-700">
                    {trade.condition}
                  </span>
                  <span className="bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-green-700">
                    {trade.price}
                  </span>
                </div>
              </div>
              <div className="p-4 flex flex-col justify-end">
                <div className="flex flex-col">
                  <h3 className="font-bold mb-2">{trade.card}</h3>
                  <p className="text-sm text-gray-600 mb-4">Posted by {trade.user}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    Chat
                  </Button>
                  <Button variant="outline" size="sm" className="border-green-200 text-green-600">
                    <Search className="w-4 h-4 mr-1" />
                    Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        {preview && (
          <div className="mt-8 text-center">
            <Link to={routes.tradeMarket}>
              <Button variant="outline" className="border-green-200">
                Ver todos los intercambios
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

