import { ChevronRightIcon } from "@heroicons/react/24/outline"
import { Link } from "@remix-run/react"
import clsx from "clsx"
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react"

export function Card<T extends ElementType = "div">({
  as,
  className,
  children,
}: Omit<ComponentPropsWithoutRef<T>, "as" | "className"> & {
  as?: T
  className?: string
}) {
  let Component = as ?? "div"

  return (
    <Component
      className={clsx(className, "group relative flex flex-col items-start")}
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
      <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl" />
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
  children,
}: Omit<ComponentPropsWithoutRef<T>, "as" | "href" | "to"> & {
  as?: T
  to?: string
}) {
  let Component = as ?? "h2"

  return (
    <Component className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
      {to ? <Card.Link to={to}>{children}</Card.Link> : children}
    </Component>
  )
}

Card.Description = function CardDescription({
  children,
}: {
  children: ReactNode
}) {
  return (
    <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
      {children}
    </p>
  )
}

Card.Action = function CardAction({ children }: { children: ReactNode }) {
  return (
    <div
      aria-hidden="true"
      className="text-primary-500 relative z-10 mt-4 flex items-center text-sm font-medium"
    >
      {children}
      <ChevronRightIcon className="ml-1 h-4 w-4 stroke-current" />
    </div>
  )
}

Card.Meta = function CardMeta<T extends ElementType = "p">({
  as,
  decorate = false,
  className,
  children,
  ...props
}: Omit<ComponentPropsWithoutRef<T>, "as" | "decorate"> & {
  as?: T
  decorate?: boolean
}) {
  let Component = as ?? "p"

  return (
    <Component
      className={clsx(
        className,
        "relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500",
        decorate && "pl-3.5",
      )}
      {...props}
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
