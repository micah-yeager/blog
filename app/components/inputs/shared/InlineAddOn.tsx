import clsx from "clsx"
import type { ComponentPropsWithoutRef } from "react"
import { forwardRef } from "react"

/**
 * Properties for the `InlineAddOn` component. Extends the properties of the
 * `div` element.
 */
type InlineAddOnProps = ComponentPropsWithoutRef<"div"> & {
  /** Whether the parent field is disabled. */
  disabled?: boolean
}

/**
 * An inline add-on for a text input field.
 *
 * @component
 * @see InlineAddOnProps
 * @see TextInput
 */
export const InlineAddOn = forwardRef<HTMLDivElement, InlineAddOnProps>(
  function InlineAddOn(
    { disabled, className, children, ...rest },
    forwardedRef,
  ) {
    return (
      <div
        {...rest}
        ref={forwardedRef}
        className={clsx(
          "pointer-events-none absolute inset-y-0 z-20 flex items-center",
          disabled ? "text-zinc-500" : "text-zinc-400 dark:text-zinc-600",
          className,
        )}
      >
        {children}
      </div>
    )
  },
)
