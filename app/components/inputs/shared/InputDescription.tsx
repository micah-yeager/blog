import clsx from "clsx"
import type { ComponentPropsWithoutRef } from "react"

/**
 * A description for an input field. Extends the properties of the `div`
 * element.
 *
 * @component
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
