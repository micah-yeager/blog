import clsx from "clsx"
import type { ComponentPropsWithoutRef } from "react"

/**
 * A hint for an optional input field. Extends the properties of the `span`
 * element.
 *
 * @component
 */
export function InputOptionalHint({
  className,
  children,
  ...rest
}: ComponentPropsWithoutRef<"span">) {
  return (
    <span
      {...rest}
      className={clsx("text-sm leading-6 text-zinc-500", className)}
    >
      {children}
    </span>
  )
}
