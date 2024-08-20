// noinspection JSCommentMatchesSignature

import type { ComponentPropsWithoutRef } from "react"
import clsx from "clsx"

/**
 * Properties for the {@link Divider} component.
 *
 * @see {@link HTMLHRElement}
 */
type DividerProps = ComponentPropsWithoutRef<"hr"> & {
  /** Whether the divider should be softened. */
  soft?: boolean
}

/**
 * A horizontal rule to divide content.
 *
 * @param soft - Whether the divider should be softened.
 * @see {@link DividerProps}
 */
export function Divider({ soft = false, className, ...props }: DividerProps) {
  return (
    <hr
      role="presentation"
      {...props}
      className={clsx(
        className,
        "w-full border-t",
        soft && "border-zinc-950/5 dark:border-white/5",
        !soft && "border-zinc-950/10 dark:border-white/10"
      )}
    />
  )
}
