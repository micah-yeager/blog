import type { ComponentPropsWithoutRef } from "react"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid"
import clsx from "clsx"

import type { IconProp } from "./Icon"
import { Icon } from "./Icon"

/**
 * A map of variant names to their respective icon and class name.
 *
 * @see variants
 */
type VariantMap = {
  /** The icon to render. */
  icon: IconProp
  /** The class name to apply to the icon. */
  className: string
}
/**
 * Available variants for the loading indicator.
 *
 * @see LoadingIndicatorProps
 */
const variants = {
  spinner: {
    icon: faSpinner,
    className: "animate-spin"
  },
  subtle: {
    icon: EllipsisHorizontalIcon,
    className: "animate-pulse"
  }
} as const satisfies Record<string, VariantMap>

/**
 * Properties for the `LoadingIndicator` component. Extends the `Icon`
 * component's props.
 *
 * @see LoadingIndicator
 */
type LoadingIndicatorProps = Omit<
  ComponentPropsWithoutRef<typeof Icon>,
  "as"
> & {
  /** The style variant to use. */
  variant?: keyof typeof variants
}

/**
 * A loading indicator that can be styled with different variants.
 *
 * @component
 * @see LoadingIndicatorProps
 */
export function LoadingIndicator({
  variant,
  className,
  ...rest
}: LoadingIndicatorProps) {
  const screenReader = <span className="sr-only">Loading</span>

  // If a variant is specified, use it.
  if (variant) {
    return (
      <>
        {screenReader}
        <Icon
          {...rest}
          as={variants[variant].icon}
          className={clsx(variants[variant].className, className)}
        />
      </>
    )
  }

  // Otherwise, use both variants depending on the user's motion preference.
  return (
    <>
      {screenReader}
      {/* spinner for most people */}
      <Icon
        {...rest}
        as={variants["spinner"].icon}
        className={clsx(
          "hidden motion-safe:block",
          variants["spinner"].className,
          className
        )}
      />
      <Icon
        {...rest}
        as={variants["subtle"].icon}
        className={clsx(
          "hidden motion-reduce:block",
          variants["spinner"].className,
          className
        )}
      />
    </>
  )
}
