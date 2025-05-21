"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Grid, List, Star } from "lucide-react"

const mockProducts = [
  {
    id: 1,
    name: "Pokémon TCG: Sword & Shield Base Set Booster Box",
    image: "/placeholder.svg?height=300&width=300",
    price: 119.99,
    condition: "New",
    rarity: "Rare",
    sellerRating: 4.8,
    shipping: "Free Shipping",
  },
  // Add more mock products here
]

export const ProductGrid = ({ onProductSelect }) => {
  const [viewMode, setViewMode] = useState("grid")

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Products</h2>
        <div>
          <Button
            variant="outline"
            onClick={() => setViewMode("grid")}
            className={viewMode === "grid" ? "bg-primary text-primary-foreground" : ""}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() => setViewMode("list")}
            className={viewMode === "list" ? "bg-primary text-primary-foreground" : ""}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div
        className={`grid gap-4 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-1"}`}
      >
        {mockProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className="relative aspect-square">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 space-x-1">
                {product.condition === "New" && (
                  <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">New</span>
                )}
                {product.rarity === "Rare" && (
                  <span className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-semibold">Rare</span>
                )}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2">{product.name}</h3>
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span>{product.sellerRating}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">{product.shipping}</p>
              <Button className="w-full mt-4" onClick={() => onProductSelect(product)}>
                View Details
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

