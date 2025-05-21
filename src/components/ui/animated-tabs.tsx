"use client"

import { useState, useRef, useEffect } from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "@/lib/utils";
import React from "react";

const AnimatedTabs = ({
  tabs,
  value,
  onValueChange,
  children,
}: {
  tabs: { label: string; value: string }[];
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoverStyle, setHoverStyle] = useState({})
  const [activeStyle, setActiveStyle] = useState({ left: "0px", width: "0px" })
  const tabRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (hoveredIndex !== null) {
      const hoveredElement = tabRefs.current[hoveredIndex]
      if (hoveredElement) {
        const { offsetLeft, offsetWidth } = hoveredElement
        setHoverStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        })
      }
    }
  }, [hoveredIndex])

  useEffect(() => {
    const activeElement = tabRefs.current[activeIndex]
    if (activeElement) {
      const { offsetLeft, offsetWidth } = activeElement
      setActiveStyle({
        left: `${offsetLeft}px`,
        width: `${offsetWidth}px`,
      })
    }
  }, [activeIndex])

  useEffect(() => {
    requestAnimationFrame(() => {
      const overviewElement = tabRefs.current[0]
      if (overviewElement) {
        const { offsetLeft, offsetWidth } = overviewElement
        setActiveStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        })
      }
    })
  }, [])

  return (
    <TabsPrimitive.Root value={value} onValueChange={onValueChange} className="relative">
      {/* Hover Highlight */}
      <div
        className="absolute h-[30px] transition-all duration-300 ease-out bg-[#0e0f1114] dark:bg-[#ffffff1a] rounded-[6px] flex items-center"
        style={{
          ...hoverStyle,
          opacity: hoveredIndex !== null ? 1 : 0,
        }}
      />

      {/* Active Indicator */}
      <div
        className="absolute top-[30px] h-[2px] bg-[#0e0f11] dark:bg-white transition-all duration-300 ease-out"
        style={activeStyle}
      />

      {/* Tabs */}
      <TabsPrimitive.List className="relative flex space-x-[6px] items-center">
        {tabs.map((tab, index) => (
          <div
            key={index}
            ref={(el) => (tabRefs.current[index] = el)}
            className={`px-3 py-2 cursor-pointer transition-colors duration-300 h-[30px] ${index === activeIndex ? "text-[#0e0e10] dark:text-white" : "text-[#0e0f1199] dark:text-[#ffffff99]"
              }`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => setActiveIndex(index)}
          >
            <TabsPrimitive.Trigger value={tab.value} className="text-sm leading-5 whitespace-nowrap flex items-center justify-center h-full">
              {tab.label}
            </TabsPrimitive.Trigger>
          </div>
        ))}
      </TabsPrimitive.List>
      {children}
    </TabsPrimitive.Root>
  )
}

TabsPrimitive.TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { AnimatedTabs, TabsContent }