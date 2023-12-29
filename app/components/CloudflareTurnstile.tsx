import { Turnstile } from "@marsidev/react-turnstile"
import { useOutletContext } from "@remix-run/react"
import type { ComponentPropsWithoutRef } from "react"

import type { Env } from "~/browser-globals"

export function CloudflareTurnstile(
  props: Omit<ComponentPropsWithoutRef<typeof Turnstile>, "siteKey">,
) {
  const { TURNSTILE_SITE_KEY } = useOutletContext<Env>()

  return <Turnstile {...props} siteKey={TURNSTILE_SITE_KEY} />
}
