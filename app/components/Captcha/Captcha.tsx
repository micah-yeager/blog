import { Turnstile } from "@marsidev/react-turnstile"
import type { ComponentPropsWithoutRef } from "react"
import { useOutletContext } from "react-router"
import type { Env } from "~/browser-globals"

/**
 * Properties for the {@link Captcha} component.
 *
 * @see React Turnstile's {@link Turnstile}
 */
type CaptchaProps = Omit<ComponentPropsWithoutRef<typeof Turnstile>, "siteKey">

// noinspection GrazieInspection
/**
 * A wrapper around the React Turnstile's {@link Turnstile} component to provide
 * the site key from via the Remix's
 * {@link import('@remix-run/react').Outlet Outlet} context.
 *
 * @see {@link CaptchaProps}
 */
export function Captcha(props: CaptchaProps) {
  const { TURNSTILE_SITE_KEY } = useOutletContext<Env>()

  return <Turnstile {...props} siteKey={TURNSTILE_SITE_KEY} />
}
