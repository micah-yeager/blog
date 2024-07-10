import type {
  ComponentPropsWithoutRef,
  ComponentType,
  CSSProperties,
  ElementType,
  ReactNode
} from "react"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"
import { ExclamationCircleIcon } from "@heroicons/react/24/solid"
import clsx from "clsx"
import { forwardRef, useRef, useState } from "react"

import { useDimensions, useForwardRef } from "@utils/hooks"

import type { SharedFormProps } from "./shared"
import { Icon } from "../Icon"
import { InlineAddOn } from "./shared/InlineAddOn"
import { InputDescription } from "./shared/InputDescription"
import { InputError } from "./shared/InputError"
import { InputLabel } from "./shared/InputLabel"
import { InputOptionalHint } from "./shared/InputOptionalHint"

type TextInputAddOnProps = {
  className?: string
  disabled?: boolean
}
type TextInputProps = ComponentPropsWithoutRef<"input"> &
  SharedFormProps & {
    LeadingAddOn?: ComponentType<TextInputAddOnProps>
    leadingInlineAddOn?: ReactNode
    TrailingAddOn?: ComponentType<TextInputAddOnProps>
    trailingInlineAddOn?: ReactNode
    hideOptionalHint?: boolean
  }

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput(
    {
      label,
      description,
      error,
      LeadingAddOn,
      TrailingAddOn,
      leadingInlineAddOn,
      trailingInlineAddOn,
      hideOptionalHint,
      type: inputType,
      disabled,
      required,
      className,
      ...rest
    },
    forwardedRef
  ) {
    const ref = useForwardRef(forwardedRef)

    // display password input toggle
    const [type, setType] = useState<TextInputProps["type"]>(inputType)

    function toggleType() {
      if (type === "password") {
        setType("text")
      } else {
        setType("password")
      }
    }

    // dynamic width for the absolutely-positioned inline add-ons,
    // since we can't directly use math with TailwindCSS
    const leadingInlineRef = useRef<HTMLDivElement>(null)
    const trailingInlineRef = useRef<HTMLDivElement>(null)
    const { width: leadingInlineWidth } = useDimensions(leadingInlineRef)
    const { width: trailingInlineWidth } = useDimensions(trailingInlineRef)
    const leadingInlinePadding =
      12 + // default input padding with TailwindCSS Forms
      leadingInlineWidth - // defaults to 0 if ref is null
      (leadingInlineAddOn ? 4 : 0) // inner padding should just be 8px, not 12px
    const trailingInlinePadding =
      12 + // default input padding with TailwindCSS Forms
      trailingInlineWidth - // defaults to 0 if ref is null
      (trailingInlineAddOn ? 4 : 0) // inner padding should just be 8px, not 12px

    // shortcut for showing the `optional` hint
    const showOptionalHint = !hideOptionalHint && !required

    return (
      <div className={clsx("space-y-2", className)}>
        {/* use wrapping label, so we don't need to bother with htmlFor */}
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

          {/* emulated field */}
          <div
            className={"group/Input flex rounded-md shadow-sm"}
            data-leading-add-on={Boolean(LeadingAddOn)}
            data-trailing-add-on={Boolean(
              TrailingAddOn || inputType === "password"
            )}
          >
            {/* leading add-on */}
            {LeadingAddOn && (
              <AddOn
                {...{ disabled }}
                as={LeadingAddOn}
                className="-mr-px rounded-l-md border-r-0"
              />
            )}

            <div className="relative flex w-full">
              {/* leading inline add-on */}
              {leadingInlineAddOn && (
                <InlineAddOn
                  {...{ disabled }}
                  ref={leadingInlineRef}
                  className="left-0 pl-3"
                >
                  {leadingInlineAddOn}
                </InlineAddOn>
              )}

              {/* input proper */}
              <input
                {...rest}
                {...{ ref, type, required, disabled }}
                className={clsx(
                  "block w-full rounded-md border-0 py-1.5 text-zinc-900 ring-1 ring-inset placeholder:text-zinc-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary-500 disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-500 disabled:ring-zinc-200 group-data-[leading-add-on=true]/Input:rounded-l-none group-data-[trailing-add-on=true]/Input:rounded-r-none dark:bg-black dark:text-zinc-100 dark:placeholder:text-zinc-600 dark:focus:ring-primary-500 dark:disabled:bg-zinc-900 dark:disabled:ring-zinc-800 sm:text-sm sm:leading-6",
                  error ? "ring-red-500" : "ring-zinc-300 dark:ring-zinc-700"
                )}
                aria-invalid={Boolean(error)}
                style={
                  {
                    paddingLeft: `${leadingInlinePadding}px`,
                    paddingRight: `${trailingInlinePadding}px`
                  } as Pick<CSSProperties, "paddingLeft" | "paddingRight">
                }
              />

              {/* trailing inline add-on */}
              {(trailingInlineAddOn || error) && (
                <InlineAddOn
                  {...{ disabled }}
                  ref={trailingInlineRef}
                  className="right-0 flex items-center gap-2 pr-3"
                >
                  {trailingInlineAddOn}
                  {error && (
                    <Icon
                      as={ExclamationCircleIcon}
                      className="h-5 w-5 text-red-500"
                      aria-hidden="true"
                    />
                  )}
                </InlineAddOn>
              )}
            </div>

            {/* trailing add-on */}
            {TrailingAddOn && (
              <AddOn
                {...{ disabled }}
                as={TrailingAddOn}
                className="-ml-px border-l-0 last:rounded-r-md"
              />
            )}
            {/* password show/hide toggle */}
            {inputType === "password" && (
              <AddOnButton
                {...{ disabled }}
                type="button"
                onClick={toggleType}
                className="-ml-px border-l-0 last:rounded-r-md"
              >
                {type === "password" ? (
                  <>
                    <span className="sr-only">Show password</span>
                    <Icon as={EyeIcon} className="h-5 w-5" aria-hidden="true" />
                  </>
                ) : (
                  <>
                    <span className="sr-only">Hide password</span>
                    <Icon
                      as={EyeSlashIcon}
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </>
                )}
              </AddOnButton>
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

type AddOnProps<TTag extends ElementType> = Omit<
  ComponentPropsWithoutRef<TTag>,
  "as"
> & {
  as?: TTag
  disabled?: boolean
}

function AddOn<TTag extends ElementType>({
  as,
  disabled,
  children,
  className,
  ...rest
}: AddOnProps<TTag>) {
  const Component = as || "div"

  return (
    <Component
      {...rest}
      className={clsx(
        "inline-flex items-center px-3 ring-1 ring-inset focus:z-10 sm:text-sm",
        disabled
          ? "cursor-not-allowed !bg-zinc-100 !text-zinc-500 ring-zinc-200 dark:!bg-zinc-900 dark:ring-zinc-800"
          : "text-zinc-500 ring-zinc-300 dark:ring-zinc-700",
        className
      )}
    >
      {children}
    </Component>
  )
}

export function AddOnButton({
  className,
  children,
  ...rest
}: AddOnProps<"button">) {
  return (
    <AddOn
      {...rest}
      as="button"
      className={clsx(
        "items-center gap-x-1.5 py-2 font-semibold text-zinc-900 ring-1 ring-inset ring-zinc-300 hover:bg-zinc-50/25 disabled:ring-0 disabled:ring-zinc-200 dark:text-zinc-100 dark:ring-zinc-700 dark:hover:bg-zinc-950/25 disabled:dark:ring-zinc-800",
        className
      )}
    >
      {children}
    </AddOn>
  )
}
