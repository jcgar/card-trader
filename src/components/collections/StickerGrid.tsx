"use client"
import { Button } from "@/components/ui/button"
import { Dialog } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useState, useEffect, useRef } from "react"
import { useSwipeable } from "react-swipeable"
import { AnimatePresence } from "framer-motion"
import { Grid, Columns, Plus, ArrowLeft, ArrowRight, Save, Search, Sparkles, BookDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import type { Sticker } from "@/app/types"
import { showToast } from "@/use/ui"
import { StickerList } from "./StickerList"
import { StickerDialog } from "./StickerDialog"
import { t } from "@/use/i18n"

type LayoutType = "scroll" | "grid" | "album"
type FilterType = "all" | "missing" | "repeated" | "special" | "favorites"

export const StickerGrid = ({ stickerGroups }) => {
  const isMobile = useIsMobile()
  const [layout, setLayout] = useState<LayoutType>(isMobile ? "grid" : "album")
  const [currentPage, setCurrentPage] = useState(1)
  const [filterType, setFilterType] = useState<FilterType>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [changes, setChanges] = useState<Record<number, { owned: boolean; repeated: number; favorite?: boolean }>>({})
  const [selectedSticker, setSelectedSticker] = useState<Sticker | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isBulkEditing, setIsBulkEditing] = useState(false)
  const [selectedBulkStickers, setSelectedBulkStickers] = useState<number[]>([])
  const albumRef = useRef<HTMLDivElement>(null)

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (isMobile) {
        nextPage()
        vibrate()
      }
    },
    onSwipedRight: () => {
      if (isMobile) {
        previousPage()
        vibrate()
      }
    },
  })

  const vibrate = () => {
    if ("vibrate" in navigator) {
      navigator.vibrate(50)
    }
  }

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault()
        e.returnValue = ""
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  }, [hasUnsavedChanges])

  const handleStickerClick = (sticker: Sticker) => {
    if (isBulkEditing) {
      toggleBulkSelection(sticker.id)
    } else {
      setSelectedSticker(sticker)
      setIsEditing(true)
    }
  }

  const isSelected = (sticker) => isBulkEditing && selectedBulkStickers.includes(sticker.id)
  const toggleBulkSelection = (stickerId: number) => {
    setSelectedBulkStickers((prev) =>
      prev.includes(stickerId) ? prev.filter((id) => id !== stickerId) : [...prev, stickerId],
    )
  }

  const handleQuickAction = (stickerId: number, action: "add" | "remove" | "favorite") => {
    setHasUnsavedChanges(true)
    setChanges((prev) => {
      const current = prev[stickerId] || { owned: true, repeated: 0 }

      if (action === "favorite") {
        return {
          ...prev,
          [stickerId]: {
            ...current,
            favorite: !current.favorite,
          },
        }
      }

      return {
        ...prev,
        [stickerId]: {
          ...current,
          owned: action === "add",
          repeated: action === "add" ? current.repeated + 1 : Math.max(0, current.repeated - 1),
        },
      }
    })

    playSound()
    showToastFromAction(action, stickerId)
    checkPageCompletion()
  }

  const playSound = () => {
    const audio = new Audio("/assets/click.mp3")
    audio.play()
  }

  const showToastFromAction = (action: string, stickerId: number) => {
    const messages = {
      add: "Cromo añadido",
      remove: "Cromo eliminado",
      favorite: "Añadido a favoritos",
    }

    showToast({
      title: messages[action],
      description: `Cromo #${stickerId} ${action === "add" ? "añadido a" : "eliminado de"} tu colección`,
    })
  }

  const checkPageCompletion = () => {
    const pageStickers = getCurrentPageStickers()
    const isPageComplete = pageStickers.every((s) => s.owned || changes[s.id]?.owned)

    if (isPageComplete) {
      showToast({
        title: "¡Página completada! 🎉",
        description: "Has completado todos los cromos de esta página",
      })

      if (albumRef.current) {
        albumRef.current.classList.add("animate-shine")
        setTimeout(() => {
          albumRef.current?.classList.remove("animate-shine")
        }, 1000)
      }
    }
  }

  const handleBulkEdit = () => {
    setHasUnsavedChanges(true)
    const newChanges = { ...changes }
    selectedBulkStickers.forEach((id) => {
      newChanges[id] = { owned: true, repeated: 0 }
    })
    setChanges(newChanges)

    showToast({
      title: "Edición masiva completada",
      description: `Se han actualizado ${selectedBulkStickers.length} cromos`,
    })

    setIsBulkEditing(false)
    setSelectedBulkStickers([])
  }

  const handleSaveChanges = () => {
    // Aquí iría la lógica para guardar en el backend
    showToast({
      title: "Cambios guardados",
      description: "Todos los cambios han sido guardados correctamente",
    })
    setHasUnsavedChanges(false)
  }

  const nextPage = () => setCurrentPage((p) => Math.min(totalPages, p + 1))
  const previousPage = () => setCurrentPage((p) => Math.max(1, p - 1))

  const itemsPerPage = layout === "album" ? 12 : 24
  const totalPages = Math.ceil((stickerGroups.length * 24) / itemsPerPage)
  const stickers = stickerGroups.flatMap((g) => g.stickers)

  const getCurrentPageStickers = () => {
    // Aplicar filtros
    let stickersPage = stickers.filter((sticker) => {
      const change = changes[sticker.id]
      const isOwned = change ? change.owned : sticker.owned
      const repeated = change ? change.repeated : sticker.repeated
      const isFavorite = change?.favorite

      switch (filterType) {
        case "missing":
          return !isOwned
        case "repeated":
          return repeated > 0
        case "special":
          return sticker.type === "special"
        case "favorites":
          return isFavorite
        default:
          return true
      }
    })

    // Aplicar búsqueda
    if (searchTerm) {
      stickersPage = stickers.filter(
        (sticker) =>
          sticker.number.toString().includes(searchTerm) ||
          sticker.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    return stickers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  }

  return (
    <div className="space-y-6" {...handlers}>
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="flex gap-2">
          <Button
            variant={layout === "scroll" ? "default" : "outline"}
            onClick={() => setLayout("scroll")}
            className="tooltip"
            data-tip={t("collections.scrollView")}
          >
            <BookDown className="h-4 w-4" />
          </Button>
          <Button
            variant={layout === "grid" ? "default" : "outline"}
            onClick={() => setLayout("grid")}
            className="tooltip"
            data-tip={t("collections.gridView")}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={layout === "album" ? "default" : "outline"}
            onClick={() => setLayout("album")}
            className="tooltip"
            data-tip={t("collections.albumView")}
          >
            <Columns className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 max-w-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder={t("collections.searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setFilterType("all")}
            className={cn(filterType === "all" && "bg-primary text-primary-foreground")}
          >
            {t("collections.allStickers")}
          </Button>
          <Button
            variant="outline"
            onClick={() => setFilterType("missing")}
            className={cn(filterType === "missing" && "bg-primary text-primary-foreground")}
          >
            {t("collections.missingStickers")}
          </Button>
          <Button
            variant="outline"
            onClick={() => setFilterType("repeated")}
            className={cn(filterType === "repeated" && "bg-primary text-primary-foreground")}
          >
            {t("collections.repeatedStickers")}
          </Button>
          <Button
            variant="outline"
            onClick={() => setFilterType("special")}
            className={cn(filterType === "special" && "bg-primary text-primary-foreground")}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {t("collections.specialStickers")}
          </Button>
        </div>

        <div className="flex gap-2">
          {!isBulkEditing ? (
            <Button variant="outline" onClick={() => setIsBulkEditing(true)} className="text-blue-600">
              <Plus className="h-4 w-4 mr-2" />
              {t("collections.bulkEdit")}
            </Button>
          ) : (
            <>
              <Button
                variant="default"
                onClick={handleBulkEdit}
                disabled={selectedBulkStickers.length === 0}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Save className="h-4 w-4 mr-2" />
                {t("collections.apply", { count: selectedBulkStickers.length })}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsBulkEditing(false)
                  setSelectedBulkStickers([])
                }}
              >
                {t("common.cancel")}
              </Button>
            </>
          )}
        </div>

        {hasUnsavedChanges && (
          <Button onClick={handleSaveChanges} className="bg-green-600 hover:bg-green-700">
            <Save className="w-4 h-4 mr-2" />
            {t("collections.saveChanges")}
          </Button>
        )}
      </div>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <StickerDialog selectedSticker={selectedSticker} handleQuickAction={handleQuickAction} changes={changes} />
      </Dialog>

      <div ref={albumRef} className="relative">
        <AnimatePresence mode="wait">
          <StickerList
            layout={layout}
            stickers={layout === "scroll" ? stickers : getCurrentPageStickers()}
            onClick={handleStickerClick}
            isSelected={isSelected}
          />
        </AnimatePresence>

        {layout !== "scroll" && (
          <div className="mt-6 flex justify-center gap-4">
            <Button variant="outline" onClick={previousPage} disabled={currentPage === 1}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <span className="py-2">{t("collections.pageInfo", { current: currentPage, total: totalPages })}</span>
            <Button variant="outline" onClick={nextPage} disabled={currentPage === totalPages}>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

