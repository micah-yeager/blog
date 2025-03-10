import type { ActionFunctionArgs } from "@vercel/remix"
import { data } from "@vercel/remix"
import type { ContactMeFields } from "~/components/ContactMe"
import { TurnstileError, verifyTurnstile } from "~/services/captcha.server"
import {
  EMAIL_FROM,
  EMAIL_TO,
  POSTMARK_TRANSACTIONAL_STREAM,
  initEmailClient,
} from "~/services/email.server"
import type { ActionResponse, FieldErrors } from "~/utils/response"

/** The response for the contact form. */
type ContactResult = {
  success: boolean
}
/** The data response for the contact form. */
export type ContactMeResponse = ActionResponse<ContactMeFields, ContactResult>

// No meta since this is an action-only route.

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()

  // Verify the Turnstile form submission.
  try {
    await verifyTurnstile({ request, formData })
  } catch (error) {
    // If this is a response object, return it as the appropriately-typed
    // response.
    if (error instanceof TurnstileError) {
      return data<ActionResponse>({ formError: error.message }, { status: 400 })
    }
    throw error
  }

  const subject = formData.get("subject")
  const email = formData.get("email")
  const message = formData.get("message")

  // Form verification to ensure correct data types.
  if (
    typeof subject !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string"
  ) {
    return data<ActionResponse>(
      { formError: "Invalid form submission." },
      { status: 400 },
    )
  }

  // Field validation to ensure required fields are filled out.
  const fields = {
    subject,
    email,
    message,
  }
  const fieldErrors: FieldErrors<ContactMeFields> = {
    subject: subject ? undefined : "Subject is required.",
    email: email ? undefined : "Email is required.",
    message: message ? undefined : "Message is required.",
  }
  if (fieldErrors && Object.values(fieldErrors).some(Boolean)) {
    return data<ContactMeResponse>({
      fieldErrors,
      fields,
      result: { success: false },
    })
  }

  // Send an email using the form data.
  const client = initEmailClient()
  try {
    await client.sendEmail({
      From: EMAIL_FROM,
      ReplyTo: email,
      To: EMAIL_TO,
      Subject: subject,
      TextBody: message,
      MessageStream: POSTMARK_TRANSACTIONAL_STREAM,
    })
  } catch {
    return data<ContactMeResponse>(
      {
        formError:
          "There was an error sending your message. Please try again later.",
        result: { success: false },
      },
      { status: 500 },
    )
  }

  return data<ContactMeResponse>({
    result: { success: true },
  })
}
