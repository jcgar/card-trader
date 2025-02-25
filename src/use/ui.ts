import { toast } from "sonner"

export const showToast = ({ title, description, duration = null }) => {
  toast({
    title,
    description,
    duration,
  })
}

