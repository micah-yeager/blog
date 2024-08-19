// noinspection JSCommentMatchesSignature

import type { LinkProps } from "@remix-run/react"
import type { ComponentPropsWithoutRef, ElementType } from "react"
import { ChevronRightIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"

import { Icon } from "./Icon"
import { Link } from "./Link"

/**
 * Properties for the {@link Card} component.
 *
 * @typeParam T - The element type or component to render as.
 */
type CardProps<T extends ElementType> = Omit<
  ComponentPropsWithoutRef<T>,
  "as"
> & {
  /**
   * The element type or component to render as.
   *
   * @default "div"
   * @see {@link ElementType}
   */
  as?: T
}

/**
 * Wraps content in a card-like container.
 *
 * @param as - The element type or component to render as. Defaults to `"div"`.
 * @see {@link CardProps}
 */
export function Card<T extends ElementType = "div">({
  as,
  className,
  children,
  ...rest
}: CardProps<T>) {
  const Component = as ?? "div"

  return (
    <Component
      {...rest}
      className={clsx(
        className,
        "group/Card relative flex flex-col items-start"
      )}
    >
      {children}
    </Component>
  )
}

/**
 * A link to use as a {@link Card} overlay.
 *
 * @see {@link Link}
 */
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

/**
 * Properties for the {@link Card.Title} component.
 *
 * @typeParam T - The element type or component to render as.
 * @see {@link LinkProps}
 */
type CardTitleProps<T extends ElementType> = Omit<
  ComponentPropsWithoutRef<T>,
  "as" | "href" | "to"
> &
  Partial<Pick<LinkProps, "to">> & {
    /**
     * The element type or component to render as.
     *
     * @default "h2"
     * @see ElementType
     */
    as?: T
  }

/**
 * Title for a {@link Card}.
 *
 * @param as - The element type or component to render as. Defaults to `"h2"`.
 * @param to - The URL to link to. Optional.
 * @see {@link CardTitleProps}
 */
Card.Title = function CardTitle<T extends ElementType = "h2">({
  as,
  to,
  className,
  children,
  ...rest
}: CardTitleProps<T>) {
  const Component = as ?? "h2"

  return (
    <Component
      {...rest}
      className={clsx(
        "text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100",
        className
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

/**
 * Description for a {@link Card}.
 *
 * @see {@link HTMLParagraphElement}
 */
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
        className
      )}
    >
      {children}
    </p>
  )
}

/**
 * Call-to-action for a {@link Card}.
 *
 * @see {@link HTMLDivElement}
 */
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
        className
      )}
    >
      {children}
      <Icon as={ChevronRightIcon} className="ml-1 h-4 w-4 stroke-current" />
    </div>
  )
}

/**
 * Properties for the {@link Card.Meta} component.
 *
 * @typeParam T - The element type or component to render as.
 */
type CardMetaProps<T extends ElementType> = Omit<
  ComponentPropsWithoutRef<T>,
  "as" | "decorate"
> & {
  /**
   * The element type or component to render as.
   *
   * @default "p"
   * @see ElementType
   */
  as?: T
  /**
   * Add a decorative vertical line to the left as a visual root.
   *
   * @default false
   */
  decorate?: boolean
}

/**
 * "Meta" information for a {@link Card}.
 *
 * @param as - The element type or component to render as. Defaults to `"p"`.
 * @param decorate - Add a decorative vertical line to the left as a visual
 *   root.
 * @see {@link CardMetaProps}
 */
Card.Meta = function CardMeta<T extends ElementType = "p">({
  as,
  decorate = false,
  className,
  children,
  ...rest
}: CardMetaProps<T>) {
  const Component = as ?? "p"

  return (
    <Component
      {...rest}
      className={clsx(
        className,
        "relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500",
        decorate && "pl-3.5"
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
