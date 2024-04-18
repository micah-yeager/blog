import type { ComponentPropsWithoutRef } from "react"
import clsx from "clsx"
import { forwardRef } from "react"

type InlineAddOnProps = ComponentPropsWithoutRef<"div"> & {
  disabled?: boolean
}
export const InlineAddOn = forwardRef<HTMLDivElement, InlineAddOnProps>(
  function InlineAddOn(
    { disabled, className, children, ...rest },
    forwardedRef
  ) {
    return (
      <div
        {...rest}
        ref={forwardedRef}
        className={clsx(
          "pointer-events-none absolute inset-y-0 z-20 flex items-center",
          disabled ? "text-zinc-500" : "text-zinc-400 dark:text-zinc-600",
          className
        )}
      >
        {children}
      </div>
    )
  }
)
