import { ExclamationCircleIcon } from "@heroicons/react/24/solid"
import clsx from "clsx"
import type { ComponentPropsWithoutRef, FormEvent } from "react"
import { forwardRef, useState } from "react"

import { Icon } from "@ui/Icon"
import { InlineAddOn } from "@ui/inputs/shared/InlineAddOn"
import { useForwardRef } from "@utils/hooks"
import { tw } from "@utils/templates"

import type { SharedFormProps } from "./shared"
import { InputDescription } from "./shared/InputDescription"
import { InputError } from "./shared/InputError"
import { InputLabel } from "./shared/InputLabel"
import { InputOptionalHint } from "./shared/InputOptionalHint"

/**
 * Properties for the `TextArea` component. Extends the `textarea` element
 * properties.
 *
 * @see TextArea
 * @see SharedFormProps
 */
type TextAreaProps = ComponentPropsWithoutRef<"textarea"> &
  SharedFormProps & {
    hideOptionalHint?: boolean
  }

/**
 * A multi-line text input field.
 *
 * @component
 * @see TextAreaProps
 */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea(
    {
      label,
      description,
      error,
      hideOptionalHint,
      disabled,
      required,
      onInput: inputOnInput,
      className,
      ...rest
    },
    forwardedRef,
  ) {
    const ref = useForwardRef(forwardedRef)

    // shortcut for showing the `optional` hint
    const showOptionalHint = !(hideOptionalHint || required)

    // Rendering control for auto-resizing.
    const [value, setValue] = useState<string>(ref.current?.value ?? "")
    const onInput = (event: FormEvent<HTMLTextAreaElement>) => {
      setValue(event.currentTarget.value)
      // Call the provided `onInput` if applicable.
      inputOnInput?.(event)
    }

    const gridClassName = tw`col-start-1 col-end-2 row-start-1 row-end-2`
    // Define classes here since they will be used for both the textarea and the
    // invisible "preview" used for auto-resizing.
    const baseClassName = clsx(
      gridClassName,
      "block min-h-[2.25rem] w-full rounded-md border-0 px-3 py-1.5 text-inherit text-zinc-900 shadow-sm ring-1 ring-inset placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-500 disabled:ring-zinc-200 dark:bg-black dark:text-zinc-100 focus:dark:ring-primary-500 dark:disabled:bg-zinc-900 dark:disabled:ring-zinc-800 sm:text-sm sm:leading-6",
      error ? "pr-10 ring-red-500" : "ring-zinc-300 dark:ring-zinc-700",
    )

    return (
      <div className={clsx("space-y-2", className)}>
        <label className="space-y-2">
          {/* label and optional hint */}
          {(label || showOptionalHint) && (
            <div
              className={clsx(
                label
                  ? showOptionalHint
                    ? "flex justify-between"
                    : "inline-block"
                  : "flex justify-end",
              )}
            >
              {/* label */}
              {label && <InputLabel>{label}</InputLabel>}
              {/* optional hint */}
              {showOptionalHint && (
                <InputOptionalHint>Optional</InputOptionalHint>
              )}
            </div>
          )}

          <div className="relative">
            <div className="grid">
              <textarea
                {...rest}
                {...{ required, disabled, onInput, ref }}
                // Disable manual resizing, since it breaks auto-resizing.
                className={clsx(baseClassName, "resize-none overflow-clip")}
                aria-invalid={Boolean(error)}
              />
              <div
                // Mimic `textarea`'s `whitespace-pre-wrap` to ensure the
                // preview behavior matches the textarea.
                className={clsx(baseClassName, "invisible whitespace-pre-wrap")}
                aria-hidden
              >
                {/* The trailing space ensures trailing newlines without content still force vertical expansion. */}
                {value}{" "}
              </div>
            </div>

            {/* trailing inline add-on */}
            {error && (
              <InlineAddOn
                {...{ disabled }}
                className="right-0 flex items-center gap-2 pr-3"
              >
                <Icon
                  as={ExclamationCircleIcon}
                  className="h-5 w-5 text-red-500"
                  aria-hidden="true"
                />
              </InlineAddOn>
            )}
          </div>
        </label>

        {/* keep these out of the label to keep click area sane and to help screen readers */}
        {(description || error) && (
          <div className="space-y-1">
            {/* description */}
            {description && <InputDescription>{description}</InputDescription>}
            {/* error */}
            {error && <InputError>{error}</InputError>}
          </div>
        )}
      </div>
    )
  },
)
