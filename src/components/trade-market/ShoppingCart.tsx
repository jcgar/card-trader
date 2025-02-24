"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ShoppingCartIcon, Trash2 } from "lucide-react"

const mockCartItems = [
  {
    id: 1,
    name: "Pokémon TCG: Sword & Shield Base Set Booster Box",
    price: 119.99,
    quantity: 1,
    image: "/placeholder.svg?height=100&width=100",
  },
  // Add more mock cart items here
]

export const ShoppingCart = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState(mockCartItems)

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Shopping Cart</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center space-x-4">
              <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-16 h-16 object-cover rounded" />
              <div className="flex-grow">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                <p className="font-bold">${item.price.toFixed(2)}</p>
              </div>
              <Button variant="ghost" onClick={() => removeItem(item.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
        <div className="mt-6 border-t pt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">Total:</span>
            <span className="font-bold text-lg">${total.toFixed(2)}</span>
          </div>
          <Button className="w-full">
            <ShoppingCartIcon className="w-4 h-4 mr-2" />
            Proceed to Checkout
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

