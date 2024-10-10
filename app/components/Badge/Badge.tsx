// noinspection JSCommentMatchesSignature

import type { ButtonProps } from "@headlessui/react"
import { Button } from "@headlessui/react"
import clsx from "clsx"
import type {
  ComponentPropsWithoutRef,
  ForwardedRef,
  PropsWithChildren,
} from "react"
import { forwardRef } from "react"

import { tw } from "@utils/templates"

import { type Color, addColorAliases } from "lib/tailwindcss"
import { TouchTarget } from "../Button"
import { Link } from "../Link"

const colors = addColorAliases({
  amber: tw`bg-amber-400/20 text-amber-700 group-data-[hover]:bg-amber-400/30 dark:bg-amber-400/10 dark:text-amber-400 dark:group-data-[hover]:bg-amber-400/15`,
  blue: tw`bg-blue-500/15 text-blue-700 group-data-[hover]:bg-blue-500/25 dark:text-blue-400 dark:group-data-[hover]:bg-blue-500/25`,
  cyan: tw`bg-cyan-400/20 text-cyan-700 group-data-[hover]:bg-cyan-400/30 dark:bg-cyan-400/10 dark:text-cyan-300 dark:group-data-[hover]:bg-cyan-400/15`,
  emerald: tw`bg-emerald-500/15 text-emerald-700 group-data-[hover]:bg-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-400 dark:group-data-[hover]:bg-emerald-500/20`,
  fuchsia: tw`bg-fuchsia-400/15 text-fuchsia-700 group-data-[hover]:bg-fuchsia-400/25 dark:bg-fuchsia-400/10 dark:text-fuchsia-400 dark:group-data-[hover]:bg-fuchsia-400/20`,
  green: tw`bg-green-500/15 text-green-700 group-data-[hover]:bg-green-500/25 dark:bg-green-500/10 dark:text-green-400 dark:group-data-[hover]:bg-green-500/20`,
  indigo: tw`bg-indigo-500/15 text-indigo-700 group-data-[hover]:bg-indigo-500/25 dark:text-indigo-400 dark:group-data-[hover]:bg-indigo-500/20`,
  lime: tw`bg-lime-400/20 text-lime-700 group-data-[hover]:bg-lime-400/30 dark:bg-lime-400/10 dark:text-lime-300 dark:group-data-[hover]:bg-lime-400/15`,
  orange: tw`bg-orange-500/15 text-orange-700 group-data-[hover]:bg-orange-500/25 dark:bg-orange-500/10 dark:text-orange-400 dark:group-data-[hover]:bg-orange-500/20`,
  pink: tw`bg-pink-400/15 text-pink-700 group-data-[hover]:bg-pink-400/25 dark:bg-pink-400/10 dark:text-pink-400 dark:group-data-[hover]:bg-pink-400/20`,
  purple: tw`bg-purple-500/15 text-purple-700 group-data-[hover]:bg-purple-500/25 dark:text-purple-400 dark:group-data-[hover]:bg-purple-500/20`,
  red: tw`bg-red-500/15 text-red-700 group-data-[hover]:bg-red-500/25 dark:bg-red-500/10 dark:text-red-400 dark:group-data-[hover]:bg-red-500/20`,
  rose: tw`bg-rose-400/15 text-rose-700 group-data-[hover]:bg-rose-400/25 dark:bg-rose-400/10 dark:text-rose-400 dark:group-data-[hover]:bg-rose-400/20`,
  sky: tw`bg-sky-500/15 text-sky-700 group-data-[hover]:bg-sky-500/25 dark:bg-sky-500/10 dark:text-sky-300 dark:group-data-[hover]:bg-sky-500/20`,
  teal: tw`bg-teal-500/15 text-teal-700 group-data-[hover]:bg-teal-500/25 dark:bg-teal-500/10 dark:text-teal-300 dark:group-data-[hover]:bg-teal-500/20`,
  violet: tw`bg-violet-500/15 text-violet-700 group-data-[hover]:bg-violet-500/25 dark:text-violet-400 dark:group-data-[hover]:bg-violet-500/20`,
  yellow: tw`bg-yellow-400/20 text-yellow-700 group-data-[hover]:bg-yellow-400/30 dark:bg-yellow-400/10 dark:text-yellow-300 dark:group-data-[hover]:bg-yellow-400/15`,
  zinc: tw`bg-zinc-600/10 text-zinc-700 group-data-[hover]:bg-zinc-600/20 dark:bg-white/5 dark:text-zinc-400 dark:group-data-[hover]:bg-white/10`,
} satisfies Record<Color, string>)

/** Base properties for the {@link Badge} and {@link BadgeButton} components. */
type BadgeBaseProps = {
  /** The color variant to use. */
  color?: keyof typeof colors
}

/**
 * Properties for the {@link Badge} component.
 *
 * @see {@link BadgeBaseProps}
 * @see {@link HTMLSpanElement}
 */
type BadgeProps = BadgeBaseProps & ComponentPropsWithoutRef<"span">

/**
 * A simple badge.
 *
 * @param color - The color variant to use.
 * @see {@link BadgeProps}
 */
export function Badge({ color = "zinc", className, ...props }: BadgeProps) {
  return (
    <span
      {...props}
      className={clsx(
        className,
        "inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 forced-colors:outline",
        colors[color],
      )}
    />
  )
}

/**
 * Properties for the {@link BadgeButton} component.
 *
 * @see {@link BadgeBaseProps}
 * @see Headless UI's {@link ButtonProps}
 * @see {@link Link}
 */
type BadgeButtonProps = BadgeBaseProps &
  Required<PropsWithChildren> &
  (Omit<ButtonProps, "as"> | ComponentPropsWithoutRef<typeof Link>)

/**
 * A badge button.
 *
 * If the `to` prop is provided, the component will render a {@link Link}
 * component. Otherwise, it will render a {@link Button} component.
 *
 * @param color - The color variant to use.
 * @param to - If provided, a {@link Link} will be rendered with the provided
 *   URL. Otherwise, a Headless UI {@link HeadlessButton Button} component will
 *   be used instead.
 * @see {@link BadgeButtonProps}
 */
export const BadgeButton = forwardRef<HTMLElement, BadgeButtonProps>(
  function BadgeButton({ color = "zinc", className, children, ...props }, ref) {
    const classes = clsx(
      className,
      "group relative inline-flex rounded-md focus:outline-none data-[focus]:outline data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-blue-500",
    )

    return "to" in props ? (
      <Link
        {...props}
        className={classes}
        ref={ref as ForwardedRef<HTMLAnchorElement>}
      >
        <TouchTarget>
          <Badge color={color}>{children}</Badge>
        </TouchTarget>
      </Link>
    ) : (
      <Button {...props} className={classes} ref={ref}>
        <TouchTarget>
          <Badge color={color}>{children}</Badge>
        </TouchTarget>
      </Button>
    )
  },
)
