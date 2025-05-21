import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { Sticker } from "@/shared/app/types"
import { Plus, Minus, Heart, Share2, Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface StickerDialogProps {
  selectedSticker: Sticker | null
  handleQuickAction: (stickerId: number, action: "add" | "remove" | "favorite") => void
  changes: Record<number, { owned: boolean; repeated: number; favorite?: boolean }>
}

export const StickerDialog = ({ selectedSticker, handleQuickAction, changes }: StickerDialogProps) => {
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>
          Editar Cromo #{selectedSticker?.number}
          {selectedSticker?.type === "special" && <Star className="inline-block ml-2 h-4 w-4 text-yellow-500" />}
        </DialogTitle>
        <DialogDescription>Actualiza el estado y la cantidad de este cromo</DialogDescription>
      </DialogHeader>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-medium">Cantidad:</span>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => selectedSticker && handleQuickAction(selectedSticker.id, "remove")}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="font-bold">{selectedSticker && (changes[selectedSticker.id]?.repeated || 0)}</span>
            <Button variant="outline" onClick={() => selectedSticker && handleQuickAction(selectedSticker.id, "add")}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => selectedSticker && handleQuickAction(selectedSticker.id, "favorite")}
          >
            <Heart
              className={cn(
                "h-4 w-4 mr-2",
                selectedSticker && changes[selectedSticker.id]?.favorite && "fill-red-500 text-red-500",
              )}
            />
            Favorito
          </Button>

          <Button variant="outline" className="flex-1">
            <Share2 className="h-4 w-4 mr-2" />
            Compartir
          </Button>
        </div>
      </div>
    </DialogContent>
  )
}

