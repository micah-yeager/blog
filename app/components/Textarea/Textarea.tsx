import {
  Textarea as HeadlessTextarea,
  type TextareaProps as HeadlessTextareaProps,
} from "@headlessui/react"
import clsx from "clsx"
import type { ChangeEvent } from "react"
import { forwardRef, useState } from "react"
import { useForwardRef } from "~/utils/hooks"

/**
 * Properties for the {@link Textarea} component.
 *
 * @see Headless UI's {@link HeadlessTextareaProps TextareaProps}
 */
type TextareaProps = Omit<HeadlessTextareaProps, "as"> & {
  /** Automatically expand to fit content. */
  autoResize?: boolean
}

/**
 * A textarea field.
 *
 * @param autoResize - Automatically expand to fit content.
 * @see {@link TextareaProps}
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    { className, autoResize = true, onChange: inputOnChange, ...props },
    forwardedRef,
  ) {
    // Rendering controls for auto-resizing.
    const ref = useForwardRef(forwardedRef)
    const [value, setValue] = useState(ref.current?.value ?? "")
    const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      setValue(event.currentTarget.value)
      inputOnChange?.(event)
    }

    // Classes shared between the editor and the invisible auto-resize
    // "preview" block.
    const classes = [
      // Basic layout
      "relative block col-start-1 col-end-2 row-start-1 row-end-2 h-full w-full appearance-none rounded-lg px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing.3)-1px)] sm:py-[calc(theme(spacing[1.5])-1px)]",
      // Typography
      "text-base/6 text-zinc-950 placeholder:text-zinc-500 dark:text-white sm:text-sm/6",
      // Border
      "border border-zinc-950/10 data-[hover]:border-zinc-950/20 dark:border-white/10 dark:data-[hover]:border-white/20",
      // Background color
      "bg-transparent dark:bg-white/5",
      // Hide default focus styles
      "focus:outline-none",
      // Invalid state
      "data-[invalid]:border-red-500 data-[invalid]:data-[hover]:border-red-500 data-[invalid]:dark:border-red-600 data-[invalid]:data-[hover]:dark:border-red-600",
      // Disabled state
      "disabled:border-zinc-950/20 disabled:dark:border-white/15 disabled:dark:bg-white/[2.5%] dark:data-[hover]:disabled:border-white/15",
    ]

    return (
      <span
        data-slot="control"
        className={clsx(
          className,
          // Basic layout
          "relative grid w-full",
          // Background color + shadow applied to inset pseudo-element, so
          // shadow blends with border in light mode
          "before:absolute before:inset-px before:rounded-[calc(theme(borderRadius.lg)-1px)] before:bg-white before:shadow",
          // Background color is moved to control and shadow is removed in dark
          // mode so hide `before` pseudo
          "dark:before:hidden",
          // Focus ring
          "after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-inset after:ring-transparent sm:after:focus-within:ring-2 sm:after:focus-within:ring-blue-500",
          // Disabled state
          "has-[[data-disabled]]:opacity-50 before:has-[[data-disabled]]:bg-zinc-950/5 before:has-[[data-disabled]]:shadow-none",
        )}
      >
        <HeadlessTextarea
          ref={ref}
          {...props}
          onChange={onChange}
          className={clsx(
            ...classes,
            // Manual resizing resizing since it breaks auto-resizing.
            autoResize ? "resize-none overflow-clip" : "resize-y",
          )}
        />
        {/* Auto-resize invisible "preview" block */}
        <div
          // Mimic `textarea`'s `whitespace-pre-wrap` to ensure the
          // preview behavior matches the textarea.
          className={clsx(classes, "invisible whitespace-pre-wrap")}
          aria-hidden
        >
          {value}
        </div>
      </span>
    )
  },
)
