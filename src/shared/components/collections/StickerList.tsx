"use client"

import { motion } from "framer-motion"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { StickerCard } from "../cards/StickerCard"

export const StickerList = ({ layout, stickers, onClick, isSelected }) => {
  const stickerCards = stickers.map((sticker) => (
    <StickerCard key={sticker.id} sticker={sticker} isSelected={isSelected(sticker)} onClick={onClick} />
  ))

  return (
    <motion.div layout>
      {layout === "scroll" ? (
        <ScrollArea className="w-full h-[500px] rounded-lg border">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">{stickerCards}</div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      ) : (
        <motion.div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-1">{stickerCards}</motion.div>
      )}
    </motion.div>
  )
}

