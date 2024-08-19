import type { ComponentPropsWithoutRef } from "react"
import clsx from "clsx"

/**
 * A description for an input field. Extends the properties of the `div`
 * element.
 */
export function InputDescription({
  className,
  children,
  ...rest
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div {...rest} className={clsx("text-sm text-zinc-500", className)}>
      {children}
    </div>
  )
}
