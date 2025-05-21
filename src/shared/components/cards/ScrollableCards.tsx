"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { SectionHeader } from "../shared/SectionHeader"
import { motion } from "framer-motion"
import { VisibleOnScreen } from "@/components/ui/visible-on-screen"

interface ScrollableCardsProps<T> {
  items: T[]
  renderItem: (item: T) => React.ReactNode
  title?: React.ReactNode | string
  placeholder?: string
  itemsPerPage?: number
  categories?: { id: string; name: string }[]
  onLoadMore?: () => void
  className?: string
  children?: React.ReactNode
}

export function ScrollableCards<T>({
  items,
  renderItem,
  title,
  placeholder,
  itemsPerPage = 4,
  categories,
  onLoadMore,
  className,
  children,
}: ScrollableCardsProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  const totalPages = Math.ceil(items.length / itemsPerPage)

  const handleScroll = () => {
    if (!containerRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current
    const canScrollLeft = scrollLeft > 0
    const canScrollRight = scrollLeft + clientWidth < scrollWidth

    setCanScrollLeft(canScrollLeft)
    setCanScrollRight(canScrollRight)
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

  useEffect(() => {
    handleScroll()
  }, [items])

  return (
    <VisibleOnScreen>
      <div
        className={cn("relative space-y-4", className)}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="relative overflow-hidden" ref={containerRef}>
          <div className="flex pb-4 gap-4 transition-transform duration-300 ease-in-out">
            {items.map((item, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 w-64"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                whileHover={{ scale: 1.03 }}
              >
                {renderItem(item)}
              </motion.div>
            ))}

            {/* Load More Card */}
            {onLoadMore && (
              <motion.div
                className="flex-shrink-0 w-64"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: items.length * 0.05, duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card
                  className={cn(
                    "h-full flex items-center justify-center cursor-pointer",
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
              </motion.div>
            )}
          </div>

          {/* Pagination Indicators */}
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

        {/* Navigation Arrows */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-2 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovering || canScrollLeft || canScrollRight ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowButton canScroll={canScrollLeft} onClick={() => scrollTo("left")} icon={ChevronLeft} position="left" />
          <ArrowButton
            canScroll={canScrollRight}
            onClick={() => scrollTo("right")}
            icon={ChevronRight}
            position="right"
          />
        </motion.div>
      </div>
    </VisibleOnScreen>
  )
}

const ArrowButton = ({ canScroll, onClick, icon: Icon, position }) => {
  const intervalRef = useRef(null)

  const startAction = () => {
    intervalRef.current = setInterval(() => {
      onClick()
    }, 300)
  }

  const stopAction = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  return (
    <Button
      variant="secondary"
      size="icon"
      className={cn(
        "transition-all duration-200 shadow-lg pointer-events-auto",
        "bg-background/80 backdrop-blur-sm hover:bg-background",
        position === "left" ? "-translate-x-2" : "translate-x-2",
        canScroll ? "opacity-100" : "opacity-0 pointer-events-none",
      )}
      onClick={onClick}
      onMouseDown={startAction}
      onMouseUp={stopAction}
      onMouseLeave={stopAction}
    >
      <Icon className="h-4 w-4" />
    </Button>
  )
}
