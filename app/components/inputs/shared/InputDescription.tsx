import type { ComponentPropsWithoutRef } from "react"
import clsx from "clsx"

export function InputDescription({
  className,
  children,
  ...rest
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div {...rest} className={clsx("text-sm text-zinc-500", className)}>
      {children}
    </div>
  )
}
