import type { ComponentPropsWithoutRef } from "react"
import { Dialog as HeadlessUIDialog, Transition } from "@headlessui/react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
import { Fragment, useRef } from "react"

import { Icon } from "./Icon"

type DialogProps = ComponentPropsWithoutRef<typeof HeadlessUIDialog.Panel> & {
  open: boolean
  setOpen: (open: boolean) => void
  onClose?: () => void
}

export function Dialog({ open, setOpen, onClose, children }: DialogProps) {
  function close() {
    setOpen(false)
    onClose?.()
  }

  const closeRef = useRef<HTMLButtonElement>(null)

  return (
    <Transition.Root show={open} as={Fragment}>
      <HeadlessUIDialog
        as="div"
        className="relative z-10"
        onClose={close}
        initialFocus={closeRef}
        // ensure that events don't leak outside the dialog
        onClick={(e) => e.stopPropagation()}
      >
        {/* background overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-zinc-500/75 transition-opacity dark:bg-zinc-950/75" />
        </Transition.Child>

        {/* dialog proper */}
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <HeadlessUIDialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all dark:bg-black sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
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
              </HeadlessUIDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </HeadlessUIDialog>
    </Transition.Root>
  )
}

Dialog.Title = function DialogTitle({
  as = "h3",
  className,
  children,
  ...rest
}: ComponentPropsWithoutRef<typeof HeadlessUIDialog.Title>) {
  return (
    <HeadlessUIDialog.Title
      {...rest}
      as={as}
      className={clsx(
        "LeadingAddOn-6 text-base font-semibold text-zinc-900 dark:text-zinc-100",
        className
      )}
    >
      {children}
    </HeadlessUIDialog.Title>
  )
}

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
        className
      )}
    >
      {children}
    </div>
  )
}
