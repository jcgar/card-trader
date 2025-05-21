import { toast } from "sonner"

export const showToast = ({ title, description, duration = null }) => {
  toast({
    title,
    description,
    duration,
  })
}


export const debounce = (callback, wait) => {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      callback(...args);
    }, wait);
  };
}