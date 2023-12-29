import clsx from "clsx"
import type { ComponentPropsWithoutRef } from "react"

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
        className,
      )}
    >
      {children}
    </div>
  )
}
