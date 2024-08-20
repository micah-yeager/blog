import type {
  DescriptionProps,
  FieldProps,
  LabelProps
} from "@headlessui/react"
import type { ComponentPropsWithoutRef } from "react"
import {
  FieldsetProps,
  Description as HeadlessDescription,
  Field as HeadlessField,
  Fieldset as HeadlessFieldset,
  Label as HeadlessLabel,
  Legend as HeadlessLegend,
  LegendProps
} from "@headlessui/react"
import clsx from "clsx"

/**
 * Set of related {@link FieldGroup}s.
 *
 * @see Headless UI's {@link HeadlessFieldset Fieldset}
 */
export function Fieldset({ className, ...props }: Omit<FieldsetProps, "as">) {
  return (
    <HeadlessFieldset
      {...props}
      className={clsx(
        className,
        "[&>*+[data-slot=control]]:mt-6 [&>[data-slot=text]]:mt-1"
      )}
    />
  )
}

/**
 * Caption for a {@link Fieldset}.
 *
 * @see Headless UI's {@link HeadlessLegend Legend}
 */
export function Legend({ className, ...props }: Omit<LegendProps, "as">) {
  return (
    <HeadlessLegend
      data-slot="legend"
      {...props}
      className={clsx(
        className,
        "text-base/6 font-semibold text-zinc-950 data-[disabled]:opacity-50 dark:text-white sm:text-sm/6"
      )}
    />
  )
}

/**
 * Group of related {@link Field}s within a {@link Fieldset}.
 *
 * @see {@link HTMLDivElement}
 */
export function FieldGroup({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      data-slot="control"
      {...props}
      className={clsx(className, "space-y-8")}
    />
  )
}

/**
 * Field within a {@link FieldGroup}.
 *
 * @see Headless UI's {@link HeadlessField Field}
 */
export function Field({ className, ...props }: Omit<FieldProps, "as">) {
  return (
    <HeadlessField
      {...props}
      className={clsx(
        className,
        "[&>[data-slot=label]+[data-slot=control]]:mt-3",
        "[&>[data-slot=label]+[data-slot=description]]:mt-1",
        "[&>[data-slot=description]+[data-slot=control]]:mt-3",
        "[&>[data-slot=control]+[data-slot=description]]:mt-3",
        "[&>[data-slot=control]+[data-slot=error]]:mt-3",
        "[&>[data-slot=label]]:font-medium"
      )}
    />
  )
}

/**
 * Label for a {@link Field}.
 *
 * @see Headless UI's {@link HeadlessLabel Label}
 */
export function Label({ className, ...props }: Omit<LabelProps, "as">) {
  return (
    <HeadlessLabel
      data-slot="label"
      {...props}
      className={clsx(
        className,
        "select-none text-base/6 text-zinc-950 data-[disabled]:opacity-50 dark:text-white sm:text-sm/6"
      )}
    />
  )
}

/**
 * Description for a {@link Field}.
 *
 * @see Headless UI's {@link HeadlessDescription Description}
 */
export function Description({
  className,
  ...props
}: Omit<DescriptionProps, "as">) {
  return (
    <HeadlessDescription
      data-slot="description"
      {...props}
      className={clsx(
        className,
        "text-base/6 text-zinc-500 data-[disabled]:opacity-50 dark:text-zinc-400 sm:text-sm/6"
      )}
    />
  )
}

/**
 * Error message for a {@link Field}.
 *
 * @see Headless UI's {@link HeadlessDescription Description}
 */
export function ErrorMessage({
  className,
  ...props
}: Omit<DescriptionProps, "as">) {
  return (
    <HeadlessDescription
      data-slot="error"
      {...props}
      className={clsx(
        className,
        "text-base/6 text-red-600 data-[disabled]:opacity-50 dark:text-red-500 sm:text-sm/6"
      )}
    />
  )
}
