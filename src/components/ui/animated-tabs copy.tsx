import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"

const Tabs = TabsPrimitive.Root

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
  const [hovered, setHovered] = React.useState<string | null>(null);
  const tabRefs = React.useRef<Record<string, HTMLButtonElement | null>>({});
  const navRef = React.useRef<HTMLDivElement>(null);

  const hoveredRect = hovered
    ? tabRefs.current[hovered]?.getBoundingClientRect()
    : null;
  const selectedRect = value
    ? tabRefs.current[value]?.getBoundingClientRect()
    : null;
  const navRect = navRef.current?.getBoundingClientRect();

  return (
    <TabsPrimitive.Root value={value} onValueChange={onValueChange}>
      <TabsPrimitive.List
        ref={navRef}
        className="relative flex w-full items-center justify-center py-2"
        onPointerLeave={() => setHovered(null)}
      >
        {/* Trigger Buttons (igual que antes) */}
        {tabs.map((tab) => {
          const isDanger = tab.value === "danger-zone";
          const isActive = value === tab.value;

          return (
            <TabsPrimitive.Trigger
              key={tab.value}
              value={tab.value}
              ref={(el) => (tabRefs.current[tab.value] = el)}
              onPointerEnter={() => setHovered(tab.value)}
              onFocus={() => setHovered(tab.value)}
              className={cn(
                "relative rounded-md px-4 py-1.5 text-sm font-medium transition-colors",
                {
                  "text-zinc-500": !isActive,
                  "text-black dark:text-white font-semibold": isActive,
                }
              )}
            >
              <span className={isDanger ? "text-red-500" : ""}>{tab.label}</span>
            </TabsPrimitive.Trigger>
          );
        })}

        {/* Hover bg */}
        <AnimatePresence>
          {hoveredRect && navRect && (
            <motion.div
              key="hover"
              className={cn(
                "absolute z-10 top-0 left-0 rounded-md h-full",
                hovered === "danger-zone"
                  ? "bg-red-100 dark:bg-red-500/30"
                  : "bg-zinc-100 dark:bg-zinc-800"
              )}
              initial={{ ...getRect(hoveredRect, navRect), opacity: 0 }}
              animate={{ ...getRect(hoveredRect, navRect), opacity: 1 }}
              exit={{ ...getRect(hoveredRect, navRect), opacity: 0 }}
              transition={transition}
            />
          )}
        </AnimatePresence>

        {/* Active bottom border */}
        <AnimatePresence>
          {selectedRect && navRect && (
            <motion.div
              key="active"
              className={cn(
                "absolute z-10 bottom-0 left-0 h-[2px]",
                value === "danger-zone"
                  ? "bg-red-500"
                  : "bg-black dark:bg-white"
              )}
              initial={false}
              animate={{
                width: selectedRect.width + 18,
                x: selectedRect.left - navRect.left - 9,
              }}
              transition={transition}
            />
          )}
        </AnimatePresence>
      </TabsPrimitive.List>

      {/* Aquí renderizamos el contenido */}
      <div className="mt-4">{children}</div>
    </TabsPrimitive.Root>
  );
};


const transition = {
  type: 'tween',
  ease: 'easeOut',
  duration: 0.15
};

const getRect = (
  rect: DOMRect,
  parentRect: DOMRect
): { width: number; height: number; x: number; y: number } => ({
  width: rect.width + 18,
  height: rect.height,
  x: rect.left - parentRect.left - 9,
  y: rect.top - parentRect.top,
});

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
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, AnimatedTabs, TabsContent }
