"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "../ui/card"
import { Button } from "../ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Badge } from "../ui/badge"
import { Heart, ShoppingCart, MessageCircle, Clock, Star, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { routes } from "@/use/routes"
import { t } from "@/use/i18n"

interface TradeItem {
  id: number
  name: string
  category: string
  condition: "New" | "Used"
  price: number
  shippingCost: number
  stock: number
  image: string
  isRare?: boolean
  isLimitedEdition?: boolean
  isAuction?: boolean
  auctionEndsIn?: number
  recentlySold?: boolean
}

const mockItems: TradeItem[] = [
  {
    id: 1,
    name: "Pokémon TCG: Sword & Shield Base Set",
    category: "Albums",
    condition: "New",
    price: 49.99,
    shippingCost: 5.99,
    stock: 10,
    image: "/placeholder.svg?height=100&width=100",
    isRare: true,
    isAuction: true,
    auctionEndsIn: 3600, // 1 hour in seconds
  },
  {
    id: 2,
    name: "Magic: The Gathering Booster Pack",
    category: "Packs",
    condition: "New",
    price: 4.99,
    shippingCost: 2.99,
    stock: 50,
    image: "/placeholder.svg?height=100&width=100",
    isLimitedEdition: true,
  },
  {
    id: 3,
    name: "Charizard Holo Rare",
    category: "Cards",
    condition: "Used",
    price: 199.99,
    shippingCost: 9.99,
    stock: 1,
    image: "/placeholder.svg?height=100&width=100",
    isRare: true,
    recentlySold: true,
  },
]

const mockSellers = [
  { id: 1, name: "CardMaster", rating: 4.9, sales: 1000 },
  { id: 2, name: "RareFinds", rating: 4.8, sales: 750 },
  { id: 3, name: "CollectiblesHub", rating: 4.7, sales: 500 },
]

interface TradeMarketProps {
  preview?: boolean
}

export const TradeMarket: React.FC<TradeMarketProps> = ({ preview = false }) => {
  const [activeTab, setActiveTab] = useState("albums")

  const renderTradeItem = (item: TradeItem) => (
    <Card key={item.id} className="flex p-4 space-x-4">
      <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-20 h-20 object-cover rounded" />
      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-600">
              {item.category} • {item.condition}
            </p>
          </div>
          <div className="flex space-x-2">
            {item.isRare && <Badge variant="secondary">Rare</Badge>}
            {item.isLimitedEdition && <Badge variant="secondary">Limited Edition</Badge>}
          </div>
        </div>
        <div className="mt-2 flex justify-between items-center">
          <div>
            <p className="font-bold">${item.price.toFixed(2)}</p>
            <p className="text-sm text-gray-600">+${item.shippingCost.toFixed(2)} shipping</p>
          </div>
          <p className="text-sm">{item.stock} in stock</p>
        </div>
        <div className="mt-2 flex justify-between items-center">
          <div className="flex space-x-2">
            <Button size="sm">{item.isAuction ? "Bid" : "Buy"}</Button>
            <Button size="sm" variant="ghost">
              <Heart className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost">
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>
          <Button size="sm" variant="ghost">
            <MessageCircle className="w-4 h-4" />
          </Button>
        </div>
        {item.isAuction && item.auctionEndsIn && (
          <div className="mt-2 flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-1" />
            Ends in {Math.floor(item.auctionEndsIn / 3600)}h {Math.floor((item.auctionEndsIn % 3600) / 60)}m
          </div>
        )}
        {item.recentlySold && (
          <Badge variant="outline" className="mt-2">
            Recently Sold
          </Badge>
        )}
      </div>
    </Card>
  )

  const renderTopSellers = () => (
    <div className="space-y-4">
      {mockSellers.map((seller) => (
        <Card key={seller.id} className="flex items-center justify-between p-4">
          <div>
            <h3 className="font-semibold">{seller.name}</h3>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              <span>{seller.rating}</span>
            </div>
          </div>
          <p className="text-sm text-gray-600">{seller.sales} sales</p>
        </Card>
      ))}
    </div>
  )

  return (
    <section className={`py-${preview ? "10" : "20"}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">{t("tradeMarket.title")}</h2>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="albums">{t("tradeMarket.albums")}</TabsTrigger>
            <TabsTrigger value="packs">{t("tradeMarket.packs")}</TabsTrigger>
            <TabsTrigger value="cards">{t("tradeMarket.cards")}</TabsTrigger>
            <TabsTrigger value="sellers">{t("tradeMarket.topSellers")}</TabsTrigger>
          </TabsList>
          <TabsContent value="albums" className="space-y-4 mt-4">
            {mockItems.filter((item) => item.category === "Albums").map(renderTradeItem)}
          </TabsContent>
          <TabsContent value="packs" className="space-y-4 mt-4">
            {mockItems.filter((item) => item.category === "Packs").map(renderTradeItem)}
          </TabsContent>
          <TabsContent value="cards" className="space-y-4 mt-4">
            {mockItems.filter((item) => item.category === "Cards").map(renderTradeItem)}
          </TabsContent>
          <TabsContent value="sellers" className="mt-4">
            {renderTopSellers()}
          </TabsContent>
        </Tabs>
        <div className="mt-8 text-center">
          <Link to={routes.tradeMarket}>
            <Button variant="outline" className="border-green-200">
              {t("tradeMarket.exploreAll")}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

