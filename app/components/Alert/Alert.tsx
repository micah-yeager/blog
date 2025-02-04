// noinspection JSCommentMatchesSignature

import CheckCircleIcon from "@heroicons/react/20/solid/CheckCircleIcon"
import ExclamationTriangleIcon from "@heroicons/react/20/solid/ExclamationTriangleIcon"
import InformationCircleIcon from "@heroicons/react/20/solid/InformationCircleIcon"
import XCircleIcon from "@heroicons/react/20/solid/XCircleIcon"
import clsx from "clsx"
import type { ComponentPropsWithoutRef } from "react"

import { tw } from "~/utils/templates"
import type { IconProp } from "../Icon"

/** A variant definition for the {@link Alert} component. */
type Variant = {
  /** The icon to display for this variant. */
  Icon: IconProp
  /** The classes for the icon. */
  iconClassName: string
  /** The classes for the alert's background. */
  bgClassName: string
  /** The classes for the alert's header. */
  headerClassName: string
  /** The classes for the alert's text. */
  textClassName: string
}

const variants = {
  error: {
    Icon: XCircleIcon,
    iconClassName: tw`text-error-400 dark:text-error-600`,
    bgClassName: tw`bg-error-50 dark:bg-error-950`,
    headerClassName: tw`text-error-800 dark:text-error-200`,
    textClassName: tw`text-error-700 dark:text-error-300`,
  },
  info: {
    Icon: InformationCircleIcon,
    iconClassName: tw`text-info-400 dark:text-info-600`,
    bgClassName: tw`bg-info-50 dark:bg-info-950`,
    headerClassName: tw`text-info-800 dark:text-info-200`,
    textClassName: tw`text-info-700 dark:text-info-300`,
  },
  success: {
    Icon: CheckCircleIcon,
    iconClassName: tw`text-success-400 dark:text-success-600`,
    bgClassName: tw`bg-success-50 dark:bg-success-950`,
    headerClassName: tw`text-success-800 dark:text-success-200`,
    textClassName: tw`text-success-700 dark:text-success-300`,
  },
  warning: {
    Icon: ExclamationTriangleIcon,
    iconClassName: tw`text-warning-400 dark:text-warning-600`,
    bgClassName: tw`bg-warning-50 dark:bg-warning-950`,
    headerClassName: tw`text-warning-800 dark:text-warning-200`,
    textClassName: tw`text-warning-700 dark:text-warning-300`,
  },
} as const satisfies Record<string, Variant>

/**
 * Properties for the {@link Alert} component.
 *
 * @see {@link HTMLDivElement}
 */
type AlertProps = ComponentPropsWithoutRef<"div"> & {
  /** The variant to use. */
  variant: keyof typeof variants
  /** The alert header text. */
  title?: string
}

/**
 * A notification to the end-user.
 *
 * @param variant - The variant to use.
 * @param title - The alert header text.
 * @see {@link AlertProps}
 */
export function Alert({
  variant,
  title,
  className,
  children,
  ...rest
}: AlertProps) {
  const alertMap = variants[variant]

  return (
    <div
      {...rest}
      className={clsx(
        "rounded-md p-4 leading-normal",
        alertMap.bgClassName,
        className,
      )}
    >
      <div className="space-y-2">
        <div className="flex flex-shrink-0 items-center gap-x-3">
          <alertMap.Icon
            className={clsx("h-5 w-5", alertMap.iconClassName)}
            aria-hidden="true"
          />
          <h3 className={clsx("text-sm font-medium", alertMap.headerClassName)}>
            {title}
          </h3>
        </div>

        <div className={clsx("ml-8 text-sm", alertMap.textClassName)}>
          {children}
        </div>
      </div>
    </div>
  )
}
