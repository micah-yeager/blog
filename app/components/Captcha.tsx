import type { ComponentPropsWithoutRef } from "react"
import { Turnstile } from "@marsidev/react-turnstile"
import { useOutletContext } from "@remix-run/react"

import type { Env } from "~/browser-globals"

/**
 * Props for the Captcha component.
 *
 * @see Turnstile
 * @see Captcha
 */
type CaptchaProps = Omit<ComponentPropsWithoutRef<typeof Turnstile>, "siteKey">

/**
 * A wrapper around the Turnstile component to provide the site key from via the
 * outlet context.
 *
 * @component
 * @see CaptchaProps
 */
export function Captcha(props: CaptchaProps) {
  const { TURNSTILE_SITE_KEY } = useOutletContext<Env>()

  return <Turnstile {...props} siteKey={TURNSTILE_SITE_KEY} />
}
