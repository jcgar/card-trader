"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Select } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Search } from "lucide-react"

export const TradeMarketHeader = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [productType, setProductType] = useState("")
  const [theme, setTheme] = useState("")
  const [condition, setCondition] = useState("")
  const [sellerLocation, setSellerLocation] = useState("")
  const [shipsToMyCountry, setShipsToMyCountry] = useState(false)
  const [maxShippingCost, setMaxShippingCost] = useState(50)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search logic here
    console.log("Searching with filters:", {
      searchTerm,
      priceRange,
      productType,
      theme,
      condition,
      sellerLocation,
      shipsToMyCountry,
      maxShippingCost,
    })
  }

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-4">Trade Market</h1>
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Select value={productType} onValueChange={setProductType} placeholder="Product Type">
            <option value="album">Album</option>
            <option value="complete-album">Complete Album</option>
            <option value="pack">Pack</option>
            <option value="individual-cards">Individual Cards</option>
          </Select>
          <Select value={theme} onValueChange={setTheme} placeholder="Theme">
            <option value="sports">Sports</option>
            <option value="movies">Movies</option>
            <option value="anime">Anime</option>
            <option value="videogames">Video Games</option>
          </Select>
          <Select value={condition} onValueChange={setCondition} placeholder="Condition">
            <option value="new">New</option>
            <option value="used">Used</option>
            <option value="special-edition">Special Edition</option>
          </Select>
          <Input
            type="text"
            placeholder="Seller Location"
            value={sellerLocation}
            onChange={(e) => setSellerLocation(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-4">
          <Checkbox
            id="shipsToMyCountry"
            checked={shipsToMyCountry}
            onCheckedChange={(checked) => setShipsToMyCountry(checked as boolean)}
          />
          <label htmlFor="shipsToMyCountry">Only sellers that ship to my country</label>
        </div>
        <div className="space-y-2">
          <label>Max Shipping Cost: ${maxShippingCost}</label>
          <Slider
            min={0}
            max={100}
            step={1}
            value={[maxShippingCost]}
            onValueChange={(value) => setMaxShippingCost(value[0])}
          />
        </div>
        <div className="space-y-2">
          <label>
            Price Range: ${priceRange[0]} - ${priceRange[1]}
          </label>
          <Slider
            min={0}
            max={1000}
            step={10}
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as [number, number])}
          />
        </div>
      </form>
    </div>
  )
}

