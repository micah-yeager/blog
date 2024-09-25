import type { ForwardedRef, RefObject } from "react"
import { useEffect, useMemo, useRef, useSyncExternalStore } from "react"

/**
 * A hook to ensure a ref exists for a component, regardless whether it's
 * provided.
 *
 * @param ref - The ref to forward.
 * @param initialValue - The initial value of the ref. Defaults to `null`.
 * @returns The ref to use in the component.
 */
export const useForwardRef = <T>(
  ref: ForwardedRef<T>,
  initialValue: T | null = null,
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

/**
 * Function to subscribe to window resize events.
 *
 * @param callback - The callback to call on resize.
 * @returns A function to unsubscribe from the event.
 */
function subscribe(callback: (e: Event) => void) {
  window.addEventListener("resize", callback)
  // this syntax removes the event listener on unmount
  return () => {
    window.removeEventListener("resize", callback)
  }
}

/**
 * A hook to get the dimensions of an element.
 *
 * @param ref - The ref of the element to measure.
 */
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
