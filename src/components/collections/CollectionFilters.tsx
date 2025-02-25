"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Filter, Search, Plus, Minus, RefreshCw } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { t } from "@/use/i18n"

export const CollectionFilters = () => {
  const [filterType, setFilterType] = useState("all")
  const [numberInput, setNumberInput] = useState("")
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([])
  const [stickerType, setStickerType] = useState("all")

  const handleNumberInput = (value: string) => {
    setNumberInput(value)
    const numbers = value
      .split(",")
      .map((n) => Number.parseInt(n.trim()))
      .filter((n) => !isNaN(n))
    setSelectedNumbers(numbers)
  }

  const handleAddSelection = () => {
    // Here we would update all selected stickers as owned
    console.log("Adding stickers:", selectedNumbers)
  }

  const handleRemoveSelection = () => {
    // Here we would update all selected stickers as not owned
    console.log("Removing stickers:", selectedNumbers)
  }

  return (
    <Card className="p-6">
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px]">
          <Label htmlFor="search">{t("collections.searchByNumber")}</Label>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="search"
              className="pl-9"
              placeholder={t("collections.searchPlaceholder")}
              value={numberInput}
              onChange={(e) => handleNumberInput(e.target.value)}
            />
          </div>
        </div>

        <div className="w-[200px]">
          <Label>{t("collections.stickerType")}</Label>
          <Select value={stickerType} onValueChange={setStickerType}>
            <SelectTrigger>
              <SelectValue placeholder={t("collections.selectType")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("collections.allTypes")}</SelectItem>
              <SelectItem value="regular">{t("collections.regularTypes")}</SelectItem>
              <SelectItem value="special">{t("collections.specialTypes")}</SelectItem>
              <SelectItem value="album">{t("collections.albumTypes")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="group">
              <Filter className="mr-2 h-4 w-4 group-hover:rotate-180 transition-transform" />
              {t("collections.actions")}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={handleAddSelection}>
              <Plus className="mr-2 h-4 w-4 text-green-500" />
              {t("collections.addSelection")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleRemoveSelection}>
              <Minus className="mr-2 h-4 w-4 text-red-500" />
              {t("collections.removeSelection")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedNumbers([])}>
              <RefreshCw className="mr-2 h-4 w-4" />
              {t("collections.resetFilters")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {selectedNumbers.length > 0 && (
        <div className="mt-4 p-3 bg-green-50 rounded-lg animate-fade-in">
          <p className="text-sm text-green-700">
            {t("collections.selectedNumbers", { numbers: selectedNumbers.join(", ") })}
          </p>
        </div>
      )}
    </Card>
  )
}

