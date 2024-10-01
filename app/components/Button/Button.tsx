import {
  Button as HeadlessButton,
  type ButtonProps as HeadlessButtonProps,
} from "@headlessui/react"
import clsx from "clsx"
import type {
  ComponentPropsWithoutRef,
  ForwardedRef,
  PropsWithChildren,
} from "react"
import { forwardRef } from "react"

import { tw } from "@utils/templates"

import { Link } from "../Link"

const styles = {
  base: [
    // Base
    tw`relative isolate inline-flex items-center justify-center gap-x-2 rounded-lg border text-base/6 font-semibold`,
    // Sizing
    tw`px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing.3)-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] sm:text-sm/6`,
    // Focus
    tw`focus:outline-none data-[focus]:outline data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-blue-500`,
    // Disabled
    tw`data-[disabled]:opacity-50`,
    // Icon
    tw`forced-colors:[--btn-icon:ButtonText] forced-colors:data-[hover]:[--btn-icon:ButtonText] [&>[data-slot=icon]]:-mx-0.5 [&>[data-slot=icon]]:my-0.5 [&>[data-slot=icon]]:size-5 [&>[data-slot=icon]]:shrink-0 [&>[data-slot=icon]]:text-[--btn-icon] [&>[data-slot=icon]]:sm:my-1 [&>[data-slot=icon]]:sm:size-4`,
  ],
  solid: [
    // Optical border, implemented as the button background to avoid corner
    // artifacts
    tw`border-transparent bg-[--btn-border]`,
    // Dark mode: border is rendered on `after` so background is set to button
    // background
    tw`dark:bg-[--btn-bg]`,
    // Button background, implemented as foreground layer to stack on top of
    // pseudo-border layer
    tw`before:absolute before:inset-0 before:-z-10 before:rounded-[calc(theme(borderRadius.lg)-1px)] before:bg-[--btn-bg]`,
    // Drop shadow, applied to the inset `before` layer so it blends with the
    // border
    tw`before:shadow`,
    // Background color is moved to control and shadow is removed in dark mode
    // so hide `before` pseudo
    tw`dark:before:hidden`,
    // Dark mode: Subtle white outline is applied using a border
    tw`dark:border-white/5`,
    // Shim/overlay, inset to match button foreground and used for hover state
    // + highlight shadow
    tw`after:absolute after:inset-0 after:-z-10 after:rounded-[calc(theme(borderRadius.lg)-1px)]`,
    // Inner highlight shadow
    tw`after:shadow-[shadow:inset_0_1px_theme(colors.white/15%)]`,
    // White overlay on hover
    tw`after:data-[active]:bg-[--btn-hover-overlay] after:data-[hover]:bg-[--btn-hover-overlay]`,
    // Dark mode: `after` layer expands to cover entire button
    tw`dark:after:-inset-px dark:after:rounded-lg`,
    // Disabled
    tw`before:data-[disabled]:shadow-none after:data-[disabled]:shadow-none`,
  ],
  outline: [
    // Base
    tw`border-zinc-950/10 text-zinc-950 data-[active]:bg-zinc-950/[2.5%] data-[hover]:bg-zinc-950/[2.5%]`,
    // Dark mode
    tw`dark:border-white/15 dark:text-white dark:[--btn-bg:transparent] dark:data-[active]:bg-white/5 dark:data-[hover]:bg-white/5`,
    // Icon
    tw`[--btn-icon:theme(colors.zinc.500)] data-[active]:[--btn-icon:theme(colors.zinc.700)] data-[hover]:[--btn-icon:theme(colors.zinc.700)] dark:data-[active]:[--btn-icon:theme(colors.zinc.400)] dark:data-[hover]:[--btn-icon:theme(colors.zinc.400)]`,
  ],
  plain: [
    // Base
    tw`border-transparent text-zinc-950 data-[active]:bg-zinc-950/5 data-[hover]:bg-zinc-950/5`,
    // Dark mode
    tw`dark:text-white dark:data-[active]:bg-white/10 dark:data-[hover]:bg-white/10`,
    // Icon
    tw`[--btn-icon:theme(colors.zinc.500)] data-[active]:[--btn-icon:theme(colors.zinc.700)] data-[hover]:[--btn-icon:theme(colors.zinc.700)] dark:[--btn-icon:theme(colors.zinc.500)] dark:data-[active]:[--btn-icon:theme(colors.zinc.400)] dark:data-[hover]:[--btn-icon:theme(colors.zinc.400)]`,
  ],
  colors: {
    "dark/zinc": [
      tw`text-white [--btn-bg:theme(colors.zinc.900)] [--btn-border:theme(colors.zinc.950/90%)] [--btn-hover-overlay:theme(colors.white/10%)]`,
      tw`dark:text-white dark:[--btn-bg:theme(colors.zinc.600)] dark:[--btn-hover-overlay:theme(colors.white/5%)]`,
      tw`[--btn-icon:theme(colors.zinc.400)] data-[active]:[--btn-icon:theme(colors.zinc.300)] data-[hover]:[--btn-icon:theme(colors.zinc.300)]`,
    ],
    light: [
      tw`text-zinc-950 [--btn-bg:white] [--btn-border:theme(colors.zinc.950/10%)] [--btn-hover-overlay:theme(colors.zinc.950/2.5%)] data-[active]:[--btn-border:theme(colors.zinc.950/15%)] data-[hover]:[--btn-border:theme(colors.zinc.950/15%)]`,
      tw`dark:text-white dark:[--btn-bg:theme(colors.zinc.800)] dark:[--btn-hover-overlay:theme(colors.white/5%)]`,
      tw`[--btn-icon:theme(colors.zinc.500)] data-[active]:[--btn-icon:theme(colors.zinc.700)] data-[hover]:[--btn-icon:theme(colors.zinc.700)] dark:[--btn-icon:theme(colors.zinc.500)] dark:data-[active]:[--btn-icon:theme(colors.zinc.400)] dark:data-[hover]:[--btn-icon:theme(colors.zinc.400)]`,
    ],
    "dark/white": [
      tw`text-white [--btn-bg:theme(colors.zinc.900)] [--btn-border:theme(colors.zinc.950/90%)] [--btn-hover-overlay:theme(colors.white/10%)]`,
      tw`dark:text-zinc-950 dark:[--btn-bg:white] dark:[--btn-hover-overlay:theme(colors.zinc.950/5%)]`,
      tw`[--btn-icon:theme(colors.zinc.400)] data-[active]:[--btn-icon:theme(colors.zinc.300)] data-[hover]:[--btn-icon:theme(colors.zinc.300)] dark:[--btn-icon:theme(colors.zinc.500)] dark:data-[active]:[--btn-icon:theme(colors.zinc.400)] dark:data-[hover]:[--btn-icon:theme(colors.zinc.400)]`,
    ],
    dark: [
      tw`text-white [--btn-bg:theme(colors.zinc.900)] [--btn-border:theme(colors.zinc.950/90%)] [--btn-hover-overlay:theme(colors.white/10%)]`,
      tw`dark:[--btn-bg:theme(colors.zinc.800)] dark:[--btn-hover-overlay:theme(colors.white/5%)]`,
      tw`[--btn-icon:theme(colors.zinc.400)] data-[active]:[--btn-icon:theme(colors.zinc.300)] data-[hover]:[--btn-icon:theme(colors.zinc.300)]`,
    ],
    white: [
      tw`text-zinc-950 [--btn-bg:white] [--btn-border:theme(colors.zinc.950/10%)] [--btn-hover-overlay:theme(colors.zinc.950/2.5%)] data-[active]:[--btn-border:theme(colors.zinc.950/15%)] data-[hover]:[--btn-border:theme(colors.zinc.950/15%)]`,
      tw`dark:[--btn-hover-overlay:theme(colors.zinc.950/5%)]`,
      tw`[--btn-icon:theme(colors.zinc.400)] data-[active]:[--btn-icon:theme(colors.zinc.500)] data-[hover]:[--btn-icon:theme(colors.zinc.500)]`,
    ],
    zinc: [
      tw`text-white [--btn-bg:theme(colors.zinc.600)] [--btn-border:theme(colors.zinc.700/90%)] [--btn-hover-overlay:theme(colors.white/10%)]`,
      tw`dark:[--btn-hover-overlay:theme(colors.white/5%)]`,
      tw`[--btn-icon:theme(colors.zinc.400)] data-[active]:[--btn-icon:theme(colors.zinc.300)] data-[hover]:[--btn-icon:theme(colors.zinc.300)]`,
    ],
    indigo: [
      tw`text-white [--btn-bg:theme(colors.indigo.500)] [--btn-border:theme(colors.indigo.600/90%)] [--btn-hover-overlay:theme(colors.white/10%)]`,
      tw`[--btn-icon:theme(colors.indigo.300)] data-[active]:[--btn-icon:theme(colors.indigo.200)] data-[hover]:[--btn-icon:theme(colors.indigo.200)]`,
    ],
    cyan: [
      tw`text-cyan-950 [--btn-bg:theme(colors.cyan.300)] [--btn-border:theme(colors.cyan.400/80%)] [--btn-hover-overlay:theme(colors.white/25%)]`,
      tw`[--btn-icon:theme(colors.cyan.500)]`,
    ],
    red: [
      tw`text-white [--btn-bg:theme(colors.red.600)] [--btn-border:theme(colors.red.700/90%)] [--btn-hover-overlay:theme(colors.white/10%)]`,
      tw`[--btn-icon:theme(colors.red.300)] data-[active]:[--btn-icon:theme(colors.red.200)] data-[hover]:[--btn-icon:theme(colors.red.200)]`,
    ],
    orange: [
      tw`text-white [--btn-bg:theme(colors.orange.500)] [--btn-border:theme(colors.orange.600/90%)] [--btn-hover-overlay:theme(colors.white/10%)]`,
      tw`[--btn-icon:theme(colors.orange.300)] data-[active]:[--btn-icon:theme(colors.orange.200)] data-[hover]:[--btn-icon:theme(colors.orange.200)]`,
    ],
    amber: [
      tw`text-amber-950 [--btn-bg:theme(colors.amber.400)] [--btn-border:theme(colors.amber.500/80%)] [--btn-hover-overlay:theme(colors.white/25%)]`,
      tw`[--btn-icon:theme(colors.amber.600)]`,
    ],
    yellow: [
      tw`text-yellow-950 [--btn-bg:theme(colors.yellow.300)] [--btn-border:theme(colors.yellow.400/80%)] [--btn-hover-overlay:theme(colors.white/25%)]`,
      tw`[--btn-icon:theme(colors.yellow.600)] data-[active]:[--btn-icon:theme(colors.yellow.700)] data-[hover]:[--btn-icon:theme(colors.yellow.700)]`,
    ],
    lime: [
      tw`text-lime-950 [--btn-bg:theme(colors.lime.300)] [--btn-border:theme(colors.lime.400/80%)] [--btn-hover-overlay:theme(colors.white/25%)]`,
      tw`[--btn-icon:theme(colors.lime.600)] data-[active]:[--btn-icon:theme(colors.lime.700)] data-[hover]:[--btn-icon:theme(colors.lime.700)]`,
    ],
    green: [
      tw`text-white [--btn-bg:theme(colors.green.600)] [--btn-border:theme(colors.green.700/90%)] [--btn-hover-overlay:theme(colors.white/10%)]`,
      tw`[--btn-icon:theme(colors.white/60%)] data-[active]:[--btn-icon:theme(colors.white/80%)] data-[hover]:[--btn-icon:theme(colors.white/80%)]`,
    ],
    emerald: [
      tw`text-white [--btn-bg:theme(colors.emerald.600)] [--btn-border:theme(colors.emerald.700/90%)] [--btn-hover-overlay:theme(colors.white/10%)]`,
      tw`[--btn-icon:theme(colors.white/60%)] data-[active]:[--btn-icon:theme(colors.white/80%)] data-[hover]:[--btn-icon:theme(colors.white/80%)]`,
    ],
    teal: [
      tw`text-white [--btn-bg:theme(colors.teal.600)] [--btn-border:theme(colors.teal.700/90%)] [--btn-hover-overlay:theme(colors.white/10%)]`,
      tw`[--btn-icon:theme(colors.white/60%)] data-[active]:[--btn-icon:theme(colors.white/80%)] data-[hover]:[--btn-icon:theme(colors.white/80%)]`,
    ],
    sky: [
      tw`text-white [--btn-bg:theme(colors.sky.500)] [--btn-border:theme(colors.sky.600/80%)] [--btn-hover-overlay:theme(colors.white/10%)]`,
      tw`[--btn-icon:theme(colors.white/60%)] data-[active]:[--btn-icon:theme(colors.white/80%)] data-[hover]:[--btn-icon:theme(colors.white/80%)]`,
    ],
    blue: [
      tw`text-white [--btn-bg:theme(colors.blue.600)] [--btn-border:theme(colors.blue.700/90%)] [--btn-hover-overlay:theme(colors.white/10%)]`,
      tw`[--btn-icon:theme(colors.blue.400)] data-[active]:[--btn-icon:theme(colors.blue.300)] data-[hover]:[--btn-icon:theme(colors.blue.300)]`,
    ],
    violet: [
      tw`text-white [--btn-bg:theme(colors.violet.500)] [--btn-border:theme(colors.violet.600/90%)] [--btn-hover-overlay:theme(colors.white/10%)]`,
      tw`[--btn-icon:theme(colors.violet.300)] data-[active]:[--btn-icon:theme(colors.violet.200)] data-[hover]:[--btn-icon:theme(colors.violet.200)]`,
    ],
    purple: [
      tw`text-white [--btn-bg:theme(colors.purple.500)] [--btn-border:theme(colors.purple.600/90%)] [--btn-hover-overlay:theme(colors.white/10%)]`,
      tw`[--btn-icon:theme(colors.purple.300)] data-[active]:[--btn-icon:theme(colors.purple.200)] data-[hover]:[--btn-icon:theme(colors.purple.200)]`,
    ],
    fuchsia: [
      tw`text-white [--btn-bg:theme(colors.fuchsia.500)] [--btn-border:theme(colors.fuchsia.600/90%)] [--btn-hover-overlay:theme(colors.white/10%)]`,
      tw`[--btn-icon:theme(colors.fuchsia.300)] data-[active]:[--btn-icon:theme(colors.fuchsia.200)] data-[hover]:[--btn-icon:theme(colors.fuchsia.200)]`,
    ],
    pink: [
      tw`text-white [--btn-bg:theme(colors.pink.500)] [--btn-border:theme(colors.pink.600/90%)] [--btn-hover-overlay:theme(colors.white/10%)]`,
      tw`[--btn-icon:theme(colors.pink.300)] data-[active]:[--btn-icon:theme(colors.pink.200)] data-[hover]:[--btn-icon:theme(colors.pink.200)]`,
    ],
    rose: [
      tw`text-white [--btn-bg:theme(colors.rose.500)] [--btn-border:theme(colors.rose.600/90%)] [--btn-hover-overlay:theme(colors.white/10%)]`,
      tw`[--btn-icon:theme(colors.rose.300)] data-[active]:[--btn-icon:theme(colors.rose.200)] data-[hover]:[--btn-icon:theme(colors.rose.200)]`,
    ],
  },
} as const

