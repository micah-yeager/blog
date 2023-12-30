import { Link } from "@remix-run/react"
import clsx from "clsx"
import type {
  ComponentPropsWithoutRef,
  ExoticComponent,
  PropsWithoutRef,
  SVGProps,
} from "react"
import { createContext, useContext } from "react"

import { tw } from "~/utils/templates"

const variantStyles = {
  primary: tw`bg-primary-800 font-semibold text-primary-100 hover:bg-primary-700 focus-visible:outline-primary-800 active:bg-primary-800 active:text-primary-100/70 dark:bg-primary-700 dark:hover:bg-primary-600 dark:focus-visible:outline-primary-700 dark:active:bg-primary-700 dark:active:text-primary-100/70`,
  secondary: tw`bg-zinc-100 font-medium text-zinc-900 hover:bg-zinc-100 focus-visible:outline-zinc-100 active:bg-zinc-100 active:text-zinc-900/60 dark:bg-zinc-800/75 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:focus-visible:outline-zinc-800/75 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70`,
}
const shapeSizeStyles: Record<string, Record<string, string>> = {
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
    sm: tw`rounded-full p-1`,
    md: tw`rounded-full p-1.5`,
    lg: tw`rounded-full p-2`,
  },
} as const

type ButtonShapeOption = keyof typeof shapeSizeStyles
type ButtonProps<T extends ButtonShapeOption> = {
  variant?: keyof typeof variantStyles
  shape?: T
  size?: keyof (typeof shapeSizeStyles)[T]
} & (
  | (ComponentPropsWithoutRef<"button"> & { to?: undefined })
  | ComponentPropsWithoutRef<typeof Link>
)
const ButtonContext = createContext({} as { size: string })

export function Button<T extends ButtonShapeOption>({
  variant = "primary",
  shape = "rectangle" as T,
  size = "md",
  className,
  children,
  ...props
}: ButtonProps<T>) {
  className = clsx(
    "inline-flex items-center justify-center outline-offset-2 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:transition-none",
    variantStyles[variant],
    shapeSizeStyles[shape][size],
    className,
  )

  return (
    <ButtonContext.Provider value={{ size }}>
      {typeof props.to === "undefined" ? (
        <button {...props} {...{ className }}>
          {children}
        </button>
      ) : (
        <Link {...props} {...{ className }}>
          {children}
        </Link>
      )}
    </ButtonContext.Provider>
  )
}

type IconElementType = ExoticComponent<
  PropsWithoutRef<SVGProps<SVGSVGElement>> & {
    title?: string
    titleId?: string
  }
>
type ButtonIconProps = ComponentPropsWithoutRef<IconElementType> & {
  as: IconElementType
}

Button.Icon = function ButtonIcon({
  as: Component,
  className,
  ...rest
}: ButtonIconProps) {
  const { size } = useContext(ButtonContext)
  let sizeClassName
  switch (size) {
    case "xs":
      sizeClassName = "h-3 w-3"
      break
    case "sm":
      sizeClassName = "h-4 w-4"
      break
    default:
      sizeClassName = "h-5 w-5"
      break
  }

  return (
    <Component
      {...rest}
      className={clsx(
        "flex-shrink-0 first:-ml-0.5 last:mr-0.5",
        sizeClassName,
        className,
      )}
      aria-hidden="true"
    />
  )
}
