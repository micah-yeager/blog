import clsx from "clsx"
import type { ComponentPropsWithoutRef } from "react"

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
