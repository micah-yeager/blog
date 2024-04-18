import type { ComponentPropsWithoutRef } from "react"
import clsx from "clsx"

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
