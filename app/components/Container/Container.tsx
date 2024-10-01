import clsx from "clsx"
import type { ComponentPropsWithoutRef, ElementRef } from "react"
import { forwardRef } from "react"

/**
 * The outer portion of a responsive page container.
 *
 * Typically used with a child {@link ContainerInner}.
 *
 * @see {@link HTMLDivElement}
 */
export const ContainerOuter = forwardRef<
  ElementRef<"div">,
  ComponentPropsWithoutRef<"div">
>(function OuterContainer({ className, children, ...props }, ref) {
  return (
    <div ref={ref} className={clsx("sm:px-8", className)} {...props}>
      <div className="mx-auto w-full max-w-7xl lg:px-8">{children}</div>
    </div>
  )
})

/**
 * The inner portion of a responsive page container.
 *
 * Typically used with a parent {@link ContainerOuter}.
 *
 * @see {@link HTMLDivElement}
 */
export const ContainerInner = forwardRef<
  ElementRef<"div">,
  ComponentPropsWithoutRef<"div">
>(function InnerContainer({ className, children, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={clsx("relative px-4 sm:px-8 lg:px-12", className)}
      {...props}
    >
      <div className="mx-auto max-w-2xl lg:max-w-5xl">{children}</div>
    </div>
  )
})

/**
 * A self-contained responsive page container.
 *
 * @see {@link ContainerOuter}
 */
export const Container = forwardRef<
  ElementRef<typeof ContainerOuter>,
  ComponentPropsWithoutRef<typeof ContainerOuter>
>(function Container({ children, ...props }, ref) {
  return (
    <ContainerOuter ref={ref} {...props}>
      <ContainerInner>{children}</ContainerInner>
    </ContainerOuter>
  )
})
