// noinspection JSCommentMatchesSignature

import type { ComponentPropsWithoutRef } from "react"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid"
import clsx from "clsx"

import type { IconProp } from "../Icon"
import { Icon } from "../Icon"

/** A variant definition for the {@link LoadingIndicator} component. */
type VariantMap = {
  /** The icon definition to render. */
  icon: IconProp
  /** The class name to apply to the icon. */
  className: string
}

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
 * Properties for the {@link LoadingIndicator} component.
 *
 * @see {@link Icon}
 */
type LoadingIndicatorProps = Omit<
  ComponentPropsWithoutRef<typeof Icon>,
  "as"
> & {
  /** The style variant to use. */
  variant?: keyof typeof variants
}

/**
 * A loading indicator (aka. spinner).
 *
 * If no variant is specified, the component will use the best option based on
 * the user's motion preference.
 *
 * @param variant - The style variant to use.
 * @see {@link LoadingIndicatorProps}
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
