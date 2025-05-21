"use client"

import { useState, useEffect } from "react"
import type React from "react"
import type { ReactNode } from "react"
import { NavigationBar } from "@/shared/components/NavigationBar"
import { ActionMenu } from "@/shared/components/shared/ActionMenu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useLocation } from "@/shared/use/navigate"
import { AnimatedTabs } from "@/components/ui/animated-tabs"

interface AppLayoutProps {
  children?: ReactNode
  tabs: { value: string; label: string; content: ReactNode }[]
  onTabChange?: (value: string) => void
  selectedTab?: number
  sidebarContent?: ReactNode
  actionMenuVariant?: "quick" | "full"
  sidebarVariant?: "raw" | "card"
  bgVariant?: "green" | "wood" | "darkwood"
  defaultTab?: string
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  tabs,
  onTabChange,
  selectedTab,
  sidebarContent,
  actionMenuVariant = "quick",
  sidebarVariant = "raw",
  bgVariant = "green",
  defaultTab,
}) => {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState<string>(defaultTab || tabs[selectedTab || 0]?.value || "")

  // Handle tab change internally without changing URL
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    if (onTabChange) {
      onTabChange(value)
    }
  }

  // Update active tab if selectedTab prop changes
  useEffect(() => {
    if (selectedTab !== undefined && tabs[selectedTab]) {
      setActiveTab(tabs[selectedTab].value)
    }
  }, [selectedTab, tabs])

  const bg = {
    green: "from-green-50 via-green-40 to-green-50/40",
    darkwood: "from-amber-100/60 via-amber-50 to-amber-50/40",
    wood: "from-yellow-800/10 via-amber-50/40 to-orange-900/20",
    stone: "from-stone-100 via-stone-200 to-stone-300",
  }[bgVariant]

  return (
    <div className={cn("min-h-screen bg-gradient-to-b pt-16", bg)}>
      <NavigationBar />
      <ActionMenu variant={actionMenuVariant} currentPath={location.pathname} />
      <AnimatedTabs value={activeTab} onValueChange={handleTabChange} tabs={tabs}>
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
            <div className={`lg:col-span-${sidebarContent ? 2 : 3} space-y-4`}>
              {children}
              {tabs.map((tab) => (
                <TabsContent key={tab.value} value={tab.value}>
                  {tab.content}
                </TabsContent>
              ))}
            </div>
            {sidebarContent && (
              <div className="space-y-4">
                {sidebarVariant === "card" && <Card className="p-4">{sidebarContent}</Card>}
                {sidebarVariant === "raw" && sidebarContent}
              </div>
            )}
          </div>
        </main>
      </AnimatedTabs>
    </div>
  )
}
