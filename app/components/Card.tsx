import { ChevronRightIcon } from "@heroicons/react/24/outline"
import type { LinkProps } from "@remix-run/react"
import { Link } from "@remix-run/react"
import clsx from "clsx"
import type { ComponentPropsWithoutRef, ElementType } from "react"

import { Icon } from "~/components/Icon"

export function Card<T extends ElementType = "div">({
  as,
  className,
  children,
}: Omit<ComponentPropsWithoutRef<T>, "as"> & {
  as?: T
}) {
  const Component = as ?? "div"

  return (
    <Component
      className={clsx(
        className,
        "group/Card relative flex flex-col items-start",
      )}
    >
      {children}
    </Component>
  )
}

Card.Link = function CardLink({
  children,
  ...props
}: ComponentPropsWithoutRef<typeof Link>) {
  return (
    <>
      <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover/Card:scale-100 group-hover/Card:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl" />
      <Link {...props}>
        <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
        <span className="relative z-10">{children}</span>
      </Link>
    </>
  )
}

Card.Title = function CardTitle<T extends ElementType = "h2">({
  as,
  to,
  className,
  children,
  ...rest
}: Omit<ComponentPropsWithoutRef<T>, "as" | "href" | "to"> &
  Partial<Pick<LinkProps, "to">> & {
    as?: T
  }) {
  const Component = as ?? "h2"

  return (
    <Component
      {...rest}
      className={clsx(
        "text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100",
        className,
      )}
    >
      {to ? (
        <Card.Link {...{ to }} prefetch="intent">
          {children}
        </Card.Link>
      ) : (
        children
      )}
    </Component>
  )
}

Card.Description = function CardDescription({
  className,
  children,
  ...rest
}: ComponentPropsWithoutRef<"p">) {
  return (
    <p
      {...rest}
      className={clsx(
        "relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400",
        className,
      )}
    >
      {children}
    </p>
  )
}

Card.CallToAction = function CardCallToAction({
  className,
  children,
  ...rest
}: Omit<ComponentPropsWithoutRef<"div">, "aria-hidden">) {
  return (
    <div
      {...rest}
      aria-hidden="true"
      className={clsx(
        "relative z-10 mt-4 flex items-center text-sm font-medium text-primary-500",
        className,
      )}
    >
      {children}
      <Icon as={ChevronRightIcon} className="ml-1 h-4 w-4 stroke-current" />
    </div>
  )
}

Card.Meta = function CardMeta<T extends ElementType = "p">({
  as,
  decorate = false,
  className,
  children,
  ...rest
}: Omit<ComponentPropsWithoutRef<T>, "as" | "decorate"> & {
  as?: T
  decorate?: boolean
}) {
  let Component = as ?? "p"

  return (
    <Component
      {...rest}
      className={clsx(
        className,
        "relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500",
        decorate && "pl-3.5",
      )}
    >
      {decorate && (
        <span
          className="absolute inset-y-0 left-0 flex items-center"
          aria-hidden="true"
        >
          <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
        </span>
      )}
      {children}
    </Component>
  )
}
