import { EnvelopeIcon as EnvelopeOutlineIcon } from "@heroicons/react/24/outline"
import {
  ChatBubbleLeftEllipsisIcon,
  EnvelopeIcon as EnvelopeSolidIcon,
} from "@heroicons/react/24/solid"
import { useFetcher } from "@remix-run/react"
import type { ComponentPropsWithoutRef } from "react"
import { useState } from "react"

import { Alert } from "~/components/Alert"
import { Button } from "~/components/Button"
import { Captcha } from "~/components/Captcha"
import { Dialog } from "~/components/Dialog"
import { Icon } from "~/components/Icon"
import { TextArea } from "~/components/inputs/TextArea"
import { TextInput } from "~/components/inputs/TextInput"
import type { ContactMeResponse } from "~/routes/contact"

export type ContactMeFields = {
  subject: string
  email: string
  message: string
}

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
      shape="pill"
      size="sm"
      onClick={() => setOpen(true)}
    >
      <Button.Icon as={EnvelopeOutlineIcon} />
      Get in touch
      {/* dialog */}
      <Dialog open={open} setOpen={setOpen}>
        {/* show form until submission */}
        {!fetcher.data?.result?.success ? (
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
        ) : (
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
        )}
      </Dialog>
    </Button>
  )
}
