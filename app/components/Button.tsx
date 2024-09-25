import { Link } from "@remix-run/react"
import clsx from "clsx"
import type { ComponentPropsWithoutRef } from "react"
import { createContext, useContext } from "react"
import { useGlobalSubmittingState } from "remix-utils/use-global-navigation-state"
import type { KeysOfUnion, ValueOf } from "type-fest"

import { tw } from "@utils/templates"

import type { IconProps } from "./Icon"
import { Icon } from "./Icon"
import { LoadingIndicator } from "./LoadingIndicator"

/**
 * Style variants for the Button component.
 *
 * @see ButtonProps
 */
const variantStyles = {
  primary: tw`bg-primary-800 font-semibold text-primary-100 hover:bg-primary-700 focus-visible:outline-primary-800 active:bg-primary-800 active:text-primary-100/70 dark:bg-primary-700 dark:hover:bg-primary-600 dark:focus-visible:outline-primary-700 dark:active:bg-primary-700 dark:active:text-primary-100/70`,
  secondary: tw`bg-zinc-100 font-medium text-zinc-900 hover:bg-zinc-100 focus-visible:outline-zinc-100 active:bg-zinc-100 active:text-zinc-900/60 dark:bg-zinc-800/90 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:focus-visible:outline-zinc-800/75 dark:active:bg-zinc-800/75 dark:active:text-zinc-50/70`,
} as const satisfies Record<string, string>
/**
 * Shape and size variants for the Button component.
 *
 * @see ButtonProps
 */
const shapeSizeStyles = {
  rectangle: {
    xs: tw`gap-x-1.5 rounded px-2 py-1 text-xs`,
    sm: tw`gap-x-1.5 rounded px-2 py-1 text-sm`,
    md: tw`gap-x-2 rounded-md px-2.5 py-1.5 text-sm`,
    lg: tw`gap-x-2.5 rounded-md px-3 py-2 text-sm`,
    xl: tw`gap-x-3 rounded-md px-3.5 py-2.5 text-sm`,
  },
  pill: {
    xs: tw`gap-x-1.5 rounded-full px-2.5 py-1 text-xs`,
    sm: tw`gap-x-1.5 rounded-full px-2.5 py-1 text-sm`,
    md: tw`gap-x-2 rounded-full px-3 py-1.5 text-sm`,
    lg: tw`gap-x-2.5 rounded-full px-3.5 py-2 text-sm`,
    xl: tw`gap-x-3 rounded-full px-4 py-2.5 text-sm`,
  },
  circle: {
    sm: tw`h-6 w-6 rounded-full p-1`,
    md: tw`h-8 w-8 rounded-full p-1.5`,
    lg: tw`h-10 w-10 rounded-full p-2`,
  },
} as const satisfies Record<string, Record<string, string>>

/**
 * The shape name of the button.
 *
 * @see ButtonProps
 */
type ButtonShapeOption = keyof typeof shapeSizeStyles
/**
 * The size name of the button size.
 *
 * @see ButtonProps
 */
type ButtonShapeSizeOption<T extends ButtonShapeOption> =
  keyof (typeof shapeSizeStyles)[T]
/**
 * The size name of any button size.
 *
 * @see ButtonProps
 */
type ButtonAnySizeOption = KeysOfUnion<ValueOf<typeof shapeSizeStyles>>

/**
 * Default shape for the button.
 *
 * @see ButtonShapeOption
 */
const DEFAULT_SHAPE = "pill" as const satisfies ButtonShapeOption
/**
 * Default size for the button.
 *
 * @see ButtonShapeSizeOption
 */
const DEFAULT_SIZE = "md" as const satisfies ButtonShapeSizeOption<
  typeof DEFAULT_SHAPE
>

/**
 * Context for button children, primarily used for icon sizing.
 *
 * @see Button
 */
