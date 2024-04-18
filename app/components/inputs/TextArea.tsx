import type { ComponentPropsWithoutRef } from "react"
import { ExclamationCircleIcon } from "@heroicons/react/24/solid"
import clsx from "clsx"
import { forwardRef } from "react"

import { Icon } from "~/components/Icon"
import { InlineAddOn } from "~/components/inputs/shared/InlineAddOn"

import type { SharedFormProps } from "./shared"
import { InputDescription } from "./shared/InputDescription"
import { InputError } from "./shared/InputError"
import { InputLabel } from "./shared/InputLabel"
import { InputOptionalHint } from "./shared/InputOptionalHint"

type TextAreaProps = ComponentPropsWithoutRef<"textarea"> &
  SharedFormProps & {
    hideOptionalHint?: boolean
  }

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea(
    {
      label,
      description,
      error,
      hideOptionalHint,
      disabled,
      required,
      className,
      ...rest
    },
    forwardedRef
  ) {
    // shortcut for showing the `optional` hint
    const showOptionalHint = !hideOptionalHint && !required

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
                  : "flex justify-end"
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
            <textarea
              {...rest}
              {...{ required, disabled }}
              ref={forwardedRef}
              className={clsx(
                "block min-h-[2.25rem] w-full rounded-md border-0 py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-500 disabled:ring-zinc-200 dark:bg-black dark:text-zinc-100 dark:ring-zinc-700 focus:dark:ring-primary-500 dark:disabled:bg-zinc-900 dark:disabled:ring-zinc-800 sm:text-sm sm:leading-6",
                error
                  ? "pr-10 ring-red-500"
                  : "ring-zinc-300 dark:ring-zinc-700"
              )}
              aria-invalid={Boolean(error)}
            />

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
  }
)
