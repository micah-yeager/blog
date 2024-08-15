import type { ComponentPropsWithoutRef } from "react"
import clsx from "clsx"

/**
 * A label for an input field. Extends the properties of the `div` element.
 *
 * @component
 */
export function InputLabel({
  className,
  children,
  ...rest
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      {...rest}
      className={clsx(
        "inline-block text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100",
        className
      )}
    >
      {children}
    </div>
  )
}
