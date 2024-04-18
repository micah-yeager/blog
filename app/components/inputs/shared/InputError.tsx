import type { ComponentPropsWithoutRef } from "react"
import clsx from "clsx"

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
