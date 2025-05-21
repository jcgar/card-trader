"use client"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Grid2x2, Layers, Target, Zap } from 'lucide-react'
import { useEffect, useState } from "react"

export type VisualizationType = "user-intent" | "progressive" | "visual" | "power-user"

interface VisualizationToggleProps {
  onVisualizationChange: (type: VisualizationType) => void
  currentVisualization: VisualizationType
}

export const VisualizationToggle: React.FC<VisualizationToggleProps> = ({
  onVisualizationChange,
  currentVisualization,
}) => {
  return (
    <TooltipProvider>
      <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm rounded-full p-1 border shadow-sm">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={currentVisualization === "user-intent" ? "default" : "ghost"}
              size="icon"
              className="rounded-full h-8 w-8"
              onClick={() => onVisualizationChange("user-intent")}
            >
              <Target className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Enfoque por objetivos del usuario</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={currentVisualization === "progressive" ? "default" : "ghost"}
              size="icon"
              className="rounded-full h-8 w-8"
              onClick={() => onVisualizationChange("progressive")}
            >
              <Layers className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Enfoque por experiencia gradual</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={currentVisualization === "visual" ? "default" : "ghost"}
              size="icon"
              className="rounded-full h-8 w-8"
              onClick={() => onVisualizationChange("visual")}
            >
              <Grid2x2 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Enfoque visual y temático</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={currentVisualization === "power-user" ? "default" : "ghost"}
              size="icon"
              className="rounded-full h-8 w-8"
              onClick={() => onVisualizationChange("power-user")}
            >
              <Zap className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Enfoque power-user</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}

// Hook to manage visualization type with localStorage persistence
export const useVisualization = () => {
  const [visualization, setVisualization] = useState<VisualizationType>("user-intent")

  useEffect(() => {
    // Load from localStorage on mount
    const savedVisualization = localStorage.getItem("preferred-visualization") as VisualizationType
    if (savedVisualization) {
      setVisualization(savedVisualization)
    }
  }, [])

  const changeVisualization = (type: VisualizationType) => {
    setVisualization(type)
    localStorage.setItem("preferred-visualization", type)
  }

  return { visualization, changeVisualization }
}
