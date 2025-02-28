import { Button } from "@/components/ui/button"
import type { LucideIcon } from "lucide-react"

interface SectionHeaderWithButtonProps {
  title: string
  buttonText: string
  buttonIcon: LucideIcon
  onButtonClick: () => void
}

export const SectionHeaderWithButton = ({
  title,
  buttonText,
  buttonIcon: Icon,
  onButtonClick,
}: SectionHeaderWithButtonProps) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-3xl font-playfair font-bold text-green-800">{title}</h2>
      <Button className="bg-green-600 hover:bg-green-700" onClick={onButtonClick}>
        <Icon className="w-4 h-4 mr-2" />
        {buttonText}
      </Button>
    </div>
  )
}

