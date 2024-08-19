// noinspection JSCommentMatchesSignature

import type { ComponentPropsWithoutRef, PropsWithChildren } from "react"
import clsx from "clsx"

import { Button } from "./Button"

/**
 * A paginator for navigating through pages of data.
 *
 * @see {@link HTMLElement}
 */
export function Pagination({
  "aria-label": ariaLabel = "Page navigation",
  className,
  ...props
}: ComponentPropsWithoutRef<"nav">) {
  return (
    <nav
      aria-label={ariaLabel}
      {...props}
      className={clsx(className, "flex gap-x-2")}
    />
  )
}

/**
 * A button for {@link Pagination} to navigate to the previous page of data.
 *
 * @param to - The URL to navigate to.
 * @param children - The content of the button. Defaults to `"Previous"`.
 */
export function PaginationPrevious({
  to = null,
  className,
  children = "Previous"
}: PropsWithChildren<{
  to?: string | null
  className?: string
}>) {
  return (
    <span className={clsx(className, "grow basis-0")}>
      <Button
        {...(to === null ? { disabled: true } : { to })}
        plain
        aria-label="Previous page"
      >
        <svg
          className="stroke-current"
          data-slot="icon"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2.75 8H13.25M2.75 8L5.25 5.5M2.75 8L5.25 10.5"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {children}
      </Button>
    </span>
  )
}

/**
 * A button for {@link Pagination} to navigate to the next page of data.
 *
 * @param to - The URL to navigate to.
 * @param children - The content of the button. Defaults to `"Next"`.
 */
export function PaginationNext({
  to = null,
  className,
  children = "Next"
}: PropsWithChildren<{
  to?: string | null
  className?: string
}>) {
  return (
    <span className={clsx(className, "flex grow basis-0 justify-end")}>
      <Button
        {...(to === null ? { disabled: true } : { to })}
        plain
        aria-label="Next page"
      >
        {children}
        <svg
          className="stroke-current"
          data-slot="icon"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M13.25 8L2.75 8M13.25 8L10.75 10.5M13.25 8L10.75 5.5"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Button>
    </span>
  )
}

/**
 * A list of page numbers for {@link Pagination}.
 *
 * @see {@link HTMLSpanElement}
 */
export function PaginationList({
  className,
  ...props
}: ComponentPropsWithoutRef<"span">) {
  return (
    <span
      {...props}
      className={clsx(className, "hidden items-baseline gap-x-2 sm:flex")}
    />
  )
}

/**
 * A button for a {@link PaginationList} to navigate to a specific page of data.
 *
 * @param to - The URL to navigate to.
 * @param current - Whether the page is the current page.
 * @param children - The content of the button.
 */
export function PaginationPage({
  to,
  className,
  current = false,
  children
}: PropsWithChildren<{
  to: string
  className?: string
  current?: boolean
}>) {
  return (
    <Button
      to={to}
      plain
      aria-label={`Page ${children}`}
      aria-current={current ? "page" : undefined}
      className={clsx(
        className,
        "min-w-[2.25rem] before:absolute before:-inset-px before:rounded-lg",
        current && "before:bg-zinc-950/5 dark:before:bg-white/10"
      )}
    >
      <span className="-mx-0.5">{children}</span>
    </Button>
  )
}

/**
 * A gap in a {@link PaginationList} to indicate omitted page numbers.
 *
 * @see {@link HTMLSpanElement}
 */
export function PaginationGap({
  className,
  children = <>&hellip;</>,
  ...props
}: ComponentPropsWithoutRef<"span">) {
  return (
    <span
      aria-hidden="true"
      {...props}
      className={clsx(
        className,
        "w-[2.25rem] select-none text-center text-sm/6 font-semibold text-zinc-950 dark:text-white"
      )}
    >
      {children}
    </span>
  )
}
