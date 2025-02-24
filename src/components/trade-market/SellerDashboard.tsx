"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select } from "@/components/ui/select"
import { BarChart, Upload, MessageSquare } from "lucide-react"

export const SellerDashboard = ({ isOpen, onClose }) => {
  const [productName, setProductName] = useState("")
  const [productDescription, setProductDescription] = useState("")
  const [productPrice, setProductPrice] = useState("")
  const [productCondition, setProductCondition] = useState("")
  const [shippingCost, setShippingCost] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement product upload logic here
    console.log("Uploading product:", { productName, productDescription, productPrice, productCondition, shippingCost })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Seller Dashboard</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Upload New Product</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input placeholder="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} />
              <Textarea
                placeholder="Product Description"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
              />
              <Input
                type="number"
                placeholder="Price"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
              <Select value={productCondition} onValueChange={setProductCondition} placeholder="Condition">
                <option value="new">New</option>
                <option value="used">Used</option>
                <option value="special-edition">Special Edition</option>
              </Select>
              <Input
                type="number"
                placeholder="Shipping Cost (0 for free shipping)"
                value={shippingCost}
                onChange={(e) => setShippingCost(e.target.value)}
              />
              <Button type="submit" className="w-full">
                <Upload className="w-4 h-4 mr-2" />
                Upload Product
              </Button>
            </form>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Sales Statistics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary/10 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Total Sales</p>
                <p className="text-2xl font-bold">$1,234.56</p>
              </div>
              <div className="bg-primary/10 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Items Sold</p>
                <p className="text-2xl font-bold">42</p>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              <BarChart className="w-4 h-4 mr-2" />
              View Detailed Analytics
            </Button>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Messages</h3>
            <Button variant="outline" className="w-full">
              <MessageSquare className="w-4 h-4 mr-2" />
              View Messages (3 unread)
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

