"use client"

import { AppLayout } from "@/shared/components/layout/AppLayout"
import { TradeMarketSearch } from "@/shared/components/trade-market/TradeMarketSearch"
import { ProductGrid } from "@/shared/components/trade-market/ProductGrid"
import { ProductDetail } from "@/shared/components/trade-market/ProductDetail"
import { ShoppingCart } from "@/shared/components/trade-market/ShoppingCart"
import { SellerDashboard } from "@/shared/components/trade-market/SellerDashboard"
import { useState } from "react"
import { t } from "@/shared/use/i18n"

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


const TradeMarketPage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [cartItems, setCartItems] = useState(mockCartItems)
  const [cartOpen, setCartOpen] = useState(false)

  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product])
  }

  const handleRemoveFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId))
  }

  const tabs = [
    {
      value: "browse",
      label: t("tradeMarket.browse"),
      content: (
        <>

          {selectedProduct ? (
            <ProductDetail
              product={selectedProduct}
              onAddToCart={handleAddToCart}
              onClose={() => setSelectedProduct(null)}
            />
          ) : (
            <ProductGrid onProductSelect={setSelectedProduct} />
          )}
        </>
      ),
    },
    {
      value: "sell",
      label: t("tradeMarket.sell"),
      content: <SellerDashboard isOpen={cartOpen} onClose={() => setCartOpen(false)} />,
    },
  ]

  const sidebarContent = (
    <>
      <TradeMarketSearch />
      <ShoppingCart cartItems={cartItems} removeItem={handleRemoveFromCart} />
    </>
  )

  return <AppLayout tabs={tabs} sidebarContent={sidebarContent} >
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-4">Trade Market</h1>
    </div>
  </AppLayout>
}

export default TradeMarketPage

