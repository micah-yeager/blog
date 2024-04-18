// Cast to string since verification below will ensure the value exists.

import { ServerClient } from "postmark"

const EMAIL_FROM = process.env.EMAIL_FROM as string
const EMAIL_TO = process.env.EMAIL_TO as string
const POSTMARK_SERVER_TOKEN = process.env.POSTMARK_SERVER_TOKEN as string
const POSTMARK_TRANSACTIONAL_STREAM = process.env
  .POSTMARK_TRANSACTIONAL_STREAM as string
if (
  !EMAIL_FROM ||
  !EMAIL_TO ||
  !POSTMARK_SERVER_TOKEN ||
  !POSTMARK_TRANSACTIONAL_STREAM
) {
  throw new Error("Missing required email environment variable(s).")
}
export { EMAIL_FROM, EMAIL_TO, POSTMARK_TRANSACTIONAL_STREAM }

export function initEmailClient() {
  return new ServerClient(POSTMARK_SERVER_TOKEN)
}
