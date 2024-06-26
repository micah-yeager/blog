import type { ComponentPropsWithoutRef } from "react"
import clsx from "clsx"

export function Prose({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={clsx(
        className,
        // Tweak vertical margins between lists and list items
        "prose dark:prose-invert"
      )}
      {...props}
    />
  )
}
