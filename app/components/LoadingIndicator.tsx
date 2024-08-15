import type { ComponentPropsWithoutRef } from "react"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid"
import clsx from "clsx"

import type { IconProp } from "./Icon"
import { Icon } from "./Icon"

type VariantMap = {
  icon: IconProp
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

type LoadingIndicatorProps = Omit<
  ComponentPropsWithoutRef<typeof Icon>,
  "as"
> & {
  variant?: keyof typeof variants
}

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
