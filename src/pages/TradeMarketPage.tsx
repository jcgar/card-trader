"use client"

import { useState } from "react"
import { NavigationBar } from "@/components/NavigationBar"
import { TradeMarketHeader } from "@/components/trade-market/TradeMarketHeader"
import { ProductGrid } from "@/components/trade-market/ProductGrid"
import { ProductDetail } from "@/components/trade-market/ProductDetail"
import { ShoppingCart } from "@/components/trade-market/ShoppingCart"
import { SellerDashboard } from "@/components/trade-market/SellerDashboard"

const TradeMarketPage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [sellerDashboardOpen, setSellerDashboardOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-white">
      <NavigationBar />
      <main className="container mx-auto px-8 py-24">
        <TradeMarketHeader />
        {selectedProduct ? (
          <ProductDetail product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        ) : (
          <ProductGrid onProductSelect={setSelectedProduct} />
        )}
        <ShoppingCart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
        <SellerDashboard isOpen={sellerDashboardOpen} onClose={() => setSellerDashboardOpen(false)} />
      </main>
    </div>
  )
}

export default TradeMarketPage

