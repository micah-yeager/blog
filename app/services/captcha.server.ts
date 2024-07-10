import type { TypedResponse } from "@vercel/remix"
import { json } from "@vercel/remix"
import { getClientIPAddress } from "remix-utils/get-client-ip-address"

import type { ActionResponse } from "@utils/response"

const VERIFICATION_ENDPOINT =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify"

// Cast to string since verification below will ensure the value exists.
const TURNSTILE_SITE_KEY = process.env.TURNSTILE_SITE_KEY as string
const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY as string
if (!TURNSTILE_SITE_KEY || !TURNSTILE_SECRET_KEY) {
  throw new Error("Missing required Turnstile environment variable(s).")
}
// Don't export secret key since it won't be needed elsewhere.
export { TURNSTILE_SITE_KEY }

type VerificationResponse = {
  success: boolean
  "error-codes"?: string[]
  messages?: string[]
}
export type VerifyTurnstileErrorResponse = TypedResponse<
  typeof json<ActionResponse>
>
type VerifyTurnstileArgs = {
  request: Request
  // separate from request, so we don't run into the "already read" error
  formData?: FormData
}

/**
 * Verifies a Turnstile token in a request's form data.
 *
 * @param request The incoming request.
 * @param formData The form data to parse. If not provided, it will be parsed
 *   from the request.
 * @returns The idempotency key for the verification request.
 */
export async function verifyTurnstile({
  request,
  formData
}: VerifyTurnstileArgs) {
  // If formData is not provided, parse it from the request.
  if (!formData) {
    formData = await request.formData()
  }

  // Turnstile injects a token via "cf-turnstile-response".
  const cfTurnstileResponse = formData.get("cf-turnstile-response")
  const connectingIp = getClientIPAddress(request) ?? "127.0.0.1"

  // If the requisite info is missing, return a 400 error.
  if (!cfTurnstileResponse || !connectingIp) {
    throw json<ActionResponse>(
      { formError: "Missing Turnstile token." },
      { status: 400 }
    )
  }

  // Validate the token by calling the verification endpoint.
  const verificationFormData = new FormData()
  verificationFormData.append("secret", TURNSTILE_SECRET_KEY)
  verificationFormData.append("response", cfTurnstileResponse)
  verificationFormData.append("remoteip", connectingIp)
  // While not strictly necessary in this scenario, it's good practice.
  const idempotencyKey = crypto.randomUUID()
  verificationFormData.append("idempotency_key", idempotencyKey)

  const verificationResult = await fetch(VERIFICATION_ENDPOINT, {
    body: verificationFormData,
    method: "POST"
  })
  if (!verificationResult.ok) {
    throw json<ActionResponse>(
      { formError: "Error verifying Turnstile response." },
      { status: 400 }
    )
  }

  // If the token is invalid, return a 400 error.
  const outcome = (await verificationResult.json()) as VerificationResponse
  if (!outcome.success) {
    let message = "Turnstile token rejected"
    // if human-readable messages were returned, use those
    if (outcome.messages?.length) {
      message += `: ${outcome.messages.join("\n")}`
    }
    // otherwise, use the error codes if present
    else if (outcome["error-codes"]?.length) {
      message += `: ${outcome["error-codes"].join(",")}`
    }
    // otherwise, just use the generic message
    else {
      message += "."
    }

    throw json<ActionResponse>({ formError: message }, { status: 400 })
  }

  return { idempotencyKey, outcome }
}
