"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ShoppingCart, MessageCircle, Star } from "lucide-react"

export const ProductDetail = ({ product, onClose, onAddToCart }) => {
  const [currentImage, setCurrentImage] = useState(0)
  const images = [product.image, "/placeholder.svg?height=300&width=300", "/placeholder.svg?height=300&width=300"]

  return (
    <Card className="p-6">
      <Button variant="ghost" onClick={onClose} className="mb-4">
        ← Back to results
      </Button>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="aspect-square mb-4">
            <img
              src={images[currentImage] || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="flex space-x-2">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-20 h-20 rounded-md overflow-hidden ${currentImage === index ? "ring-2 ring-primary" : ""}`}
              >
                <img
                  src={img || "/placeholder.svg"}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
          <div className="flex items-center mb-4">
            <Star className="w-5 h-5 text-yellow-400 mr-1" />
            <span className="font-semibold mr-2">{product.sellerRating}</span>
            <span className="text-gray-600">Seller Rating</span>
          </div>
          <p className="text-3xl font-bold mb-4">${product.price.toFixed(2)}</p>
          <p className="mb-4">{product.shipping}</p>
          <div className="space-y-4 mb-6">
            <Button className="w-full" onClick={() => onAddToCart(product.id)}>
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
            <Button variant="outline" className="w-full">
              <MessageCircle className="w-4 h-4 mr-2" />
              Contact Seller
            </Button>
          </div>
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2">Product Details</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Condition: {product.condition}</li>
              <li>Rarity: {product.rarity}</li>
              <li>Edition: 1st Edition</li>
              <li>Year: 2023</li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  )
}

