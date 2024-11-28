// noinspection JSCommentMatchesSignature

import clsx from "clsx"
import type { ComponentPropsWithoutRef, PropsWithChildren } from "react"

import ArrowLongLeftIcon from "@heroicons/react/16/solid/ArrowLongLeftIcon"
import ArrowLongRightIcon from "@heroicons/react/16/solid/ArrowLongRightIcon"
import { Button } from "../Button"
import { Icon } from "../Icon"

/**
 * A button for {@link Pagination} to navigate to the previous page of data.
 *
 * @param to - The URL to navigate to.
 * @param children - The content of the button. Defaults to `"Previous"`.
 */
export function PaginationPrevious({
  to = null,
  className,
  children = "Previous",
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
        <Icon
          as={ArrowLongLeftIcon}
          className="stroke-current"
          aria-hidden="true"
        />
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
  children = "Next",
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
        <Icon
          as={ArrowLongRightIcon}
          className="stroke-current"
          aria-hidden="true"
        />
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
PaginationList.Gap = PaginationGap
PaginationList.Page = PaginationPage

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
  children,
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
        current && "before:bg-zinc-950/5 dark:before:bg-white/10",
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
        "w-[2.25rem] select-none text-center text-sm/6 font-semibold text-zinc-950 dark:text-white",
      )}
    >
      {children}
    </span>
  )
}

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
Pagination.List = PaginationList
Pagination.Next = PaginationNext
Pagination.Previous = PaginationPrevious
