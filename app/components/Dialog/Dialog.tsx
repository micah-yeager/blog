// noinspection JSCommentMatchesSignature

import {
  DialogPanel,
  Dialog as HeadlessUIDialog,
  DialogTitle as HeadlessUIDialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react"
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon"
import clsx from "clsx"
import type { ComponentPropsWithoutRef } from "react"
import { Fragment, useRef } from "react"

import { Icon } from "../Icon"

/**
 * Properties for the {@link Dialog} component.
 *
 * @see Headless UI's {@link DialogPanel}
 */
type DialogProps = ComponentPropsWithoutRef<typeof DialogPanel> & {
  /** The open state for the dialog. */
  open: boolean
  /** A function to set the dialog's open state. */
  setOpen: (open: boolean) => void
  /** A function to run when the dialog is closed. */
  onClose?: () => void
}

/**
 * A floating dialog to display over the current page.
 *
 * @param open - The open state for the dialog.
 * @param setOpen - A function to set the dialog's open state.
 * @param onClose - A function to run when the dialog is closed.
 * @see {@link DialogProps}
 */
export function Dialog({
  open,
  setOpen,
  onClose,
  children,
  ...rest
}: DialogProps) {
  function close() {
    setOpen(false)
    onClose?.()
  }

  const closeRef = useRef<HTMLButtonElement>(null)

  return (
    <Transition show={open} as={Fragment}>
      <HeadlessUIDialog
        as="div"
        className="relative z-10"
        onClose={close}
        initialFocus={closeRef}
        // ensure that events don't leak outside the dialog
        onClick={(e) => e.stopPropagation()}
      >
        {/* background overlay */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-zinc-500/75 transition-opacity dark:bg-zinc-950/75" />
        </TransitionChild>

        {/* dialog proper */}
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel
                {...rest}
                className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all dark:bg-black sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
              >
                {(props) => (
                  <>
                    {/* close button */}
                    <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                      <button
                        ref={closeRef}
                        type="button"
                        className="rounded-md text-zinc-400 ring-offset-transparent hover:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:ring-offset-2 dark:text-zinc-600"
                        onClick={close}
                      >
                        <span className="sr-only">Close</span>
                        <Icon
                          as={XMarkIcon}
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      </button>
                    </div>

                    {/* dialog content */}
                    {typeof children === "function" ? (
                      children(props)
                    ) : (
                      <>{children}</>
                    )}
                  </>
                )}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </HeadlessUIDialog>
    </Transition>
  )
}

/**
 * Title for a {@link Dialog}.
 *
 * @param as - The element type or component to render as. Defaults to `"h3"`.
 * @see Headless UI's {@link HeadlessUIDialogTitle DialogTitle}
 */
Dialog.Title = function DialogTitle({
  as = "h3",
  className,
  children,
  ...rest
}: ComponentPropsWithoutRef<typeof HeadlessUIDialogTitle>) {
  return (
    <HeadlessUIDialogTitle
      {...rest}
      as={as}
      className={clsx(
        "LeadingAddOn-6 text-base font-semibold text-zinc-900 dark:text-zinc-100",
        className,
      )}
    >
      {children}
    </HeadlessUIDialogTitle>
  )
}

/**
 * Actions for a {@link Dialog}.
 *
 * @see {@link HTMLDivElement}
 */
Dialog.Actions = function DialogActions({
  className,
  children,
  ...rest
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      {...rest}
      className={clsx(
        "mt-5 gap-y-3 sm:mt-4 sm:flex sm:flex-row-reverse sm:gap-x-3 sm:gap-y-0",
        className,
      )}
    >
      {children}
    </div>
  )
}
