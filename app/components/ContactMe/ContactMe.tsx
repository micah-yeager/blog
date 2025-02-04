import ChatBubbleLeftEllipsisIcon from "@heroicons/react/24/solid/ChatBubbleLeftEllipsisIcon"
import EnvelopeSolidIcon from "@heroicons/react/24/solid/EnvelopeIcon"
import { useFetcher } from "@remix-run/react"
import type { ComponentPropsWithoutRef } from "react"
import { useState } from "react"
import type { ContactMeResponse } from "~/routes/contact"
import { Alert } from "../Alert"
import { Button } from "../Button"
import { Captcha } from "../Captcha"
import { Dialog } from "../Dialog"
import { Field, FieldGroup, Fieldset, Label } from "../Fieldset"
import { Icon } from "../Icon"
import { Input, InputGroup } from "../Input"
import { Textarea } from "../Textarea"

/** Fields for the {@link ContactMe} form. */
export type ContactMeFields = {
  /** The subject of the message. */
  subject: string
  /** The reply address for the sender. */
  email: string
  /** The message body to send. */
  message: string
}

/**
 * A button that opens a dialog to contact the site owner.
 *
 * @see {@link HTMLButtonElement}
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
    <Button {...props} type="button" color="dark" onClick={() => setOpen(true)}>
      Get in touch
      <Icon className="size-4" as={EnvelopeSolidIcon} />
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
              <Button type="button" plain onClick={() => setOpen(false)}>
                Close
              </Button>
            </Dialog.Actions>
          </>
        ) : (
          <fetcher.Form method="post" action="/contact">
            <Dialog.Title className="mb-4">Contact me</Dialog.Title>

            {/* Form error */}
            {fetcher.data?.formError && (
              <Alert
                variant="error"
                title="There was an error while submitting this form:"
              >
                {fetcher.data.formError}
              </Alert>
            )}

            <Fieldset>
              <FieldGroup>
                {/* Subject */}
                <Field>
                  <Label>Subject</Label>
                  <InputGroup>
                    <Icon as={ChatBubbleLeftEllipsisIcon} />
                    <Input name="subject" required />
                  </InputGroup>
                </Field>

                {/* Email */}
                <Field>
                  <Label>Your email</Label>
                  <InputGroup>
                    <Icon as={EnvelopeSolidIcon} />
                    <Input name="email" type="email" required />
                  </InputGroup>
                </Field>

                {/* Message */}
                <Field>
                  <Label>Message</Label>
                  <Textarea name="message" rows={4} required />
                </Field>

                {/* Captcha */}
                <Field>
                  <Captcha className="mx-auto" />
                </Field>
              </FieldGroup>
            </Fieldset>

            {/* actions */}
            <Dialog.Actions>
              <Button type="submit" color="orange">
                Send
              </Button>
              <Button type="button" plain onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </Dialog.Actions>
          </fetcher.Form>
        )}
      </Dialog>
    </Button>
  )
}
