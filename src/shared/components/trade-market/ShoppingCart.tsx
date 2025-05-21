"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCartIcon, Trash2 } from "lucide-react"



export const ShoppingCart = ({ cartItems, removeItem }) => {

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <>
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
    </>
  )
}

