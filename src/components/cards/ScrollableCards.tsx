"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface ScrollableCardsProps<T> {
  items: T[]
  renderItem: (item: T) => React.ReactNode
  title?: React.ReactNode | string
  itemsPerPage?: number
  onLoadMore?: () => void
  className?: string
}

export function ScrollableCards<T>({
  items,
  renderItem,
  title,
  itemsPerPage = 4,
  onLoadMore,
  className,
}: ScrollableCardsProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)

  const totalPages = Math.ceil(items.length / itemsPerPage)

  const handleScroll = () => {
    // console.log('handleScroll', containerRef.current)
    if (!containerRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth)
    // console.log('handleScroll', containerRef.current, { left: scrollLeft > 0, right: scrollLeft + clientWidth < scrollWidth })
  }

  const scrollTo = (direction: "left" | "right") => {
    if (!containerRef.current) return

    const container = containerRef.current
    const cardWidth = container.children[0]?.clientWidth || 0
    const gap = 16 // gap-4 = 16px
    const scrollAmount = cardWidth + gap

    const newScrollLeft =
      direction === "left" ? container.scrollLeft - scrollAmount : container.scrollLeft + scrollAmount

    container.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    })

    // Update current page based on scroll position
    const newPage = Math.floor(newScrollLeft / (cardWidth * itemsPerPage))
    setCurrentPage(Math.max(0, Math.min(newPage, totalPages - 1)))
  }

  const scrollToPage = (pageIndex: number) => {
    if (!containerRef.current) return

    const container = containerRef.current
    const cardWidth = container.children[0]?.clientWidth || 0
    const gap = 16
    const pageWidth = (cardWidth + gap) * itemsPerPage

    container.scrollTo({
      left: pageWidth * pageIndex,
      behavior: "smooth",
    })

    setCurrentPage(pageIndex)
  }

  useEffect(() => {
    const currentRef = containerRef.current
    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll)
      handleScroll()
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", handleScroll)
      }
    }
  }, [])

  return (
    <div className={cn("relative space-y-4", className)}>
      {title && (
        <div className="flex items-center justify-between px-4">
          {title}
          <div className="flex items-center gap-2">
            <ArrowButton canScroll={canScrollLeft} onClick={() => scrollTo("left")} icon={ChevronLeft} />
            <ArrowButton canScroll={canScrollRight} onClick={() => scrollTo("right")} icon={ChevronRight} />
          </div>
        </div>
      )}

      <div className="relative overflow-hidden" ref={containerRef}>
        <div className="flex pb-4 gap-4 transition-transform duration-300 ease-in-out">
          {items.map((item, index) => (
            <div key={index} className="flex-shrink-0">
              {renderItem(item)}
            </div>
          ))}

          {/* Load More Card */}
          <Card
            className={cn(
              "flex-shrink-0 w-[280px] h-full flex items-center justify-center cursor-pointer",
              "hover:bg-accent hover:text-accent-foreground transition-colors",
              "border-2 border-dashed",
            )}
            onClick={onLoadMore}
          >
            <div className="text-center p-8">
              <Plus className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm font-medium">Cargar más</p>
            </div>
          </Card>
        </div>

        {/* Pagination Indicators */}
      </div>
      {totalPages > 1 && (
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-1.5 h-1.5 rounded-full transition-all duration-200",
                currentPage === index ? "bg-primary w-3" : "bg-primary/50 hover:bg-primary/75",
              )}
              onClick={() => scrollToPage(index)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

const ArrowButton = ({ canScroll, onClick, icon: Icon }) => {

  const intervalRef = useRef(null);

  const startAction = () => {
    intervalRef.current = setInterval(() => {
      onClick()
    }, 300);
  };

  const stopAction = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn("transition-opacity duration-200", canScroll ? "opacity-100" : "opacity-0 pointer-events-none")}
      onMouseDown={startAction}
      onMouseUp={stopAction}
      onMouseLeave={stopAction}
    >
      <Icon className="h-4 w-4" />
    </Button>
  )

}
