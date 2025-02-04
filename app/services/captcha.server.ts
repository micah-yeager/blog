import crypto from "node:crypto"
import { getClientIPAddress } from "remix-utils/get-client-ip-address"

/** The endpoint for verifying Turnstile tokens. */
const VERIFICATION_ENDPOINT =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify"

// Cast to string since verification below will ensure the value exists.
/** The site key for Turnstile. */
const TURNSTILE_SITE_KEY = process.env.TURNSTILE_SITE_KEY as string
/** The secret key for Turnstile. */
const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY as string
if (!(TURNSTILE_SITE_KEY && TURNSTILE_SECRET_KEY)) {
  throw new Error("Missing required Turnstile environment variable(s).")
}
// Don't export secret key since it won't be needed elsewhere.
export { TURNSTILE_SITE_KEY }

/** The response from the Turnstile verification endpoint. */
type VerificationResponse = {
  /** Whether the token was successfully verified. */
  success: boolean
  /** Any error codes returned by the verification endpoint. */
  "error-codes"?: string[]
  /** Any human-readable messages returned by the verification endpoint. */
  messages?: string[]
}

/** The arguments for verifying a Turnstile token. */
type VerifyTurnstileArgs = {
  /** The incoming request. */
  request: Request
  /**
   * The form data to parse. If not provided, it will be parsed from the
   * request.
   */
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
 * @throws {@link TurnstileError}
 */
export async function verifyTurnstile({
  request,
  formData,
}: VerifyTurnstileArgs) {
  // If formData is not provided, parse it from the request.
  if (!formData) {
    formData = await request.formData()
  }

  // Turnstile injects a token via "cf-turnstile-response".
  const cfTurnstileResponse = formData.get("cf-turnstile-response")
  const connectingIp = getClientIPAddress(request) ?? "127.0.0.1"

  // If the requisite info is missing, return a 400 error.
  if (!(cfTurnstileResponse && connectingIp)) {
    throw new TurnstileError("Missing Turnstile token.")
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
    method: "POST",
  })
  if (!verificationResult.ok) {
    throw new TurnstileError("Error verifying Turnstile response.")
  }

  // If the token is invalid, return a 400 error.
  const outcome: VerificationResponse = await verificationResult.json()
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

    throw new TurnstileError(message)
  }

  return { idempotencyKey, outcome }
}

/**
 * An error thrown by {@link verifyTurnstile}.
 */
export class TurnstileError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "TurnstileError"
    // Set the prototype explicitly to maintain the correct prototype chain.
    Object.setPrototypeOf(this, TurnstileError.prototype)
  }
}
