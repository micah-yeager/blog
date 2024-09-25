import clsx from "clsx"
import type { ComponentPropsWithoutRef } from "react"

/**
 * An error message for an input field. Extends the properties of the `div`
 * element.
 *
 * @component
 */
export function InputError({
  className,
  children,
  ...rest
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      {...rest}
      className={clsx("text-sm text-red-600 dark:text-red-400", className)}
    >
      {children}
    </div>
  )
}
