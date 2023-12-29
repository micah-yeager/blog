import type { ForwardedRef, RefObject } from "react"
import { useEffect, useMemo, useRef, useSyncExternalStore } from "react"

export const useForwardRef = <T>(
  ref: ForwardedRef<T>,
  initialValue: any = null,
) => {
  const targetRef = useRef<T>(initialValue)

  useEffect(() => {
    if (!ref) return

    if (typeof ref === "function") {
      ref(targetRef.current)
    } else {
      ref.current = targetRef.current
    }
  }, [ref])

  return targetRef
}

function subscribe(callback: (e: Event) => void) {
  window.addEventListener("resize", callback)
  // this syntax removes the event listener on unmount
  return () => {
    window.removeEventListener("resize", callback)
  }
}

export function useDimensions(ref: RefObject<HTMLElement>) {
  function getSnapshot() {
    return JSON.stringify({
      width: ref.current?.offsetWidth ?? 0,
      height: ref.current?.offsetHeight ?? 0,
    })
  }

  const dimensions = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
  return useMemo(() => JSON.parse(dimensions), [dimensions])
}
