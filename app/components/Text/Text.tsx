import clsx from "clsx"
import type { ComponentPropsWithoutRef } from "react"

import { Link } from "../Link"

/**
 * A text element.
 *
 * @see {@link HTMLParagraphElement}
 */
export function Text({ className, ...props }: ComponentPropsWithoutRef<"p">) {
  return (
    <p
      data-slot="text"
      {...props}
      className={clsx(
        className,
        "text-base/6 text-zinc-500 dark:text-zinc-400 sm:text-sm/6",
      )}
    />
  )
}

/**
 * A linked text element.
 *
 * @see {@link Link}
 */
export function TextLink({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Link>) {
  return (
    <Link
      {...props}
      className={clsx(
        className,
        "text-zinc-950 underline decoration-zinc-950/50 data-[hover]:decoration-zinc-950 dark:text-white dark:decoration-white/50 dark:data-[hover]:decoration-white",
      )}
    />
  )
}

/**
 * A strong text element.
 *
 * @see {@link HTMLElement}
 */
export function Strong({
  className,
  ...props
}: ComponentPropsWithoutRef<"strong">) {
  return (
    <strong
      {...props}
      className={clsx(className, "font-medium text-zinc-950 dark:text-white")}
    />
  )
}

/**
 * An emphasized text element.
 *
 * @see {@link HTMLElement}
 */
export function Code({
  className,
  ...props
}: ComponentPropsWithoutRef<"code">) {
  return (
    <code
      {...props}
      className={clsx(
        className,
        "rounded border border-zinc-950/10 bg-zinc-950/[2.5%] px-0.5 text-sm font-medium text-zinc-950 dark:border-white/20 dark:bg-white/5 dark:text-white sm:text-[0.8125rem]",
      )}
    />
  )
}
