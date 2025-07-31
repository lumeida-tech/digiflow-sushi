import { useState, useEffect, useRef } from "react"

// Hook personnalisé pour détecter la visibilité des sections
export function useInView(options = {}) {
  const [isInView, setIsInView] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.unobserve(element) // Une fois animé, on n'observe plus
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
        ...options,
      },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [ref, options])

  return [(node: HTMLElement | null) => {
    if (node) {
      ref.current = node
    }
  }, isInView]
}