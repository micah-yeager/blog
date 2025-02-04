// noinspection JSCommentMatchesSignature

import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import EllipsisHorizontalIcon from "@heroicons/react/20/solid/EllipsisHorizontalIcon"
import clsx from "clsx"
import type { ComponentPropsWithoutRef, ElementType } from "react"
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
    className: "animate-spin",
  },
  subtle: {
    icon: EllipsisHorizontalIcon,
    className: "animate-pulse",
  },
} as const satisfies Record<string, VariantMap>

/**
 * Properties for the {@link LoadingIndicator} component.
 *
 * @see {@link Icon}
 */
type LoadingIndicatorProps<T extends ElementType> = Omit<
  ComponentPropsWithoutRef<"div">,
  "as"
> & {
  /**
   * The element type or component to render as.
   *
   * @default "div"
   * @see {@link ElementType}
   */
  as?: T
  /** The style variant to use. */
  variant?: keyof typeof variants
}

/**
 * A loading indicator (aka. spinner).
 *
 * If no variant is specified, the component will use the best option based on
 * the user's motion preference.
 *
 * @param as - The element type or component to render as.
 * @param variant - The style variant to use.
 * @see {@link LoadingIndicatorProps}
 */
export function LoadingIndicator<T extends ElementType>({
  as,
  variant,
  ...rest
}: LoadingIndicatorProps<T>) {
  const Component = as ?? "div"
  const screenReader = <span className="sr-only">Loading</span>

  // If a variant is specified, use it.
  if (variant) {
    return (
      <Component {...rest}>
        {screenReader}
        <Icon
          as={variants[variant].icon}
          className={variants[variant].className}
          aria-hidden="true"
        />
      </Component>
    )
  }

  // Otherwise, use both variants depending on the user's motion preference.
  return (
    <Component {...rest}>
      {screenReader}
      {/* spinner for most people */}
      <Icon
        as={variants.spinner.icon}
        className={clsx("hidden motion-safe:block", variants.spinner.className)}
        aria-hidden="true"
      />
      <Icon
        as={variants.subtle.icon}
        className={clsx(
          "hidden motion-reduce:block",
          variants.spinner.className,
        )}
        aria-hidden="true"
      />
    </Component>
  )
}
