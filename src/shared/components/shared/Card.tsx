import type React from "react"
import { cn } from "@/lib/utils"
import { Card as ShadcnCard, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface CardProps extends React.ComponentProps<typeof ShadcnCard> {
  header?: React.ReactNode
  footer?: React.ReactNode
  hoverable?: boolean
}

export const Card = ({ className, header, children, footer, hoverable = false, ...props }: CardProps) => {
  return (
    <ShadcnCard className={cn(className, hoverable && "transition-shadow hover:shadow-md")} {...props}>
      {header && <CardHeader>{header}</CardHeader>}
      <CardContent>{children}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </ShadcnCard>
  )
}