const ButtonContext = createContext(
  {} as {
    /** The size of the parent button. */
    size: ButtonAnySizeOption
  },
)

/**
 * Properties for the Button component.
 *
 * If `to` is provided, the button will render as a Remix `Link` component.
 * Otherwise, it will render as a `button` element.
 *
 * @see Button
 */
type ButtonProps<TShape extends ButtonShapeOption> = {
  /**
   * The variant style to use.
   *
   * @default "secondary"
   */
  variant?: keyof typeof variantStyles
  /**
   * The shape of the button.
   *
   * @default "pill"
   */
  shape?: TShape
  /**
   * The size of the button's shape. Not all sizes are available for all shapes.
   *
   * @default "md"
   */
  size?: ButtonShapeSizeOption<TShape>
} & (
  | (ComponentPropsWithoutRef<"button"> & { to?: undefined })
  | ComponentPropsWithoutRef<typeof Link>
)

/**
 * A button that can render as a `button` or `Link` element.
 *
 * @component
 * @see ButtonProps
 */
export function Button<TShape extends ButtonShapeOption>({
  variant = "secondary",
  shape = DEFAULT_SHAPE as TShape,
  size = DEFAULT_SIZE,
  className,
  children,
  ...props
}: ButtonProps<TShape>) {
  className = clsx(
    "outline-offset-2 backdrop-blur transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:transition-none",
    variantStyles[variant],
    shapeSizeStyles[shape][size] as string,
    className,
  )

  // nav state to disable proper buttons when submitting
  const navState = useGlobalSubmittingState()
  const disableForSubmit = props.type === "submit" && navState === "submitting"

  return (
    <ButtonContext.Provider
      value={{ size: (size as ButtonAnySizeOption) ?? DEFAULT_SIZE }}
    >
      {typeof props.to === "undefined" ? (
        <button
          {...props}
          className={clsx(
            "disabled:cursor-default disabled:bg-zinc-100 disabled:opacity-75 dark:disabled:bg-zinc-900",
            className,
          )}
          disabled={props.disabled || disableForSubmit}
        >
          {/* Make the children invisible rather than replacing with the spinner
          to reduce layout shift. */}
          {disableForSubmit ? (
            <>
              <span className="invisible">{children}</span>
              <LoadingIndicator variant="subtle" className="h-5 w-5" />
            </>
          ) : (
            <span className="flex w-full items-center justify-center gap-x-2">
              {children}
            </span>
          )}
        </button>
      ) : (
        <Link {...props} {...{ className }}>
          <span className="inline-flex w-full items-center justify-center gap-x-2">
            {children}
          </span>
        </Link>
      )}
    </ButtonContext.Provider>
  )
}

/**
 * Size variants for the Button.Icon.
 *
 * @see ButtonIconProps
 */
const buttonIconSizes = {
  xs: "h-3 w-3",
  sm: "h-4 w-4",
  _default: "h-5 w-5",
}

/**
 * Properties for the Button.Icon component.
 *
 * @see IconProps
 * @see Button.Icon
 */
type ButtonIconProps = IconProps & {
  sizeOverride?: keyof Omit<typeof buttonIconSizes, "_default">
}

/**
 * A button icon that sizes the icon based on the parent button's size.
 *
 * @component
 * @see Button
 * @see ButtonIconProps
 */
Button.Icon = function ButtonIcon({
  sizeOverride,
  className,
  ...rest
}: ButtonIconProps) {
  // Determine button size from context.
  // Use a switch instead of a direct mapping since the size shouldn't increase
  // beyond the medium size.
  const { size } = useContext(ButtonContext)

  return (
    <Icon
      {...rest}
      className={clsx(
        "transition",
        sizeOverride
          ? buttonIconSizes[sizeOverride]
          : size in buttonIconSizes
            ? buttonIconSizes[size as keyof typeof buttonIconSizes]
            : buttonIconSizes._default,
        className,
      )}
    />
  )
}
