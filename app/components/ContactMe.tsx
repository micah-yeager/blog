import { EnvelopeIcon as EnvelopeOutlineIcon } from "@heroicons/react/24/outline"
import {
  ChatBubbleLeftEllipsisIcon,
  EnvelopeIcon as EnvelopeSolidIcon,
} from "@heroicons/react/24/solid"
import { useFetcher } from "@remix-run/react"
import type { ComponentPropsWithoutRef } from "react"
import { useState } from "react"

import type { ContactMeResponse } from "~/routes/contact"

import { Alert } from "./Alert"
import { Button } from "./Button"
import { Captcha } from "./Captcha"
import { Dialog } from "./Dialog"
import { Icon } from "./Icon"
import { TextArea } from "./inputs/TextArea"
import { TextInput } from "./inputs/TextInput"

/** Fields for the contact form. */
export type ContactMeFields = {
  /** The subject of the message. */
  subject: string
  /** The reply address for the sender. */
  email: string
  /** The message body to send. */
  message: string
}

/**
 * A button that opens a dialog to contact the site owner. Extends the `button`
 * element properties.
 *
 * @component
 */
export function ContactMe(
  props: Omit<
    ComponentPropsWithoutRef<"button">,
    "type" | "children" | "onClick"
  >,
) {
  const [open, setOpen] = useState(false)
  const fetcher = useFetcher<ContactMeResponse>()

  return (
    <Button
      {...props}
      type="button"
      variant="secondary"
      size="sm"
      onClick={() => setOpen(true)}
    >
      Get in touch
      <Button.Icon as={EnvelopeOutlineIcon} />
      {/* dialog */}
      <Dialog open={open} setOpen={setOpen}>
        {/* show form until submission */}
        {fetcher.data?.result?.success ? (
          // after successful submission
          <>
            <div className="space-y-5 sm:space-y-4">
              <Dialog.Title>Submitted!</Dialog.Title>

              <p className="prose dark:prose-invert">
                Thanks for getting in touch! I’ll get back to you as I’m able.
              </p>
            </div>

            {/* actions */}
            <Dialog.Actions>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setOpen(false)}
              >
                Close
              </Button>
            </Dialog.Actions>
          </>
        ) : (
          <fetcher.Form method="post" action="/contact">
            <div className="space-y-5 sm:space-y-4">
              <Dialog.Title>Contact me</Dialog.Title>

              {fetcher.data?.formError && (
                <Alert
                  variant="error"
                  title="There was an error while submitting this form:"
                >
                  {fetcher.data.formError}
                </Alert>
              )}

              {/* form */}
              <TextInput
                label="Subject"
                name="subject"
                leadingInlineAddOn={
                  <Icon as={ChatBubbleLeftEllipsisIcon} className="h-5 w-5" />
                }
                required
              />
              <TextInput
                label="Your email"
                name="email"
                type="email"
                leadingInlineAddOn={
                  <Icon as={EnvelopeSolidIcon} className="h-5 w-5" />
                }
                placeholder="you@example.com"
                required
              />
              <TextArea label="Message" name="message" rows={8} required />

              {/* Cloudflare captcha */}
              <Captcha className="mx-auto" />
            </div>

            {/* actions */}
            <Dialog.Actions>
              <Button type="submit" variant="primary">
                Send
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </Dialog.Actions>
          </fetcher.Form>
        )}
      </Dialog>
    </Button>
  )
}
