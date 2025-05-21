import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"

const AnimatedTabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, children, ...props }, ref) => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([])
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null)
  const [hoverStyle, setHoverStyle] = React.useState({})
  const [activeStyle, setActiveStyle] = React.useState({})

  const getRects = () => {
    const hovered = hoveredIndex !== null ? tabRefs.current[hoveredIndex] : null
    const active = containerRef.current?.querySelector('[data-state="active"]') as HTMLButtonElement | null

    if (hovered) {
      const { offsetLeft, offsetWidth } = hovered
      setHoverStyle({ left: offsetLeft, width: offsetWidth })
    } else {
      setHoverStyle({})
    }

    if (active) {
      const { offsetLeft, offsetWidth } = active
      setActiveStyle({ left: offsetLeft, width: offsetWidth })
    }
  }

  React.useEffect(() => {
    getRects()
  }, [hoveredIndex, children])

  React.useEffect(() => {
    window.addEventListener("resize", getRects)
    return () => window.removeEventListener("resize", getRects)
  }, [])

  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn("relative flex space-x-2", className)}
      {...props}
    >
      {/* Hover Highlight */}
      <div
        className="absolute top-0 h-[30px] bg-muted rounded-md transition-all duration-300 ease-out pointer-events-none"
        style={{
          ...hoverStyle,
          opacity: hoveredIndex !== null ? 1 : 0,
        }}
      />
      {/* Active Underline */}
      <div
        className="absolute bottom-0 h-[2px] bg-primary transition-all duration-300 ease-out pointer-events-none"
        style={{
          ...activeStyle,
        }}
      />
      {React.Children.map(children, (child, i) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            onMouseEnter: () => setHoveredIndex(i),
            onMouseLeave: () => setHoveredIndex(null),
          } as React.RefAttributes<HTMLButtonElement>)
        }
        return child
      })}
    </TabsPrimitive.List>
  )
})
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "relative inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-colors",
      "text-muted-foreground data-[state=active]:text-foreground focus-visible:outline-none",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const transition = {
  type: 'tween',
  ease: 'easeOut',
  duration: 0.15
};

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AnimatePresence mode="wait">
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={transition}
      className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-lg mt-4 h-[55vh]"
    >
      <TabsPrimitive.Content
        ref={ref}
        className={cn(
          "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className
        )}
        {...props} /></motion.div></AnimatePresence>
))

export { AnimatedTabs, TabsList, TabsTrigger, TabsContent }
