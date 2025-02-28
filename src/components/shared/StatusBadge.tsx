import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface StatusBadgeProps {
  status: "pending" | "active" | "completed" | "cancelled"
  className?: string
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-800",
    active: "bg-green-100 text-green-800",
    completed: "bg-blue-100 text-blue-800",
    cancelled: "bg-red-100 text-red-800",
  }

  return (
    <Badge className={cn(statusStyles[status], className)}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
  )
}

