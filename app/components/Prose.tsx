import clsx from "clsx"
import type { ComponentPropsWithoutRef } from "react"

export function Prose({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={clsx(
        className,
        // Tweak vertical margins between lists and list items
        "prose dark:prose-invert prose-ol:my-7 prose-ul:my-7 prose-li:my-0",
      )}
      {...props}
    />
  )
}
