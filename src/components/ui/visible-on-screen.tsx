import { useEffect, useState, useRef, PropsWithChildren } from "react"

type VisibleOnScreenProps = {
  rootMargin?: string
  threshold?: number
  once?: boolean
}

export const VisibleOnScreen = ({
  children,
  rootMargin = "0px",
  threshold = 0,
  once = true,
}: PropsWithChildren<VisibleOnScreenProps>) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setIsVisible(false)
        }
      },
      {
        rootMargin,
        threshold,
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin, threshold, once])

  return <div ref={ref}>{isVisible ? children : null}</div>
}
