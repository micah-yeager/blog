import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid"
import clsx from "clsx"
import type { ComponentPropsWithoutRef, ReactNode } from "react"

/**
 * Variant definition for the Alert component.
 *
 * @see variants
 */
type VariantMap = {
  /** The icon to display for this variant. */
  Icon: ({ className }: { className: string }) => ReactNode
  /** The classes for the icon. */
  iconClassName?: string
  /** The classes for the alert's background. */
  bgClassName: string
  /** The classes for the alert's header. */
  headerClassName: string
  /** The classes for the alert's text. */
  textClassName: string
}
/**
 * Variant definitions for the Alert component.
 *
 * @see Alert
 * @see AlertProps
 */
const variants = {
  error: {
    Icon: XCircleIcon,
    iconClassName: "text-red-400 dark:text-red-600",
    bgClassName: "bg-red-50 dark:bg-red-950",
    headerClassName: "text-red-800 dark:text-red-200",
    textClassName: "text-red-700 dark:text-red-300",
  },
  warning: {
    Icon: ExclamationTriangleIcon,
    iconClassName: "text-yellow-400 dark:text-yellow-600",
    bgClassName: "bg-yellow-50 dark:bg-yellow-950",
    headerClassName: "text-yellow-800 dark:text-yellow-200",
    textClassName: "text-yellow-700 dark:text-yellow-300",
  },
  success: {
    Icon: CheckCircleIcon,
    iconClassName: "text-green-400 dark:text-green-600",
    bgClassName: "bg-green-50 dark:bg-green-950",
    headerClassName: "text-green-800 dark:text-green-200",
    textClassName: "text-green-700 dark:text-green-300",
  },
  info: {
    Icon: InformationCircleIcon,
    iconClassName: "text-blue-400 dark:text-blue-600",
    bgClassName: "bg-blue-50 dark:bg-blue-950",
    headerClassName: "text-blue-800 dark:text-blue-200",
    textClassName: "text-blue-700 dark:text-blue-300",
  },
} as const satisfies Record<string, VariantMap>

/**
 * Properties for the Alert component. Extends the `div` element's props.
 *
 * @see Alert
 */
type AlertProps = ComponentPropsWithoutRef<"div"> & {
  /** The variant to use. */
  variant: keyof typeof variants
  /** The alert header text. */
  title?: string
}

/**
 * A simple alert component.
 *
 * @component
 * @see AlertProps
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