/**
 * Properties for the {@link Button} component.
 *
 * @see Headless UI's {@link HeadlessButtonProps ButtonProps}
 * @see {@link Link}
 */
type ButtonProps = (
  | { color?: keyof typeof styles.colors; outline?: never; plain?: never }
  | { color?: never; outline: true; plain?: never }
  | { color?: never; outline?: never; plain: true }
) &
  Required<PropsWithChildren> &
  (
    | Omit<HeadlessButtonProps, "as" | "children">
    | ComponentPropsWithoutRef<typeof Link>
  )

/**
 * A styled button.
 *
 * The `color`, `outline`, and `plain` props are mutually exclusive.
 *
 * @param color - Render a solid button with the specified color variant.
 * @param outline - Render an outline button.
 * @param plain - Render a plain button.
 * @param to - If provided, a {@link Link} will be rendered with the provided
 *   URL. Otherwise, a Headless UI {@link HeadlessButton Button} component will
 *   be used instead.
 * @see {@link ButtonProps}
 */
export const Button = forwardRef<HTMLElement, ButtonProps>(function Button(
  { color, outline, plain, className, children, ...props },
  ref,
) {
  const classes = clsx(
    className,
    styles.base,
    outline
      ? styles.outline
      : plain
        ? styles.plain
        : clsx(styles.solid, styles.colors[color ?? "dark/zinc"]),
  )

  return "to" in props ? (
    <Link
      {...props}
      className={classes}
      ref={ref as ForwardedRef<HTMLAnchorElement>}
    >
      <TouchTarget>{children}</TouchTarget>
    </Link>
  ) : (
    <HeadlessButton
      {...props}
      className={clsx(classes, "cursor-default")}
      ref={ref}
    >
      <TouchTarget>{children}</TouchTarget>
    </HeadlessButton>
  )
})

/**
 * Expand the hit area to at least 44×44px on touch devices.
 *
 * @see {@link PropsWithChildren}
 */
export function TouchTarget({ children }: Required<PropsWithChildren>) {
  return (
    <>
      <span
        className="absolute left-1/2 top-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 [@media(pointer:fine)]:hidden"
        aria-hidden="true"
      />
      {children}
    </>
  )
}
