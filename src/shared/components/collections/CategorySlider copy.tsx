"use client"

import { useRef, useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Users, Heart, Archive } from "lucide-react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useInView } from "framer-motion"
import { cn } from "@/lib/utils"
import type { Collection } from "@/shared/app/types"

interface CategorySliderProps {
  title: string
  collections: Collection[]
}

export const CategorySlider = ({ title, collections }: CategorySliderProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 5
  const totalPages = Math.ceil(collections.length / itemsPerPage)

  const handleScroll = () => {
    if (!containerRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth)
  }

  const scroll = (direction: "left" | "right") => {
    const newPage = direction === "left" ? Math.max(0, currentPage - 1) : Math.min(totalPages - 1, currentPage + 1)

    setCurrentPage(newPage)

    if (containerRef.current) {
      const offset = newPage * (containerRef.current.clientWidth - 48) // 48px for padding
      containerRef.current.scrollTo({
        left: offset,
        behavior: "smooth",
      })
    }
  }

  useEffect(() => {
    const currentRef = containerRef.current
    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll)
      // Check initial scroll state
      handleScroll()
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", handleScroll)
      }
    }
  }, [])

  // Calculate total stats for the category
  const categoryStats = {
    totalCollectors: collections.reduce((sum, col) => sum + col.activeUsers, 0),
    totalLikes: collections.reduce((sum, col) => sum + col.likes, 0),
  }

  return (
    <div className="relative group space-y-4">
      <div className="px-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">{title}</h2>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
              <span className="flex items-center gap-1">
                <Archive className="h-4 w-4" />
                {collections.length} colecciones
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {categoryStats.totalCollectors} coleccionistas
              </span>
              <span className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                {categoryStats.totalLikes} likes
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "transition-opacity duration-200",
                canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none",
              )}
              onClick={() => scroll("left")}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "transition-opacity duration-200",
                canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none",
              )}
              onClick={() => scroll("right")}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden" ref={containerRef}>
        <ScrollArea className="w-full">
          <div
            className={cn(
              "flex gap-4 px-4 transition-opacity duration-500",
              !isInView && "opacity-0",
              isInView && "opacity-100",
            )}
          >
            {collections.map((collection) => (
              <Card
                key={collection.id}
                className="flex-shrink-0 w-[280px] overflow-hidden group/card hover:shadow-lg transition-shadow duration-200"
              >
                <div className="relative aspect-[16/9]">
                  {isInView && (
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="w-full h-full object-cover transition-transform duration-200 group-hover/card:scale-105"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 p-4 w-full">
                    <h3 className="text-white font-semibold text-lg">{collection.name}</h3>
                    <div className="flex items-center gap-4 text-white/80 text-sm">
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {collection.activeUsers}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        {collection.likes}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <ScrollBar
            orientation="horizontal"
            className="opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          />
        </ScrollArea>

        {/* Pagination indicators */}
        <div className="absolute bottom-4 right-4 flex gap-1">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-1.5 h-1.5 rounded-full transition-all duration-200",
                currentPage === index ? "bg-white w-3" : "bg-white/50 hover:bg-white/75",
              )}
              onClick={() => {
                setCurrentPage(index)
                if (containerRef.current) {
                  const offset = index * (containerRef.current.clientWidth - 48)
                  containerRef.current.scrollTo({
                    left: offset,
                    behavior: "smooth",
                  })
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

