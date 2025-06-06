import clsx from "clsx"
import type { ComponentPropsWithoutRef } from "react"

/**
 * A component for rendering contents with TailwindCSS prose styling.
 *
 * @see {@link HTMLDivElement}
 */
export function Prose({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={clsx(
        className,
        // Tweak vertical margins between lists and list items
        "prose dark:prose-invert",
      )}
      {...props}
    />
  )
}
